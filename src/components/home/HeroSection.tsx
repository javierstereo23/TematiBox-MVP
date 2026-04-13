"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/data/products";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { PolaroidFrame } from "@/components/scrapbook/PolaroidFrame";
import {
  HandCircle,
  HandArrow,
  HandStar,
  HandScribble,
} from "@/components/scrapbook/HandDrawn";
import { CREAM_BLUR } from "@/lib/images/placeholder";

// Three curated products as polaroids in the collage
const COLLAGE_SLUGS = [
  "imprimible-bluey-para-colorear-rusty-muffin-socks-pintar-95361749103",
  "imprimible-caratulas-escolares-joe-keery-djo-stranger-things-106593561870",
  "imprimible-la-sirenita-ariel-para-colorear-flounder-ursula-93478442588",
];

export function HeroSection() {
  const collage = COLLAGE_SLUGS
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <section className="relative overflow-hidden isolate" style={{ minHeight: "min(94vh, 920px)" }}>
      {/* Paper background: cream + grid + grain */}
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-90" />
      <div className="absolute inset-0 -z-10 paper-texture opacity-70 mix-blend-multiply" />

      {/* Decorative corner tapes at the top of the "page" */}
      <WashiTape
        color="pink"
        rotate={-14}
        width={180}
        height={34}
        className="absolute -top-2 left-[6%] z-20"
      />
      <WashiTape
        color="mustard"
        rotate={8}
        width={160}
        height={30}
        className="absolute -top-3 right-[8%] z-20"
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* LEFT — handwritten editorial copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative"
          >
            {/* Handwritten meta-note above title */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-10 h-10 relative">
                <HandStar className="w-full h-full" color="#E0B252" />
              </span>
              <p className="font-hand text-2xl text-primary/80 -rotate-1">
                hecho a mano, para el chico
              </p>
            </div>

            {/* Display title with circled word */}
            <h1 className="font-display text-[46px] sm:text-[62px] md:text-[78px] lg:text-[92px] font-light text-text-primary leading-[0.92] tracking-[-0.03em] mb-2 text-balance">
              El regalo que{" "}
              <span className="relative inline-block">
                <span className="italic font-normal text-accent-pink">se acuerda</span>
                <HandCircle
                  className="absolute -inset-x-4 -inset-y-3 w-[calc(100%+2rem)] h-[calc(100%+1.5rem)]"
                  color="#E54CA2"
                />
              </span>{" "}
              de su nombre.
            </h1>

            {/* Handwritten tagline right under title */}
            <p className="font-hand text-2xl md:text-3xl text-primary/80 mt-6 mb-8 -rotate-[0.5deg] pl-1">
              + llega en 30 segundos.
            </p>

            {/* Margin body copy on ruled paper feel */}
            <div className="relative max-w-[32rem] mb-10">
              <p className="text-base md:text-lg text-text-primary/75 leading-[1.7]">
                Invitaciones, etiquetas, libros para colorear, toppers, stickers. Personalizamos cada
                diseño con el nombre del chico o la chica, lo recibís por email y lo imprimís las
                veces que quieras. Tíos, padrinos, amigos, papás — sin app, sin espera.
              </p>
            </div>

            {/* CTA row — button with sticker-ish offset shadow + handwritten link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-14">
              <Link
                href="/imprimibles"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                style={{ boxShadow: "6px 6px 0 0 #E54CA2" }}
              >
                Ver los 412 diseños
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <div className="relative flex items-center gap-2">
                <HandArrow
                  className="w-10 h-6 -rotate-12"
                  color="#6B7257"
                  style={{ opacity: 0.7 }}
                />
                <Link
                  href="/imprimibles/invitaciones"
                  className="font-hand text-2xl text-primary hover:text-primary-dark transition-colors"
                >
                  o arrancá por una invitación
                </Link>
              </div>
            </div>

            {/* Proof strip — stamp + sticky notes */}
            <div className="flex flex-wrap items-center gap-5">
              {/* Rubber stamp */}
              <div className="stamp text-primary-dark border-primary-dark">HECHO A MANO · 2026</div>

              {/* Post-it style rating */}
              <div
                className="px-4 py-2 bg-[#FFF3A8] text-text-primary rotate-[-2.5deg]"
                style={{ boxShadow: "0 2px 8px rgba(42,45,37,0.14)" }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-normal">4.9</span>
                  <span className="text-amber-600 text-xs tracking-widest">★★★★★</span>
                </div>
                <p className="font-hand text-sm text-text-secondary leading-tight">
                  + de 2k familias
                </p>
              </div>

              {/* Scribbled badge */}
              <div className="relative flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="font-hand text-xl text-primary/80">
                  diseñadora conectada ahora
                </span>
                <HandScribble
                  className="absolute left-4 -bottom-2 w-24 h-3"
                  color="#10B981"
                  style={{ opacity: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — photo collage: 3 polaroids + tape + notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[540px] md:h-[600px]">
              {/* Polaroid 1 — main, front */}
              {collage[0] && (
                <div className="absolute top-0 left-[8%] w-[260px] md:w-[300px] z-30">
                  <WashiTape
                    color="cream"
                    rotate={-18}
                    width={90}
                    height={22}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-10"
                  />
                  <PolaroidFrame rotate={-3} caption="bluey · nombre personalizado">
                    <div className="relative aspect-[4/5] bg-[#EFE9DC]">
                      <Image
                        src={collage[0].image}
                        alt={collage[0].title}
                        fill
                        sizes="300px"
                        placeholder="blur"
                        blurDataURL={CREAM_BLUR}
                        className="object-cover"
                        priority
                      />
                    </div>
                  </PolaroidFrame>
                </div>
              )}

              {/* Polaroid 2 — behind, right */}
              {collage[1] && (
                <div className="absolute top-[18%] right-0 w-[220px] md:w-[250px] z-20">
                  <WashiTape
                    color="sage"
                    rotate={14}
                    width={70}
                    height={18}
                    className="absolute -top-1 right-4 z-10"
                  />
                  <PolaroidFrame rotate={5} caption="al cole con su nombre">
                    <div className="relative aspect-square bg-[#EFE9DC]">
                      <Image
                        src={collage[1].image}
                        alt={collage[1].title}
                        fill
                        sizes="250px"
                        placeholder="blur"
                        blurDataURL={CREAM_BLUR}
                        className="object-cover"
                      />
                    </div>
                  </PolaroidFrame>
                </div>
              )}

              {/* Polaroid 3 — small, bottom */}
              {collage[2] && (
                <div className="absolute bottom-0 left-0 w-[200px] md:w-[230px] z-10">
                  <WashiTape
                    color="mustard"
                    rotate={-12}
                    width={80}
                    height={20}
                    className="absolute -top-2 left-6 z-10"
                  />
                  <PolaroidFrame rotate={-6} caption="el libro para colorear">
                    <div className="relative aspect-square bg-[#EFE9DC]">
                      <Image
                        src={collage[2].image}
                        alt={collage[2].title}
                        fill
                        sizes="230px"
                        placeholder="blur"
                        blurDataURL={CREAM_BLUR}
                        className="object-cover"
                      />
                    </div>
                  </PolaroidFrame>
                </div>
              )}

              {/* Floating hand-written annotations */}
              <p className="absolute top-[40%] right-[-2%] font-hand text-2xl text-accent-pink -rotate-6 z-40">
                mi fav ↓
              </p>
              <HandArrow
                className="absolute top-[44%] right-[6%] w-20 h-14 rotate-[14deg] z-40"
                color="#E54CA2"
              />

              <p className="absolute bottom-[46%] right-[38%] font-hand text-xl text-primary/75 rotate-3 z-40">
                nuevo!
              </p>

              {/* Sparkle stars */}
              <HandStar
                className="absolute top-[5%] right-[32%] w-6 h-6 z-40"
                color="#E0B252"
              />
              <HandStar
                className="absolute bottom-[8%] right-[12%] w-4 h-4 z-40"
                color="#E54CA2"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Torn-paper bottom edge effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-4 -z-0 bg-[#FBF6EA]"
        style={{
          maskImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 16' preserveAspectRatio='none'><path d='M0 0 L1200 0 L1200 8 C 1100 14, 1000 4, 900 10 C 800 16, 700 4, 600 8 C 500 12, 400 2, 300 10 C 200 16, 100 4, 0 10 Z' fill='black'/></svg>\")",
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      />
    </section>
  );
}
