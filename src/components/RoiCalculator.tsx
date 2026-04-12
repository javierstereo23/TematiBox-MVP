'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingDown, TrendingUp, DollarSign, Users, ArrowRight, Lock, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-sm font-semibold text-lime tabular-nums">{format(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="roi-slider w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
          style={{
            background: `linear-gradient(to right, #CDFF00 0%, #CDFF00 ${percent}%, rgba(255,255,255,0.1) ${percent}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-4 border ${accent ? 'border-lime/20 bg-lime/5' : 'border-white/10 bg-white/[0.02]'}`}>
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <p className={`text-xl font-heading font-bold tabular-nums ${accent ? 'text-lime' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-white/30 mt-1">{sub}</p>}
    </div>
  );
}

function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current);
      ref.current = current;
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [value]);

  return <>{prefix}{formatCurrency(display)}</>;
}

export default function RoiCalculator() {
  const locale = useLocale();
  const [audience, setAudience] = useState(100_000);
  const [waCost, setWaCost] = useState(0.07);
  const [openRate, setOpenRate] = useState(0.95);
  const [convRate, setConvRate] = useState(0.03);

  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const results = useMemo(() => {
    // WhatsApp Only
    const waTotalCost = audience * waCost;
    const waLeads = audience * openRate * convRate;
    const waCpl = waLeads > 0 ? waTotalCost / waLeads : 0;

    // SAT Push + WhatsApp (DYNAMO)
    const satCostPerMsg = 0.003; // CPM $3
    const satDelivery = 0.95;
    const satPushCost = audience * satCostPerMsg;
    const interestedUsers = audience * satDelivery * convRate;
    const waRecontactCost = interestedUsers * waCost;
    const dynamoTotalCost = satPushCost + waRecontactCost;
    const dynamoLeads = interestedUsers; // same conversion on interested users
    const dynamoCpl = dynamoLeads > 0 ? dynamoTotalCost / dynamoLeads : 0;

    // Savings
    const dollarSavings = waTotalCost - dynamoTotalCost;
    const percentSavings = waTotalCost > 0 ? (dollarSavings / waTotalCost) * 100 : 0;
    const additionalLeads = dynamoLeads - waLeads;

    return {
      wa: { totalCost: waTotalCost, leads: waLeads, cpl: waCpl },
      dynamo: {
        satPushCost,
        interestedUsers,
        waRecontactCost,
        totalCost: dynamoTotalCost,
        leads: dynamoLeads,
        cpl: dynamoCpl,
      },
      savings: { dollar: dollarSavings, percent: percentSavings, additionalLeads },
    };
  }, [audience, waCost, openRate, convRate]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Ingresa un email valido');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/roi-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          audienceSize: audience,
          waCost,
          openRate,
          conversionRate: convRate,
          waOnlyCost: results.wa.totalCost,
          dynamoCost: results.dynamo.totalCost,
          savings: results.savings.dollar,
        }),
      });

      if (res.ok) {
        setUnlocked(true);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 5000);
      }
    } catch {
      setEmailError('Error al enviar. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Slider card */}
      <style jsx global>{`
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #CDFF00;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(205, 255, 0, 0.4);
          border: 2px solid #050510;
        }
        .roi-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #CDFF00;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(205, 255, 0, 0.4);
          border: 2px solid #050510;
        }
      `}</style>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-5 h-5 text-lime" />
          <h3 className="font-heading text-lg font-semibold text-white">Configurar escenario</h3>
        </div>
        <SliderInput
          label="Audiencia objetivo"
          value={audience}
          min={10_000}
          max={10_000_000}
          step={10_000}
          format={(v) => formatNumber(v)}
          onChange={setAudience}
        />
        <SliderInput
          label="Costo por mensaje WhatsApp"
          value={waCost}
          min={0.03}
          max={0.15}
          step={0.005}
          format={(v) => `$${v.toFixed(3)}`}
          onChange={setWaCost}
        />
        <SliderInput
          label="Tasa de apertura WhatsApp"
          value={openRate}
          min={0.5}
          max={0.98}
          step={0.01}
          format={(v) => formatPercent(v * 100)}
          onChange={setOpenRate}
        />
        <SliderInput
          label="Tasa de conversión"
          value={convRate}
          min={0.01}
          max={0.1}
          step={0.005}
          format={(v) => formatPercent(v * 100)}
          onChange={setConvRate}
        />
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WhatsApp Only — always visible */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <h3 className="font-heading text-base font-semibold text-white/70">Sin DYNAMO</h3>
            <span className="text-xs text-white/30 ml-auto">Solo WhatsApp</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Costo total" value={formatCurrency(results.wa.totalCost)} />
            <MetricCard label="Leads generados" value={formatNumber(results.wa.leads)} />
            <div className="col-span-2">
              <MetricCard label="Costo por lead (CPL)" value={formatCurrency(results.wa.cpl)} sub="Toda la audiencia recibe WA" />
            </div>
          </div>
        </div>

        {/* DYNAMO — gated behind email */}
        <div className="relative rounded-2xl border border-lime/20 bg-lime/[0.02] backdrop-blur-xl p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-lime" />
            <h3 className="font-heading text-base font-semibold text-lime">Con DYNAMO Journeys</h3>
            {!unlocked && <Lock className="w-3.5 h-3.5 text-lime/50 ml-1" />}
            <span className="text-xs text-lime/50 ml-auto">SAT Push + WhatsApp</span>
          </div>

          <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ${!unlocked ? 'select-none' : ''}`}
               style={!unlocked ? { filter: 'blur(8px)' } : undefined}>
            <MetricCard label="Costo SAT Push" value={formatCurrency(results.dynamo.satPushCost)} accent sub="CPM $3" />
            <MetricCard label="Usuarios interesados" value={formatNumber(results.dynamo.interestedUsers)} accent sub="95% delivery rate" />
            <MetricCard label="Recontacto WA" value={formatCurrency(results.dynamo.waRecontactCost)} accent sub="Solo interesados" />
            <MetricCard label="Costo total" value={formatCurrency(results.dynamo.totalCost)} accent />
            <div className="col-span-2">
              <MetricCard label="Costo por lead (CPL)" value={formatCurrency(results.dynamo.cpl)} accent sub="WhatsApp solo a quienes hicieron click OK" />
            </div>
          </div>

          {/* Gate overlay */}
          <AnimatePresence>
            {!unlocked && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(5,5,16,0.7) 0%, rgba(5,5,16,0.5) 50%, rgba(205,255,0,0.05) 100%)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <div className="text-center px-6 max-w-sm">
                  <div className="w-12 h-12 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-5 h-5 text-lime" />
                  </div>
                  <p className="text-white font-heading font-semibold text-lg mb-2">
                    Descubri cuanto podes ahorrar con DYNAMO Journeys
                  </p>
                  <p className="text-white/40 text-sm mb-5">
                    Ingresa tu email para ver los resultados completos
                  </p>
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                        placeholder="tu@empresa.com"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-lime/40 focus:ring-1 focus:ring-lime/20 transition-colors"
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-400 text-xs">{emailError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-lime text-deep font-semibold rounded-xl text-sm hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {submitting ? 'Enviando...' : 'Ver resultados'}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Savings banner — also gated */}
      <div className="relative">
        <div className={`transition-all duration-500 ${!unlocked ? 'select-none' : ''}`}
             style={!unlocked ? { filter: 'blur(8px)' } : undefined}>
          <motion.div
            key={unlocked ? `${audience}-${waCost}-${openRate}-${convRate}` : 'locked'}
            initial={unlocked ? { opacity: 0.8, scale: 0.98 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-lime/30 bg-gradient-to-r from-lime/10 via-lime/5 to-transparent backdrop-blur-xl p-6 lg:p-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Ahorro total</p>
                  <p className="text-3xl lg:text-4xl font-heading font-bold text-lime tabular-nums">
                    {unlocked ? <AnimatedCounter value={results.savings.dollar} /> : formatCurrency(results.savings.dollar)}
                  </p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10" />
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <TrendingDown className="w-4 h-4 text-lime" />
                      <p className="text-2xl font-heading font-bold text-lime tabular-nums">
                        {formatPercent(results.savings.percent)}
                      </p>
                    </div>
                    <p className="text-xs text-white/40 mt-1">Reduccion de costos</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <TrendingUp className="w-4 h-4 text-lime" />
                      <p className="text-2xl font-heading font-bold text-lime tabular-nums">
                        {results.savings.additionalLeads > 0 ? '+' : ''}{formatNumber(results.savings.additionalLeads)}
                      </p>
                    </div>
                    <p className="text-xs text-white/40 mt-1">Leads adicionales</p>
                  </div>
                </div>
              </div>

              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-deep font-semibold rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              >
                Queres estos resultados? Agendar Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Savings banner gate overlay */}
        <AnimatePresence>
          {!unlocked && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(5,5,16,0.6) 0%, rgba(5,5,16,0.4) 100%)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <p className="text-white/50 text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Ingresa tu email arriba para ver el ahorro
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation message after unlock */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-lime/20 bg-lime/5"
          >
            <CheckCircle className="w-5 h-5 text-lime flex-shrink-0" />
            <p className="text-sm text-white/70">
              Te enviaremos un resumen detallado a <span className="text-lime font-medium">{email}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
