#!/usr/bin/env node
// Build final products.json from scraped + classified + local images
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scraped = JSON.parse(
  readFileSync(resolve(__dirname, "../data-import/dbediciones-ml.json"), "utf8")
);

// SAME DICTS as classify-v2.mjs
const themeKeywords = {
  "stranger-things": ["stranger things", "vecna", "eleven", "demogorgon", "hawkins", "hellfire", "dustin", "upside down", "joe keery", "djo"],
  wicked: ["wicked", "elphaba", "glinda"],
  "kpop-bts": ["bts", "lightstick", "armi", "bangtan", "jungkook", "jimin", "taehyung", "suga ", "rm bts", "jin bts", "jhope", "world tour"],
  "kpop-generic": ["k-pop", "kpop"],
  minecraft: ["minecraft", "creeper", "enderman"],
  "futbol-argentina": ["argentina", "messi", "scaloneta", "afa", "mundial argentina", "simbolos patrios", " patrios", "diez argentina"],
  bluey: ["bluey", "bingo bluey", "heeler"],
  "disney-princesas": ["princesas", "frozen", "elsa", "rapunzel", "cinderella", "blancanieves", "cenicienta", "disney princess", "moana", "vaiana", "mulan ", "ariel", "bella disney"],
  "spider-man": ["spider", "spiderman", "spider-man", "miles morales"],
  "dragon-ball": ["dragon ball", "goku", "vegeta", "piccolo", "shenron"],
  "taylor-swift": ["taylor swift", "eras tour", "swifties"],
  pokemon: ["pokemon", "pikachu", "charizard", "pokeball"],
  "harry-potter": ["harry potter", "hogwarts", "gryffindor", "hermione", "weasley"],
  barbie: ["barbie", "margot robbie"],
  roblox: ["roblox"],
  sprunki: ["sprunki", "incredibox"],
  "among-us": ["among us", "amongus", "impostor"],
  "guerreras-kpop": ["guerreras k-pop", "kpop demon hunters", "saja boys", "huntrix", "demon hunters", "jinu ", "rumi kpop"],
  "italian-brainrot": ["tralalero tralala", "italian brainrot", "brainrot capi", "capi brawl", "bombardino", "tung tung sahur", "chimpanzini"],
  "99-noches-bosque": ["99 noches en el bosque", "99 noches"],
  cinnamoroll: ["cinnamoroll", "sanrio"],
  fortnite: ["fortnite"],
  "chicas-superpoderosas": ["chicas superpoderosas", "powerpuff"],
  "superman-krypto": ["superman", "krypto"],
  "lego-batman": ["lego batman", "batman movie"],
  vehiculos: ["gruas", "camiones tow", "autos camiones"],
  navidad: ["navidad", "navideños", "navidenos"],
  "dia-padre": ["día del padre", "dia del padre", " papa "],
  "dia-madre": ["día de la madre", "dia de la madre"],
  primavera: ["primavera flores"],
  halloween: ["halloween"],
  mickey: ["mickey mouse", "minnie mouse"],
  "peppa-pig": ["peppa pig", "peppa "],
  paw: ["paw patrol", "patrulla canina"],
  sonic: ["sonic erizo", "sonic hedgehog", "sonic digital"],
  mario: ["super mario", "mario bros"],
  "hello-kitty": ["hello kitty", "kuromi"],
  "baby-shark": ["baby shark"],
  marvel: ["marvel", "avengers", "iron man", "hulk ", "thor "],
  dc: ["dc comics", " batman ", "flash dc", "liga de la justicia"],
  aesthetic: ["aesthetic"],
};

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
  "mega-kit": ["mega kit", "super kit", "99 disenos", "110 disenos", "127 disenos", "101 disenos", "40 disenos", "pack 99", "kit 101", "kit 127", "kit 110"],
  souvenirs: ["souvenir", "souvenirs", "gracias por venir"],
  mascaras: ["mascara", "mascaras de papel"],
  "juego-cartas": ["juego de rol", "juego cartas", "calabozos & dragones", "d&d"],
};

const excludeKeywords = [
  "sweater", "pantalon", "pantalón", "aros", "pulseras", "bolso",
  "talle ", "gymboree", "victoria's secret", "victoria&#x27;s secret",
  "pottery barn", "buckley london", "sweater capucha", "bengalina", " tote ",
  "remera para", "set x3", "saquitos", "conjunto bebes", "cheeky",
];

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // strip accents
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

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/&amp;|&|&#x27;|'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

const mapKpopGeneric = (themes) => {
  // If product has kpop-generic but also guerreras-kpop, prefer the more specific one
  if (themes.includes("guerreras-kpop") || themes.includes("kpop-bts")) {
    return themes.filter((t) => t !== "kpop-generic");
  }
  return themes;
};

const products = [];
for (const p of scraped) {
  if (isExcluded(p.title)) continue;
  const title = decode(p.title).replace(/\s+/g, " ").trim();
  // Title case for display
  const displayTitle = p.title
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'");

  let themes = classify(p.title, themeKeywords);
  themes = mapKpopGeneric(themes);
  const categories = classify(p.title, categoryKeywords);

  const slug = slugify(displayTitle) + (p.mlaId ? `-${p.mlaId}` : "");

  // Pick primary theme and category (first match)
  const primaryTheme = themes[0] || null;
  const primaryCategory = categories[0] || "otros";

  products.push({
    id: p.mlaId || slug,
    slug,
    title: displayTitle,
    image: p.localImage || p.image,
    mlPermalink: p.permalink,
    price: p.price,
    originalPrice: p.originalPrice,
    sold: p.sold,
    rating: p.rating,
    themes,
    categories,
    primaryTheme,
    primaryCategory,
  });
}

// sort: products with theme first, then by price desc
products.sort((a, b) => {
  if ((b.themes.length > 0 ? 1 : 0) !== (a.themes.length > 0 ? 1 : 0)) {
    return (b.themes.length > 0 ? 1 : 0) - (a.themes.length > 0 ? 1 : 0);
  }
  return (b.sold || 0) - (a.sold || 0);
});

writeFileSync(
  resolve(__dirname, "../src/data/products.json"),
  JSON.stringify(products, null, 2)
);

// stats
const byTheme = {};
const byCategory = {};
for (const p of products) {
  for (const t of p.themes) byTheme[t] = (byTheme[t] || 0) + 1;
  for (const c of p.categories) byCategory[c] = (byCategory[c] || 0) + 1;
}
console.log(`✓ Saved ${products.length} products to src/data/products.json\n`);
console.log("Top 12 themes:");
Object.entries(byTheme).sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([k, v]) => console.log(`  ${k.padEnd(24)} ${v}`));
console.log("\nCategories:");
Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(22)} ${v}`));
