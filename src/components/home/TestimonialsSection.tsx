"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { WashiTape } from "@/components/scrapbook/WashiTape";

const TESTIMONIALS = [
  {
    quote:
      "Tenía el cumple de Mía en 10 días y con Tematibox armé todo en una tarde. Las invitaciones salieron preciosas.",
    name: "Lucía",
    meta: "Mamá de Mía (4), Pilar",
    handNote: "4 años, cumple Bluey",
    initials: "LC",
    avatarGradient: "from-[#E54CA2] via-[#F59042] to-[#E0B252]",
    tape: "pink" as const,
    bg: "#FFF3A8",
    rotate: -1.5,
  },
  {
    quote:
      "Las etiquetas escolares son hermosas. La maestra de Bauti me preguntó dónde las hice. Personalizadas con nombre, por materia y buen papel.",
    name: "Florencia",
    meta: "Mamá de Bauti y Juana, San Isidro",
    handNote: "etiquetas + invitaciones",
    initials: "FG",
    avatarGradient: "from-[#2E5BB8] via-[#4DA5C3] to-[#9DA295]",
    tape: "blue" as const,
    bg: "#FFDBE6",
    rotate: 1.2,
  },
  {
    quote:
      "Mi hijo es fanático de Stranger Things y no encontraba nada temático. Compré los stickers y el libro para colorear con su nombre, quedó fascinado.",
    name: "Verónica",
    meta: "Mamá de Tomás (11), Recoleta",
    handNote: "stickers + colorear",
    initials: "VR",
    avatarGradient: "from-[#6B7257] via-[#E0B252] to-[#F59042]",
    tape: "mustard" as const,
    bg: "#D9E8D3",
    rotate: -0.8,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-pink/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="lo que dicen"
            title="Familias que ya lo probaron."
            circleWord="probaron"
            circleColor="#6B7257"
            tapeColor="mustard"
            align="center"
            className="mx-auto mb-16"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <motion.div
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: t.rotate }}
                className="relative"
              >
                <WashiTape
                  color={t.tape}
                  rotate={t.rotate > 0 ? -14 : 14}
                  width={90}
                  height={22}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                />
                <div
                  className="relative p-7 md:p-8 h-full"
                  style={{
                    background: t.bg,
                    boxShadow: "0 10px 32px -10px rgba(42,45,37,0.22)",
                  }}
                >
                  <div className="flex items-center gap-1 text-amber-600 mb-4 text-lg tracking-widest">
                    ★★★★★
                  </div>
                  <blockquote className="font-display italic text-lg md:text-xl text-text-primary leading-snug mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="pt-5 border-t border-text-primary/15 flex items-center gap-3">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-white font-display font-medium text-base tracking-wide`}
                      style={{ boxShadow: "0 4px 10px -2px rgba(42,45,37,0.22)" }}
                    >
                      {t.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-hand text-2xl text-text-primary leading-tight">
                        — {t.name}
                      </p>
                      <p className="text-xs text-text-primary/65 leading-tight">{t.meta}</p>
                      <p className="font-hand text-base text-primary/70 mt-1 -rotate-1">
                        {t.handNote}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-14 text-center">
            <p className="font-hand text-xl text-text-secondary">
              Familias de colegios como{" "}
              <span className="text-text-primary">
                Northlands · Lincoln · St. Andrew&apos;s · Cardenal Newman · Belgrano Day · Las Cumbres
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
