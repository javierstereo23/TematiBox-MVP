"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export function DualSplitSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Dos mundos, una sola web
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              Imprimibles para el cumple.{" "}
              <span className="font-display italic font-normal text-gradient-primary">Imprimibles para el cole.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              href: "/imprimibles/invitaciones",
              title: "Para el cumple",
              subtitle: "Invitaciones, toppers y cotillon",
              copy: "Invitaciones digitales, toppers para torta, banderines y souvenirs. Todo personalizado con el nombre del chico. Descargas al instante.",
              image: "/images/home/birthday-aesthetic.png",
              emoji: "🎉",
              chip: "Digital · Al instante",
              cta: "Ver imprimibles del cumple",
              accent: "from-pink-400 to-amber-400",
            },
            {
              href: "/imprimibles/etiquetas",
              title: "Para el cole",
              subtitle: "Etiquetas, escolares y cliparts",
              copy: "Etiquetas para carátulas, material escolar, flashcards educativas y cliparts para sublimar. Con el nombre del chico. Listos para imprimir.",
              image: "/images/home/school-flatlay.png",
              emoji: "📚",
              chip: "Digital · Al instante",
              cta: "Ver imprimibles del cole",
              accent: "from-violet-400 to-sky-400",
            },
          ].map((card, i) => (
            <Reveal key={card.href} delay={i * 0.15}>
              <Link
                href={card.href}
                className="group relative block rounded-3xl overflow-hidden bg-bg border border-border-light h-[520px] card-hover"
              >
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-15 transition-opacity duration-500 mix-blend-screen`}
                  />
                </div>
                <div className="relative h-full flex flex-col justify-end p-8 md:p-10 text-white">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold w-fit mb-4">
                    {card.chip}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl md:text-5xl">{card.emoji}</span>
                    <h3 className="text-3xl md:text-4xl font-extrabold">{card.title}</h3>
                  </div>
                  <p className="text-lg text-white/85 font-medium mb-1">{card.subtitle}</p>
                  <p className="text-base text-white/75 leading-relaxed max-w-md mb-6">{card.copy}</p>
                  <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                    {card.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
