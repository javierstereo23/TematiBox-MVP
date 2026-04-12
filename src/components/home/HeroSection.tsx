"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedSlider } from "./FeaturedSlider";

const ROTATING = [
  { src: "/images/home/birthday-aesthetic.png", alt: "Mesa de cumple aesthetic" },
  { src: "/images/themes/bluey/cover.png", alt: "Cumple Bluey" },
  { src: "/images/home/school-flatlay.png", alt: "Utiles escolares" },
  { src: "/images/themes/disney-princesas/cover.png", alt: "Cumple princesas" },
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % ROTATING.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[92vh] flex items-center">
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        {ROTATING.map((img, i) => (
          <motion.div
            key={img.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-bg/90 via-bg/85 to-primary-bg/70 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </motion.div>

      <div className="noise" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT — content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-border-light shadow-sm mb-7">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-text-secondary tracking-wide">
                Diseñadoras reales personalizando en vivo · Entrega al instante
              </span>
            </div>

            <h1 className="text-[44px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary leading-[0.98] tracking-tight mb-6 text-balance">
              Imprimibles personalizados,{" "}
              <span className="font-display italic font-normal text-gradient-primary">al instante.</span>
            </h1>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mb-8 text-balance">
              Invitaciones, etiquetas, libros para colorear y material escolar con el nombre personalizado. De Bluey a
              Stranger Things. Descarga en 30 segundos, imprimís las veces que quieras.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              <Link href="/imprimibles" className="btn-primary !py-4 !px-8 !text-base group">
                Ver todos los imprimibles
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/imprimibles/invitaciones" className="btn-secondary !py-4 !px-8 !text-base group">
                Invitaciones digitales
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-amber-500">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="font-semibold text-text-primary">4.9</span>
                <span className="text-text-secondary">en Google</span>
              </div>
              <div className="w-px h-4 bg-border hidden sm:block" />
              <div className="flex items-center gap-2 text-text-secondary">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Descarga en 30 segundos</span>
              </div>
              <div className="w-px h-4 bg-border hidden sm:block" />
              <div className="flex items-center gap-2 text-text-secondary">
                <svg className="w-4 h-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>400+ diseños personalizables</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — product slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <FeaturedSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
