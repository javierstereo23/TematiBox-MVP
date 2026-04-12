'use client';

import { motion } from 'framer-motion';

export default function FunnelSection() {
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
          <span className="text-sm font-medium text-lime uppercase tracking-wider">
            Impacto económico
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            Tu inversión en digital ahora va a rendir más
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* WhatsApp only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
          >
            <h3 className="text-lg font-semibold text-white/70 mb-6">
              Solo WhatsApp
            </h3>

            {/* Funnel visualization */}
            <div className="flex flex-col items-center gap-1 mb-8">
              <div className="w-full h-12 bg-[#25D366]/20 border border-[#25D366]/30 rounded-t-xl flex items-center justify-center">
                <span className="text-sm text-[#25D366] font-medium">100K usuarios</span>
              </div>
              <div className="w-[85%] h-10 bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center">
                <span className="text-xs text-[#25D366]/70">Delivery 70%</span>
              </div>
              <div className="w-[65%] h-10 bg-[#25D366]/10 border border-[#25D366]/15 flex items-center justify-center">
                <span className="text-xs text-[#25D366]/60">Open 45%</span>
              </div>
              <div className="w-[40%] h-10 bg-[#25D366]/[0.07] border border-[#25D366]/10 rounded-b-xl flex items-center justify-center">
                <span className="text-xs text-[#25D366]/50">Conv 2%</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-3xl font-bold text-white">$7,000</span>
              <p className="text-sm text-white/40 mt-1">Costo total de la campaña</p>
            </div>
          </motion.div>

          {/* SAT Push + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative rounded-2xl border border-lime/20 bg-gradient-to-b from-lime/[0.04] to-transparent p-8"
          >
            {/* Savings badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-4 right-6 inline-flex items-center px-4 py-1.5 rounded-full bg-lime text-deep text-xs font-bold shadow-lg shadow-lime/20"
            >
              95.7% de ahorro
            </motion.div>

            <h3 className="text-lg font-semibold text-white mb-6">
              SAT Push + WhatsApp
            </h3>

            {/* Funnel visualization */}
            <div className="flex flex-col items-center gap-1 mb-8">
              <div className="w-full h-12 bg-purple-500/20 border border-purple-500/30 rounded-t-xl flex items-center justify-center">
                <span className="text-sm text-purple-300 font-medium">100K usuarios (SAT Push)</span>
              </div>
              <div className="w-[90%] h-10 bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                <span className="text-xs text-purple-300/70">Delivery 95%</span>
              </div>
              <div className="w-[50%] h-10 bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center">
                <span className="text-xs text-[#25D366]/70">Interesados a WA</span>
              </div>
              <div className="w-[35%] h-10 bg-lime/10 border border-lime/20 rounded-b-xl flex items-center justify-center">
                <span className="text-xs text-lime/70">Conv 8%</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-3xl font-bold text-lime">$508</span>
              <p className="text-sm text-white/40 mt-1">Costo total de la campaña</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
