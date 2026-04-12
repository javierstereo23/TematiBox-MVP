"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/home/birthday-aesthetic.png" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/40 to-accent-pink/50" />
      </div>

      <Reveal>
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-widest uppercase mb-4 text-white/80"
          >
            Tu proximo cumple empieza aca
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-5 drop-shadow-lg text-balance">
            El cumple que tu hijo{" "}
            <span className="font-display italic font-normal">va a recordar siempre.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-10 leading-relaxed">
            Elegi el tema, personalizalo con su nombre y dejanos el resto a nosotros.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/temas" className="btn-primary !py-4 !px-8 !text-base !bg-white !text-primary hover:!bg-primary-bg group">
              Armar el cumple ahora
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/imprimibles" className="btn-secondary !py-4 !px-8 !text-base !bg-white/10 !border-white/40 !text-white backdrop-blur hover:!bg-white/20">
              Ver imprimibles
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/70">
            ★ 4.9 en Google · +2.000 cumples armados · Envio 24hs
          </p>
        </div>
      </Reveal>
    </section>
  );
}
