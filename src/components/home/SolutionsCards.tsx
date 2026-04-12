'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const cards = [
  {
    badge: 'CVM / CORE',
    title: 'Tu equipo controla todo',
    features: [
      'Acceso completo al Campaign Manager',
      'Segmentacion avanzada con AI',
      'Reportes y dashboards en tiempo real',
      'Integracion con tu stack actual',
    ],
    link: { label: 'Conocer Journeys para CVM', href: '/journeys/cvm' },
    accent: 'purple' as const,
  },
  {
    badge: 'VAS + DYNAMO Plus',
    title: 'Nosotros operamos por ti',
    features: [
      'Monetizacion de VAS llave en mano',
      'Revenue share transparente',
      'Operacion 100% gestionada por DYNAMO',
      'Escalabilidad sin sumar headcount',
    ],
    link: { label: 'Conocer Journeys para VAS', href: '/journeys/vas' },
    accent: 'lime' as const,
  },
];

export default function SolutionsCards() {
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-4">
            Soluciones
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Encontra la solucion para tu modelo
          </h2>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const isPurple = card.accent === 'purple';
            return (
              <motion.div
                key={card.badge}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-2xl border p-6 sm:p-8 transition-colors duration-200 ${
                  isPurple
                    ? 'bg-purple-500/[0.04] border-purple-500/20 hover:border-purple-500/40'
                    : 'bg-lime/[0.03] border-lime/15 hover:border-lime/30'
                }`}
              >
                {/* Badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                    isPurple
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-lime/15 text-lime'
                  }`}
                >
                  {card.badge}
                </span>

                <h3 className="text-xl font-bold text-white mb-5">{card.title}</h3>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isPurple ? 'text-purple-400' : 'text-lime'
                        }`}
                      />
                      <span className="text-sm text-white/60">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  href={`/${locale}${card.link.href}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isPurple
                      ? 'text-purple-400 hover:text-purple-300'
                      : 'text-lime hover:text-lime/80'
                  }`}
                >
                  {card.link.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
