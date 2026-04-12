import type { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/data/blog-posts';

const locales = ['es', 'en', 'fr', 'pt'];
const routes = [
  '',
  '/journeys',
  '/cvm',
  '/vas',
  '/sat-push',
  '/ota-sim',
  '/integraciones',
  '/seguridad',
  '/sobre-nosotros',
  '/casos-de-exito',
  '/blog',
  '/contacto',
  '/careers',
  '/legal',
  '/studio',
  '/one-pager-cvm',
  '/one-pager-vas',
  '/one-pager-smb',
  '/roi-calculator',
  '/qualify',
  '/privacy-policy',
  '/one-pager',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const locale of locales) {
    for (const route of routes) {
      const isHighPriority = route === '';
      const isBlog = route === '/blog';
      entries.push({
        url: `https://dynamo.tech/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: isBlog ? 'weekly' : 'monthly',
        priority: isHighPriority ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `https://dynamo.tech/${l}${route}`])
          ),
        },
      });
    }
  }

  // Blog post pages
  const blogSlugs = getAllBlogSlugs();
  for (const locale of locales) {
    for (const slug of blogSlugs) {
      entries.push({
        url: `https://dynamo.tech/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `https://dynamo.tech/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
