'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Package, RefreshCw, Headphones, Star } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function DynamoPlusSection() {
  const t = useTranslations('dynamoPlus');
  const locale = useLocale();

  const pillars = [
    { icon: Package, title: t('pillar1Title'), description: t('pillar1Desc') },
    { icon: RefreshCw, title: t('pillar2Title'), description: t('pillar2Desc') },
    { icon: Headphones, title: t('pillar3Title'), description: t('pillar3Desc') },
  ];
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-lime/20 via-purple-500/10 to-lime/5 p-px">
            <div className="w-full h-full rounded-3xl bg-deep" />
          </div>

          {/* Inner content with glassmorphism */}
          <div className="relative rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] p-8 sm:p-12 lg:p-16">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-lime/[0.04] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple-500/[0.06] blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-14">
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime/10 border border-lime/20 mb-6"
                >
                  <Star className="w-3.5 h-3.5 text-lime" />
                  <span className="text-xs font-bold text-lime tracking-wider uppercase">
                    {t('tag')}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                >
                  {t('title')}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-white/40 max-w-xl mx-auto leading-relaxed"
                >
                  {t('subtitle')}
                </motion.p>

                {/* Hands-on operation badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/15"
                >
                  <div className="w-2 h-2 rounded-full bg-lime animate-pulse-glow" />
                  <span className="text-xs font-semibold text-purple-300">
                    {t('handsOn')}
                  </span>
                </motion.div>
              </div>

              {/* Three pillars */}
              <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {pillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 lg:p-8 hover:border-lime/20 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      {/* Top gradient line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-lime" />
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {pillar.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <Link
                  href={`/${locale}/vas`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-lime text-deep rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t('cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
