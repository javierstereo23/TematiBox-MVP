"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandArrow } from "@/components/scrapbook/HandDrawn";

const CARDS = [
  {
    href: "/imprimibles/invitaciones",
    title: "Para el cumple",
    handNote: "la fiesta empieza acá",
    subtitle: "Invitaciones, toppers y cotillón",
    copy: "Invitaciones digitales, toppers para torta, banderines y souvenirs. Todo personalizado con el nombre del chico. Descargas al instante.",
    image: "/images/home/birthday-aesthetic.png",
    chip: "Digital · al instante",
    cta: "Ver imprimibles del cumple",
    rotate: -1.2,
    tape: "pink" as const,
    tapeRotate: -18,
  },
  {
    href: "/imprimibles/etiquetas",
    title: "Para el cole",
    handNote: "listo para el lunes",
    subtitle: "Etiquetas, escolares y cliparts",
    copy: "Etiquetas para carátulas, material escolar, flashcards educativas y cliparts para sublimar. Con el nombre del chico. Listos para imprimir.",
    image: "/images/home/school-flatlay.png",
    chip: "Digital · al instante",
    cta: "Ver imprimibles del cole",
    rotate: 1.0,
    tape: "blue" as const,
    tapeRotate: 16,
  },
];

export function DualSplitSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="dos mundos, una sola web"
            title="Imprimibles para el cumple. Imprimibles para el cole."
            circleWord="cole"
            circleColor="#2E5BB8"
            tapeColor="sage"
            align="center"
            className="mx-auto mb-16"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {CARDS.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ duration: 0.35 }}
                style={{ rotate: card.rotate }}
                className="relative"
              >
                <WashiTape
                  color={card.tape}
                  rotate={card.tapeRotate}
                  width={140}
                  height={28}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                />
                <Link
                  href={card.href}
                  className="group relative block polaroid overflow-hidden h-[540px]"
                >
                  <div className="absolute inset-3 bottom-12 overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark bottom for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/25 text-[11px] font-bold tracking-wide w-fit mb-4 font-hand !text-sm">
                        {card.chip}
                      </span>
                      <h3 className="font-display text-4xl md:text-5xl font-light leading-[0.95] mb-2">
                        {card.title}
                      </h3>
                      <p className="font-hand text-2xl text-white/90 mb-3 -rotate-1">
                        {card.handNote}
                      </p>
                      <p className="text-sm md:text-base leading-relaxed max-w-md mb-5 text-white/90">
                        {card.copy}
                      </p>
                      <div className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                        {card.cta}
                        <HandArrow className="w-6 h-4 -rotate-6" color="#FFFFFF" />
                      </div>
                    </div>
                  </div>
                  {/* Caption at bottom of polaroid */}
                  <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-lg text-text-primary/70">
                    cumple y cole, todo acá ↗
                  </p>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
