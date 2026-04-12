import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  digitalCategories,
  getDigitalCategory,
  themes,
  formatPrice,
} from "@/data/themes";

export function generateStaticParams() {
  return digitalCategories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getDigitalCategory(category);
  if (!cat) return { title: "Imprimibles" };
  return {
    title: `${cat.name} personalizadas | Tematibox`,
    description: cat.longDescription,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getDigitalCategory(category);
  if (!cat) notFound();

  return (
    <>
      <section className={`relative overflow-hidden py-20 px-6 bg-gradient-to-br ${cat.gradient}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-5xl mx-auto text-center text-white">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/imprimibles" className="hover:text-white">Imprimibles</Link>
            <span>/</span>
            <span className="text-white">{cat.shortName}</span>
          </nav>
          <div className="text-7xl mb-4">{cat.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">{cat.name}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">{cat.longDescription}</p>
          <div className="mt-6 inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20">
            <span className="text-sm text-white/80 line-through">{formatPrice(cat.originalPrice)}</span>
            <span className="text-2xl font-bold">{formatPrice(cat.price)}</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">Elegi el tema</h2>
          <p className="text-text-secondary mb-10">
            Cualquier tema se adapta a {cat.shortName.toLowerCase()}. Personalizable con nombre y edad.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {themes.map((t) => (
              <Link
                key={t.slug}
                href={`/imprimibles/${cat.id}/${t.slug}`}
                className="group rounded-2xl overflow-hidden bg-bg-white border border-border-light card-hover"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={t.image} alt={t.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${t.gradient} opacity-20 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{t.emoji}</span>
                  <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {t.ageRange}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">{t.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-text-primary">{formatPrice(cat.price)}</span>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1">
                      Personalizar <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-bg-white border-t border-border-light">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-text-secondary mb-4">Tambien te puede interesar</p>
          <div className="flex flex-wrap justify-center gap-3">
            {digitalCategories
              .filter((c) => c.id !== cat.id)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/imprimibles/${other.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg border border-border-light hover:border-primary hover:text-primary text-sm font-semibold transition-colors"
                >
                  <span>{other.emoji}</span>
                  <span>{other.shortName}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
