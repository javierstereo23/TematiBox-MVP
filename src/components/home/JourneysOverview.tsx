'use client';

import { motion } from 'framer-motion';
import {
  Plug,
  BrainCircuit,
  TrendingUp,
  Layers,
  BarChart3,
  Zap,
  Settings2,
  LayoutGrid,
} from 'lucide-react';

const pillars = [
  {
    icon: Plug,
    title: 'Conecta',
    desc: 'Integra tu BSS/OSS y canales en una sola plataforma.',
  },
  {
    icon: BrainCircuit,
    title: 'Analiza',
    desc: 'AI predice comportamiento y segmenta en tiempo real.',
  },
  {
    icon: TrendingUp,
    title: 'Convierte',
    desc: 'Journeys automatizados que generan revenue medible.',
  },
];

const capabilities = [
  { icon: Layers, text: 'Orquestacion de 8+ canales' },
  { icon: BarChart3, text: 'KPIs y analytics en tiempo real' },
  { icon: Zap, text: 'Triggers basados en comportamiento' },
  { icon: Settings2, text: 'Motor de reglas de negocio avanzadas' },
  { icon: LayoutGrid, text: 'Campaign Manager 4-en-1' },
];

export default function JourneysOverview() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-4">
            La plataforma
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight max-w-3xl mx-auto mb-3">
            Conectamos tu infraestructura, analizamos con AI y activamos journeys que convierten
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Una plataforma unificada que transforma datos en revenue para operadores Telco.
          </p>
        </motion.div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:border-purple-500/30 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5 Capabilities as compact bullets */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {capabilities.map((c) => (
            <div
              key={c.text}
              className="flex items-center gap-2 group cursor-default"
            >
              <c.icon className="w-4 h-4 text-lime/70 group-hover:text-lime transition-colors" />
              <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                {c.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
