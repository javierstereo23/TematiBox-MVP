#!/usr/bin/env node
// Download all ML product images to /public/images/products/
import { readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../public/images/products");
mkdirSync(outDir, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const data = JSON.parse(
  readFileSync(resolve(__dirname, "../data-import/dbediciones-ml.json"), "utf8")
);

function extFromUrl(url) {
  if (url.endsWith(".webp")) return "webp";
  if (url.endsWith(".jpg") || url.endsWith(".jpeg")) return "jpg";
  if (url.endsWith(".png")) return "png";
  return "webp";
}

function filenameFor(product) {
  // use MLA id; fallback to slug of title
  const id = product.mlaId || product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
  return `${id}.${extFromUrl(product.image || "")}`;
}

async function download(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const stream = Readable.fromWeb(res.body);
  await pipeline(stream, createWriteStream(destPath));
}

async function main() {
  let ok = 0,
    skip = 0,
    fail = 0;
  const enriched = [];
  for (const p of data) {
    if (!p.image) {
      enriched.push({ ...p, localImage: null });
      continue;
    }
    const fn = filenameFor(p);
    const dest = resolve(outDir, fn);
    const webPath = `/images/products/${fn}`;
    if (existsSync(dest)) {
      skip++;
      enriched.push({ ...p, localImage: webPath });
      continue;
    }
    try {
      await download(p.image, dest);
      ok++;
      enriched.push({ ...p, localImage: webPath });
      if (ok % 25 === 0) console.log(`[download] ${ok} new, ${skip} skipped, ${fail} failed`);
    } catch (e) {
      fail++;
      console.warn(`[fail] ${p.mlaId} ${p.title.slice(0, 40)} → ${e.message}`);
      enriched.push({ ...p, localImage: null });
    }
    // gentle delay
    await new Promise((r) => setTimeout(r, 60));
  }
  writeFileSync(
    resolve(__dirname, "../data-import/dbediciones-ml.json"),
    JSON.stringify(enriched, null, 2)
  );
  console.log(`\n✓ Done. ok=${ok} skipped=${skip} fail=${fail}  total=${data.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
