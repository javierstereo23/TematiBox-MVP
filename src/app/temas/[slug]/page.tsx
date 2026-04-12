import { notFound } from "next/navigation";
import Link from "next/link";
import { themes, getThemeBySlug, getCombosByTheme } from "@/data/themes";
import { ComboCard } from "@/components/ComboCard";

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) return { title: "Tema no encontrado" };
  return {
    title: `${theme.name} - Combos tematicos | Tematibox`,
    description: theme.description,
  };
}

export default async function ThemeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);
  if (!theme) notFound();

  const allCombos = getCombosByTheme(slug);
  const physicalCombos = allCombos.filter((c) => c.type !== "digital");
  const digitalCombos = allCombos.filter((c) => c.type === "digital");
  const related = themes.filter((t) => t.category === theme.category && t.slug !== theme.slug).slice(0, 3);

  return (
    <>
      <section className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} py-16 md:py-24 px-6`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/temas" className="hover:text-white transition-colors">Temas</Link>
            <span>/</span>
            <span className="text-white/90">{theme.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <span className="text-7xl md:text-8xl">{theme.emoji}</span>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                {theme.popular && <span className="badge-popular">Popular</span>}
                {theme.trending && <span className="inline-block px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold">Tendencia</span>}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">{theme.name}</h1>
              <p className="text-lg text-white/80 max-w-lg mb-4">{theme.description}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90">{theme.ageRange}</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90">{allCombos.length} combos disponibles</span>
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
                <ComboCard key={combo.id} combo={combo} themeName={theme.name} themeEmoji={theme.emoji} themeGradient={theme.gradient} />
              ))}
            </div>
          </div>
        </section>
      )}

      {digitalCombos.length > 0 && (
        <section className="py-16 px-6 bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="inline-block text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full mb-3">DIGITAL . DESCARGA INSTANTANEA</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">Imprimibles</h2>
              <p className="text-text-secondary max-w-xl">Kit digital en PDF: libro para colorear, cotillon imprimible, banderines y actividades.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {digitalCombos.map((combo) => (
                <ComboCard key={combo.id} combo={combo} themeName={theme.name} themeEmoji={theme.emoji} themeGradient={theme.gradient} />
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 px-6 bg-bg-white border-t border-border-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extrabold text-text-primary mb-8">Otros temas que te pueden gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t) => (
                <Link key={t.slug} href={`/temas/${t.slug}`} className="group flex items-center gap-4 p-5 rounded-2xl bg-bg border border-border-light hover:border-primary/30 transition-all card-hover">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-3xl">{t.emoji}</span>
                  </div>
                  <div>
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
