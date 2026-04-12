'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Target, Shield, TrendingUp } from 'lucide-react';

const topCases = [
  {
    id: 'claro',
    company: 'Claro',
    metric: '22%',
    metricLabel: 'conversión',
    icon: Target,
    accentColor: 'text-red-400',
    borderColor: 'border-red-500/20',
    bgGlow: 'bg-red-500/5',
  },
  {
    id: 'tigo',
    company: 'Tigo Colombia',
    metric: '98%',
    metricLabel: 'fraud-free',
    icon: Shield,
    accentColor: 'text-sky-400',
    borderColor: 'border-sky-500/20',
    bgGlow: 'bg-sky-500/5',
  },
  {
    id: 'cellc',
    company: 'Cell C',
    metric: '€2M+',
    metricLabel: 'revenue anual con OTA',
    icon: TrendingUp,
    accentColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/20',
    bgGlow: 'bg-yellow-500/5',
  },
];

export default function CasesPreview() {
  const t = useTranslations('casesPreview');

  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">
            {t('tag')}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCases.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-2xl border ${c.borderColor} ${c.bgGlow} p-6 lg:p-8 group hover:border-white/20 transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${c.accentColor}`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white">{c.company}</h3>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-heading text-5xl font-bold text-lime">{c.metric}</div>
                  <div className="text-sm text-white/40 uppercase tracking-wider mt-1">{c.metricLabel}</div>
                </div>

                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  {t(`${c.id}Desc`)}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                  {t('readMore')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
