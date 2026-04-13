"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandArrow, HandStar } from "@/components/scrapbook/HandDrawn";

const CARDS = [
  {
    href: "/imprimibles/invitaciones",
    title: "Para el cumple",
    handNote: "la fiesta empieza acá",
    subtitle: "Invitaciones · toppers · cotillón",
    copy: "Invitaciones digitales, toppers para torta, banderines y souvenirs. Todo con el nombre del chico. Descarga al instante.",
    image: "/images/home/birthday-aesthetic.png",
    cta: "Ver imprimibles del cumple",
    rotate: -1.2,
    photoRotate: -3,
    tape: "pink" as const,
    tapeRotate: -18,
    postIt: "#FFDBE6",
  },
  {
    href: "/imprimibles/etiquetas",
    title: "Para el cole",
    handNote: "listo para el lunes",
    subtitle: "Etiquetas · escolares · cliparts",
    copy: "Etiquetas para carátulas, material escolar, flashcards educativas y cliparts para sublimar. Con el nombre del chico.",
    image: "/images/home/school-flatlay.png",
    cta: "Ver imprimibles del cole",
    rotate: 1.0,
    photoRotate: 3,
    tape: "blue" as const,
    tapeRotate: 16,
    postIt: "#D9E8D3",
  },
];

export function DualSplitSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-25" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="dos mundos, una sola web"
            title="Imprimibles para el cumple. Imprimibles para el cole."
            circleWord="cole"
            circleColor="#2E5BB8"
            tapeColor="sage"
            align="center"
            className="mx-auto mb-20"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {CARDS.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ duration: 0.35 }}
                style={{ rotate: card.rotate }}
                className="relative"
              >
                {/* Washi tape at top of the paper card */}
                <WashiTape
                  color={card.tape}
                  rotate={card.tapeRotate}
                  width={160}
                  height={30}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-30"
                />

                <Link
                  href={card.href}
                  className="group relative block bg-[#FFFDF8] p-7 md:p-9 overflow-hidden"
                  style={{
                    boxShadow:
                      "0 2px 4px rgba(42,45,37,0.06), 0 18px 44px -18px rgba(42,45,37,0.22)",
                  }}
                >
                  {/* Post-it chip */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 font-hand text-base text-text-primary"
                    style={{
                      background: card.postIt,
                      transform: "rotate(-2deg)",
                      boxShadow: "0 3px 8px rgba(42,45,37,0.12)",
                    }}
                  >
                    <HandStar className="w-4 h-4" color="#E0B252" />
                    digital · al instante
                  </div>

                  {/* Title — DARK on cream, legible */}
                  <h3 className="font-display text-[40px] md:text-[52px] font-light leading-[0.95] tracking-[-0.025em] text-text-primary mb-3">
                    {card.title}
                  </h3>

                  <p className="font-hand text-2xl text-primary/85 -rotate-1 mb-5">
                    {card.handNote}
                  </p>

                  {/* Polaroid with image — inside the paper card */}
                  <div
                    className="relative polaroid mb-6"
                    style={{ transform: `rotate(${card.photoRotate}deg)` }}
                  >
                    <WashiTape
                      color="cream"
                      rotate={card.photoRotate > 0 ? -12 : 12}
                      width={70}
                      height={18}
                      className="absolute -top-2 left-1/2 -translate-x-1/2 z-10"
                    />
                    <div className="relative aspect-[5/3] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-base text-text-primary/75">
                      {card.subtitle.toLowerCase()}
                    </p>
                  </div>

                  <p className="text-base text-text-primary/75 leading-[1.6] mb-6 max-w-md">
                    {card.copy}
                  </p>

                  <span
                    className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-[#FBF6EA] font-semibold text-sm rounded-[4px] transition-all group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]"
                    style={{ boxShadow: "5px 5px 0 0 #E54CA2" }}
                  >
                    {card.cta}
                    <HandArrow className="w-5 h-3 opacity-80" color="currentColor" />
                  </span>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
