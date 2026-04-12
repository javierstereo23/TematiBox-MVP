import type { MetadataRoute } from "next";
import { themes, digitalCategories } from "@/data/themes";
import { products } from "@/data/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tematibox.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/temas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/imprimibles`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const themeRoutes: MetadataRoute.Sitemap = themes.map((t) => ({
    url: `${SITE_URL}/temas/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = digitalCategories.map((c) => ({
    url: `${SITE_URL}/imprimibles/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryThemeRoutes: MetadataRoute.Sitemap = [];
  for (const c of digitalCategories) {
    for (const t of themes) {
      categoryThemeRoutes.push({
        url: `${SITE_URL}/imprimibles/${c.id}/${t.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/producto/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...themeRoutes, ...categoryRoutes, ...categoryThemeRoutes, ...productRoutes];
}
