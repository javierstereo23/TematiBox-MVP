"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { digitalCategories } from "@/data/themes";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";

const TILTS = [-1.4, 0.8, -0.6, 1.2, -0.4, 0.6, -1.0, 0.4, -0.8, 1.0, -0.6];
const TAPES = ["pink", "mustard", "sage", "blue", "cream"] as const;

export function DigitalShowcase() {
  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-60" />
      <div className="absolute inset-0 -z-10 paper-texture opacity-60 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="empezá por acá"
            title="Elegí tu categoría y armá tu pedido."
            circleWord="armá"
            circleColor="#E54CA2"
            tapeColor="mustard"
            align="center"
            description="11 categorías de imprimibles personalizables. Tocá la que necesitás y elegí el tema favorito del chico."
            className="mx-auto mb-14"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-7">
          {digitalCategories.map((cat, i) => {
            const tilt = TILTS[i % TILTS.length];
            const tape = TAPES[i % TAPES.length];
            return (
              <StaggerItem key={cat.id}>
                <motion.div
                  whileHover={{ y: -8, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ rotate: tilt }}
                  className="h-full relative"
                >
                  <WashiTape
                    color={tape}
                    rotate={tilt > 0 ? -20 : 20}
                    width={56}
                    height={18}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                  />
                  <Link
                    href={`/imprimibles/${cat.id}`}
                    className="group relative block h-full polaroid flex flex-col"
                  >
                    <div className="relative aspect-square bg-[#EFE9DC] rounded-[2px] overflow-hidden flex items-center justify-center">
                      <Image
                        src={cat.iconImage}
                        alt={cat.name}
                        width={160}
                        height={160}
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                      {cat.badge && (
                        <span
                          className="absolute top-2 right-2 bg-accent-pink text-white text-[10px] font-bold px-2.5 py-1"
                          style={{ transform: "rotate(5deg)", boxShadow: "0 2px 6px rgba(42,45,37,0.18)" }}
                        >
                          {cat.badge.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="pt-3 pb-1 px-1 flex-1 flex flex-col">
                      <h3 className="font-hand text-xl text-text-primary leading-tight group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                      <div className="mt-2 flex items-center justify-end">
                        <span className="font-hand text-base text-primary/80 group-hover:text-primary flex items-center gap-1">
                          ver temas →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
