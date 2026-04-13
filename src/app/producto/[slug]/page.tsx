import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { getThemeBySlug, getDigitalCategory } from "@/data/themes";
import { ProductDetail } from "@/components/personalizer/ProductDetail";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { cleanTitle, seoTitle, seoDescription, seoKeywords } from "@/lib/seo/product";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Producto no encontrado" };
  const category = getDigitalCategory(p.primaryCategory);
  const theme = p.primaryTheme ? getThemeBySlug(p.primaryTheme) : undefined;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tematibox.com";
  const ogImg = p.image.startsWith("http") ? p.image : `${siteUrl}${p.image}`;
  return {
    title: seoTitle(p, category),
    description: seoDescription(p, category, theme),
    keywords: seoKeywords(p, category, theme),
    alternates: { canonical: `${siteUrl}/producto/${p.slug}` },
    openGraph: {
      type: "website",
      title: seoTitle(p, category),
      description: seoDescription(p, category, theme),
      images: [{ url: ogImg, width: 1200, height: 1200, alt: cleanTitle(p.title) }],
      locale: "es_AR",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle(p, category),
      description: seoDescription(p, category, theme),
      images: [ogImg],
    },
  };
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const theme = product.primaryTheme ? getThemeBySlug(product.primaryTheme) : undefined;
  const category = getDigitalCategory(product.primaryCategory);
  const related = getRelatedProducts(product, 6);

  const backHref = category
    ? `/imprimibles/${category.id}`
    : theme
      ? `/temas/${theme.slug}`
      : "/imprimibles";
  const backLabel = category
    ? category.shortName.toLowerCase()
    : theme
      ? theme.name.toLowerCase()
      : "imprimibles";

  return (
    <section className="py-10 md:py-14 px-6">
      <ProductJsonLd product={product} theme={theme} category={category} />
      <div className="max-w-6xl mx-auto">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-hand text-xl text-primary hover:text-primary-dark mb-6 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          volver a {backLabel}
        </Link>

        <nav className="flex items-center gap-2 font-hand text-base text-text-secondary mb-8 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">inicio</Link>
          <span>·</span>
          <Link href="/imprimibles" className="hover:text-primary">imprimibles</Link>
          {category && (
            <>
              <span>·</span>
              <Link href={`/imprimibles/${category.id}`} className="hover:text-primary">
                {category.shortName.toLowerCase()}
              </Link>
            </>
          )}
          {theme && (
            <>
              <span>·</span>
              <Link href={`/temas/${theme.slug}`} className="hover:text-primary">
                {theme.name.toLowerCase()}
              </Link>
            </>
          )}
          <span>·</span>
          <span className="text-text-primary truncate max-w-[300px]">
            {cleanTitle(product.title).toLowerCase()}
          </span>
        </nav>
        <ProductDetail product={product} theme={theme} category={category} related={related} />
      </div>
    </section>
  );
}
