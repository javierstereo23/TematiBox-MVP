'use client';

import { motion } from 'framer-motion';
import { Link2, Zap, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SolutionSection() {
  const t = useTranslations('solution');

  const pillars = [
    { icon: Link2, title: t('connectTitle'), subtitle: t('connectSubtitle'), description: t('connectDesc'), color: '#3B2ACE' },
    { icon: Zap, title: t('analyzeTitle'), subtitle: t('analyzeSubtitle'), description: t('analyzeDesc'), color: '#CDFF00' },
    { icon: CheckCircle, title: t('convertTitle'), subtitle: t('convertSubtitle'), description: t('convertDesc'), color: '#5B4ADE' },
  ];

  const lifecycleSteps = [
    { phase: t('beforePhase'), label: t('beforeLabel'), description: t('beforeDesc') },
    { phase: t('duringPhase'), label: t('duringLabel'), description: t('duringDesc') },
    { phase: t('afterPhase'), label: t('afterLabel'), description: t('afterDesc') },
  ];
  return (
    <section className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-lime uppercase tracking-wider">
            <span className="w-8 h-px bg-lime/40" />
            {t('tag')}
            <span className="w-8 h-px bg-lime/40" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            {t('title')}
          </h2>
        </motion.div>

        {/* Three pillar cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Top gradient line on hover */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${p.color}60, transparent)` }} />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${p.color}15`, boxShadow: `0 0 0 0 ${p.color}00` }}
                >
                  <Icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {p.title}
                </h3>
                <p className="text-sm text-purple-300 mb-3">{p.subtitle}</p>
                <p className="text-sm text-white/50 leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Lifecycle timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-10 lg:p-12"
        >
          <h3 className="text-center text-xl font-semibold text-white/80 mb-12">
            {t('lifecycleTitle')}
          </h3>

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0">
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-gradient-to-r from-purple-500/60 via-lime/40 to-purple-500/60" />

            {lifecycleSteps.map((step) => (
              <div key={step.phase} className="flex-1 text-center relative z-10">
                <div className="w-3 h-3 rounded-full bg-purple-400 mx-auto mb-4 ring-4 ring-deep" style={{ boxShadow: '0 0 12px rgba(91,74,222,0.4)' }} />
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  {step.phase}
                </span>
                <h4 className="text-lg font-bold text-white mt-2">
                  {step.label}
                </h4>
                <p className="text-sm text-white/40 mt-2 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
