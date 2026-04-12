#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(resolve(__dirname, "../data-import/dbediciones-ml.json"), "utf8"));

const themeKeywords = {
  "stranger-things": ["stranger things", "vecna", "eleven", "demogorgon", "hawkins", "hellfire", "dustin", "upside down"],
  wicked: ["wicked", "elphaba", "glinda"],
  "kpop-bts": ["bts", "k-pop", "kpop", "blackpink", "newjeans", "twice", "bighit", "hybe", "lightstick", "guerreras k-pop", "kpop demon hunters", "saja boys"],
  minecraft: ["minecraft", "creeper", "enderman", "steve minecraft"],
  "futbol-argentina": ["argentina", "messi", "scaloneta", "afa", "seleccion argentina", "mundial", "simbolos patrios", "patrios"],
  bluey: ["bluey", "bingo bluey", "heeler"],
  "disney-princesas": ["princesas", "frozen", "elsa", "rapunzel", "cinderella", "blancanieves", "cenicienta", "disney princess", "moana", "mulan", "ariel"],
  "spider-man": ["spider", "spiderman", "spider-man", "aracnido", "miles morales"],
  "dragon-ball": ["dragon ball", "goku", "vegeta", "piccolo", "shenron"],
  "taylor-swift": ["taylor swift", "eras tour", "swifties"],
  pokemon: ["pokemon", "pikachu", "charizard", "pokeball"],
  "harry-potter": ["harry potter", "hogwarts", "gryffindor", "hermione", "ron weasley"],
  barbie: ["barbie", "margot robbie"],
  roblox: ["roblox"],
  sprunki: ["sprunki", "incredibox"],
  "among-us": ["among us", "amongus", "impostor"],
};

const categoryKeywords = {
  invitaciones: ["invitacion", "invitaciones", "invita"],
  colorear: ["colorear", "pintar", "mandala"],
  escolares: ["escolar", "escolares", "aprendizaje", "silaba", "silabas", "fonologica", "afirmacion", "afirmaciones", "aprendo", "abecedario", "tarjetas didacticas", "flashcard", "flash card", "tarjetas 100", "repaso", "vocales", "numeros", "conciencia"],
  cliparts: ["clipart", "cliparts", "png sublimar", "sublimar", "sublimacion", "transparente", "hd png", "diseños"],
  etiquetas: ["etiqueta", "etiquetas", "caratula", "caratulas", "utiles escolares", "fideos ramen", "soda pop"],
  toppers: ["topper", "toppers", "torta"],
  stickers: ["stickers", "sticker"],
  banderin: ["banderin", "banderines"],
  mascaras: ["mascara", "mascaras"],
  kit: ["kit pack", "super kit", "kit imprimible"],
};

function classify(title, dict) {
  const t = title.toLowerCase();
  const hits = [];
  for (const [tag, words] of Object.entries(dict)) {
    if (words.some((w) => t.includes(w))) hits.push(tag);
  }
  return hits;
}

const enriched = data.map((p) => ({
  ...p,
  themes: classify(p.title, themeKeywords),
  categories: classify(p.title, categoryKeywords),
}));

// counts
const themeCount = {};
const catCount = {};
const untagged = [];
for (const p of enriched) {
  for (const t of p.themes) themeCount[t] = (themeCount[t] || 0) + 1;
  for (const c of p.categories) catCount[c] = (catCount[c] || 0) + 1;
  if (p.themes.length === 0 && p.categories.length === 0) untagged.push(p.title);
}

console.log("=== THEMES ===");
Object.entries(themeCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(22)} ${v}`));

console.log("\n=== CATEGORIES ===");
Object.entries(catCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(18)} ${v}`));

console.log(`\n=== TOTAL ${data.length} products ===`);
console.log(`with theme: ${enriched.filter((p) => p.themes.length > 0).length}`);
console.log(`with category: ${enriched.filter((p) => p.categories.length > 0).length}`);
console.log(`untagged: ${untagged.length}`);

// price stats
const prices = data.map((p) => p.price).filter(Boolean);
const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
const min = Math.min(...prices);
const max = Math.max(...prices);
console.log(`\n=== PRICES ===\n  avg: $${avg} min: $${min} max: $${max}`);

// images
const withImg = data.filter((p) => p.image).length;
console.log(`\n=== IMAGES ===\n  with image: ${withImg}/${data.length}`);

// save enriched
writeFileSync(
  resolve(__dirname, "../data-import/dbediciones-enriched.json"),
  JSON.stringify(enriched, null, 2)
);
console.log(`\n✓ Enriched saved`);

// print sample untagged
console.log(`\n=== SAMPLE UNTAGGED (first 15) ===`);
untagged.slice(0, 15).forEach((t) => console.log(`  - ${t}`));
