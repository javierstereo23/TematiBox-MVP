"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % ROTATING.length), 4500);
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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-white/70 to-pink-50/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
      </motion.div>

      <div className="noise" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-border-light shadow-sm mb-7">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-text-secondary tracking-wide">
              Tematibox Digital · Descarga al instante · +2.000 mamas confian
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold text-text-primary leading-[0.95] tracking-tight mb-6 text-balance">
            Imprimibles personalizados,{" "}
            <span className="font-display italic font-normal text-gradient-primary">al instante.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mb-10 text-balance">
            Invitaciones, etiquetas, libros para colorear y material escolar con el nombre personalizado. De Bluey a
            Stranger Things. Descarga en 30 segundos, imprimis las veces que quieras.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
            <Link href="/imprimibles" className="btn-primary !py-4 !px-8 !text-base group">
              Ver todos los imprimibles
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/imprimibles/invitaciones" className="btn-secondary !py-4 !px-8 !text-base group">
              💌 Invitaciones digitales
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
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
              <span>396 disenos personalizables</span>
            </div>
          </div>
        </motion.div>

        {/* indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {ROTATING.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Imagen ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-1.5 bg-text-tertiary/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
