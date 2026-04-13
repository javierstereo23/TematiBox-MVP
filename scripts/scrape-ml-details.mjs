#!/usr/bin/env node
// Enrich products.json with lifetime sold + rating from each product's PDP.
// Reads src/data/products.json → writes back with enrich + a side report.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_PATH = resolve(__dirname, "../src/data/products.json");
const REPORT_PATH = resolve(__dirname, "../data-import/enrich-report.json");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const DELAY_MS = 450; // be polite
const CONCURRENCY = 4;

function extractFromPdp(html) {
  // 1. Sold tier (e.g. "+100 vendidos", "+50 vendidos", "10 vendidos")
  const soldM = html.match(/"subtitle_label":\{"text":"[^"]*?([+]?\d+(?:\.\d+)?)\s*(mil)?\s*vendidos?"/i);
  let sold = null;
  let soldTier = null;
  if (soldM) {
    let n = parseInt(soldM[1].replace(/\./g, ""), 10);
    if (soldM[2]) n *= 1000;
    soldTier = `${soldM[0].includes('+') ? '+' : ''}${n}`;
    sold = n;
  }

  // 2. Rating + review count from JSON in-page
  const ratingM = html.match(/"reviews":\{"rating":([0-9.]+),"amount":(\d+)/);
  const rating = ratingM ? parseFloat(ratingM[1]) : null;
  const reviewCount = ratingM ? parseInt(ratingM[2], 10) : null;

  // 3. Highlight badges (e.g. "MÁS VENDIDO", "7º en Kits Imprimibles")
  const highlights = [];
  const hlRe = /"label":\{"text":"([^"]+)","color":"[^"]+","background_color":"[^"]+","background_weight":"[^"]+","type":"highlight"/g;
  let m;
  while ((m = hlRe.exec(html))) {
    highlights.push(m[1]);
  }
  // Alt pattern: visible MÁS VENDIDO / N° en Category
  const masVendM = html.match(/"text":"(MÁS VENDIDO[^"]*)"/);
  if (masVendM && !highlights.includes(masVendM[1])) highlights.push(masVendM[1]);
  const rankingM = html.match(/"text":"(\d+[ºª°]\s*en\s*[^"]+)"/);
  if (rankingM && !highlights.includes(rankingM[1])) highlights.push(rankingM[1]);

  // 4. Stock indicator
  const stockM = html.match(/"stock_quantity":(\d+)/);
  const stock = stockM ? parseInt(stockM[1], 10) : null;

  return { sold, soldTier, rating, reviewCount, highlights, stock };
}

async function fetchWithRetry(url, tries = 3) {
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": UA,
          "Accept-Language": "es-AR,es;q=0.9",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
      });
      if (res.status === 429) {
        await sleep(2000 + attempt * 3000);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    } catch (e) {
      if (attempt === tries - 1) throw e;
      await sleep(500 + attempt * 1000);
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function enrichOne(product) {
  if (!product.mlPermalink) return { slug: product.slug, error: "no permalink" };
  try {
    const html = await fetchWithRetry(product.mlPermalink);
    const data = extractFromPdp(html);
    return { slug: product.slug, ...data };
  } catch (e) {
    return { slug: product.slug, error: e.message };
  }
}

async function main() {
  const products = JSON.parse(readFileSync(PRODUCTS_PATH, "utf8"));
  console.log(`[start] enriching ${products.length} products (concurrency ${CONCURRENCY})`);

  const results = new Map();
  let done = 0;
  let errors = 0;

  async function worker(queue) {
    while (queue.length > 0) {
      const p = queue.shift();
      const res = await enrichOne(p);
      results.set(res.slug, res);
      done++;
      if (res.error) errors++;
      if (done % 20 === 0 || done === products.length) {
        console.log(
          `[progress] ${done}/${products.length} · errors ${errors} · last: ${p.slug.slice(0, 60)} → sold=${res.sold || "-"} rating=${res.rating || "-"}`
        );
      }
      await sleep(DELAY_MS);
    }
  }

  const queue = [...products];
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

  // Merge into products
  const enriched = products.map((p) => {
    const r = results.get(p.slug);
    if (!r || r.error) return p;
    return {
      ...p,
      sold: r.sold ?? p.sold,
      soldTier: r.soldTier,
      rating: r.rating ?? p.rating,
      reviewCount: r.reviewCount ?? null,
      highlights: r.highlights?.length ? r.highlights : undefined,
      stock: r.stock ?? undefined,
    };
  });

  writeFileSync(PRODUCTS_PATH, JSON.stringify(enriched, null, 2));

  // Side report
  const withSold = enriched.filter((p) => p.sold).length;
  const withRating = enriched.filter((p) => p.rating).length;
  const withHighlights = enriched.filter((p) => p.highlights?.length).length;
  const totalSold = enriched.reduce((s, p) => s + (p.sold || 0), 0);
  const errored = [...results.values()].filter((r) => r.error);

  const report = {
    scraped_at: new Date().toISOString(),
    total: products.length,
    with_sold: withSold,
    with_rating: withRating,
    with_highlights: withHighlights,
    total_lifetime_sold: totalSold,
    errors: errored.length,
    errored_slugs: errored.map((e) => ({ slug: e.slug, error: e.error })),
  };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  console.log("\n========== DONE ==========");
  console.log(`Enriched:      ${enriched.length}`);
  console.log(`With sold:     ${withSold} (${((withSold / enriched.length) * 100).toFixed(1)}%)`);
  console.log(`With rating:   ${withRating} (${((withRating / enriched.length) * 100).toFixed(1)}%)`);
  console.log(`Total units sold (lifetime est.): ${totalSold.toLocaleString("es-AR")}`);
  console.log(`Errors: ${errored.length}`);
  console.log(`Report: ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
