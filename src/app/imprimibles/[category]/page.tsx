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
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar } from "@/components/scrapbook/HandDrawn";

export function generateStaticParams() {
  return digitalCategories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getDigitalCategory(category);
  if (!cat) return { title: "Imprimibles" };
  const count = getProductCountByCategory(category);
  return {
    title: `${cat.name} (${count} diseños) | Tematibox`,
    description: cat.longDescription,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getDigitalCategory(category);
  if (!cat) notFound();

  const allProducts = getProductsByCategory(category);
  const themeSlugsInCat = Array.from(
    new Set(allProducts.flatMap((p) => p.themes))
  ).filter((t) => themes.some((x) => x.slug === t));
  const themesInCat = themeSlugsInCat
    .map((slug) => themes.find((t) => t.slug === slug)!)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className={`relative overflow-hidden py-24 md:py-32 px-6 bg-gradient-to-br ${cat.gradient}`}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 paper-texture opacity-40 mix-blend-multiply" />

        <WashiTape
          color="pink"
          rotate={-12}
          width={180}
          height={30}
          className="absolute -top-1 left-[8%] z-20"
        />
        <WashiTape
          color="mustard"
          rotate={10}
          width={150}
          height={28}
          className="absolute -top-2 right-[10%] z-20"
        />

        <div className="relative max-w-5xl mx-auto text-center text-white">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/75 mb-8 font-hand text-lg">
            <Link href="/" className="hover:text-white">inicio</Link>
            <span>·</span>
            <Link href="/imprimibles" className="hover:text-white">imprimibles</Link>
            <span>·</span>
            <span className="text-white">{cat.shortName.toLowerCase()}</span>
          </nav>

          <div className="flex items-center justify-center gap-3 mb-6">
            <HandStar className="w-6 h-6" color="#E0B252" />
            <p className="font-hand text-2xl md:text-3xl text-white/95 -rotate-1">
              {cat.shortName.toLowerCase()} · con su nombre
            </p>
            <HandStar className="w-6 h-6" color="#E54CA2" />
          </div>

          {/* Polaroid with icon */}
          <div
            className="inline-block polaroid mb-8"
            style={{ transform: "rotate(-2deg)", background: "#FFFDF8" }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#EFE9DC] rounded-[2px] overflow-hidden">
              <Image src={cat.iconImage} alt={cat.name} width={128} height={128} className="object-cover" />
            </div>
          </div>

          <h1
            className="font-display text-[46px] md:text-[72px] font-light leading-[0.92] tracking-[-0.03em] mb-5 text-balance"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
          >
            {cat.name}
          </h1>
          <p
            className="text-base md:text-lg text-white/92 max-w-2xl mx-auto mb-8 leading-[1.6]"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            {cat.longDescription}
          </p>
          <div
            className="inline-flex items-baseline gap-3 bg-[#FFF3A8] text-text-primary px-5 py-2.5"
            style={{ transform: "rotate(-2deg)", boxShadow: "0 6px 16px rgba(0,0,0,0.2)" }}
          >
            <span className="font-hand text-base text-text-primary/65 line-through">
              {formatPrice(cat.originalPrice)}
            </span>
            <span className="font-display text-2xl font-normal">
              desde {formatPrice(cat.price)}
            </span>
          </div>
        </div>
      </section>

      {themesInCat.length > 0 && (
        <section className="py-7 px-6 border-b border-text-primary/10 bg-[#FBF6EA] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 snap-x">
              <span className="font-hand text-lg text-primary/80 whitespace-nowrap mr-2">
                por tema:
              </span>
              <Link
                href={`/imprimibles/${cat.id}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-text-primary text-[#FBF6EA] text-sm font-semibold snap-start rounded-[4px]"
                style={{ boxShadow: "3px 3px 0 0 #E54CA2" }}
              >
                Todos ({allProducts.length})
              </Link>
              {themesInCat.slice(0, 14).map((t) => {
                const count = allProducts.filter((p) => p.themes.includes(t.slug)).length;
                return (
                  <Link
                    key={t.slug}
                    href={`/imprimibles/${cat.id}/${t.slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#FFFDF8] border border-text-primary/15 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary snap-start transition-colors"
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

      <section className="relative py-16 md:py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
        <div className="absolute inset-0 -z-10 paper-grid opacity-40" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-hand text-xl text-primary/70 -rotate-[0.5deg] mb-1">
                el catálogo
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">
                {allProducts.length} {allProducts.length === 1 ? "diseño" : "diseños"} disponibles
              </h2>
              <p className="text-text-secondary mt-2">
                Personalizables con el nombre. Descarga al instante.
              </p>
            </div>
          </div>

          {allProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-hand text-2xl text-text-secondary mb-6">
                aún no hay diseños en esta categoría
              </p>
              <Link
                href="/imprimibles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px]"
                style={{ boxShadow: "4px 4px 0 0 #E54CA2" }}
              >
                Ver otras categorías →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {allProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-white border-t border-text-primary/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-hand text-2xl text-primary/80 mb-6">
            también te puede interesar
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {digitalCategories
              .filter((c) => c.id !== cat.id)
              .slice(0, 8)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/imprimibles/${other.id}`}
                  className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-[4px] bg-[#FFFDF8] border border-text-primary/15 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="relative w-7 h-7 rounded-[3px] overflow-hidden bg-[#FAF6EE]">
                    <Image src={other.iconImage} alt="" fill sizes="28px" className="object-cover" />
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
