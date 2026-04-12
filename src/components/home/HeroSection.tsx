"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FeaturedSlider } from "./FeaturedSlider";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden isolate"
      style={{ minHeight: "min(92vh, 880px)" }}
    >
      {/* Ambient background: warm cream → primary tint with organic blobs */}
      <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 15% 18%, rgba(229,76,162,0.10), transparent 60%), radial-gradient(50% 50% at 85% 10%, rgba(245,144,66,0.11), transparent 65%), radial-gradient(65% 60% at 75% 90%, rgba(46,91,184,0.08), transparent 65%), linear-gradient(180deg, #FAF6EE 0%, #F5EFE3 60%, #EFE8DA 100%)",
          }}
        />
        {/* Decorative floating shapes */}
        <div className="absolute top-[12%] left-[8%] w-24 h-24 rounded-full border border-primary/20 hidden md:block" />
        <div className="absolute top-[60%] left-[6%] w-3 h-3 rounded-full bg-accent-pink/50 hidden md:block" />
        <div className="absolute bottom-[18%] right-[10%] w-40 h-40 rounded-full bg-accent-amber/10 blur-3xl" />
        <div className="noise" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* LEFT — editorial content */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Editorial eyebrow: magazine issue-label style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-display italic text-primary/70 text-sm">N.º 01</span>
              <span className="h-px w-10 bg-primary/30" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-text-secondary">
                Estudio de Imprimibles
              </span>
            </motion.div>

            {/* Display headline — Fraunces-forward */}
            <h1 className="font-display text-[44px] sm:text-[56px] md:text-[68px] lg:text-[82px] font-light text-text-primary leading-[0.95] tracking-[-0.03em] mb-7 text-balance">
              Imprimibles{" "}
              <span className="italic font-normal text-gradient-primary">hechos</span>{" "}
              con el nombre de tu hija.
            </h1>

            <p className="text-base md:text-lg text-text-secondary leading-[1.65] max-w-[34rem] mb-10 text-balance">
              Una diseñadora abre tu archivo, escribe el nombre a mano, lo pasa por una paleta que hicimos
              para vos. Lo recibís en 30 segundos y lo imprimís las veces que quieras.
            </p>

            {/* CTAs — primary + editorial text link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-14">
              <Link href="/imprimibles" className="btn-primary !py-4 !px-8 !text-base group">
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
              <Link
                href="/imprimibles/invitaciones"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
              >
                <span className="border-b border-text-primary/30 group-hover:border-primary pb-0.5">
                  O arrancá por una invitación
                </span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Trust band — magazine-style hairline dividers */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-7 border-t border-primary/15 max-w-[40rem]">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-normal text-text-primary">4.9</span>
                <div className="flex flex-col">
                  <span className="text-amber-500 text-xs leading-none tracking-widest">★★★★★</span>
                  <span className="text-[11px] uppercase tracking-wider text-text-secondary mt-1">
                    en Google
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-primary/15 hidden sm:block" />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-normal text-text-primary">2k+</span>
                <span className="text-[11px] uppercase tracking-wider text-text-secondary">
                  mamás confían
                </span>
              </div>
              <div className="h-8 w-px bg-primary/15 hidden sm:block" />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-normal text-text-primary">30s</span>
                <span className="text-[11px] uppercase tracking-wider text-text-secondary">
                  descarga instantánea
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — framed slider with editorial label */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Floating label top-right of slider */}
            <div className="absolute -top-4 right-0 z-10 bg-bg-white border border-border-light rounded-full px-4 py-2 shadow-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-text-primary">
                En vivo · ahora
              </span>
            </div>

            <div className="relative rounded-[32px] overflow-hidden bg-bg-white border border-border-light shadow-[0_40px_80px_-30px_rgba(42,45,37,0.18)] p-2">
              <FeaturedSlider />
            </div>

            {/* Footer caption */}
            <div className="flex items-center gap-3 mt-6 px-2">
              <span className="font-display italic text-primary/70 text-sm">selección</span>
              <span className="h-px flex-1 bg-primary/15" />
              <span className="text-[11px] tracking-[0.18em] uppercase text-text-secondary">
                Los 10 más pedidos
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
