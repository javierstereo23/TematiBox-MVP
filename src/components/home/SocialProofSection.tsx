"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandArrow } from "@/components/scrapbook/HandDrawn";

const QUOTES = [
  {
    quote: "Se la mostré y no lo podía creer. Dice que es la invitación más linda que vio.",
    who: "Lucía · mamá de Mía",
    tape: "pink" as const,
  },
  {
    quote: "Imprimimos todo en casa un domingo a la tarde. El cumple quedó hermoso y barato.",
    who: "Flor · mamá de Bauti y Juana",
    tape: "mustard" as const,
  },
  {
    quote: "Las etiquetas del cole se las mostré a otras mamás y me preguntaron dónde las hice.",
    who: "Vero · mamá de Tomás",
    tape: "sage" as const,
  },
];

const IMAGE_CARDS = [
  {
    src: "/images/social-proof/birthday-kids.png",
    alt: "Cumple con amigas",
    note: "el cumple de Mía ✨",
    rotate: -1.5,
    tape: "pink" as const,
  },
  {
    src: "/images/social-proof/kid-coloring.png",
    alt: "Tarde de colorear",
    note: "tarde de domingo",
    rotate: 1.2,
    tape: "mustard" as const,
  },
  {
    src: "/images/social-proof/mom-park.png",
    alt: "Mamá armando el cumple",
    note: "mientras toma un café",
    rotate: -0.8,
    tape: "sage" as const,
  },
  {
    src: "/images/social-proof/school-desk.png",
    alt: "Útiles escolares",
    note: "vuelta al cole, listo",
    rotate: 1.0,
    tape: "blue" as const,
  },
];

export function SocialProofSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-texture opacity-50 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="historias reales"
            title="La vida real, recordada bonito."
            circleWord="bonito"
            circleColor="#E54CA2"
            tapeColor="pink"
            align="center"
            description="Miles de momentos hechos imprimibles. Así se ven los cumples, cuadernos y tardes de colorear que armamos juntos."
            className="mx-auto mb-16"
          />
        </Reveal>

        {/* Hero image as big polaroid with testimonio */}
        <Reveal delay={0.05}>
          <motion.div
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.4 }}
            style={{ rotate: -1.2 }}
            className="relative mb-16 mx-auto max-w-5xl"
          >
            <WashiTape
              color="pink"
              rotate={-8}
              width={220}
              height={32}
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
            />
            <div className="polaroid relative">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                <Image
                  src="/images/social-proof/mom-daughter-phone.png"
                  alt="Familia compartiendo una invitación personalizada"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-10 md:right-auto md:max-w-lg text-white">
                  <p
                    className="font-display text-lg md:text-2xl italic font-normal leading-snug mb-2 text-white"
                    style={{
                      WebkitTextStroke: "0.4px rgba(42,45,37,0.5)",
                      textShadow: "0 2px 14px rgba(0,0,0,0.65), 0 0 2px rgba(0,0,0,0.85)",
                    }}
                  >
                    &ldquo;{QUOTES[0].quote}&rdquo;
                  </p>
                  <p
                    className="font-hand text-xl text-white"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.65)" }}
                  >
                    {QUOTES[0].who}
                  </p>
                </div>
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-xl text-text-primary/80">
                Lucía y Mía, agosto 2025
              </p>
            </div>
          </motion.div>
        </Reveal>

        {/* Grid de 4 polaroids */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {IMAGE_CARDS.map((card, i) => (
            <Reveal key={card.src} delay={0.08 * (i + 1)}>
              <motion.div
                whileHover={{ y: -6, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: card.rotate }}
                className="relative"
              >
                <WashiTape
                  color={card.tape}
                  rotate={card.rotate > 0 ? -16 : 16}
                  width={60}
                  height={18}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                />
                <div className="polaroid">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500"
                    />
                  </div>
                  <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-lg text-text-primary/85">
                    {card.note}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Post-it quotes row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {QUOTES.slice(1).concat(QUOTES[0]).map((q, i) => {
            const bg = ["#FFF3A8", "#FFDBE6", "#D9E8D3"][i];
            const rot = [-1.5, 1.2, -0.8][i];
            return (
              <Reveal key={i} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -4, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ rotate: rot, background: bg, boxShadow: "0 6px 20px -6px rgba(42,45,37,0.2)" }}
                  className="p-6 md:p-7"
                >
                  <p className="font-display italic text-lg md:text-xl text-text-primary leading-snug mb-4">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <p className="font-hand text-xl text-primary/80">— {q.who}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 mb-5">
              <HandArrow className="w-10 h-5 -rotate-12" color="#6B7257" style={{ opacity: 0.55 }} />
              <p className="font-hand text-2xl text-primary/85">
                + de 2k familias ya lo hicieron con nosotras
              </p>
              <HandArrow className="w-10 h-5 rotate-180 scale-y-[-1] rotate-[12deg]" color="#6B7257" style={{ opacity: 0.55 }} />
            </div>
            <Link
              href="/imprimibles"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ boxShadow: "5px 5px 0 0 #E54CA2" }}
            >
              Empezá el tuyo →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
