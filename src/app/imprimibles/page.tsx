import Link from "next/link";
import Image from "next/image";
import { digitalCategories, themes, type DigitalCategoryId } from "@/data/themes";
import { products } from "@/data/products";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar } from "@/components/scrapbook/HandDrawn";

export const metadata = {
  title: "Imprimibles personalizados",
  description:
    "Invitaciones digitales, libros para colorear, material escolar, cliparts y etiquetas personalizados con el nombre del chico.",
};

const CAT_TILTS = [-1.4, 0.8, -0.6, 1.2, -0.4, 0.6, -1.0, 0.4, -0.8, 1.0, -0.6];
const CAT_TAPES = ["pink", "mustard", "sage", "blue", "cream"] as const;

function getCategoryShowcase(catId: DigitalCategoryId | string): string | null {
  const match = products.find(
    (p) => p.primaryCategory === catId && p.image && p.themes.length > 0
  );
  return match?.image ?? null;
}

export default function ImprimiblesPage() {
  return (
    <>
      {/* HERO scrapbook con foto de persona real como polaroid grande */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/55 to-black/30" />
        </div>

        {/* Corner tapes */}
        <WashiTape
          color="pink"
          rotate={-12}
          width={180}
          height={30}
          className="absolute -top-1 left-[6%] z-20"
        />
        <WashiTape
          color="mustard"
          rotate={8}
          width={150}
          height={28}
          className="absolute -top-2 right-[8%] z-20"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <HandStar className="w-6 h-6" color="#E0B252" />
              <p className="font-hand text-2xl md:text-3xl text-white/95 -rotate-1">
                el catálogo completo
              </p>
            </div>

            <h1
              className="font-display text-[46px] sm:text-[60px] md:text-[80px] font-light leading-[0.92] tracking-[-0.03em] mb-5 text-white text-balance"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
            >
              Imprimibles que se sienten{" "}
              <span className="italic font-normal text-accent-pink">hechos a mano.</span>
            </h1>

            <p
              className="font-hand text-2xl md:text-3xl text-white/95 -rotate-[0.5deg] mb-6"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              + llegan en 30 segundos.
            </p>

            <p
              className="text-lg md:text-xl text-white/90 leading-[1.65] max-w-xl mb-8"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              Del cumple al cuaderno del cole, cada archivo lo personalizamos con el nombre del
              chico o la chica. Descarga al instante, imprimís las veces que necesites.
            </p>

            {/* Post-it proof row */}
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="px-4 py-2 rotate-[-2deg]"
                style={{ background: "#FFF3A8", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl text-text-primary font-normal">30s</span>
                  <span className="font-hand text-sm text-text-primary/80">al instante</span>
                </div>
              </div>
              <div
                className="px-4 py-2 rotate-[1.5deg]"
                style={{ background: "#FFDBE6", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl text-text-primary font-normal">2k+</span>
                  <span className="font-hand text-sm text-text-primary/80">familias</span>
                </div>
              </div>
              <div
                className="px-4 py-2 rotate-[-1deg]"
                style={{ background: "#D9E8D3", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl text-text-primary font-normal">∞</span>
                  <span className="font-hand text-sm text-text-primary/80">reimprimís</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS como polaroids grandes */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
        <div className="absolute inset-0 -z-10 paper-grid opacity-60" />
        <div className="absolute inset-0 -z-10 paper-texture opacity-50 mix-blend-multiply" />

        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <WashiTape color="pink" rotate={-6} width={46} height={18} />
              <p className="font-hand text-xl md:text-2xl text-primary/80 -rotate-[0.5deg]">
                elegí tu categoría
              </p>
              <HandStar className="w-5 h-5 opacity-70" color="#E0B252" />
            </div>
            <h2 className="font-display text-[36px] md:text-[56px] font-light text-text-primary leading-[0.96] tracking-[-0.028em] text-balance">
              Explorá los{" "}
              <span className="italic font-normal text-gradient-primary">
                {digitalCategories.length} tipos.
              </span>
            </h2>
            <p className="text-text-primary/70 text-base md:text-lg mt-5 leading-[1.65]">
              Cada categoría tiene diseños personalizables con el nombre del chico o la chica y los
              datos del evento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {digitalCategories.map((cat, idx) => {
              const showcase = getCategoryShowcase(cat.id);
              const tilt = CAT_TILTS[idx % CAT_TILTS.length];
              const tape = CAT_TAPES[idx % CAT_TAPES.length];
              return (
                <div
                  key={cat.id}
                  style={{ transform: `rotate(${tilt}deg)` }}
                  className="relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-2"
                >
                  <WashiTape
                    color={tape}
                    rotate={tilt > 0 ? -18 : 18}
                    width={90}
                    height={22}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                  />
                  <Link href={`/imprimibles/${cat.id}`} className="group block polaroid">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
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

                      <div className="absolute top-3 left-3 w-11 h-11 rounded-[4px] overflow-hidden bg-white/90 backdrop-blur-sm shadow border border-white/50">
                        <Image src={cat.iconImage} alt="" width={44} height={44} className="object-cover" />
                      </div>

                      {cat.badge && (
                        <span
                          className="absolute top-3 right-3 bg-accent-pink text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5"
                          style={{ transform: "rotate(6deg)", boxShadow: "0 3px 8px rgba(0,0,0,0.2)" }}
                        >
                          {cat.badge}
                        </span>
                      )}
                    </div>

                    <div className="pt-5 pb-2 px-2">
                      <h3 className="font-display text-2xl md:text-3xl font-normal text-text-primary mb-1 leading-tight group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="font-hand text-lg text-primary/75 mb-3 -rotate-[0.5deg]">
                        personalizable con el nombre
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        {cat.longDescription.split(".")[0]}.
                      </p>
                      <span className="inline-flex items-center gap-2 font-hand text-xl text-primary group-hover:text-primary-dark">
                        ver diseños →
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* O entrá por tema */}
      <section className="relative py-24 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-white" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <WashiTape color="mustard" rotate={-6} width={46} height={18} />
                <p className="font-hand text-xl md:text-2xl text-primary/80 -rotate-[0.5deg]">
                  o entrá por tema
                </p>
              </div>
              <h2 className="font-display text-[32px] md:text-[48px] font-light text-text-primary leading-[0.96] tracking-[-0.025em] text-balance max-w-md">
                Lo que le hace{" "}
                <span className="italic font-normal text-gradient-primary">
                  brillar los ojos.
                </span>
              </h2>
            </div>
            <Link
              href="/temas"
              className="font-hand text-2xl text-primary hover:text-primary-dark"
            >
              ver los {themes.length} temas →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
            {themes.slice(0, 12).map((t, i) => {
              const tilt = CAT_TILTS[i % CAT_TILTS.length] * 0.8;
              const tape = CAT_TAPES[i % CAT_TAPES.length];
              return (
                <div
                  key={t.slug}
                  style={{ transform: `rotate(${tilt}deg)` }}
                  className="relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1"
                >
                  <WashiTape
                    color={tape}
                    rotate={tilt > 0 ? -20 : 20}
                    width={50}
                    height={14}
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20"
                  />
                  <Link href={`/temas/${t.slug}`} className="group block polaroid !p-2 !pb-6">
                    <div className="relative aspect-square overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="(max-width: 768px) 33vw, 16vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${t.gradient} opacity-15 mix-blend-multiply`} />
                    </div>
                    <p className="absolute bottom-1 left-0 right-0 text-center font-hand text-sm text-text-primary truncate px-2">
                      {t.name.toLowerCase()}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
