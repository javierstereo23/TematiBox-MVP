"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getThemeBySlug } from "@/data/themes";
import { InvitacionTemplate } from "@/components/personalizer/templates";
import { Reveal } from "@/components/motion/Reveal";

const DEMO_THEMES = ["bluey", "stranger-things", "disney-princesas"];

export function LiveDemoSection() {
  const [name, setName] = useState("Mia");
  const [age, setAge] = useState<number>(5);
  const [themeIdx, setThemeIdx] = useState(0);
  const [focused, setFocused] = useState(false);

  const theme = getThemeBySlug(DEMO_THEMES[themeIdx])!;

  useEffect(() => {
    if (focused) return;
    const id = setInterval(() => setThemeIdx((i) => (i + 1) % DEMO_THEMES.length), 3800);
    return () => clearInterval(id);
  }, [focused]);

  return (
    <section className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-white via-violet-50/40 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Probalo ahora
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary mb-4 text-balance">
              Mira como queda con el nombre{" "}
              <span className="font-display italic font-normal text-gradient-primary">de tu hijo</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Escribi el nombre, la edad y cambia de tema. Asi de rapido personalizas cualquier imprimible.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <Reveal className="lg:col-span-2 order-2 lg:order-1" delay={0.2}>
            <div className="bg-bg-white rounded-3xl border border-border-light p-6 md:p-8 shadow-lg">
              <p className="text-sm font-semibold text-text-primary mb-4">Prueba cambiar los datos</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5 tracking-wide uppercase">
                    Nombre del cumpleañero
                  </label>
                  <input
                    type="text"
                    value={name}
                    maxLength={14}
                    onFocus={() => setFocused(true)}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5 tracking-wide uppercase">
                    Edad
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={age}
                    onFocus={() => setFocused(true)}
                    onChange={(e) => setAge(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5 tracking-wide uppercase">
                    Tema
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {DEMO_THEMES.map((slug, i) => {
                      const t = getThemeBySlug(slug)!;
                      return (
                        <button
                          key={slug}
                          onClick={() => {
                            setThemeIdx(i);
                            setFocused(true);
                          }}
                          className={`p-3 rounded-xl text-center transition-all ${
                            i === themeIdx ? "bg-primary text-white shadow-md scale-105" : "bg-bg border border-border-light text-text-primary hover:border-primary"
                          }`}
                        >
                          <div className="text-2xl mb-0.5">{t.emoji}</div>
                          <div className="text-xs font-semibold truncate">{t.name.split(" ")[0]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Link
                href={`/imprimibles/invitaciones/${theme.slug}`}
                className="btn-primary w-full !py-3.5 !text-sm group"
              >
                Personalizar de verdad
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-xs text-text-tertiary text-center mt-3">
                Descarga al instante por $2.500
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3 order-1 lg:order-2" delay={0.1}>
            <motion.div
              className="relative rounded-3xl overflow-hidden bg-bg-white shadow-2xl border border-border-light"
              key={theme.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 text-xs font-bold text-text-primary shadow flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                Preview en vivo
              </div>
              <div className="p-4 md:p-8 bg-gradient-to-br from-bg via-white to-primary-bg/40">
                <InvitacionTemplate
                  palette={theme.palette}
                  personalization={{ name, age, eventDate: "", eventTime: "", venue: "", address: "" }}
                  themeName={theme.name}
                  themeEmoji={theme.emoji}
                />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
