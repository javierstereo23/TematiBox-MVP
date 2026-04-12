#!/usr/bin/env node
// Scrape DBEDICIONES ML seller listings with images, titles, prices, permalinks
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../data-import");
mkdirSync(outDir, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const BASE = "https://listado.mercadolibre.com.ar/_CustId_257195099";

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractProducts(html) {
  const products = [];
  // Split on img poly-component__picture
  const chunks = html.split(/(?=<img class="poly-component__picture")/);

  for (const chunk of chunks) {
    const imgM = chunk.match(/<img class="poly-component__picture"\s+src="([^"]+)"\s+alt="([^"]+)"/);
    if (!imgM) continue;
    const image = imgM[1];
    const title = decode(imgM[2]);
    // MLA product ID from image URL (D_Q_NP_XXXXX-MLA9999_022026-E.webp → MLA9999)
    const mlaM = image.match(/MLA(\d+)/);
    const mlaId = mlaM ? mlaM[1] : null;

    // Permalink — next <a class="poly-component__title">
    const linkM = chunk.match(/<a\s+href="([^"]+)"[^>]*class="poly-component__title"/);
    const permalink = linkM ? decode(linkM[1]).split("#")[0] : null;

    // Price — first andes-money-amount__fraction in next ~3KB
    const slice = chunk.slice(0, 6000);
    const priceM = slice.match(/class="andes-money-amount__fraction"[^>]*>([\d\.]+)</);
    const origPriceM = slice.match(/s-money-amount--previous[\s\S]*?class="andes-money-amount__fraction"[^>]*>([\d\.]+)</);
    const price = priceM ? parseInt(priceM[1].replace(/\./g, ""), 10) : null;
    const originalPrice = origPriceM ? parseInt(origPriceM[1].replace(/\./g, ""), 10) : null;

    // Sold count from poly-component__seller or reviews
    const soldM = slice.match(/(\d+(?:\.\d+)?)\s*vendidos/i);
    const sold = soldM ? parseInt(soldM[1].replace(/\./g, ""), 10) : null;

    // Rating
    const ratingM = slice.match(/class="poly-reviews__rating"[^>]*>([\d\.]+)</);
    const rating = ratingM ? parseFloat(ratingM[1]) : null;

    products.push({ title, image, permalink, mlaId, price, originalPrice, sold, rating });
  }

  return products;
}

async function main() {
  const all = [];
  const seen = new Set();

  for (let offset = 0; offset < 500; offset += 48) {
    const url = offset === 0 ? BASE : `${BASE}_Desde_${offset + 1}`;
    let html;
    try {
      html = await fetchPage(url);
    } catch (e) {
      console.warn(`[warn] ${url} failed: ${e.message}`);
      break;
    }
    const products = extractProducts(html);
    if (products.length === 0) {
      console.log(`[done] no more products at offset ${offset}`);
      break;
    }
    let newCount = 0;
    for (const p of products) {
      const key = p.mlaId || p.title;
      if (!seen.has(key)) {
        seen.add(key);
        all.push(p);
        newCount++;
      }
    }
    console.log(
      `[offset ${offset}] +${newCount} (total ${all.length}) sample: ${products[0]?.title?.slice(0, 60)}`
    );
    if (newCount === 0) break;
    await new Promise((r) => setTimeout(r, 400));
  }

  writeFileSync(resolve(outDir, "dbediciones-ml.json"), JSON.stringify(all, null, 2));
  const withImg = all.filter((p) => p.image).length;
  const withPrice = all.filter((p) => p.price).length;
  console.log(`\n✓ Saved ${all.length} products`);
  console.log(`  with image: ${withImg}`);
  console.log(`  with price: ${withPrice}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
