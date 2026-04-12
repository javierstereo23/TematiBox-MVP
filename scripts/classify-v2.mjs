#!/usr/bin/env node
// v2 classifier: filter non-imprimibles, detect viral themes + new sub-categories
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(resolve(__dirname, "../data-import/dbediciones-ml.json"), "utf8")
);

// ── THEMES (16 existing + 6 new viral + a few more seen in catalog)
const themeKeywords = {
  "stranger-things": ["stranger things", "vecna", "eleven", "demogorgon", "hawkins", "hellfire", "dustin", "upside down", "joe keery", "djo"],
  wicked: ["wicked", "elphaba", "glinda"],
  "kpop-bts": ["bts", "lightstick", "armi", "bangtan", "jungkook", "jimin", "taehyung", "suga", "rm bts", "jin bts", "jhope", "world tour"],
  "kpop-generic": ["k-pop", "kpop"], // catch-all
  minecraft: ["minecraft", "creeper", "enderman"],
  "futbol-argentina": ["argentina", "messi", "scaloneta", "afa", "mundial argentina", "simbolos patrios", "patrios", "diez argentina"],
  bluey: ["bluey", "bingo bluey", "heeler"],
  "disney-princesas": ["princesas", "frozen", "elsa", "rapunzel", "cinderella", "blancanieves", "cenicienta", "disney princess", "moana", "vaiana", "mulan", "ariel", "bella disney"],
  "spider-man": ["spider", "spiderman", "spider-man", "miles morales"],
  "dragon-ball": ["dragon ball", "goku", "vegeta", "piccolo", "shenron"],
  "taylor-swift": ["taylor swift", "eras tour", "swifties"],
  pokemon: ["pokemon", "pikachu", "charizard", "pokeball"],
  "harry-potter": ["harry potter", "hogwarts", "gryffindor", "hermione", "weasley"],
  barbie: ["barbie", "margot robbie"],
  roblox: ["roblox"],
  sprunki: ["sprunki", "incredibox"],
  "among-us": ["among us", "amongus", "impostor"],
  // NEW viral themes
  "guerreras-kpop": ["guerreras k-pop", "kpop demon hunters", "saja boys", "huntrix", "demon hunters", "jinu", "rumi kpop"],
  "italian-brainrot": ["tralalero tralala", "italian brainrot", "brainrot capi", "capi brawl", "bombardino", "tung tung sahur", "chimpanzini"],
  "99-noches-bosque": ["99 noches en el bosque", "99 noches"],
  cinnamoroll: ["cinnamoroll", "sanrio"],
  fortnite: ["fortnite"],
  "chicas-superpoderosas": ["chicas superpoderosas", "powerpuff"],
  // extras spotted
  "superman-krypto": ["superman", "krypto"],
  "lego-batman": ["lego batman", "batman movie"],
  vehiculos: ["gruas", "camiones tow", "autos camiones"],
  navidad: ["navidad", "navideños", "navidenos"],
  "dia-padre": ["día del padre", "dia del padre", "papa "],
  "dia-madre": ["día de la madre", "dia de la madre", "mama "],
  primavera: ["primavera flores"],
  halloween: ["halloween"],
  mickey: ["mickey mouse", "minnie mouse"],
  "peppa-pig": ["peppa pig", "peppa "],
  paw: ["paw patrol", "patrulla canina"],
  sonic: ["sonic erizo", "sonic hedgehog"],
  mario: ["super mario", "mario bros"],
  "hello-kitty": ["hello kitty", "kuromi"],
  "baby-shark": ["baby shark"],
  marvel: ["marvel", "avengers", "iron man", "hulk ", "thor "],
  dc: ["dc comics", "batman ", "flash dc", "liga de la justicia"],
};

// ── CATEGORIES (5 existing + new: toppers, stickers, banderines, mega-kit, souvenirs)
const categoryKeywords = {
  invitaciones: ["invitacion", "invitaciones"],
  colorear: ["colorear", "pintar", "pintemos"],
  escolares: [
    "escolar", "escolares", "aprendizaje", "silaba", "silabas", "fonologica",
    "afirmacion", "afirmaciones", "aprendo", "abecedario", "didactic", "didactico",
    "flashcard", "flash card", "repaso", "vocales", "numeros", "conciencia",
    "tablas multiplicar", "tarjetas 100", "rutinas", "reglas en clase",
    "sopa letras", "estimulacion cognitiva", "ebook", "chakras", "yoga gemas",
  ],
  cliparts: ["clipart", "cliparts", "png sublimar", "sublimar", "sublimacion", "transparente", "hd png"],
  etiquetas: ["etiqueta", "etiquetas", "caratula", "caratulas", "fideos ramen", "soda pop", "ramen personalizadas"],
  toppers: ["topper", "toppers"],
  stickers: ["stickers", "sticker"],
  "cotillon-banderines": ["banderin", "banderines", "banderon", "guirnalda", "individuales navide"],
  "mega-kit": ["mega kit", "super kit", "99 disenos", "110 disenos", "127 disenos", "101 disenos", "40 disenos", "pack 99"],
  souvenirs: ["souvenir", "souvenirs", "gracias por venir", "roba un brainrot"],
  mascaras: ["mascara", "mascaras de papel"],
  "juego-cartas": ["juego de rol", "juego cartas", "calabozos & dragones", "d&d"],
};

// ── EXCLUSIONS (non-imprimibles)
const excludeKeywords = [
  "sweater", "pantalon", "pantalón", "aros", "pulseras", "bolso", "bolso maternal",
  "talle ", "importado gymboree", "victoria's secret", "victoria&#x27;s secret",
  "pottery barn", "buckley london", "sweater capucha", "bengalina", "tote",
];

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .toLowerCase();
}

function classify(title, dict) {
  const t = decode(title);
  const hits = [];
  for (const [tag, words] of Object.entries(dict)) {
    if (words.some((w) => t.includes(w))) hits.push(tag);
  }
  return hits;
}

function isExcluded(title) {
  const t = decode(title);
  return excludeKeywords.some((k) => t.includes(k));
}

const classified = data.map((p) => ({
  ...p,
  themes: classify(p.title, themeKeywords),
  categories: classify(p.title, categoryKeywords),
  excluded: isExcluded(p.title),
}));

const imprimibles = classified.filter((p) => !p.excluded);
const excluded = classified.filter((p) => p.excluded);

// stats
const themeCount = {};
const catCount = {};
const untagged = [];
for (const p of imprimibles) {
  for (const t of p.themes) themeCount[t] = (themeCount[t] || 0) + 1;
  for (const c of p.categories) catCount[c] = (catCount[c] || 0) + 1;
  if (p.themes.length === 0) untagged.push(p.title);
}

console.log("=== THEMES (imprimibles only) ===");
Object.entries(themeCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(26)} ${v}`));

console.log("\n=== CATEGORIES ===");
Object.entries(catCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(22)} ${v}`));

console.log(`\n=== SUMMARY ===`);
console.log(`  total scraped:   ${data.length}`);
console.log(`  excluded (ropa): ${excluded.length}`);
console.log(`  imprimibles:     ${imprimibles.length}`);
console.log(`  with theme:      ${imprimibles.filter((p) => p.themes.length > 0).length}`);
console.log(`  with category:   ${imprimibles.filter((p) => p.categories.length > 0).length}`);
console.log(`  untagged theme:  ${untagged.length}`);

console.log(`\n=== EXCLUDED (first 10) ===`);
excluded.slice(0, 10).forEach((p) => console.log(`  - ${p.title}`));

console.log(`\n=== SAMPLE UNTAGGED-THEME (first 15) ===`);
untagged.slice(0, 15).forEach((t) => console.log(`  - ${t}`));

writeFileSync(
  resolve(__dirname, "../data-import/dbediciones-classified.json"),
  JSON.stringify({ imprimibles, excluded }, null, 2)
);
console.log(`\n✓ Saved ${imprimibles.length} imprimibles to dbediciones-classified.json`);
