'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function RoiBanner() {
  const locale = useLocale();
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-lime/20 bg-gradient-to-r from-lime/[0.06] via-lime/[0.03] to-transparent backdrop-blur-xl p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center">
                <Calculator className="w-7 h-7 text-lime" />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left space-y-2">
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-white">
                ¿Cuánto ahorra tu Telco con DYNAMO?
              </h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-xl">
                Usa nuestra calculadora interactiva para comparar los costos de una campaña tradicional vs. una campaña optimizada con SAT Push + WhatsApp.
              </p>
            </div>
            <Link
              href={`/${locale}/roi-calculator`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-deep font-semibold rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              Calcular ROI
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
