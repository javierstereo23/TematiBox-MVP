import Link from "next/link";
import Image from "next/image";
import { digitalCategories, themes, formatPrice } from "@/data/themes";

export const metadata = {
  title: "Imprimibles personalizados | Tematibox",
  description:
    "Invitaciones digitales, libros para colorear, material escolar, cliparts y etiquetas personalizados con el nombre de tu hijo.",
};

export default function ImprimiblesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28 px-6 bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-border-light shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-sm font-medium text-text-secondary">
              Descarga al instante · Personalizado con el nombre del chico
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary mb-5 leading-[1.05]">
            Imprimibles <span className="text-gradient-primary">personalizados</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Invitaciones, libros para colorear, material escolar, cliparts y etiquetas. Elegi el tipo, elegi el tema y
            personalizalo con el nombre, edad y datos del evento.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">Que necesitas?</h2>
          <p className="text-text-secondary mb-10">Elegi la categoria y despues el tema favorito.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/imprimibles/${cat.id}`}
                className="group rounded-3xl overflow-hidden bg-bg-white border border-border-light card-hover flex flex-col"
              >
                <div className={`h-44 bg-gradient-to-br ${cat.gradient} relative flex items-center justify-center`}>
                  <span className="text-7xl drop-shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </span>
                  {cat.badge && (
                    <span className="absolute top-4 right-4 bg-white/95 text-text-primary text-xs font-bold px-3 py-1 rounded-full shadow">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">{cat.description}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs text-text-tertiary line-through mr-2">
                        {formatPrice(cat.originalPrice)}
                      </span>
                      <span className="text-2xl font-bold text-text-primary">{formatPrice(cat.price)}</span>
                    </div>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explorar <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-bg-white border-t border-border-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-1">O entra por tema</h2>
              <p className="text-text-secondary">Empeza por lo que le gusta al chico y elegi el tipo despues.</p>
            </div>
            <Link href="/temas" className="hidden md:inline-flex text-sm font-semibold text-primary hover:text-primary-dark">
              Ver todos los temas →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {themes.slice(0, 12).map((t) => (
              <Link
                key={t.slug}
                href={`/temas/${t.slug}`}
                className="group rounded-xl overflow-hidden bg-bg border border-border-light card-hover"
              >
                <div className="relative aspect-square">
                  <Image src={t.image} alt={t.name} fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-bold drop-shadow truncate">{t.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/temas" className="md:hidden mt-6 inline-flex text-sm font-semibold text-primary">
            Ver todos los temas →
          </Link>
        </div>
      </section>
    </>
  );
}
