"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const STEPS = [
  {
    n: "01",
    emoji: "🎨",
    title: "Eligi el tema",
    body: "16 universos listos: Bluey, Stranger Things, Wicked, Argentina... lo que le brille los ojos al chico.",
  },
  {
    n: "02",
    emoji: "✏️",
    title: "Personalizalo",
    body: "Nombre, edad, fecha del evento. Vas viendo en vivo como queda antes de pagar.",
  },
  {
    n: "03",
    emoji: "⚡",
    title: "Descarga al instante",
    body: "Pagas con Mercado Pago y descargas los archivos listos para imprimir en menos de 30 segundos.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 px-6 bg-gradient-to-b from-white to-amber-50/40">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14 md:mb-20">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Como funciona
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              Tres pasos. <span className="font-display italic font-normal text-gradient-primary">Cinco minutos.</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {STEPS.map((s) => (
            <StaggerItem key={s.n} className="relative">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative bg-bg-white rounded-3xl border border-border-light p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/10 via-accent-pink/10 to-amber-100 text-4xl shadow-inner">
                  {s.emoji}
                </div>
                <div className="text-xs font-bold text-primary tracking-widest mb-2">PASO {s.n}</div>
                <h3 className="text-2xl font-extrabold text-text-primary mb-3">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed">{s.body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
