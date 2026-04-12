"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const STEPS = [
  {
    n: "01",
    icon: "/images/steps/step-1-choose.png",
    title: "Elegí el tema",
    body: "23 temas listos: Bluey, Stranger Things, Wicked, Argentina... lo que le brille los ojos al chico.",
  },
  {
    n: "02",
    icon: "/images/steps/step-2-personalize.png",
    title: "Personalizalo",
    body: "Nombre, edad, fecha del evento. Lo personalizamos para vos.",
  },
  {
    n: "03",
    icon: "/images/steps/step-3-download.png",
    title: "Descargá al instante",
    body: "Pagás con Mercado Pago y descargás los archivos listos para imprimir en menos de 30 segundos.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 px-6 bg-gradient-to-b from-white to-amber-50/40">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14 md:mb-20">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Cómo funciona
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              Tres pasos. <span className="font-display italic font-normal text-gradient-primary">Cinco minutos.</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* connecting line (desktop) */}
          <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {STEPS.map((s) => (
            <StaggerItem key={s.n} className="relative">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative bg-bg-white rounded-3xl border border-border-light p-8 text-center"
              >
                <div className="relative w-28 h-28 mx-auto mb-5 rounded-2xl overflow-hidden bg-[#FAF6EE] shadow-sm">
                  <Image src={s.icon} alt={s.title} fill sizes="112px" className="object-cover" />
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
