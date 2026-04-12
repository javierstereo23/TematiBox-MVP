"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { themes } from "@/data/themes";
import { Reveal } from "@/components/motion/Reveal";

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

export function FeaturedThemes() {
  const featured = FEATURED_SLUGS.map((slug) => themes.find((t) => t.slug === slug)!);

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <div>
              <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
                Temas populares
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance max-w-xl">
                Lo que te hace{" "}
                <span className="font-display italic font-normal text-gradient-primary">brillar.</span>
              </h2>
            </div>
            <Link
              href="/temas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark group"
            >
              Ver los 23 temas
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {featured.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.05}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                <Link
                  href={`/temas/${t.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-bg border border-border-light"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${t.gradient} opacity-15 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* licensed logo overlay (if available) */}
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
                      <span className="absolute top-3 right-3 inline-block px-2.5 py-1 rounded-full bg-red-500/95 text-white text-[10px] font-bold shadow">
                        TENDENCIA
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-lg font-extrabold drop-shadow mb-0.5">{t.name}</h3>
                      <p className="text-white/85 text-xs font-medium drop-shadow">{t.ageRange}</p>
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
