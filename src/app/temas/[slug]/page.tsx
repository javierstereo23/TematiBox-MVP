import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  themes,
  getThemeBySlug,
  getCombosByTheme,
  digitalCategories,
  formatPrice,
} from "@/data/themes";
import { ComboCard } from "@/components/ComboCard";

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) return { title: "Tema no encontrado" };
  return {
    title: `${theme.name} - Combos e imprimibles | Tematibox`,
    description: theme.description,
    openGraph: {
      title: `${theme.name} | Tematibox`,
      description: theme.description,
      images: [theme.image],
    },
  };
}

export default async function ThemeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) notFound();

  const physicalCombos = getCombosByTheme(slug);
  const related = themes.filter((t) => t.category === theme.category && t.slug !== theme.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-24 px-6">
        <div className="absolute inset-0">
          <Image src={theme.image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-40 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/temas" className="hover:text-white transition-colors">
              Temas
            </Link>
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
                  {physicalCombos.length + digitalCategories.length} opciones
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {physicalCombos.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">Combos fisicos</h2>
              <p className="text-text-secondary">Recibi todo listo en tu casa. Envio gratis en CABA y GBA.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {physicalCombos.map((combo) => (
                <ComboCard
                  key={combo.id}
                  combo={combo}
                  themeName={theme.name}
                  themeEmoji={theme.emoji}
                  themeGradient={theme.gradient}
                  themeImage={theme.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6 bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full mb-3">
              DIGITAL . DESCARGA AL INSTANTE
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              Imprimibles personalizados de {theme.name}
            </h2>
            <p className="text-text-secondary max-w-xl">
              Cada uno se personaliza con el nombre, edad y datos del evento. Elegi el que necesites.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {digitalCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/imprimibles/${cat.id}/${theme.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-bg-white border border-border-light card-hover"
              >
                <div className={`h-32 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative`}>
                  <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </span>
                  {cat.badge && (
                    <span className="absolute top-3 right-3 bg-white/95 text-text-primary text-xs font-bold px-2.5 py-1 rounded-full shadow">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-text-tertiary line-through mr-1.5">
                        {formatPrice(cat.originalPrice)}
                      </span>
                      <span className="text-lg font-bold text-text-primary">{formatPrice(cat.price)}</span>
                    </div>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1">
                      Personalizar
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 px-6 bg-bg-white border-t border-border-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extrabold text-text-primary mb-8">Otros temas que te pueden gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
