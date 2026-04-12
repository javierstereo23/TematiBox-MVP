"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const PILLARS = [
  {
    icon: "✨",
    title: "Diseno premium",
    body: "Nada de plantillas genericas. Cada detalle pensado, paleta y tipografia que se ven bien en IG.",
  },
  {
    icon: "⚡",
    title: "Al instante",
    body: "Pagas con Mercado Pago y descargas los archivos en 30 segundos. Sin esperar envio ni nada.",
  },
  {
    icon: "💌",
    title: "Personalizacion real",
    body: "Nombre, edad, fecha, lugar del evento. Preview en vivo antes de pagar. Sin sorpresas.",
  },
  {
    icon: "🛡️",
    title: "Garantia 100%",
    body: "Si no te encanta, te devolvemos la plata. Somos mamas, entendemos que nada es opcional en el cumple.",
  },
];

export function PillarsSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Por que Tematibox
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              Cuatro razones que lo hacen{" "}
              <span className="font-display italic font-normal text-gradient-primary">imposible de resistir.</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-br from-bg to-bg-white rounded-3xl border border-border-light p-7"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 via-accent-pink/10 to-amber-100 text-3xl mb-5">
                  {p.icon}
                </div>
                <h3 className="text-xl font-extrabold text-text-primary mb-2">{p.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">{p.body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
