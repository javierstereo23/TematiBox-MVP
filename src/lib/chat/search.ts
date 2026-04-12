import { products, type RealProduct } from "@/data/products";

/**
 * Simple keyword-based product search.
 * Scores each product by counting matching words in title/themes/categories.
 * Returns top N most relevant.
 *
 * Used to inject just-in-time catalog context into chat prompts so the
 * bot can recommend specific products with real URLs — without tool use.
 */

const STOP_WORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas",
  "de", "del", "en", "a", "y", "o", "u", "que", "es", "se",
  "me", "te", "le", "nos", "vos", "mi", "mis", "tu", "tus",
  "para", "por", "con", "como", "qué", "que", "cómo", "cuánto",
  "tiene", "tengo", "tengan", "hay", "si", "no", "ya",
  "dónde", "donde", "cuándo", "cuando", "quién", "quien",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

export function searchCatalog(query: string, limit = 5): RealProduct[] {
  const words = tokenize(query);
  if (words.length === 0) return [];

  type Scored = { p: RealProduct; score: number };
  const scored: Scored[] = [];

  for (const p of products) {
    const haystack = tokenize(
      `${p.title} ${p.themes.join(" ")} ${p.categories.join(" ")} ${p.primaryCategory}`
    );
    const hSet = new Set(haystack);
    let score = 0;
    for (const w of words) {
      if (hSet.has(w)) score += 2;
      else if (haystack.some((h) => h.startsWith(w) || w.startsWith(h))) score += 1;
    }
    // Boost products that have theme matches
    if (p.primaryTheme && words.some((w) => p.primaryTheme!.includes(w))) score += 2;
    // Small boost for higher-priced (usually bigger kits)
    if (p.price && p.price > 8000) score += 0.3;

    if (score > 0) scored.push({ p, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}
