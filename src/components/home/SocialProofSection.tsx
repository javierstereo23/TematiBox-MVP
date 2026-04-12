"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const QUOTES = [
  {
    quote: "Se la mostré y no lo podía creer. Dice que es la invitación más linda que vio.",
    who: "Lucía · mamá de Mía",
  },
  {
    quote: "Imprimimos todo en casa un domingo a la tarde. El cumple quedó hermoso y barato.",
    who: "Flor · mamá de Bauti y Juana",
  },
  {
    quote: "Las etiquetas del cole se las mostré a otras mamás y me preguntaron dónde las hice.",
    who: "Vero · mamá de Tomás",
  },
];

export function SocialProofSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-white via-bg to-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12 md:mb-14">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Mamás como vos
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              La vida real,{" "}
              <span className="font-display italic font-normal text-gradient-primary">recordada bonito.</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mt-4">
              Miles de momentos hechos imprimibles. Así se ven los cumples, cuadernos y tardes de colorear
              que armamos juntas.
            </p>
          </div>
        </Reveal>

        {/* Hero image con testimonio flotante */}
        <Reveal delay={0.05}>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl overflow-hidden mb-5 md:mb-6 aspect-[16/9] group"
          >
            <Image
              src="/images/social-proof/mom-daughter-phone.png"
              alt="Mamá compartiendo una invitación personalizada con su hija"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-auto md:max-w-lg text-white">
              <p className="text-lg md:text-2xl font-display italic font-normal leading-snug drop-shadow-lg mb-3">
                &ldquo;{QUOTES[0].quote}&rdquo;
              </p>
              <p className="text-sm font-semibold tracking-wide text-white/90 drop-shadow">
                {QUOTES[0].who}
              </p>
            </div>
          </motion.div>
        </Reveal>

        {/* Grid de 4 cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <Reveal delay={0.1}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
              <Image
                src="/images/social-proof/birthday-kids.png"
                alt="Cumple con amigas"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[13px] md:text-sm font-display italic leading-snug drop-shadow mb-1.5 line-clamp-4">
                  &ldquo;{QUOTES[1].quote}&rdquo;
                </p>
                <p className="text-[10px] md:text-xs font-semibold text-white/90 drop-shadow">{QUOTES[1].who}</p>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
              <Image
                src="/images/social-proof/kid-coloring.png"
                alt="Tarde de colorear en casa"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider drop-shadow">Para colorear</p>
                <p className="text-sm md:text-base font-semibold drop-shadow mt-1">Tarde de domingo</p>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
              <Image
                src="/images/social-proof/mom-park.png"
                alt="Mamá armando el cumple desde el celular"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[13px] md:text-sm font-display italic leading-snug drop-shadow mb-1.5 line-clamp-4">
                  &ldquo;{QUOTES[2].quote}&rdquo;
                </p>
                <p className="text-[10px] md:text-xs font-semibold text-white/90 drop-shadow">{QUOTES[2].who}</p>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.25}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
              <Image
                src="/images/social-proof/school-desk.png"
                alt="Útiles escolares personalizados"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider drop-shadow">Vuelta al cole</p>
                <p className="text-sm md:text-base font-semibold drop-shadow mt-1">Etiquetas listas</p>
              </div>
            </motion.div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-sm text-text-secondary mb-5">
              +2.000 mamás ya armaron su cumple o vuelta al cole con nosotras.
            </p>
            <Link href="/imprimibles" className="btn-primary !py-3.5 !px-7 !text-sm group">
              Empezá el tuyo
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
