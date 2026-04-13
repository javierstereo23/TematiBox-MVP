"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar, HandArrow } from "@/components/scrapbook/HandDrawn";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/home/birthday-aesthetic.png" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-accent-pink/25 mix-blend-overlay" />
      </div>

      {/* Corner tapes */}
      <WashiTape
        color="pink"
        rotate={-12}
        width={180}
        height={32}
        className="absolute -top-1 left-[8%] z-10"
      />
      <WashiTape
        color="mustard"
        rotate={10}
        width={150}
        height={28}
        className="absolute -top-2 right-[10%] z-10"
      />

      <Reveal>
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HandStar className="w-6 h-6" color="#E0B252" />
            <p className="font-hand text-2xl md:text-3xl text-white/90 -rotate-1">
              tu próximo cumple empieza acá
            </p>
            <HandStar className="w-6 h-6" color="#E54CA2" />
          </div>

          <h2
            className="font-display text-[40px] md:text-[64px] font-light leading-[0.95] tracking-[-0.03em] mb-6 text-balance text-white"
            style={{
              WebkitTextStroke: "0.7px rgba(42,45,37,0.45)",
              textShadow:
                "0 2px 18px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.8)",
            }}
          >
            Personalizá el imprimible{" "}
            <span className="italic font-normal">perfecto para él.</span>
          </h2>

          <p
            className="text-lg md:text-xl text-white/92 max-w-xl mx-auto mb-10 leading-[1.6]"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            Elegí el tema, poné el nombre y descargás al instante. Imprimís las veces que necesites.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/imprimibles"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-text-primary font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ boxShadow: "6px 6px 0 0 #E54CA2" }}
            >
              Ver los 412 imprimibles
              <HandArrow className="w-5 h-3 opacity-70" color="currentColor" />
            </Link>
            <Link
              href="/imprimibles/invitaciones"
              className="font-hand text-2xl text-white hover:text-white/80 underline decoration-dotted underline-offset-4"
            >
              o empezá por invitaciones
            </Link>
          </div>

          <p className="mt-10 font-hand text-xl text-white/85">
            ★ 4.9 en Google · + de 2k familias · descarga al instante
          </p>
        </div>
      </Reveal>
    </section>
  );
}
