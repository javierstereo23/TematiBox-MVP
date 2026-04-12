'use client';

import RoiCalculator from '@/components/RoiCalculator';
import RevealOnScroll from '@/components/RevealOnScroll';
import { BarChart3, Zap, Target, DollarSign } from 'lucide-react';

const steps = [
  {
    icon: Zap,
    title: 'SAT Push primero',
    desc: 'Enviamos un mensaje SAT Push a toda tu audiencia a un costo de CPM $3 (USD 0.003 por mensaje). Se entrega al 95% de los dispositivos.',
  },
  {
    icon: Target,
    title: 'Filtramos interesados',
    desc: 'Solo los usuarios que hacen click en "OK" en el SAT Push son recontactados por WhatsApp. Esto reduce drasticamente tu base de recontacto.',
  },
  {
    icon: DollarSign,
    title: 'WhatsApp solo a leads calientes',
    desc: 'En lugar de enviar WhatsApp a toda la base (a $0.07+ por mensaje), solo envias a quienes ya mostraron interes. Ahorro masivo.',
  },
  {
    icon: BarChart3,
    title: 'Resultado: menor CPL',
    desc: 'El costo por lead baja significativamente porque pre-filtras con un canal 20x mas barato que WhatsApp.',
  },
];

export default function RoiCalculatorClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-lime/[0.03] rounded-full blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">
                Calculadora ROI
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Cuanto{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime to-lime-dark">
                  ahorra tu Telco
                </span>{' '}
                con DYNAMO?
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
                Configura tu escenario y compara el costo de una campaña 100% WhatsApp vs. una campaña inteligente con SAT Push + WhatsApp de DYNAMO Journeys.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white text-center mb-4">
              Como funciona el ahorro?
            </h2>
            <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
              DYNAMO Journeys usa SAT Push como primer filtro de interes antes de activar canales mas costosos como WhatsApp.
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-lime" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <RevealOnScroll>
            <RoiCalculator />
          </RevealOnScroll>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-xs text-white/25 leading-relaxed">
            Los resultados son estimaciones basadas en los parametros ingresados. Los costos reales pueden variar segun el operador, region y volumen de mensajes. El CPM de SAT Push ($3) es un valor referencial. Contactanos para obtener una cotizacion personalizada.
          </p>
        </div>
      </section>
    </div>
  );
}
