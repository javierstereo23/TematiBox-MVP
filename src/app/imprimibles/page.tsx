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
      {/* HERO con imagen de persona real */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs font-semibold mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              <span>DESCARGA AL INSTANTE · CON TU NOMBRE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] mb-5 drop-shadow-lg">
              Imprimibles que se sienten{" "}
              <span className="font-display italic font-normal">hechos a mano.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg drop-shadow mb-8">
              Del cumple al cuaderno del cole, cada archivo lo personalizamos con el nombre de tu hijo. Descarga en 30 segundos y lo imprimís las veces que necesites.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/90">Entrega en 30 segundos</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/90">+2.000 mamás confían</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/90">Imprimís las veces que quieras</span>
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
