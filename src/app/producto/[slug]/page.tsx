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

  return (
    <section className="py-10 md:py-14 px-6">
      <ProductJsonLd product={product} theme={theme} category={category} />
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link href="/imprimibles" className="hover:text-primary">Imprimibles</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/imprimibles/${category.id}`} className="hover:text-primary">{category.shortName}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-text-primary truncate max-w-[300px]">{product.title}</span>
        </nav>
        <ProductDetail product={product} theme={theme} category={category} related={related} />
      </div>
    </section>
  );
}
