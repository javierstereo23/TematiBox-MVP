'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, Database, Store, CheckCircle2, FlaskConical, Wrench, CreditCard, Gavel, FileCheck, BarChart3, Wallet, PieChart, Smartphone, Users, Shield, Activity } from 'lucide-react';

const flowSteps = [
  { num: '01', icon: Database, title: 'Audiencias por afinidad', desc: 'Cruce de datos HLR/Billing/CDRs para targeting basado en consumo real' },
  { num: '02', icon: Store, title: 'Marketplace transparente', desc: 'CPs cargan ofertas bajo modelos CPM o CPA con visibilidad total' },
  { num: '03', icon: CheckCircle2, title: 'Aprobación del Operador', desc: 'Validación de servicios, precios y creatividades antes de activar' },
  { num: '04', icon: FlaskConical, title: 'Activación inteligente', desc: 'Campaign Manager con A/B testing y asignación por performance' },
  { num: '05', icon: Wrench, title: 'Operación diaria experta', desc: 'Equipo DYNAMO dedicado afinando audiencias y optimizando campañas' },
  { num: '06', icon: CreditCard, title: 'Collection integrado', desc: 'Wallet con múltiples medios de pago y facturación automatizada' },
];

const cpFeatures = [
  { icon: Gavel, title: 'Plataforma de bidding' },
  { icon: Wallet, title: 'Wallet virtual' },
  { icon: BarChart3, title: 'Dashboard de ROI' },
];

const opFeatures = [
  { icon: Shield, title: 'Aprobación de campañas' },
  { icon: PieChart, title: 'KPIs en tiempo real' },
  { icon: Activity, title: 'Gobernanza total' },
];

const caseHighlights = [
  { metric: '7.8%', label: 'conversión con bidding abierto', operator: 'Operador multinacional — Caribe' },
  { metric: '98%', label: 'tráfico sin fraude', operator: 'Operador regional — Colombia' },
  { metric: 'USD 2M+', label: 'revenue anual con SAT Push', operator: 'Operador — Sudáfrica' },
];

export default function OnePagerVASClient() {
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Ingresa un email válido');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/one-pager-vas-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setUnlocked(true);
        setTimeout(() => window.print(), 800);
      }
    } catch {
      setEmailError('Error al enviar. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div
        className={`transition-all duration-700 ${!unlocked ? 'opacity-60' : 'opacity-100'}`}
        style={!unlocked ? { filter: 'blur(4px)' } : undefined}
      >
        <div className="one-pager-content mx-auto max-w-[210mm] bg-white text-gray-900 print:shadow-none shadow-2xl shadow-black/50 my-8 lg:my-16">
          <div className="p-8 lg:p-12 space-y-8" style={{ minHeight: '297mm' }}>
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#CDFF00] pb-6">
              <div>
                <img src="/images/dynamo-logo.svg" alt="DYNAMO" className="h-8 w-auto mb-3" />
                <p className="text-xs text-gray-500 tracking-wider uppercase">One-Pager VAS & Managed Services</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">dynamo.tech</p>
                <p className="text-xs text-gray-400">segundo.salvadores@dynamo.tech</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                DYNAMO Journeys para VAS & Managed Services
              </h1>
              <p className="text-base text-[#65a300] font-medium mt-1">
                Monetiza tu inventario con operación experta
              </p>
            </div>

            {/* 6-step flow */}
            <div>
              <h2 className="text-sm font-bold text-[#65a300] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#65a300] inline-block" />
                Modelo operativo en 6 pasos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {flowSteps.map((step) => (
                  <div key={step.num} className="p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#65a300]">{step.num}</span>
                      <step.icon className="w-4 h-4 text-[#65a300]" />
                      <p className="text-xs font-semibold text-gray-900">{step.title}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* For CP + For Operator */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-bold text-[#65a300] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#65a300] inline-block" />
                  Para Content Providers
                </h2>
                <div className="space-y-2">
                  {cpFeatures.map((f) => (
                    <div key={f.title} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 bg-gray-50/50">
                      <f.icon className="w-4 h-4 text-[#65a300]" />
                      <p className="text-xs font-medium text-gray-700">{f.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                  Para el Operador
                </h2>
                <div className="space-y-2">
                  {opFeatures.map((f) => (
                    <div key={f.title} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 bg-gray-50/50">
                      <f.icon className="w-4 h-4 text-[#3b2ace]" />
                      <p className="text-xs font-medium text-gray-700">{f.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Case highlights */}
            <div>
              <h2 className="text-sm font-bold text-[#65a300] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#65a300] inline-block" />
                Resultados reales
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {caseHighlights.map((cs) => (
                  <div key={cs.operator} className="text-center p-4 rounded-xl border border-[#65a300]/20 bg-[#65a300]/[0.03]">
                    <p className="text-2xl font-bold text-[#65a300]">{cs.metric}</p>
                    <p className="text-xs text-gray-600 mt-1">{cs.label}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">{cs.operator}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-[#CDFF00] pt-6 mt-auto">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Agenda una demo personalizada</p>
                  <p className="text-xs text-gray-500 mt-1">segundo.salvadores@dynamo.tech | dynamo.tech</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400">&copy; 2026 DYNAMO</p>
                  <p className="text-[10px] text-gray-400">Todos los derechos reservados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gate overlay */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-30 flex items-center justify-center print:hidden"
            style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,16,0.85) 0%, rgba(5,5,16,0.95) 100%)' }}
          >
            <div className="text-center px-6 max-w-md w-full">
              <div className="w-16 h-16 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-6">
                <Download className="w-7 h-7 text-lime" />
              </div>
              <h2 className="text-white font-heading text-2xl font-bold mb-2">
                One-Pager VAS & Managed Services
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Ingresa tu email para acceder al resumen ejecutivo de DYNAMO para VAS
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="tu@empresa.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-lime/40 focus:ring-1 focus:ring-lime/20 transition-colors"
                  />
                </div>
                {emailError && <p className="text-red-400 text-xs text-left">{emailError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-lime text-deep font-semibold rounded-xl text-sm hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {submitting ? 'Procesando...' : 'Descargar One-Pager VAS'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
