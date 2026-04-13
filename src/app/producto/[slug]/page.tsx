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

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Producto no encontrado" };
  return {
    title: `${p.title} | Tematibox`,
    description: `${p.title}. Personalizable con el nombre del chico. Descarga al instante.`,
    openGraph: { images: [p.image] },
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
        {/* Scrapbook-style back link — prominent */}
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

        <nav className="flex items-center gap-2 font-hand text-base text-text-secondary mb-8 flex-wrap">
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
          <span>·</span>
          <span className="text-text-primary truncate max-w-[300px]">{product.title.replace(/imprimible/gi, "").trim().toLowerCase()}</span>
        </nav>
        <ProductDetail product={product} theme={theme} category={category} related={related} />
      </div>
    </section>
  );
}
