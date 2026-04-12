import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  themes,
  getThemeBySlug,
  digitalCategories,
} from "@/data/themes";
import { getProductsByTheme } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) return { title: "Tema no encontrado" };
  return {
    title: `${theme.name} | Imprimibles personalizados | Tematibox`,
    description: `Imprimibles personalizados de ${theme.name}. ${theme.description}`,
    openGraph: { title: `${theme.name} | Tematibox`, description: theme.description, images: [theme.image] },
  };
}

export default async function ThemeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) notFound();

  const themeProducts = getProductsByTheme(slug);

  // Group products by primary category
  const byCategory = new Map<string, typeof themeProducts>();
  for (const p of themeProducts) {
    const arr = byCategory.get(p.primaryCategory) || [];
    arr.push(p);
    byCategory.set(p.primaryCategory, arr);
  }
  const catsWithProducts = digitalCategories.filter((c) => byCategory.has(c.id));
  const catsEmpty = digitalCategories.filter((c) => !byCategory.has(c.id));

  const related = themes.filter((t) => t.category === theme.category && t.slug !== theme.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-24 px-6">
        <div className="absolute inset-0">
          <Image src={theme.image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-45 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/temas" className="hover:text-white transition-colors">Temas</Link>
            <span>/</span>
            <span className="text-white/95">{theme.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20 shadow-2xl">
              <span className="text-6xl md:text-7xl drop-shadow-lg">{theme.emoji}</span>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                {theme.popular && <span className="badge-popular">Popular</span>}
                {theme.trending && <span className="inline-block px-3 py-1 rounded-full bg-red-500/95 text-white text-xs font-bold">Tendencia</span>}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 drop-shadow-lg">{theme.name}</h1>
              <p className="text-lg text-white/90 max-w-lg mb-4">{theme.description}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm text-white font-medium">
                  {theme.ageRange}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm text-white font-medium">
                  {themeProducts.length} imprimibles personalizables
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {themeProducts.length > 0 ? (
        <section className="py-16 px-6 bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="inline-block text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full mb-3">
                DIGITAL · DESCARGA AL INSTANTE
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
                Imprimibles de {theme.name}
              </h2>
              <p className="text-text-secondary max-w-xl">
                {themeProducts.length} disenos personalizables con el nombre del chico, edad y datos del evento.
              </p>
            </div>

            {catsWithProducts.map((cat) => {
              const items = byCategory.get(cat.id) || [];
              return (
                <div key={cat.id} className="mb-12">
                  <div className="flex items-end justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-xl shadow`}>
                        {cat.emoji}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-extrabold text-text-primary">{cat.name}</h3>
                        <p className="text-xs text-text-secondary">{items.length} {items.length === 1 ? "diseno" : "disenos"}</p>
                      </div>
                    </div>
                    <Link
                      href={`/imprimibles/${cat.id}/${theme.slug}`}
                      className="text-sm font-semibold text-primary hover:text-primary-dark whitespace-nowrap"
                    >
                      Ver todos →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {items.slice(0, 4).map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}

            {catsEmpty.length > 0 && (
              <div className="mt-10 pt-10 border-t border-border-light">
                <p className="text-sm font-bold text-text-tertiary mb-4 tracking-wide uppercase">
                  Mas categorias para {theme.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {catsEmpty.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/imprimibles/${cat.id}/${theme.slug}`}
                      className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white border border-border-light text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary"
                    >
                      <span className="relative w-7 h-7 rounded-full overflow-hidden bg-[#FAF6EE]">
                        <Image src={cat.iconImage} alt="" fill sizes="28px" className="object-cover" />
                      </span>
                      <span>{cat.shortName}</span>
                      <span className="text-xs text-text-tertiary">(a medida)</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-6xl mb-4 block">🧩</span>
            <h2 className="text-2xl font-extrabold text-text-primary mb-3">
              Todavia no tenemos imprimibles de {theme.name}
            </h2>
            <p className="text-text-secondary mb-8">
              Escribinos y armamos una propuesta a medida.
            </p>
            <Link href="/imprimibles" className="btn-primary">Ver todos los imprimibles</Link>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 px-6 bg-bg-white border-t border-border-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extrabold text-text-primary mb-8">Otros temas que te pueden gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/temas/${t.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-bg border border-border-light hover:border-primary/30 transition-all card-hover"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="text-sm text-text-secondary line-clamp-1">{t.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
