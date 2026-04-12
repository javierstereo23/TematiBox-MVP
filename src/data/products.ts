import raw from "./products.json";
import type { DigitalCategoryId } from "./themes";

export interface RealProduct {
  id: string;
  slug: string;
  title: string;
  image: string;
  mlPermalink: string | null;
  price: number | null;
  originalPrice: number | null;
  sold: number | null;
  rating: number | null;
  themes: string[];
  categories: string[];
  primaryTheme: string | null;
  primaryCategory: DigitalCategoryId | string;
}

export const products: RealProduct[] = raw as RealProduct[];

export function getProductBySlug(slug: string): RealProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByTheme(themeSlug: string): RealProduct[] {
  return products.filter((p) => p.themes.includes(themeSlug));
}

export function getProductsByCategory(categoryId: string): RealProduct[] {
  return products.filter((p) => p.categories.includes(categoryId));
}

export function getProductsByCategoryAndTheme(categoryId: string, themeSlug: string): RealProduct[] {
  return products.filter(
    (p) => p.categories.includes(categoryId) && p.themes.includes(themeSlug)
  );
}

export function getRelatedProducts(product: RealProduct, limit = 6): RealProduct[] {
  // Related = same primary theme OR same primary category, excluding itself
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.primaryTheme === product.primaryTheme ||
          p.primaryCategory === product.primaryCategory)
    )
    .sort((a, b) => {
      const aScore =
        (a.primaryTheme === product.primaryTheme ? 2 : 0) +
        (a.primaryCategory === product.primaryCategory ? 1 : 0);
      const bScore =
        (b.primaryTheme === product.primaryTheme ? 2 : 0) +
        (b.primaryCategory === product.primaryCategory ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function getProductCountByTheme(themeSlug: string): number {
  return products.filter((p) => p.themes.includes(themeSlug)).length;
}

export function getProductCountByCategory(categoryId: string): number {
  return products.filter((p) => p.categories.includes(categoryId)).length;
}

export function searchProducts(query: string): RealProduct[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter((p) => p.title.toLowerCase().includes(q));
}

export function getTrendingProducts(limit = 12): RealProduct[] {
  return products
    .filter((p) => p.sold !== null)
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8): RealProduct[] {
  // Products with theme + high engagement metrics
  return products
    .filter((p) => p.primaryTheme !== null && p.image)
    .sort((a, b) => {
      const aScore = (a.sold || 0) * 2 + (a.rating || 0) * 10;
      const bScore = (b.sold || 0) * 2 + (b.rating || 0) * 10;
      return bScore - aScore;
    })
    .slice(0, limit);
}
