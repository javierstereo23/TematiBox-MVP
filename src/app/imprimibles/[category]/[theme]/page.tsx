import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  digitalCategories,
  themes,
  getDigitalCategory,
  getThemeBySlug,
} from "@/data/themes";
import { getProductsByCategoryAndTheme } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  const params: { category: string; theme: string }[] = [];
  for (const cat of digitalCategories) {
    for (const theme of themes) {
      params.push({ category: cat.id, theme: theme.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; theme: string }>;
}) {
  const { category, theme: themeSlug } = await params;
  const cat = getDigitalCategory(category);
  const theme = getThemeBySlug(themeSlug);
  if (!cat || !theme) return { title: "Imprimible no encontrado" };
  return {
    title: `${cat.name} ${theme.name} personalizados | Tematibox`,
    description: `${cat.description} Personalizados con el nombre. Tema ${theme.name}.`,
    openGraph: { images: [theme.image] },
  };
}

export default async function CategoryThemePage({
  params,
}: {
  params: Promise<{ category: string; theme: string }>;
}) {
  const { category, theme: themeSlug } = await params;
  const cat = getDigitalCategory(category);
  const theme = getThemeBySlug(themeSlug);
  if (!cat || !theme) notFound();

  const products = getProductsByCategoryAndTheme(category, themeSlug);

  return (
    <>
      <section className={`relative overflow-hidden py-16 md:py-20 px-6 bg-gradient-to-br ${theme.gradient}`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-5xl mx-auto text-center text-white">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/imprimibles" className="hover:text-white">Imprimibles</Link>
            <span>/</span>
            <Link href={`/imprimibles/${cat.id}`} className="hover:text-white">{cat.shortName}</Link>
            <span>/</span>
            <span className="text-white">{theme.name}</span>
          </nav>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl">
              <Image src={cat.iconImage} alt={cat.name} width={64} height={64} className="object-cover" />
            </div>
            <span className="text-5xl drop-shadow-lg">{theme.emoji}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow text-balance">
            {cat.name} de {theme.name}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">{cat.description}</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary">
              {products.length} {products.length === 1 ? "diseno" : "disenos"} de {theme.name} en {cat.shortName.toLowerCase()}
            </h2>
            <Link href={`/imprimibles/${cat.id}`} className="text-sm font-semibold text-primary hover:text-primary-dark">
              Ver todos los {cat.shortName.toLowerCase()} →
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 bg-bg-white rounded-3xl border border-border-light">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-text-primary font-semibold mb-2">Todavia no tenemos {cat.shortName.toLowerCase()} de {theme.name}</p>
              <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                Podemos armarlo a medida. Escribinos por WhatsApp y en 24hs te mandamos una propuesta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={`/imprimibles/${cat.id}`} className="btn-primary">
                  Ver todos los {cat.shortName.toLowerCase()}
                </Link>
                <Link href={`/temas/${theme.slug}`} className="btn-secondary">
                  Ver productos de {theme.name}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
