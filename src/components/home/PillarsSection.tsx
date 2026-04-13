"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";

const PILLARS = [
  {
    title: "Diseño hecho a mano",
    handNote: "nada de plantillas genéricas",
    body: "Cada detalle pensado, paleta y tipografía que se ven bien en IG.",
    tape: "pink" as const,
    rotate: -1.4,
  },
  {
    title: "Llega al instante",
    handNote: "30 segundos, en serio",
    body: "Pagás con Mercado Pago y descargás los archivos. Sin esperar envío.",
    tape: "mustard" as const,
    rotate: 1.0,
  },
  {
    title: "Personalización real",
    handNote: "con su nombre, su edad",
    body: "Nombre, edad, fecha, lugar del evento. Preview en vivo antes de pagar.",
    tape: "sage" as const,
    rotate: -0.6,
  },
  {
    title: "Garantía total",
    handNote: "si no te encanta, te devolvemos",
    body: "Si no te convence, te devolvemos la plata. Sin vueltas.",
    tape: "blue" as const,
    rotate: 1.2,
  },
];

export function PillarsSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-30" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="por qué tematibox"
            title="Cuatro razones imposibles de resistir."
            circleWord="imposibles"
            circleColor="#E54CA2"
            tapeColor="pink"
            align="center"
            className="mx-auto mb-16"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title}>
              <motion.div
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: p.rotate }}
                className="relative h-full"
              >
                <WashiTape
                  color={p.tape}
                  rotate={p.rotate > 0 ? -18 : 18}
                  width={60}
                  height={18}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                />
                <div className="polaroid h-full flex flex-col">
                  <div className="bg-[#EFE9DC] rounded-[2px] p-8 text-center flex-1">
                    <h3 className="font-display text-2xl font-normal text-text-primary mb-2 leading-tight">
                      {p.title}
                    </h3>
                    <p className="font-hand text-xl text-primary/80 -rotate-1 mb-4">
                      {p.handNote}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
