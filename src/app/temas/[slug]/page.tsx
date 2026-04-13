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
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar } from "@/components/scrapbook/HandDrawn";

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
      <section className="relative overflow-hidden py-20 md:py-28 px-6">
        <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
        <div className="absolute inset-0 -z-10 paper-grid opacity-55" />
        <div className="absolute inset-0 -z-10 paper-texture opacity-50 mix-blend-multiply" />

        <WashiTape
          color="pink"
          rotate={-12}
          width={180}
          height={30}
          className="absolute -top-1 left-[6%] z-20"
        />
        <WashiTape
          color="mustard"
          rotate={10}
          width={150}
          height={28}
          className="absolute -top-2 right-[8%] z-20"
        />

        <div className="relative max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 font-hand text-lg text-text-secondary mb-8">
            <Link href="/" className="hover:text-primary">inicio</Link>
            <span>·</span>
            <Link href="/temas" className="hover:text-primary">temas</Link>
            <span>·</span>
            <span className="text-text-primary">{theme.name.toLowerCase()}</span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
            {/* Theme photo as polaroid */}
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div
                className="relative polaroid"
                style={{ transform: "rotate(-3deg)" }}
              >
                <WashiTape
                  color="pink"
                  rotate={-10}
                  width={120}
                  height={24}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                />
                <div className="relative aspect-[4/5] w-[260px] md:w-[320px] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    fill
                    priority
                    sizes="320px"
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-15 mix-blend-multiply`} />
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-lg text-text-primary/80">
                  universo {theme.name.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="md:col-span-7 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 flex-wrap">
                <HandStar className="w-5 h-5" color="#E0B252" />
                {theme.popular && (
                  <span
                    className="px-3 py-1 bg-accent-pink text-white text-[11px] font-bold"
                    style={{ transform: "rotate(-3deg)", boxShadow: "0 2px 6px rgba(42,45,37,0.18)" }}
                  >
                    POPULAR
                  </span>
                )}
                {theme.trending && (
                  <span
                    className="px-3 py-1 bg-red-500 text-white text-[11px] font-bold"
                    style={{ transform: "rotate(-3deg)", boxShadow: "0 2px 6px rgba(42,45,37,0.18)" }}
                  >
                    TENDENCIA
                  </span>
                )}
                <p className="font-hand text-xl text-primary/80 -rotate-1">
                  tema {theme.name.toLowerCase()}
                </p>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl md:text-6xl">{theme.emoji}</span>
              </div>
              <h1 className="font-display text-[44px] md:text-[68px] font-light leading-[0.95] tracking-[-0.03em] mb-3 text-balance text-text-primary">
                {theme.name}
              </h1>
              <p className="text-lg text-text-primary/75 max-w-lg mb-5 leading-[1.6]">
                {theme.description}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span
                  className="px-4 py-2 font-hand text-base text-text-primary"
                  style={{ background: "#FFF3A8", transform: "rotate(-2deg)", boxShadow: "0 3px 10px rgba(42,45,37,0.15)" }}
                >
                  {theme.ageRange}
                </span>
                <span
                  className="px-4 py-2 font-hand text-base text-text-primary"
                  style={{ background: "#FFDBE6", transform: "rotate(1.5deg)", boxShadow: "0 3px 10px rgba(42,45,37,0.15)" }}
                >
                  {themeProducts.length} imprimibles listos
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {themeProducts.length > 0 ? (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
          <div className="absolute inset-0 -z-10 paper-grid opacity-40" />

          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="font-hand text-xl text-primary/70 -rotate-[0.5deg] mb-1">
                descarga al instante
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-normal text-text-primary mb-2">
                Imprimibles de{" "}
                <span className="italic text-gradient-primary">{theme.name}</span>
              </h2>
              <p className="text-text-secondary max-w-xl">
                {themeProducts.length} diseños personalizables con el nombre del chico o la chica,
                edad y datos del evento.
              </p>
            </div>

            {catsWithProducts.map((cat) => {
              const items = byCategory.get(cat.id) || [];
              return (
                <div key={cat.id} className="mb-16">
                  <div className="flex items-end justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="polaroid !p-2 !pb-2"
                        style={{ transform: "rotate(-3deg)" }}
                      >
                        <div className="w-12 h-12 rounded-[2px] overflow-hidden bg-[#EFE9DC]">
                          <Image
                            src={cat.iconImage}
                            alt={cat.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-normal text-text-primary leading-tight">
                          {cat.name}
                        </h3>
                        <p className="font-hand text-base text-primary/70 -rotate-[0.5deg]">
                          {items.length} {items.length === 1 ? "diseño" : "diseños"}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/imprimibles/${cat.id}/${theme.slug}`}
                      className="font-hand text-xl text-primary hover:text-primary-dark whitespace-nowrap"
                    >
                      ver todos →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {items.slice(0, 4).map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}

            {catsEmpty.length > 0 && (
              <div className="mt-12 pt-10 border-t border-text-primary/15">
                <p className="font-hand text-2xl text-primary/75 mb-5 -rotate-[0.5deg]">
                  más categorías para {theme.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {catsEmpty.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/imprimibles/${cat.id}/${theme.slug}`}
                      className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-[4px] bg-[#FFFDF8] border border-text-primary/15 text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary"
                    >
                      <span className="relative w-7 h-7 rounded-[3px] overflow-hidden bg-[#FAF6EE]">
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
        <section className="py-24 px-6 bg-[#FBF6EA]">
          <div
            className="polaroid max-w-2xl mx-auto text-center py-12"
            style={{ transform: "rotate(-1.2deg)" }}
          >
            <span className="text-6xl mb-4 block">🧩</span>
            <h2 className="font-display text-3xl font-normal text-text-primary mb-3">
              Todavía no tenemos imprimibles de {theme.name}
            </h2>
            <p className="text-text-secondary mb-8 px-4">
              Escribinos y armamos una propuesta a medida.
            </p>
            <Link
              href="/imprimibles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px]"
              style={{ boxShadow: "5px 5px 0 0 #E54CA2" }}
            >
              Ver todos los imprimibles →
            </Link>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-20 px-6 bg-white border-t border-text-primary/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <HandStar className="w-5 h-5" color="#E0B252" />
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">
                Otros temas que te pueden gustar
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {related.map((t, i) => {
                const tilt = [-1.2, 0.8, -0.6, 1.0][i % 4];
                const tape = (["pink", "mustard", "sage", "blue"] as const)[i % 4];
                return (
                  <div
                    key={t.slug}
                    style={{ transform: `rotate(${tilt}deg)` }}
                    className="relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1"
                  >
                    <WashiTape
                      color={tape}
                      rotate={tilt > 0 ? -18 : 18}
                      width={60}
                      height={16}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                    />
                    <Link href={`/temas/${t.slug}`} className="group block polaroid">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-3 pb-1 px-1">
                        <h3 className="font-display text-xl font-normal text-text-primary leading-tight group-hover:text-primary transition-colors">
                          {t.name}
                        </h3>
                        <p className="font-hand text-base text-primary/70 -rotate-[0.5deg] line-clamp-1">
                          {t.description.split(".")[0]}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
