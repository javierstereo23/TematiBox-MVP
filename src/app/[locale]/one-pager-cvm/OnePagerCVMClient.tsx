'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Download, Zap, BarChart3, Brain, Shield, Layers, Settings, MessageSquare, Smartphone, Send, Radio, Bell, Wifi, Globe } from 'lucide-react';

const capabilities = [
  { icon: Zap, title: 'Triggers en tiempo real', desc: 'Eventos desde HLR, Billing y CRM activan journeys automáticamente' },
  { icon: Brain, title: 'Segmentación AI', desc: 'Clusters por afinidad con machine learning para audiencias dinámicas' },
  { icon: Layers, title: 'Campaign Manager', desc: 'Gestión centralizada con A/B testing y modalidades múltiples' },
  { icon: BarChart3, title: 'Analytics end-to-end', desc: 'Métricas de conversión real por canal, producto y automatización' },
  { icon: Shield, title: 'Reglas de negocio', desc: 'Windowing, anti-spam, priorización y frequency capping' },
  { icon: Settings, title: 'Orquestación total', desc: 'Journeys visuales drag & drop con lógica de fallback y ramificación' },
];

const channels = [
  { icon: Smartphone, label: 'SAT Push' },
  { icon: MessageSquare, label: 'WhatsApp' },
  { icon: Send, label: 'SMS' },
  { icon: Mail, label: 'Email' },
  { icon: Radio, label: 'USSD' },
  { icon: Bell, label: 'Push' },
  { icon: Wifi, label: 'IVR' },
  { icon: Globe, label: 'RCS' },
];

const caseHighlights = [
  { metric: '22%', label: 'conversión end-to-end', operator: 'Operador Tier 1 — LATAM' },
  { metric: '4%', label: 'CTR con segmentación AI', operator: 'Operador líder — Chile' },
  { metric: '8.3%', label: 'conversión con anti-spam', operator: 'Operador — África Occidental' },
];

const keyMetrics = [
  { value: '+500M', label: 'usuarios alcanzados' },
  { value: '+20', label: 'Telcos confían en nosotros' },
  { value: '8+', label: 'canales integrados' },
  { value: '15+', label: 'años de experiencia' },
];

export default function OnePagerCVMClient() {
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
      const res = await fetch('/api/one-pager-cvm-lead', {
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
      {/* One-pager content — A4 print-optimized */}
      <div
        className={`transition-all duration-700 ${!unlocked ? 'opacity-60' : 'opacity-100'}`}
        style={!unlocked ? { filter: 'blur(4px)' } : undefined}
      >
        <div className="one-pager-content mx-auto max-w-[210mm] bg-white text-gray-900 print:shadow-none shadow-2xl shadow-black/50 my-8 lg:my-16">
          <div className="p-8 lg:p-12 space-y-8" style={{ minHeight: '297mm' }}>
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#3b2ace] pb-6">
              <div>
                <img src="/images/dynamo-logo.svg" alt="DYNAMO" className="h-8 w-auto mb-3" />
                <p className="text-xs text-gray-500 tracking-wider uppercase">One-Pager CVM & CORE</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">dynamo.tech</p>
                <p className="text-xs text-gray-400">segundo.salvadores@dynamo.tech</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                DYNAMO Journeys para CVM & CORE Services
              </h1>
              <p className="text-base text-[#3b2ace] font-medium mt-1">
                Tu equipo de CVM con el control total
              </p>
            </div>

            {/* 6 capabilities */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                6 capacidades clave
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-1">
                      <cap.icon className="w-4 h-4 text-[#3b2ace]" />
                      <p className="text-xs font-semibold text-gray-900">{cap.title}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                8+ canales integrados
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {channels.map((ch) => (
                  <div key={ch.label} className="flex flex-col items-center gap-1.5 w-16">
                    <div className="w-10 h-10 rounded-lg bg-[#3b2ace]/10 flex items-center justify-center">
                      <ch.icon className="w-4 h-4 text-[#3b2ace]" />
                    </div>
                    <p className="text-[10px] font-medium text-gray-600">{ch.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Case highlights */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                Resultados reales
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {caseHighlights.map((cs) => (
                  <div key={cs.operator} className="text-center p-4 rounded-xl border border-[#3b2ace]/10 bg-[#3b2ace]/[0.02]">
                    <p className="text-2xl font-bold text-[#3b2ace]">{cs.metric}</p>
                    <p className="text-xs text-gray-600 mt-1">{cs.label}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">{cs.operator}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key metrics */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                DYNAMO en números
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {keyMetrics.map((m) => (
                  <div key={m.label} className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-gray-900">{m.value}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-[#3b2ace] pt-6 mt-auto">
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
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
                <Download className="w-7 h-7 text-purple-400" />
              </div>
              <h2 className="text-white font-heading text-2xl font-bold mb-2">
                One-Pager CVM & CORE
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Ingresa tu email para acceder al resumen ejecutivo de DYNAMO Journeys para CVM
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="tu@empresa.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-colors"
                  />
                </div>
                {emailError && <p className="text-red-400 text-xs text-left">{emailError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {submitting ? 'Procesando...' : 'Descargar One-Pager CVM'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
