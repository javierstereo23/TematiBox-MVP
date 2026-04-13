"use client";

import Link from "next/link";
import Image from "next/image";
import { digitalCategories, type DigitalCategoryId, formatPrice } from "@/data/themes";
import { products } from "@/data/products";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";

const TILTS = [-1.4, 0.8, -0.6, 1.2, -0.4, 0.6, -1.0, 0.4, -0.8, 1.0, -0.6];
const TAPES = ["pink", "mustard", "sage", "blue", "cream"] as const;

function getCategoryShowcase(catId: DigitalCategoryId | string): string | null {
  const match = products.find(
    (p) => p.primaryCategory === catId && p.image && p.themes.length > 0
  );
  return match?.image ?? null;
}

export function DigitalShowcase() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-60" />
      <div className="absolute inset-0 -z-10 paper-texture opacity-50 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="elegí tu categoría"
            title={`Explorá los ${digitalCategories.length} tipos.`}
            circleWord={String(digitalCategories.length)}
            circleColor="#E54CA2"
            tapeColor="pink"
            align="center"
            description="Cada categoría tiene diseños personalizables con el nombre del chico o la chica y los datos del evento."
            className="mx-auto mb-16"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {digitalCategories.map((cat, idx) => {
            const showcase = getCategoryShowcase(cat.id);
            const tilt = TILTS[idx % TILTS.length];
            const tape = TAPES[idx % TAPES.length];
            return (
              <StaggerItem key={cat.id}>
                <div
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
                        <Image
                          src={cat.iconImage}
                          alt=""
                          width={44}
                          height={44}
                          className="object-cover"
                        />
                      </div>

                      {cat.badge && (
                        <span
                          className="absolute top-3 right-3 bg-accent-pink text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5"
                          style={{
                            transform: "rotate(6deg)",
                            boxShadow: "0 3px 8px rgba(42,45,37,0.2)",
                          }}
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
                      <div className="flex items-end justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          {cat.originalPrice && (
                            <span className="font-hand text-sm text-text-tertiary line-through">
                              {formatPrice(cat.originalPrice)}
                            </span>
                          )}
                          <span className="font-display text-xl font-medium text-text-primary leading-none">
                            desde {formatPrice(cat.price)}
                          </span>
                        </div>
                        <span className="font-hand text-lg text-primary group-hover:text-primary-dark">
                          ver →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
