"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { themes } from "@/data/themes";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";

const FEATURED_SLUGS = [
  "bluey",
  "stranger-things",
  "wicked",
  "disney-princesas",
  "minecraft",
  "futbol-argentina",
  "spider-man",
  "dragon-ball",
];

const TILTS = [-1.6, 1.2, -0.8, 1.4, -1.2, 0.8, -0.4, 1.0];
const TAPES = ["pink", "mustard", "sage", "blue", "cream", "pink", "mustard", "sage"] as const;

export function FeaturedThemes() {
  const featured = FEATURED_SLUGS.map((slug) => themes.find((t) => t.slug === slug)!);

  return (
    <section className="relative py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeader
              eyebrow="temas populares"
              title="Lo que le hace brillar los ojos."
              circleWord="brillar"
              circleColor="#E54CA2"
              tapeColor="pink"
            />
            <Link
              href="/temas"
              className="group inline-flex items-center gap-2 font-hand text-2xl text-primary hover:text-primary-dark"
            >
              ver los 23 temas →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featured.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: TILTS[i] }}
                className="relative"
              >
                <WashiTape
                  color={TAPES[i]}
                  rotate={TILTS[i] > 0 ? -18 : 18}
                  width={56}
                  height={18}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                />
                <Link href={`/temas/${t.slug}`} className="group block polaroid">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${t.gradient} opacity-15 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {t.logoImage && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/3 flex items-center justify-center">
                        <Image
                          src={t.logoImage}
                          alt={`${t.name} logo`}
                          width={240}
                          height={96}
                          className="w-full h-full object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
                        />
                      </div>
                    )}

                    {t.trending && (
                      <span
                        className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1"
                        style={{ transform: "rotate(6deg)", boxShadow: "0 2px 6px rgba(42,45,37,0.18)" }}
                      >
                        TENDENCIA
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-display text-white text-xl font-normal drop-shadow leading-tight">
                        {t.name}
                      </h3>
                      <p className="font-hand text-white/90 text-base drop-shadow leading-tight">
                        {t.ageRange}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
