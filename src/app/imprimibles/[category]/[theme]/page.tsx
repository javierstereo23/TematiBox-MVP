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
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar } from "@/components/scrapbook/HandDrawn";

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
      <section className="relative overflow-hidden py-20 md:py-24 px-6">
        <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
        <div className="absolute inset-0 -z-10 paper-grid opacity-55" />
        <div className="absolute inset-0 -z-10 paper-texture opacity-50 mix-blend-multiply" />

        <WashiTape
          color="pink"
          rotate={-12}
          width={160}
          height={28}
          className="absolute -top-1 left-[6%] z-20"
        />
        <WashiTape
          color="mustard"
          rotate={10}
          width={140}
          height={26}
          className="absolute -top-2 right-[8%] z-20"
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 font-hand text-lg text-text-secondary mb-8">
            <Link href="/" className="hover:text-primary">inicio</Link>
            <span>·</span>
            <Link href="/imprimibles" className="hover:text-primary">imprimibles</Link>
            <span>·</span>
            <Link href={`/imprimibles/${cat.id}`} className="hover:text-primary">{cat.shortName.toLowerCase()}</Link>
            <span>·</span>
            <span className="text-text-primary">{theme.name.toLowerCase()}</span>
          </nav>

          <div className="flex items-center justify-center gap-4 mb-6">
            <HandStar className="w-5 h-5" color="#E0B252" />
            <p className="font-hand text-xl md:text-2xl text-primary/80 -rotate-1">
              {cat.shortName.toLowerCase()} · tema {theme.name.toLowerCase()}
            </p>
            <HandStar className="w-5 h-5" color="#E54CA2" />
          </div>

          <div className="inline-flex items-center gap-3 mb-6">
            <div
              className="polaroid !p-2 !pb-2"
              style={{ transform: "rotate(-4deg)" }}
            >
              <div className="w-16 h-16 rounded-[2px] overflow-hidden bg-[#EFE9DC]">
                <Image src={cat.iconImage} alt={cat.name} width={64} height={64} className="object-cover" />
              </div>
            </div>
            <span className="text-4xl md:text-5xl rotate-[6deg]">{theme.emoji}</span>
          </div>

          <h1 className="font-display text-[36px] md:text-[56px] font-light leading-[0.95] tracking-[-0.03em] mb-3 text-balance text-text-primary">
            {cat.name} de{" "}
            <span className="italic font-normal text-gradient-primary">{theme.name}</span>
          </h1>
          <p className="text-base md:text-lg text-text-primary/75 max-w-2xl mx-auto leading-[1.6]">
            {cat.description}
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
        <div className="absolute inset-0 -z-10 paper-grid opacity-40" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="font-hand text-xl text-primary/70 -rotate-[0.5deg] mb-1">
                resultados
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary">
                {products.length} {products.length === 1 ? "diseño" : "diseños"} de {theme.name} en{" "}
                {cat.shortName.toLowerCase()}
              </h2>
            </div>
            <Link
              href={`/imprimibles/${cat.id}`}
              className="font-hand text-xl text-primary hover:text-primary-dark"
            >
              ver todos los {cat.shortName.toLowerCase()} →
            </Link>
          </div>

          {products.length === 0 ? (
            <div
              className="polaroid text-center mx-auto max-w-md py-10"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <p className="font-hand text-3xl text-text-primary/85 mb-3">
                aún no tenemos este combo
              </p>
              <p className="text-text-secondary text-sm mb-6 px-8">
                Podemos armarlo a medida. Escribinos por WhatsApp y en 24hs te mandamos una propuesta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                <Link
                  href={`/imprimibles/${cat.id}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px]"
                  style={{ boxShadow: "4px 4px 0 0 #E54CA2" }}
                >
                  Ver {cat.shortName.toLowerCase()}
                </Link>
                <Link
                  href={`/temas/${theme.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FFFDF8] border border-text-primary/20 text-text-primary font-semibold rounded-[4px]"
                >
                  Ver {theme.name}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
