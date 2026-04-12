import { notFound } from "next/navigation";
import Link from "next/link";
import {
  digitalCategories,
  themes,
  getDigitalCategory,
  getThemeBySlug,
  getDigitalProduct,
} from "@/data/themes";
import { PersonalizerProduct } from "@/components/personalizer/PersonalizerProduct";

export function generateStaticParams() {
  const params: { category: string; theme: string }[] = [];
  for (const cat of digitalCategories) {
    for (const theme of themes) {
      params.push({ category: cat.id, theme: theme.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; theme: string }> }) {
  const { category, theme: themeSlug } = await params;
  const cat = getDigitalCategory(category);
  const theme = getThemeBySlug(themeSlug);
  if (!cat || !theme) return { title: "Imprimible no encontrado" };
  return {
    title: `${cat.name} ${theme.name} personalizada | Tematibox`,
    description: `${cat.description} Personalizada con el nombre. Tema ${theme.name}.`,
    openGraph: { images: [theme.image] },
  };
}

export default async function DigitalProductPage({
  params,
}: {
  params: Promise<{ category: string; theme: string }>;
}) {
  const { category, theme: themeSlug } = await params;
  const cat = getDigitalCategory(category);
  const theme = getThemeBySlug(themeSlug);
  const product = cat && theme ? getDigitalProduct(cat.id, theme.slug) : undefined;
  if (!cat || !theme || !product) notFound();

  return (
    <section className="py-10 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link href="/imprimibles" className="hover:text-primary">Imprimibles</Link>
          <span>/</span>
          <Link href={`/imprimibles/${cat.id}`} className="hover:text-primary">{cat.shortName}</Link>
          <span>/</span>
          <span className="text-text-primary">{theme.name}</span>
        </nav>
        <PersonalizerProduct category={cat} theme={theme} product={product} />
      </div>
    </section>
  );
}
