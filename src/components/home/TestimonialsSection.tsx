"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Tenia el cumple de Mia en 10 dias y con Tematibox arme todo en una tarde. Las invitaciones salieron preciosas, las compartí por el grupo de WhatsApp del jardin y quedaron alucinados.",
    name: "Lucia",
    meta: "Mama de Mia (4), Pilar",
    initials: "LC",
    gradient: "from-pink-400 to-rose-500",
    tag: "Cumple Bluey",
  },
  {
    quote:
      "Las etiquetas escolares son hermosas. La maestra de Bauti me pregunto donde las hice. Personalizadas con nombre, por materia y buen papel. Se las mande tambien a mis amigas del cole.",
    name: "Florencia",
    meta: "Mama de Bauti (8) y Juana (5), San Isidro",
    initials: "FG",
    gradient: "from-violet-500 to-purple-600",
    tag: "Etiquetas + Invitaciones",
  },
  {
    quote:
      "Mi hijo es fanatico de Stranger Things y no encontraba nada tematico. Compre los stickers y el libro para colorear personalizados con su nombre, y quedo fascinado. Imprimi desde casa.",
    name: "Veronica",
    meta: "Mama de Tomas (11), Recoleta",
    initials: "VR",
    gradient: "from-red-500 to-amber-600",
    tag: "Stickers + Colorear Stranger Things",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-white via-primary-bg/30 to-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Mamas hablan
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              Lo que dicen las que{" "}
              <span className="font-display italic font-normal text-gradient-primary">ya lo probaron</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-bg-white rounded-3xl border border-border-light p-7 flex flex-col"
              >
                <div className="flex items-center gap-1 text-amber-500 mb-5">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <blockquote className="text-text-primary leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-border-light">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shadow`}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-text-primary text-sm">{t.name}</p>
                    <p className="text-xs text-text-secondary truncate">{t.meta}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold text-primary bg-primary-bg px-2.5 py-1 rounded-full whitespace-nowrap">
                    {t.tag}
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-10 text-center">
            <p className="text-sm text-text-secondary">
              Mamas de colegios como{" "}
              <span className="font-semibold text-text-primary">
                Northlands · Lincoln · St. Andrew&apos;s · Cardenal Newman · Belgrano Day · Las Cumbres
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
