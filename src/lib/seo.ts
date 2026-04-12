const BASE_URL = 'https://dynamo.tech';
const locales = ['es', 'en', 'fr', 'pt'] as const;

export function getAlternates(path: string) {
  // path should be like '/journeys', '/blog', '' for home, etc. (without locale prefix)
  return {
    canonical: `${BASE_URL}${path ? path : '/'}`,
    languages: Object.fromEntries(
      locales.map(loc => [loc, `${BASE_URL}/${loc}${path}`])
    ) as Record<string, string>,
  };
}
