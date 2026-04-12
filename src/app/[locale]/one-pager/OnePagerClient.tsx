'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Download, CheckCircle, Zap, BarChart3, Bell, Shield, Layers, MessageSquare, Smartphone, Send, Radio, Wifi, Globe, Monitor, Phone } from 'lucide-react';

const capabilities = [
  { icon: Layers, title: 'Orquestación', desc: 'Diseñá journeys multicanal con lógica drag-and-drop' },
  { icon: BarChart3, title: 'KPIs en tiempo real', desc: 'Dashboards con métricas de conversión y engagement' },
  { icon: Bell, title: 'Triggers inteligentes', desc: 'Activa campañas por eventos, fechas o comportamiento' },
  { icon: Shield, title: 'Reglas de negocio', desc: 'Control de frecuencia, horarios y compliance' },
  { icon: Zap, title: 'Campaign Manager', desc: 'Gestión centralizada de campañas con A/B testing' },
];

const channels = [
  { icon: MessageSquare, label: 'SAT Push' },
  { icon: Send, label: 'WhatsApp' },
  { icon: Smartphone, label: 'SMS' },
  { icon: Mail, label: 'Email' },
  { icon: Radio, label: 'USSD' },
  { icon: Bell, label: 'Push' },
  { icon: Wifi, label: 'IVR' },
  { icon: Globe, label: 'RCS' },
];

const caseStudies = [
  { metric: '22%', label: 'conversión en upselling', client: 'Operador Tier 1 — LATAM' },
  { metric: '98%', label: 'campañas fraud-free', client: 'Operador regional — Colombia' },
  { metric: '2M', label: 'euros en revenue recuperado', client: 'Operador — Sudáfrica' },
];

const metrics = [
  { value: '+500M', label: 'usuarios alcanzados' },
  { value: '+20', label: 'Telcos confían en nosotros' },
  { value: '+10', label: 'paises en 3 continentes' },
  { value: '15+', label: 'anos de experiencia' },
];

export default function OnePagerClient() {
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showInstruction, setShowInstruction] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Ingresa un email valido');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/one-pager-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setUnlocked(true);
        setShowInstruction(true);
        setTimeout(() => {
          window.print();
        }, 800);
      }
    } catch {
      setEmailError('Error al enviar. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* The one-pager content — designed for A4 print */}
      <div className={`transition-all duration-700 ${!unlocked ? 'opacity-60' : 'opacity-100'}`}
           style={!unlocked ? { filter: 'blur(4px)' } : undefined}>
        <div className="one-pager-content mx-auto max-w-[210mm] bg-white text-gray-900 print:shadow-none shadow-2xl shadow-black/50 my-8 lg:my-16">
          <div className="p-8 lg:p-12 space-y-8" style={{ minHeight: '297mm' }}>
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#3b2ace] pb-6">
              <div>
                <img
                  src="/images/dynamo-logo.svg"
                  alt="DYNAMO"
                  className="h-8 w-auto mb-3"
                />
                <p className="text-xs text-gray-500 tracking-wider uppercase">One-Pager Ejecutivo</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">dynamo.tech</p>
                <p className="text-xs text-gray-400">segundo.salvadores@dynamo.tech</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                DYNAMO Journeys
              </h1>
              <p className="text-base text-[#3b2ace] font-medium mt-1">
                Plataforma de Orquestacion Omnicanal para Telcos
              </p>
            </div>

            {/* Section 1: What is */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                Qué es DYNAMO Journeys
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                DYNAMO Journeys es una plataforma SaaS de orquestación omnicanal diseñada para operadores de telecomunicaciones. Permite crear, gestionar y optimizar customer journeys automatizados que integran múltiples canales de comunicación, desde SAT Push hasta WhatsApp, maximizando la conversión y minimizando costos operativos.
              </p>
            </div>

            {/* Section 2: 5 capabilities */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                5 capacidades clave
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="text-center p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                    <cap.icon className="w-5 h-5 text-[#3b2ace] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-900">{cap.title}</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Channels */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                Canales integrados
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

            {/* Section 4: Case studies */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                Resultados reales
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {caseStudies.map((cs) => (
                  <div key={cs.client} className="text-center p-4 rounded-xl border border-[#3b2ace]/10 bg-[#3b2ace]/[0.02]">
                    <p className="text-2xl font-bold text-[#3b2ace]">{cs.metric}</p>
                    <p className="text-xs text-gray-600 mt-1">{cs.label}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium uppercase">{cs.client}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Metrics */}
            <div>
              <h2 className="text-sm font-bold text-[#3b2ace] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#3b2ace] inline-block" />
                DYNAMO en numeros
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {metrics.map((m) => (
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
            style={{
              background: 'radial-gradient(ellipse at center, rgba(5,5,16,0.85) 0%, rgba(5,5,16,0.95) 100%)',
            }}
          >
            <div className="text-center px-6 max-w-md w-full">
              <div className="w-16 h-16 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-6">
                <Download className="w-7 h-7 text-lime" />
              </div>
              <h2 className="text-white font-heading text-2xl font-bold mb-2">
                Descarga el One-Pager de DYNAMO Journeys
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Ingresa tu email para acceder al resumen ejecutivo completo
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
                {emailError && (
                  <p className="text-red-400 text-xs text-left">{emailError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-lime text-deep font-semibold rounded-xl text-sm hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {submitting ? 'Enviando...' : 'Descargar One-Pager'}
                </button>
              </form>
              <p className="text-white/20 text-xs mt-4">
                No compartimos tu información. Solo te enviaremos contenido relevante.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print instruction after unlock */}
      <AnimatePresence>
        {showInstruction && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 print:hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-lime/20 bg-deep/95 backdrop-blur-xl shadow-2xl">
              <CheckCircle className="w-5 h-5 text-lime flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-medium">Guardar como PDF: Cmd+P (Mac) o Ctrl+P (Windows)</p>
                <p className="text-xs text-white/40 mt-0.5">La ventana de impresion se abrira automaticamente</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
