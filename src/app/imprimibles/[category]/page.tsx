import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  digitalCategories,
  getDigitalCategory,
  themes,
  formatPrice,
} from "@/data/themes";
import { getProductsByCategory, getProductCountByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return digitalCategories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getDigitalCategory(category);
  if (!cat) return { title: "Imprimibles" };
  const count = getProductCountByCategory(category);
  return {
    title: `${cat.name} (${count} disenos) | Tematibox`,
    description: cat.longDescription,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getDigitalCategory(category);
  if (!cat) notFound();

  const allProducts = getProductsByCategory(category);
  // Group by primary theme for theme filter chips
  const themeSlugsInCat = Array.from(
    new Set(allProducts.flatMap((p) => p.themes))
  ).filter((t) => themes.some((x) => x.slug === t));
  const themesInCat = themeSlugsInCat
    .map((slug) => themes.find((t) => t.slug === slug)!)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className={`relative overflow-hidden py-16 md:py-20 px-6 bg-gradient-to-br ${cat.gradient}`}>
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative max-w-5xl mx-auto text-center text-white">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/imprimibles" className="hover:text-white">Imprimibles</Link>
            <span>/</span>
            <span className="text-white">{cat.shortName}</span>
          </nav>
          <div className="w-24 h-24 mx-auto mb-5 rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl flex items-center justify-center">
            <Image src={cat.iconImage} alt={cat.name} width={96} height={96} className="object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow">{cat.name}</h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-5">{cat.longDescription}</p>
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-xs text-white/80 line-through">{formatPrice(cat.originalPrice)}</span>
            <span className="text-xl font-bold">desde {formatPrice(cat.price)}</span>
          </div>
        </div>
      </section>

      {themesInCat.length > 0 && (
        <section className="py-8 px-6 border-b border-border-light bg-bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 snap-x">
              <span className="text-xs font-bold text-text-tertiary tracking-widest uppercase whitespace-nowrap mr-2">
                Por tema:
              </span>
              <Link
                href={`/imprimibles/${cat.id}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold snap-start"
              >
                Todos ({allProducts.length})
              </Link>
              {themesInCat.slice(0, 14).map((t) => {
                const count = allProducts.filter((p) => p.themes.includes(t.slug)).length;
                return (
                  <Link
                    key={t.slug}
                    href={`/imprimibles/${cat.id}/${t.slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-bg border border-border-light text-sm font-semibold text-text-primary hover:border-primary hover:text-primary snap-start"
                  >
                    <span>{t.emoji}</span>
                    <span className="whitespace-nowrap">{t.name}</span>
                    <span className="text-xs text-text-tertiary">({count})</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-1">
                {allProducts.length} {allProducts.length === 1 ? "diseno" : "disenos"} disponibles
              </h2>
              <p className="text-text-secondary">Personalizables con el nombre del chico. Descarga al instante.</p>
            </div>
          </div>

          {allProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary mb-4">No hay productos aun en esta categoria.</p>
              <Link href="/imprimibles" className="btn-primary">Ver otras categorias</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {allProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-6 bg-bg-white border-t border-border-light">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-text-secondary mb-4">Tambien te puede interesar</p>
          <div className="flex flex-wrap justify-center gap-3">
            {digitalCategories
              .filter((c) => c.id !== cat.id)
              .slice(0, 8)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/imprimibles/${other.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg border border-border-light hover:border-primary hover:text-primary text-sm font-semibold transition-colors"
                >
                  <span className="relative w-6 h-6 rounded-md overflow-hidden bg-[#FAF6EE]">
                    <Image src={other.iconImage} alt="" fill sizes="24px" className="object-cover" />
                  </span>
                  <span>{other.shortName}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
