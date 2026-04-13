import type { RealProduct } from "@/data/products";
import type { ThemeData, DigitalCategoryMeta } from "@/data/themes";

// Clean up scraped ML titles: drop "Imprimible", trailing product IDs,
// and present them sentence-case so the H1 and meta look editorial.
export function cleanTitle(raw: string): string {
  let t = raw;
  t = t.replace(/^\s*imprimible\s+/i, "");
  t = t.replace(/\s+\d{8,}\s*$/i, "");
  t = t.trim();
  // Preserve first-letter capitalization, nothing more (titles already have it)
  if (t.length > 0) t = t[0].toUpperCase() + t.slice(1);
  return t;
}

export function seoTitle(product: RealProduct, category?: DigitalCategoryMeta): string {
  const base = cleanTitle(product.title);
  const cat = category?.name ? ` · ${category.name}` : "";
  return `${base}${cat} personalizado con el nombre`;
}

export function seoDescription(
  product: RealProduct,
  category?: DigitalCategoryMeta,
  theme?: ThemeData
): string {
  const name = cleanTitle(product.title);
  const themePart = theme ? ` tema ${theme.name}` : "";
  const catPart = category ? `${category.shortName.toLowerCase()} digital` : "imprimible digital";
  const price = product.price ? `Desde $${product.price.toLocaleString("es-AR")}.` : "";
  return `${name}${themePart}: ${catPart} personalizado con el nombre del chico o la chica. Descarga al instante, imprimís las veces que necesites. ${price} Hecho a mano por el equipo de Tematibox.`.trim();
}

export function seoKeywords(product: RealProduct, category?: DigitalCategoryMeta, theme?: ThemeData): string[] {
  const base = [
    "imprimible personalizado",
    "imprimible con nombre",
    "descarga al instante",
    "hecho a mano",
    "argentina",
  ];
  if (category) {
    base.push(
      `${category.shortName.toLowerCase()} personalizadas`,
      `${category.shortName.toLowerCase()} con nombre`,
      `${category.name.toLowerCase()} digitales`
    );
  }
  if (theme) {
    base.push(
      `${category?.shortName.toLowerCase() || "imprimible"} ${theme.name.toLowerCase()}`,
      `${theme.name.toLowerCase()} imprimible`,
      `${theme.name.toLowerCase()} personalizado`
    );
  }
  return base;
}
