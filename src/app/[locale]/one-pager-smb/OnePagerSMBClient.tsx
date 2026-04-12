'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, Bot, Megaphone, Headphones, BarChart3, MessageSquare, Smartphone, Send, Bell, Wifi, Globe, Phone, Radio, ShoppingCart, Plane, Shield, Heart, GraduationCap } from 'lucide-react';

const modules = [
  { icon: Bot, title: 'Chatbot Builder', desc: 'Diseñá flows conversacionales con AI, sin código' },
  { icon: Megaphone, title: 'Campaign Manager', desc: 'Campañas masivas y segmentadas por múltiples canales' },
  { icon: Headphones, title: 'Contact Center', desc: 'Bandeja unificada con asignación y escalamiento inteligente' },
  { icon: BarChart3, title: 'Metrics', desc: 'Dashboards en tiempo real con métricas de engagement y conversión' },
];

const channels = [
  { icon: MessageSquare, label: 'WhatsApp' },
  { icon: Send, label: 'SMS' },
  { icon: Mail, label: 'Email' },
  { icon: Bell, label: 'Push' },
  { icon: Globe, label: 'Web Chat' },
  { icon: Phone, label: 'IVR' },
  { icon: Radio, label: 'RCS' },
  { icon: Smartphone, label: 'App' },
];

const industries = [
  { icon: ShoppingCart, name: 'E-commerce' },
  { icon: Plane, name: 'Turismo' },
  { icon: Shield, name: 'Seguros' },
  { icon: Heart, name: 'Salud' },
  { icon: GraduationCap, name: 'Educación' },
];

const stats = [
  { value: '90%', label: 'satisfacción de clientes' },
  { value: '+70', label: 'empresas activas' },
  { value: '8', label: 'canales integrados' },
  { value: '24/7', label: 'operación continua' },
];

export default function OnePagerSMBClient() {
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
      const res = await fetch('/api/one-pager-smb-lead', {
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
            <div className="flex items-center justify-between border-b-2 border-[#7c3aed] pb-6">
              <div>
                <img src="/images/dynamo-logo.svg" alt="DYNAMO" className="h-8 w-auto mb-3" />
                <p className="text-xs text-gray-500 tracking-wider uppercase">One-Pager Empresas</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">dynamo.tech</p>
                <p className="text-xs text-gray-400">segundo.salvadores@dynamo.tech</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                DYNAMO Studio para Empresas
              </h1>
              <p className="text-base text-[#7c3aed] font-medium mt-1">
                La plataforma conversacional que impulsa tus ventas
              </p>
            </div>

            {/* 4 modules */}
            <div>
              <h2 className="text-sm font-bold text-[#7c3aed] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#7c3aed] inline-block" />
                4 módulos integrados
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {modules.map((mod) => (
                  <div key={mod.title} className="p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <mod.icon className="w-5 h-5 text-[#7c3aed]" />
                      <p className="text-sm font-semibold text-gray-900">{mod.title}</p>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{mod.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 channels */}
            <div>
              <h2 className="text-sm font-bold text-[#7c3aed] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#7c3aed] inline-block" />
                8 canales
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {channels.map((ch) => (
                  <div key={ch.label} className="flex flex-col items-center gap-1.5 w-16">
                    <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center">
                      <ch.icon className="w-4 h-4 text-[#7c3aed]" />
                    </div>
                    <p className="text-[10px] font-medium text-gray-600">{ch.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div>
              <h2 className="text-sm font-bold text-[#7c3aed] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#7c3aed] inline-block" />
                5 industrias
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {industries.map((ind) => (
                  <div key={ind.name} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-100 bg-gray-50/50">
                    <ind.icon className="w-4 h-4 text-[#7c3aed]" />
                    <p className="text-xs font-medium text-gray-700">{ind.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h2 className="text-sm font-bold text-[#7c3aed] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#7c3aed] inline-block" />
                DYNAMO Studio en números
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="text-center p-3 bg-[#7c3aed]/[0.03] border border-[#7c3aed]/10 rounded-lg">
                    <p className="text-xl font-bold text-[#7c3aed]">{s.value}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-[#7c3aed] pt-6 mt-auto">
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
                One-Pager DYNAMO Studio
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Ingresa tu email para acceder al resumen ejecutivo de DYNAMO Studio para Empresas
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
                  className="w-full py-3.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {submitting ? 'Procesando...' : 'Descargar One-Pager Empresas'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
