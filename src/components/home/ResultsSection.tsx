'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRef, useState, useEffect } from 'react';

/* ── i18n ────────────────────────────────────────────────────── */
const i18n = {
  es: {
    tag: 'Resultados reales',
    title1: 'Telcos que ya transformaron su operación: ',
    titleHighlight: 'conoce sus casos de éxito',
    viewAll: 'Ver todos los casos',
    results: [
      {
        client: 'Operador Tier 1 — LATAM',
        description:
          'Incremento en conversión de campañas de upsell con journeys automatizados.',
        quote:
          'DYNAMO transformó nuestra forma de activar usuarios.',
      },
      {
        client: 'Operador líder — Chile',
        description:
          'CTR con segmentación AI y fraseología optimizada, +67% vs campañas anteriores.',
        quote:
          'La segmentación por afinidad cambió completamente nuestros resultados.',
      },
      {
        client: 'Operador — Sudáfrica',
        description:
          'Revenue incremental generado con despliegue OTA del applet SAT Push.',
        quote: null,
      },
    ],
  },
  en: {
    tag: 'Real results',
    title1: 'Telcos that already transformed their operations: ',
    titleHighlight: 'discover their success stories',
    viewAll: 'View all cases',
    results: [
      {
        client: 'Tier 1 Operator — LATAM',
        description:
          'Increase in upsell campaign conversion with automated journeys.',
        quote:
          'DYNAMO transformed the way we activate users.',
      },
      {
        client: 'Leading Operator — Chile',
        description:
          'CTR with AI segmentation and optimized messaging, +67% vs previous campaigns.',
        quote:
          'Affinity-based segmentation completely changed our results.',
      },
      {
        client: 'Operator — South Africa',
        description:
          'Incremental revenue generated with OTA deployment of SAT Push applet.',
        quote: null,
      },
    ],
  },
  fr: {
    tag: 'Résultats réels',
    title1: 'Les Telcos qui ont déjà transformé leurs opérations : ',
    titleHighlight: 'découvrez leurs cas de succès',
    viewAll: 'Voir tous les cas',
    results: [
      {
        client: 'Opérateur Tier 1 — LATAM',
        description:
          'Augmentation de la conversion des campagnes d\'upsell grâce aux journeys automatisés.',
        quote:
          'DYNAMO a transformé notre façon d\'activer les utilisateurs.',
      },
      {
        client: 'Opérateur leader — Chili',
        description:
          'CTR avec segmentation AI et phrasé optimisé, +67% vs campagnes précédentes.',
        quote:
          'La segmentation par affinité a complètement changé nos résultats.',
      },
      {
        client: 'Opérateur — Afrique du Sud',
        description:
          'Revenu incrémental généré avec le déploiement OTA de l\'applet SAT Push.',
        quote: null,
      },
    ],
  },
  pt: {
    tag: 'Resultados reais',
    title1: 'Telcos que já transformaram sua operação: ',
    titleHighlight: 'conheça seus casos de sucesso',
    viewAll: 'Ver todos os casos',
    results: [
      {
        client: 'Operador Tier 1 — LATAM',
        description:
          'Aumento na conversão de campanhas de upsell com journeys automatizados.',
        quote:
          'A DYNAMO transformou nossa forma de ativar usuários.',
      },
      {
        client: 'Operador líder — Chile',
        description:
          'CTR com segmentação AI e fraseologia otimizada, +67% vs campanhas anteriores.',
        quote:
          'A segmentação por afinidade mudou completamente nossos resultados.',
      },
      {
        client: 'Operador — África do Sul',
        description:
          'Receita incremental gerada com implantação OTA do applet SAT Push.',
        quote: null,
      },
    ],
  },
};

/* Metric data (not translated — numbers are universal) */
const metricData = [
  { metricValue: 22, metricSuffix: '%' },
  { metricValue: 4, metricSuffix: '%' },
  { metricPrefix: 'USD ', metricValue: 2, metricSuffix: 'M+' },
];

/* ── Animated counter ─────────────────────────────────────────── */
function useCounter(end: number, duration = 1600, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [trigger, end, duration]);
  return count;
}

function ResultCard({
  client,
  description,
  quote,
  metricPrefix,
  metricValue,
  metricSuffix,
  index,
}: {
  client: string;
  description: string;
  quote: string | null;
  metricPrefix?: string;
  metricValue: number;
  metricSuffix: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: '-40px' });
  const count = useCounter(metricValue, 1600, isCardInView);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-b from-white/[0.1] to-white/[0.03] group-hover:from-purple-500/30 group-hover:to-lime/10 transition-all duration-500">
        <div className="w-full h-full rounded-2xl bg-deep" />
      </div>

      <div className="relative z-10 p-8">
        {/* Client name */}
        <span className="text-sm sm:text-xs font-bold text-white/70 uppercase tracking-[0.2em]">
          {client}
        </span>

        {/* Big metric with gradient */}
        <div className="my-5">
          <span className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-lime bg-clip-text text-transparent leading-none">
            {metricPrefix || ''}{count}{metricSuffix}
          </span>
        </div>

        {/* Description */}
        <p className="text-base sm:text-sm text-white/75 leading-relaxed mb-5">
          {description}
        </p>

        {/* Quote */}
        {quote && (
          <div className="pt-5 border-t border-white/[0.06]">
            <div className="flex gap-3">
              <Quote className="w-5 h-5 text-purple-500/40 flex-shrink-0 mt-0.5" />
              <p className="text-[15px] sm:text-sm text-white/70 italic leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ResultsSection() {
  const locale = useLocale();
  const t = i18n[locale as keyof typeof i18n] || i18n.es;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background subtle trophy glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(59,42,206,0.06) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-5 tracking-wide">
            {t.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            {t.title1}
            <span className="bg-gradient-to-r from-purple-300 to-lime bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Result cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {t.results.map((r, i) => (
            <ResultCard
              key={r.client}
              client={r.client}
              description={r.description}
              quote={r.quote ?? null}
              metricPrefix={metricData[i].metricPrefix}
              metricValue={metricData[i].metricValue}
              metricSuffix={metricData[i].metricSuffix}
              index={i}
            />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href={`/${locale}/casos-de-exito`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm font-semibold text-purple-400 hover:text-purple-300 hover:border-purple-500/20 transition-all duration-300 group"
          >
            {t.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
