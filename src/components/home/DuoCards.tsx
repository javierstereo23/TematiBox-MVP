'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

/* Features moved to i18n — accessed via translations below */

export default function DuoCards() {
  const t = useTranslations('duoCards');
  const locale = useLocale();

  const cvmFeatures = [
    t('cvmFeature1'),
    t('cvmFeature2'),
    t('cvmFeature3'),
    t('cvmFeature4'),
    t('cvmFeature5'),
  ];

  const vasFeatures = [
    t('vasFeature1'),
    t('vasFeature2'),
    t('vasFeature3'),
    t('vasFeature4'),
    t('vasFeature5'),
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 uppercase tracking-wider">
            <span className="w-8 h-px bg-purple-500/40" />
            {t('tag')}
            <span className="w-8 h-px bg-purple-500/40" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* CVM/CORE Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.08] to-transparent p-8 lg:p-10 hover:border-purple-500/40 transition-all duration-300"
          >
            {/* Background image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/generated/home-data-flow.png"
                alt="Abstract purple technology visualization representing data analytics"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-[0.07]"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
                {t('cvmBadge')}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t('cvmTitle')}
              </h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                {t('cvmDesc')}
              </p>

              <ul className="space-y-3 mb-8">
                {cvmFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/cvm`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors"
              >
                {t('cvmLink')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* VAS Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl border border-lime/20 bg-gradient-to-br from-lime/[0.06] to-transparent p-8 lg:p-10 hover:border-lime/40 transition-all duration-300"
          >
            {/* Background image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/generated/vas-dashboard.png"
                alt="Network connections visualization representing marketplace connectivity"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-[0.07]"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-lime/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-lime/15 text-lime text-xs font-semibold mb-6">
                {t('vasBadge')}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t('vasTitle')}
              </h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                {t('vasDesc')}
              </p>

              <ul className="space-y-3 mb-8">
                {vasFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/vas`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-lime hover:text-lime-dark transition-colors"
              >
                {t('vasLink')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
