"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandArrow } from "@/components/scrapbook/HandDrawn";

const STEPS = [
  {
    n: "01",
    icon: "/images/steps/step-1-choose.png",
    title: "Elegí el tema",
    handNote: "lo que le brille los ojos",
    body: "23 temas listos: Bluey, Stranger Things, Wicked, Argentina... lo que le brille los ojos al chico.",
    rotate: -1.5,
    tape: "pink" as const,
  },
  {
    n: "02",
    icon: "/images/steps/step-2-personalize.png",
    title: "Personalizalo",
    handNote: "su nombre, su edad",
    body: "Nombre, edad, fecha del evento. Lo personalizamos para vos.",
    rotate: 1.0,
    tape: "mustard" as const,
  },
  {
    n: "03",
    icon: "/images/steps/step-3-download.png",
    title: "Descargá al instante",
    handNote: "listo para imprimir",
    body: "Pagás con Mercado Pago y descargás los archivos listos para imprimir en menos de 30 segundos.",
    rotate: -0.8,
    tape: "sage" as const,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-ruled opacity-40" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="cómo funciona"
            title="Tres pasos. Cinco minutos."
            circleWord="Cinco"
            circleColor="#E0B252"
            tapeColor="blue"
            align="center"
            className="mx-auto mb-20"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {/* hand-drawn connecting arrow (desktop only) */}
          <HandArrow
            className="hidden md:block absolute top-[86px] left-[28%] w-20 h-10 rotate-[6deg] z-10 opacity-40"
            color="#6B7257"
          />
          <HandArrow
            className="hidden md:block absolute top-[86px] right-[28%] w-20 h-10 rotate-[-6deg] scale-x-[-1] z-10 opacity-40"
            color="#6B7257"
          />

          {STEPS.map((s) => (
            <StaggerItem key={s.n} className="relative">
              <motion.div
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: s.rotate }}
                className="relative"
              >
                <WashiTape
                  color={s.tape}
                  rotate={-8}
                  width={120}
                  height={24}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                />
                <div className="relative polaroid text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-[4px] overflow-hidden bg-[#EFE9DC]">
                    <Image src={s.icon} alt={s.title} fill sizes="128px" className="object-cover" />
                  </div>
                  <div className="font-display text-5xl font-light text-primary/70 italic leading-none mb-1">
                    {s.n}
                  </div>
                  <h3 className="font-display text-2xl font-normal text-text-primary mb-1">
                    {s.title}
                  </h3>
                  <p className="font-hand text-xl text-primary/80 -rotate-1 mb-3">
                    {s.handNote}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
