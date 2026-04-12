'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PainPoints() {
  const t = useTranslations('painPoints');

  const painPoints = [
    { num: '01', title: t('pain1Title'), description: t('pain1Desc') },
    { num: '02', title: t('pain2Title'), description: t('pain2Desc') },
    { num: '03', title: t('pain3Title'), description: t('pain3Desc') },
    { num: '04', title: t('pain4Title'), description: t('pain4Desc') },
  ];
  return (
    <section className="py-24 lg:py-32 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,42,206,0.04) 0%, transparent 60%)' }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
          <p className="text-white/40 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-7 hover:-translate-y-1 hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
            >
              {/* Top gradient line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Bottom subtle glow on hover */}
              <div className="absolute bottom-0 left-[20%] right-[20%] h-16 bg-purple-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Ghost number */}
              <span className="absolute top-4 right-4 text-7xl font-extrabold text-purple-500/[0.05] select-none leading-none group-hover:text-purple-500/[0.08] transition-colors duration-300">
                {p.num}
              </span>

              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <span className="text-xs font-bold text-purple-400">{p.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
