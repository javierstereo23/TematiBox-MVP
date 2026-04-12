import type { RealProduct } from "@/data/products";
import type { ThemeData, DigitalCategoryMeta } from "@/data/themes";

interface Props {
  product: RealProduct;
  theme?: ThemeData;
  category?: DigitalCategoryMeta;
}

export function ProductJsonLd({ product, theme, category }: Props) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tematibox.com";
  const productUrl = `${siteUrl}/producto/${product.slug}`;
  const imageUrl = product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: `${product.title}. Personalizable con nombre del chico. Descarga digital al instante.`,
    image: [imageUrl],
    sku: product.id,
    brand: { "@type": "Brand", name: "Tematibox" },
    category: category?.name || "Imprimibles digitales",
    ...(product.price && {
      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: "ARS",
        price: product.price,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "Tematibox" },
      },
    }),
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: Math.max(product.sold || 1, 1),
      },
    }),
  };

  const crumbs: { name: string; url: string }[] = [
    { name: "Inicio", url: `${siteUrl}/` },
    { name: "Imprimibles", url: `${siteUrl}/imprimibles` },
  ];
  if (category) crumbs.push({ name: category.shortName, url: `${siteUrl}/imprimibles/${category.id}` });
  if (theme) crumbs.push({ name: theme.name, url: `${siteUrl}/temas/${theme.slug}` });
  crumbs.push({ name: product.title, url: productUrl });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tematibox.com";
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tematibox",
    url: siteUrl,
    logo: `${siteUrl}/images/home/birthday-aesthetic.png`,
    sameAs: ["https://www.instagram.com/dbediciones"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54 9 11 5496-6031",
      contactType: "customer service",
      areaServed: "AR",
      availableLanguage: ["Spanish"],
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  );
}
