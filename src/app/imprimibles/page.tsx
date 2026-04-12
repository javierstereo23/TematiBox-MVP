import Link from "next/link";
import Image from "next/image";
import { digitalCategories, themes, type DigitalCategoryId } from "@/data/themes";
import { products } from "@/data/products";

export const metadata = {
  title: "Imprimibles personalizados",
  description:
    "Invitaciones digitales, libros para colorear, material escolar, cliparts y etiquetas personalizados con el nombre de tu hijo.",
};

// Pick a representative product image per category (the first one with good quality)
function getCategoryShowcase(catId: DigitalCategoryId | string): string | null {
  const match = products.find(
    (p) => p.primaryCategory === catId && p.image && p.themes.length > 0
  );
  return match?.image ?? null;
}

export default function ImprimiblesPage() {
  return (
    <>
      {/* HERO editorial con imagen lateral */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/social-proof/mom-daughter-phone.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/82 via-black/55 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl text-white">
            {/* Editorial eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-display italic text-white/75 text-sm">N.º 02</span>
              <span className="h-px w-10 bg-white/40" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/85">
                Catálogo de Imprimibles
              </span>
            </div>

            <h1
              className="font-display text-[44px] sm:text-[56px] md:text-[72px] font-light leading-[0.95] tracking-[-0.03em] mb-6 text-white"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
            >
              Imprimibles que se sienten{" "}
              <span className="italic font-normal">hechos a mano.</span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/92 leading-[1.6] max-w-xl mb-10"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              Del cumple al cuaderno del cole, cada archivo lo personalizamos con el nombre de tu hijo.
              Descarga en 30 segundos y lo imprimís las veces que necesites.
            </p>

            {/* Trust band — hairline dividers, Fraunces numerals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-7 border-t border-white/25 max-w-[36rem]">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-normal text-white">30s</span>
                <span className="text-[11px] uppercase tracking-wider text-white/80">
                  entrega al instante
                </span>
              </div>
              <div className="h-8 w-px bg-white/25 hidden sm:block" />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-normal text-white">2k+</span>
                <span className="text-[11px] uppercase tracking-wider text-white/80">
                  mamás confían
                </span>
              </div>
              <div className="h-8 w-px bg-white/25 hidden sm:block" />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-normal text-white">∞</span>
                <span className="text-[11px] uppercase tracking-wider text-white/80">
                  reimprimís las veces que quieras
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS con foto de producto real */}
      <section className="py-20 md:py-24 px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12 md:mb-14">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Elegí tu categoría
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              Explorá los{" "}
              <span className="font-display italic font-normal text-gradient-primary">
                {digitalCategories.length} tipos.
              </span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg mt-4">
              Cada categoría tiene diseños personalizables con el nombre del chico y los datos del evento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {digitalCategories.map((cat, idx) => {
              const showcase = getCategoryShowcase(cat.id);
              const isFeatured = idx === 0 || cat.badge === "Mejor valor";
              return (
                <Link
                  key={cat.id}
                  href={`/imprimibles/${cat.id}`}
                  className={`group relative rounded-3xl overflow-hidden bg-bg-white border border-border-light card-hover flex flex-col ${
                    isFeatured ? "sm:col-span-2 lg:col-span-1 lg:row-span-1" : ""
                  }`}
                >
                  {/* Product showcase (real image from catalog) */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF6EE]">
                    {showcase ? (
                      <Image
                        src={showcase}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={cat.iconImage}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-8"
                      />
                    )}

                    {/* Icon badge esquina */}
                    <div className="absolute top-3 left-3 w-11 h-11 rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-md border border-white/40">
                      <Image src={cat.iconImage} alt="" width={44} height={44} className="object-cover" />
                    </div>

                    {cat.badge && (
                      <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Copy */}
                  <div className="p-6 md:p-7 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-extrabold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                      {cat.longDescription.split(".")[0]}.
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Ver diseños</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* O entrá por tema */}
      <section className="py-20 md:py-24 px-6 bg-bg-white border-t border-border-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
                O entrá por tema
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary text-balance max-w-md">
                Lo que le hace{" "}
                <span className="font-display italic font-normal text-gradient-primary">
                  brillar los ojos.
                </span>
              </h2>
            </div>
            <Link
              href="/temas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark group self-start md:self-auto"
            >
              Ver los {themes.length} temas
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {themes.slice(0, 12).map((t) => (
              <Link
                key={t.slug}
                href={`/temas/${t.slug}`}
                className="group rounded-xl overflow-hidden bg-bg border border-border-light card-hover"
              >
                <div className="relative aspect-square">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${t.gradient} opacity-15 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-bold drop-shadow truncate">{t.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
