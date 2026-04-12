'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, HelpCircle, Calculator, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRef } from 'react';

/* ── i18n ────────────────────────────────────────────────────── */
const i18n = {
  es: {
    title1: 'Tu próximo journey ',
    titleHighlight: 'empieza acá',
    subtitle:
      'Elige cómo quieres avanzar — agenda una demo personalizada o descubre qué solución se adapta mejor a tu operación.',
    actions: [
      {
        label: 'Agendar Demo',
        description: 'Demo personalizada de 30 min con nuestro equipo',
      },
      {
        label: 'Descubre tu solución',
        description: 'Responde 5 preguntas y te recomendamos',
      },
      {
        label: 'Calcular tu ROI',
        description: 'Simula cuánto puedes ahorrar',
      },
    ],
    trust1: '+20 Telcos confían en nosotros',
    trust2: 'Prueba gratuita por 30 días',
  },
  en: {
    title1: 'Your next journey ',
    titleHighlight: 'starts here',
    subtitle:
      'Choose how you want to move forward — schedule a personalized demo or discover which solution best fits your operation.',
    actions: [
      {
        label: 'Schedule Demo',
        description: 'Personalized 30 min demo with our team',
      },
      {
        label: 'Discover your solution',
        description: 'Answer 5 questions and we\'ll recommend',
      },
      {
        label: 'Calculate your ROI',
        description: 'Simulate how much you can save',
      },
    ],
    trust1: '+20 Telcos trust us',
    trust2: 'Free trial for 30 days',
  },
  fr: {
    title1: 'Votre prochain journey ',
    titleHighlight: 'commence ici',
    subtitle:
      'Choisissez comment vous souhaitez avancer — planifiez une démo personnalisée ou découvrez quelle solution s\'adapte le mieux à votre opération.',
    actions: [
      {
        label: 'Planifier une démo',
        description: 'Démo personnalisée de 30 min avec notre équipe',
      },
      {
        label: 'Découvrez votre solution',
        description: 'Répondez à 5 questions et nous vous recommandons',
      },
      {
        label: 'Calculer votre ROI',
        description: 'Simulez combien vous pouvez économiser',
      },
    ],
    trust1: '+20 Telcos nous font confiance',
    trust2: 'Essai gratuit pendant 30 jours',
  },
  pt: {
    title1: 'Seu próximo journey ',
    titleHighlight: 'começa aqui',
    subtitle:
      'Escolha como quer avançar — agende uma demo personalizada ou descubra qual solução se adapta melhor à sua operação.',
    actions: [
      {
        label: 'Agendar Demo',
        description: 'Demo personalizada de 30 min com nosso time',
      },
      {
        label: 'Descubra sua solução',
        description: 'Responda 5 perguntas e recomendamos',
      },
      {
        label: 'Calcular seu ROI',
        description: 'Simule quanto você pode economizar',
      },
    ],
    trust1: '+20 Telcos confiam em nós',
    trust2: 'Teste gratuito por 30 dias',
  },
};

const actionIcons = [Calendar, HelpCircle, Calculator];
const actionHrefs = ['/contacto', '/qualify', '/roi-calculator'];
const actionStyleKeys = ['primary', 'ghost', 'text'] as const;

/* ── Journey flow dots for background animation ───────────────── */
function JourneyFlow() {
  const dots = [
    { x: '10%', y: '20%', delay: 0 },
    { x: '25%', y: '60%', delay: 0.4 },
    { x: '40%', y: '30%', delay: 0.8 },
    { x: '55%', y: '70%', delay: 1.2 },
    { x: '70%', y: '25%', delay: 1.6 },
    { x: '85%', y: '55%', delay: 2.0 },
    { x: '50%', y: '45%', delay: 0.6 },
    { x: '30%', y: '80%', delay: 1.4 },
    { x: '75%', y: '75%', delay: 1.8 },
    { x: '15%', y: '45%', delay: 0.2 },
  ];

  const lines = [
    { x1: '10%', y1: '20%', x2: '25%', y2: '60%' },
    { x1: '25%', y1: '60%', x2: '40%', y2: '30%' },
    { x1: '40%', y1: '30%', x2: '55%', y2: '70%' },
    { x1: '55%', y1: '70%', x2: '70%', y2: '25%' },
    { x1: '70%', y1: '25%', x2: '85%', y2: '55%' },
    { x1: '15%', y1: '45%', x2: '30%', y2: '80%' },
    { x1: '50%', y1: '45%', x2: '75%', y2: '75%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Connecting lines */}
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(205,255,0,0.06)"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
      {/* Dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-lime/20"
          style={{ left: dot.x, top: dot.y }}
          animate={{
            opacity: [0.15, 0.5, 0.15],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

const actionStyles = {
  primary:
    'bg-lime text-deep hover:brightness-110 hover:shadow-2xl hover:shadow-lime/30 hover:-translate-y-1 border-transparent',
  ghost:
    'bg-transparent text-white border-white/20 hover:border-white/40 hover:text-white hover:bg-white/5',
  text:
    'bg-transparent text-white/50 border-transparent hover:text-white/80 underline underline-offset-4 decoration-white/20 hover:decoration-white/40',
};

export default function CtaSection() {
  const locale = useLocale();
  const t = i18n[locale as keyof typeof i18n] || i18n.es;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900/80 to-deep" />

          {/* Radial glows */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(205,255,0,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[250px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at bottom left, rgba(59,42,206,0.2) 0%, transparent 60%)',
            }}
          />

          {/* Journey flow animation */}
          <JourneyFlow />

          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-5 py-12 sm:px-16 sm:py-24 lg:py-28">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
              >
                {t.title1}
                <span className="bg-gradient-to-r from-lime via-lime/80 to-emerald-300 bg-clip-text text-transparent">
                  {t.titleHighlight}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-lg text-white/75 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                {t.subtitle}
              </motion.p>

              {/* 3 Action options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                {t.actions.map((action, i) => {
                  const ActionIcon = actionIcons[i];
                  const styleKey = actionStyleKeys[i];
                  return (
                    <div key={action.label} className="flex flex-col items-center gap-2">
                      <Link
                        href={`/${locale}${actionHrefs[i]}`}
                        className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-4 rounded-xl text-base font-bold border transition-all duration-200 ${actionStyles[styleKey]}`}
                      >
                        <ActionIcon className="w-5 h-5" />
                        {action.label}
                        {styleKey === 'primary' && (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </Link>
                      <span className="text-sm sm:text-xs text-white/70">{action.description}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/65"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime/40" />
                  <span>{t.trust1}</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime/40" />
                  <span>{t.trust2}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
