'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function SatPushSection() {
  const t = useTranslations('satPush');
  const locale = useLocale();

  const metrics = [
    { value: t('metric1Value'), label: t('metric1Label') },
    { value: t('metric2Value'), label: t('metric2Label') },
    { value: t('metric3Value'), label: t('metric3Label') },
  ];
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/20 mb-6">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300">
                {t('tag')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
              {t('title1')}{' '}
              <span className="text-gradient-lime">{t('titleHighlight')}</span>
              {' '}{t('title2')}
            </h2>

            <p className="text-white/50 leading-relaxed mb-10 max-w-lg">
              {t('description')}
            </p>

            {/* Metric cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
                >
                  <div className="text-2xl font-bold text-lime mb-1">
                    {m.value}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link
              href={`/${locale}/sat-push`}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-lime text-deep rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              {t('cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right - phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Background image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
              <Image
                src="/images/generated/mobile-experience.png"
                alt="Smartphone displaying mobile messaging interface in dark environment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Phone frame */}
            <div className="relative w-[280px] rounded-[40px] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-3 shadow-2xl shadow-purple-500/10">
              <div className="rounded-[32px] bg-deep overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 py-3">
                  <span className="text-[10px] text-white/50">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 rounded-sm bg-white/30" />
                    <div className="w-2 h-2 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* SAT Push notification */}
                <div className="px-4 pb-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl bg-purple-500/20 border border-purple-500/30 p-4 mb-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">S</span>
                      </div>
                      <span className="text-[10px] font-semibold text-purple-300">
                        SAT Push
                      </span>
                      <span className="text-[8px] text-white/30 ml-auto">
                        ahora
                      </span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Tienes un bono de 2GB gratis esperándote. Activa ahora y navega sin límites este fin de semana.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 py-1.5 rounded-lg bg-lime text-center text-[10px] font-semibold text-deep">
                        Activar
                      </div>
                      <div className="flex-1 py-1.5 rounded-lg bg-white/10 text-center text-[10px] text-white/50">
                        Después
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* WhatsApp conversation transition */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="px-4 pb-6"
                >
                  <div className="flex items-center gap-2 mb-3 py-2 border-t border-white/[0.06]">
                    <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">W</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#25D366]">
                      WhatsApp
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 p-3">
                      <p className="text-[10px] text-white/70 leading-relaxed">
                        Gracias por activar tu bono. Ya tienes 2GB disponibles hasta el domingo.
                      </p>
                    </div>
                    <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-[#25D366]/20 p-3">
                      <p className="text-[10px] text-white/70">
                        Genial, gracias!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
