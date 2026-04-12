'use client';

import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Mail,
  MessageCircle,
  WifiOff,
  Smartphone,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';

/* ================================================================
   21st.dev-inspired BgGradient — radial purple gradient background
   ================================================================ */
function BgGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,42,206,0.18) 0%, rgba(59,42,206,0.06) 40%, rgba(5,5,16,0) 70%)',
        }}
      />
      {/* Top warm glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(91,74,222,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Bottom accent radial (21st.dev style) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(59,42,206,0.1) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

/* ================================================================
   Grid overlay with radial mask (fades out from center)
   ================================================================ */
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(91,74,222,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91,74,222,0.04) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 70%)',
      }}
    />
  );
}

/* ================================================================
   Animated gradient orbs — slow floating blurs
   ================================================================ */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple orb top-left */}
      <motion.div
        className="absolute -top-[15%] -left-[5%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,42,206,0.22) 0%, rgba(59,42,206,0.06) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 30, -15, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Lime orb bottom-right */}
      <motion.div
        className="absolute -bottom-[10%] right-[0%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(205,255,0,0.1) 0%, rgba(205,255,0,0.03) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{ x: [0, -25, 20, 0], y: [0, 20, -25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Purple orb center-right */}
      <motion.div
        className="absolute top-[25%] right-[10%] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(91,74,222,0.14) 0%, rgba(91,74,222,0.04) 45%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, -20, 15, 0], y: [0, 15, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Subtle lime-purple mix orb */}
      <motion.div
        className="absolute top-[60%] left-[25%] w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
        animate={{ x: [0, 18, -12, 0], y: [0, -12, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ================================================================
   TextStagger — word-by-word entrance from below
   ================================================================ */
function TextStagger({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const words = children.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

/* ================================================================
   Journey Flow Visualization (desktop) — Animated storytelling
   Shows a real journey: Event → SAT Push → WhatsApp → SMS
   ================================================================ */
const CYCLE = 8; // total loop duration in seconds

const flowTexts: Record<string, Record<string, string>> = {
  es: { event: 'Plan de datos vencido', brain: 'AI Brain', operator: 'OPERADOR MÓVIL', satMsg: 'Tu plan de datos está a punto de vencerse. Tenemos un mejor plan para ti.', cancel: 'Cancelar', waMsg: 'Te compartimos 3 opciones para activar tu nuevo plan:' },
  en: { event: 'Data plan expired', brain: 'AI Brain', operator: 'MOBILE OPERATOR', satMsg: 'Your data plan is about to expire. We have a better plan for you.', cancel: 'Cancel', waMsg: 'Here are 3 options to activate your new plan:' },
  fr: { event: 'Forfait données expiré', brain: 'AI Brain', operator: 'OPÉRATEUR MOBILE', satMsg: 'Votre forfait est sur le point d\'expirer. Nous avons un meilleur plan pour vous.', cancel: 'Annuler', waMsg: 'Voici 3 options pour activer votre nouveau forfait :' },
  pt: { event: 'Plano de dados expirado', brain: 'AI Brain', operator: 'OPERADORA MÓVEL', satMsg: 'Seu plano de dados está prestes a expirar. Temos um plano melhor para você.', cancel: 'Cancelar', waMsg: 'Compartilhamos 3 opções para ativar seu novo plano:' },
};

function JourneyFlowVisualization({ locale }: { locale: string }) {
  const ft = flowTexts[locale] || flowTexts.es;
  const svgW = 440;
  const svgH = 440;

  // 3 steps only: Event → SAT Push → WhatsApp (more vertical spacing)
  const eventY = 20;
  const satY = 130;
  const waY = 290;

  // X positions — diagonal cascade
  const eventX = 180;
  const satX = 110;
  const waX = 20;

  // Cable paths
  const cable1 = `M${eventX + 70},${eventY + 36} C${eventX + 40},${eventY + 80} ${satX + 100},${satY - 20} ${satX + 60},${satY + 5}`;
  const cable2 = `M${satX + 80},${satY + 95} C${satX + 30},${satY + 160} ${waX + 120},${waY - 40} ${waX + 80},${waY + 5}`;

  // AI Brain position (between event and SAT Push)
  const brainX = (eventX + satX) / 2 + 30;
  const brainY = (eventY + satY) / 2 + 10;

  const cardStyle: React.CSSProperties = {
    background: 'rgba(10,10,28,0.75)',
    border: '1px solid rgba(139,92,246,0.2)',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 12px rgba(139,92,246,0.06)',
  };

  return (
    <div className="relative" style={{ width: svgW, height: svgH }}>
      {/* Background glow */}
      <div
        className="absolute inset-[-15%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,42,206,0.09) 0%, transparent 70%)',
        }}
      />

      {/* SVG cables layer */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        fill="none"
      >
        <defs>
          <linearGradient id="cable-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#CDFF00" />
          </linearGradient>
        </defs>

        {/* Cable 1: Event → SAT Push */}
        <motion.path
          d={cable1}
          stroke="url(#cable-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 1, 1, 1, 0], opacity: [0, 0, 1, 1, 1, 1, 1, 0] }}
          transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.05, 0.12, 0.5, 0.7, 0.75, 0.85, 1], ease: 'easeInOut' }}
        />
        {/* Data dot traveling cable 1 */}
        <motion.circle
          r="3"
          fill="#CDFF00"
          filter="drop-shadow(0 0 4px #CDFF00)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: ['0%', '0%', '100%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE * 0.15, repeat: Infinity, repeatDelay: CYCLE * 0.85, delay: 0.5, ease: 'easeInOut' }}
          style={{ offsetPath: `path("${cable1}")` }}
        />

        {/* Cable 2: SAT Push → WhatsApp */}
        <motion.path
          d={cable2}
          stroke="url(#cable-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0, 0, 1, 1, 1, 1, 0], opacity: [0, 0, 0, 1, 1, 1, 1, 0] }}
          transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.12, 0.24, 0.32, 0.5, 0.7, 0.85, 1], ease: 'easeInOut' }}
        />
        <motion.circle
          r="3"
          fill="#CDFF00"
          filter="drop-shadow(0 0 4px #CDFF00)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: ['0%', '0%', '100%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE * 0.12, repeat: Infinity, repeatDelay: CYCLE * 0.88, delay: 2, ease: 'easeInOut' }}
          style={{ offsetPath: `path("${cable2}")` }}
        />

      </svg>

      {/* ── Step 1: Event Trigger Badge ── */}
      <motion.div
        className="absolute"
        style={{ left: eventX, top: eventY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 1, 1, 1, 1, 0],
          scale: [0.8, 1, 1, 1, 1, 1, 0.8],
        }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.03, 0.1, 0.6, 0.7, 0.85, 1], ease: 'easeInOut' }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{
            background: 'rgba(10,10,28,0.8)',
            border: '1px solid rgba(205,255,0,0.3)',
            boxShadow: '0 0 20px rgba(205,255,0,0.08), 0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <WifiOff size={14} className="text-lime-400" />
          </motion.div>
          <span className="text-[12px] font-semibold text-white/80 whitespace-nowrap">
            {ft.event}
          </span>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-lime-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* ── AI Brain badge ── */}
      <motion.div
        className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          left: brainX,
          top: brainY,
          background: 'rgba(59,42,206,0.15)',
          border: '1px solid rgba(59,42,206,0.3)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 0, 0.9, 0.9, 0.9, 0.9, 0],
          scale: [0.8, 0.8, 1, 1, 1, 1, 0.8],
        }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.06, 0.1, 0.5, 0.7, 0.85, 1], ease: 'easeInOut' }}
      >
        <BrainCircuit size={10} className="text-purple-400" />
        <span className="text-[8px] font-bold text-purple-300 uppercase tracking-wider">{ft.brain}</span>
      </motion.div>

      {/* ── Step 2: SAT Push Notification ── */}
      <motion.div
        className="absolute rounded-2xl overflow-hidden"
        style={{ left: satX, top: satY, width: 220, ...cardStyle }}
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: [0, 0, 1, 1, 1, 1, 0],
          y: [16, 16, 0, 0, 0, 0, 16],
        }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.1, 0.14, 0.6, 0.7, 0.85, 1], ease: 'easeInOut' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3.5 pt-3 pb-2">
          <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center">
            <span className="text-[7px] font-black text-white leading-none">SAT</span>
          </div>
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">{ft.operator}</span>
        </div>
        {/* Body */}
        <div className="px-3.5 pb-2">
          <p className="text-[11px] text-white/50 leading-relaxed">
            {ft.satMsg}
          </p>
        </div>
        {/* Buttons */}
        <div className="flex border-t border-white/[0.06]">
          <button className="flex-1 text-[11px] text-white/30 font-medium py-2 hover:bg-white/[0.03] transition-colors">
            {ft.cancel}
          </button>
          <div className="w-px bg-white/[0.06]" />
          <motion.button
            className="flex-1 text-[11px] text-purple-400 font-semibold py-2"
            animate={{ backgroundColor: ['rgba(124,58,237,0)', 'rgba(124,58,237,0.1)', 'rgba(124,58,237,0)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >
            OK
          </motion.button>
        </div>
      </motion.div>

      {/* ── Step 3: WhatsApp Message ── */}
      <motion.div
        className="absolute rounded-2xl overflow-hidden"
        style={{ left: waX, top: waY, width: 235, ...cardStyle, borderColor: 'rgba(37,211,102,0.2)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: [0, 0, 0, 1, 1, 1, 0],
          y: [16, 16, 16, 0, 0, 0, 16],
        }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.2, 0.29, 0.33, 0.6, 0.85, 1], ease: 'easeInOut' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3.5 pt-3 pb-2">
          <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" width="11" height="11">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-[#25D366]/80 uppercase tracking-wider">WhatsApp</span>
        </div>
        {/* Body */}
        <div className="px-3.5 pb-2">
          <p className="text-[11px] text-white/50 leading-relaxed mb-2.5">
            {ft.waMsg}
          </p>
          {/* Option pills */}
          <div className="flex flex-wrap gap-1.5">
            {['4GB $5/mes', '2GB $3/mes', 'Ilimitados $10/mes'].map((opt, i) => (
              <motion.span
                key={opt}
                className="text-[9px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(37,211,102,0.12)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  color: 'rgba(37,211,102,0.9)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0, 0, 0, 1, 1, 0],
                  scale: [0.8, 0.8, 0.8, 0.8, 1, 1, 0.8],
                }}
                transition={{
                  duration: CYCLE,
                  repeat: Infinity,
                  times: [0, 0.2, 0.29, 0.33 + i * 0.02, 0.36 + i * 0.02, 0.85, 1],
                  ease: 'easeInOut',
                }}
              >
                {opt}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="h-2" />
      </motion.div>

    </div>
  );
}

/* ================================================================
   Mobile channel grid (simplified channels for small screens)
   ================================================================ */
const mobileChannels = [
  { name: 'WhatsApp', color: '#25D366', icon: <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg> },
  { name: 'SAT Push', color: '#7C3AED', icon: <Smartphone size={18} className="text-white" /> },
  { name: 'SMS', color: '#16A34A', icon: <MessageCircle size={18} className="text-white" /> },
  { name: 'Email', color: '#F59E0B', icon: <Mail size={18} className="text-white" /> },
];

function MobileChannels() {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 mt-8 sm:hidden">
      {mobileChannels.map((ch, i) => (
        <motion.div
          key={ch.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="w-5 h-5 rounded-md flex items-center justify-center opacity-50" style={{ color: ch.color }}>
            <div className="scale-[0.75]">{ch.icon}</div>
          </div>
          <span className="text-[11px] text-white/40 font-medium">{ch.name}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ================================================================
   Mobile Orchestration Showcase — Single-play mobile-only animation
   Plays once on mount, then all elements stay static and visible.
   Timeline: Brain → Channels → Cables → Event → Dispatch to SAT →
             Card appears → Cascade to WA/SMS → SAT dispatches to Telco
   ================================================================ */
function MobileOrchestrationShowcase({ locale }: { locale: string }) {
  const ft = flowTexts[locale] || flowTexts.es;

  // SVG / layout coordinate system
  const W = 360;
  const H = 620;
  const brainBottom = { x: 180, y: 104 };

  const channels = [
    { id: 'wa', x: 58, y: 178, color: '#25D366', label: 'WhatsApp', hero: false },
    { id: 'sms', x: 302, y: 178, color: '#16A34A', label: 'SMS', hero: false },
    { id: 'sat', x: 180, y: 232, color: '#7C3AED', label: 'SAT Push', hero: true },
    { id: 'rcs', x: 68, y: 298, color: '#4285F4', label: 'RCS', hero: false },
    { id: 'email', x: 292, y: 298, color: '#F59E0B', label: 'Email', hero: false },
  ];

  // Telco Infrastructure antenna — receives dispatched SAT Push messages
  const telcoInfra = { x: 180, y: 560 };

  // Bezier cable paths from brain center-bottom to each channel node
  const cablePaths = channels.map((ch) => {
    const dx = ch.x - brainBottom.x;
    const dy = ch.y - brainBottom.y;
    const qx = Math.round(brainBottom.x + dx * 0.35);
    const qy = Math.round(brainBottom.y + dy * 0.55);
    return `M${brainBottom.x},${brainBottom.y} Q${qx},${qy} ${ch.x},${ch.y - 22}`;
  });

  // Cable from SAT Push node to Telco Infrastructure (dispatched message path)
  const satToInfraPath = `M180,262 L180,${telcoInfra.y - 27}`;

  const pct = (v: number, total: number) => `${(v / total) * 100}%`;

  const cardStyle: React.CSSProperties = {
    background: 'rgba(10,10,28,0.85)',
    border: '1px solid rgba(124,58,237,0.25)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(124,58,237,0.08)',
  };

  return (
    <div
      className="relative w-full max-w-[400px] mx-auto"
      style={{ aspectRatio: `${W}/${H}` }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-[-10%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 50% 25%, rgba(59,42,206,0.15) 0%, transparent 70%)',
        }}
      />

      {/* ── SVG Layer: cables & traveling pulses ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <linearGradient id="mcg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#CDFF00" />
          </linearGradient>
        </defs>

        {/* Static cables with draw-in entrance */}
        {cablePaths.map((path, i) => (
          <motion.path
            key={`cable-${channels[i].id}`}
            d={path}
            stroke="url(#mcg)"
            strokeWidth={channels[i].hero ? 2 : 1.5}
            strokeLinecap="round"
            opacity={channels[i].hero ? 0.5 : 0.35}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {/* Cable SAT Push → Telco Infrastructure (draws in after card appears) */}
        <motion.path
          d={satToInfraPath}
          stroke="url(#mcg)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.45}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 4.3, ease: 'easeOut' }}
        />

        {/* Dispatch pulse → SAT Push (single play, ~2.4s) */}
        <motion.circle
          r="3.5"
          fill="#CDFF00"
          style={{
            offsetPath: `path("${cablePaths[2]}")`,
            filter: 'drop-shadow(0 0 6px #CDFF00)',
          }}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{
            offsetDistance: ['0%', '0%', '100%', '100%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 0.8, delay: 2.2, times: [0, 0.1, 0.9, 1] }}
        />

        {/* Dispatch pulse → WhatsApp (single play, ~3.5s) */}
        <motion.circle
          r="3"
          fill="#CDFF00"
          style={{
            offsetPath: `path("${cablePaths[0]}")`,
            filter: 'drop-shadow(0 0 5px #CDFF00)',
          }}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{
            offsetDistance: ['0%', '0%', '100%', '100%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 0.7, delay: 3.5, times: [0, 0.1, 0.9, 1] }}
        />

        {/* Dispatch pulse → SMS (single play, ~3.6s) */}
        <motion.circle
          r="3"
          fill="#CDFF00"
          style={{
            offsetPath: `path("${cablePaths[1]}")`,
            filter: 'drop-shadow(0 0 5px #CDFF00)',
          }}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{
            offsetDistance: ['0%', '0%', '100%', '100%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 0.7, delay: 3.7, times: [0, 0.1, 0.9, 1] }}
        />

        {/* Dispatch pulse → Telco Infrastructure (single play, after cable draws) */}
        <motion.circle
          r="4"
          fill="#CDFF00"
          style={{
            offsetPath: `path("${satToInfraPath}")`,
            filter: 'drop-shadow(0 0 7px #CDFF00)',
          }}
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{
            offsetDistance: ['0%', '0%', '100%', '100%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 0.9, delay: 4.6, times: [0, 0.1, 0.9, 1] }}
        />
      </svg>

      {/* ── Event Trigger Badge (single play entrance, stays visible) ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '1.5%' }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
      >
        <div
          className="flex items-center gap-2 px-3.5 py-2 rounded-full"
          style={{
            background: 'rgba(10,10,28,0.8)',
            border: '1px solid rgba(205,255,0,0.3)',
            boxShadow: '0 0 16px rgba(205,255,0,0.08), 0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          <WifiOff size={13} className="text-lime-400" />
          <span className="text-[11px] font-semibold text-white/80 whitespace-nowrap">
            {ft.event}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
        </div>
      </motion.div>

      {/* ── Brain Node (center hub, single dispatch pulse then static) ── */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        style={{ left: '50%', top: pct(78, H) }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative w-[52px] h-[52px]">
          {/* Static dashed ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: '1.5px dashed rgba(124,58,237,0.3)' }}
          />
          {/* Core — single scale pulse when dispatching */}
          <motion.div
            className="absolute inset-[3px] rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(59,42,206,0.25) 0%, rgba(59,42,206,0.08) 70%)',
              boxShadow: '0 0 20px rgba(59,42,206,0.2)',
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 0.6, delay: 2.0, ease: 'easeInOut' }}
          >
            <BrainCircuit size={20} className="text-purple-400" />
          </motion.div>
        </div>
        <span className="text-[8px] font-bold text-purple-300/60 uppercase tracking-wider">
          {ft.brain}
        </span>
      </motion.div>

      {/* ── Channel Nodes ── */}
      {channels.map((ch, i) => (
        <motion.div
          key={ch.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: pct(ch.x, W), top: pct(ch.y, H) }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: ch.hero ? 0.4 : 0.5 + i * 0.1 }}
        >
          <div className="relative">
            {/* Icon container */}
            <motion.div
              className={`flex items-center justify-center ${
                ch.hero ? 'w-[60px] h-[60px] rounded-[18px]' : 'w-[46px] h-[46px] rounded-[14px]'
              }`}
              style={{
                background: ch.hero
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))'
                  : 'rgba(255,255,255,0.04)',
                border: ch.hero
                  ? '1.5px solid rgba(124,58,237,0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: ch.hero ? '0 0 20px rgba(124,58,237,0.25)' : 'none',
              }}
              animate={
                ch.hero
                  ? {
                      boxShadow: [
                        '0 0 20px rgba(124,58,237,0.25)',
                        '0 0 35px rgba(205,255,0,0.35)',
                        '0 0 20px rgba(124,58,237,0.25)',
                      ],
                      scale: [1, 1.1, 1],
                    }
                  : {}
              }
              transition={
                ch.hero
                  ? { duration: 0.8, delay: 2.7, ease: 'easeInOut' }
                  : {}
              }
            >
              {ch.id === 'sat' && (
                <span className="text-[9px] font-black text-white leading-none px-2 py-1 rounded bg-purple-600 whitespace-nowrap">
                  SAT Push
                </span>
              )}
              {ch.id === 'wa' && (
                <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20" opacity="0.6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              )}
              {ch.id === 'sms' && <MessageCircle size={20} strokeWidth={1.5} className="text-white/50" />}
              {ch.id === 'rcs' && <span className="text-[10px] font-black text-white/50 leading-none">RCS</span>}
              {ch.id === 'email' && <Mail size={20} strokeWidth={1.5} className="text-white/50" />}
            </motion.div>

            {/* Flash overlay on cascade dispatch (single play) */}
            {(ch.id === 'wa' || ch.id === 'sms') && (
              <motion.div
                className="absolute inset-0 rounded-[14px] pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 12px ${ch.color}40, 0 0 12px ${ch.color}20`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.6,
                  delay: ch.id === 'wa' ? 4.0 : 4.2,
                  ease: 'easeInOut',
                }}
              />
            )}
          </div>

          {/* Label */}
          <span className={`text-[9px] font-medium ${ch.hero ? 'text-lime' : 'text-white/30'}`}>
            {ch.label}
          </span>
        </motion.div>
      ))}

      {/* ── SAT Push Card — depth layer (single play, stays visible) ── */}
      <motion.div
        className="absolute rounded-2xl overflow-hidden pointer-events-none"
        style={{
          left: '50%',
          top: '59%',
          width: 180,
          marginLeft: -86,
          ...cardStyle,
          filter: 'blur(1px)',
          transform: 'rotate(-2deg)',
          opacity: 0.35,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 0.5, delay: 3.2, ease: 'easeOut' }}
      >
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded bg-purple-600 flex items-center justify-center">
              <span className="text-[6px] font-black text-white">SAT</span>
            </div>
            <span className="text-[9px] font-bold text-white/40 uppercase">{ft.operator}</span>
          </div>
          <p className="text-[9px] text-white/30 leading-relaxed">{ft.satMsg}</p>
        </div>
      </motion.div>

      {/* ── SAT Push Card — primary (single play entrance, stays visible) ── */}
      <motion.div
        className="absolute rounded-2xl overflow-hidden pointer-events-none"
        style={{ left: '50%', top: '57%', width: 195, marginLeft: -97, ...cardStyle }}
        initial={{ opacity: 0, y: 20, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 3.0, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 pt-2.5 pb-1.5">
          <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center">
            <span className="text-[7px] font-black text-white leading-none">SAT</span>
          </div>
          <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider">
            {ft.operator}
          </span>
        </div>
        {/* Body */}
        <div className="px-3 pb-2">
          <p className="text-[10px] text-white/50 leading-relaxed">{ft.satMsg}</p>
        </div>
        {/* Buttons */}
        <div className="flex border-t border-white/[0.06]">
          <span className="flex-1 text-[10px] text-white/30 font-medium py-1.5 text-center">
            {ft.cancel}
          </span>
          <div className="w-px bg-white/[0.06]" />
          <span className="flex-1 text-[10px] text-purple-400 font-semibold py-1.5 text-center bg-purple-600/10">
            OK
          </span>
        </div>
      </motion.div>

      {/* ── Telco Infrastructure antenna (enters with message dispatch, single pulse) ── */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        style={{ left: pct(telcoInfra.x, W), top: pct(telcoInfra.y, H) }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="relative w-[54px] h-[54px]">
          {/* Single-play broadcasting wave ripple on message arrival */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(205,255,0,0.3) 0%, transparent 60%)',
            }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
            transition={{ duration: 1.2, delay: 5.3, ease: 'easeOut' }}
          />
          {/* Antenna core — single arrival pulse */}
          <motion.div
            className="absolute inset-0 rounded-[16px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(205,255,0,0.12), rgba(205,255,0,0.04))',
              border: '1.5px solid rgba(205,255,0,0.35)',
              boxShadow: '0 0 16px rgba(205,255,0,0.15)',
            }}
            animate={{
              boxShadow: [
                '0 0 16px rgba(205,255,0,0.15)',
                '0 0 32px rgba(205,255,0,0.5)',
                '0 0 16px rgba(205,255,0,0.15)',
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.8, delay: 5.3, ease: 'easeInOut' }}
          >
            {/* Antenna tower + broadcasting arcs SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#CDFF00" strokeWidth="1.6" strokeLinecap="round" width="24" height="24">
              {/* Outer wave arcs */}
              <path d="M5 5 a7 7 0 0 0 0 10" opacity="0.45" />
              <path d="M19 5 a7 7 0 0 1 0 10" opacity="0.45" />
              {/* Inner wave arcs */}
              <path d="M8 7.5 a4 4 0 0 0 0 5" opacity="0.75" />
              <path d="M16 7.5 a4 4 0 0 1 0 5" opacity="0.75" />
              {/* Transmitter dot */}
              <circle cx="12" cy="10" r="1.8" fill="#CDFF00" stroke="none" />
              {/* Tower base */}
              <path d="M12 12 L9.5 20 M12 12 L14.5 20 M10.5 17 L13.5 17" strokeWidth="1.4" />
            </svg>
          </motion.div>
        </div>
        <span className="text-[9px] font-bold text-lime tracking-wide text-center">
          Telco Infrastructure
        </span>
      </motion.div>
    </div>
  );
}

/* ================================================================
   Stat counter with animated entrance
   ================================================================ */
function StatItem({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="text-2xl sm:text-3xl font-bold counter-gradient leading-none">
        {value}
      </div>
      <div className="text-[11px] text-white/40 mt-2 font-medium tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
}

/* ================================================================
   MAIN HERO SECTION
   ================================================================ */
export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const stats = [
    { value: '+500M', label: t('statUsers') },
    { value: '+20', label: t('statTelcos') },
    { value: '+10', label: t('statCountries') },
    { value: '15+', label: t('statExpertise') },
  ];

  return (
    <section className="relative lg:min-h-screen lg:flex lg:items-center overflow-hidden bg-deep">
      {/* === Background layers === */}
      <BgGradient />
      <GridOverlay />
      <GradientOrbs />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,16,0.5) 0%, transparent 100%)',
        }}
      />

      {/* === Content === */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 w-full pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-32">
        <div className="relative z-20">
          {/* ── Left Column ── */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-4 sm:mb-8"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/[0.06] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                <span className="text-[13px] text-white/50 font-medium tracking-wide">
                  {t('badge')}
                </span>
              </div>
            </motion.div>

            {/* Title — mobile: simple fade, desktop: TextStagger */}
            <h1 className="font-bold tracking-tight mb-4 sm:mb-7">
              {/* Desktop title with stagger animation */}
              <span className="hidden sm:block text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.18]">
                <TextStagger className="text-white" delay={0.1}>
                  {t('title1')}
                </TextStagger>
                <br />
                <TextStagger className="text-white/50 font-medium" delay={0.2}>
                  {t('title2')}
                </TextStagger>
                <br />
                <TextStagger className="text-gradient-lime" delay={0.3}>
                  {t('title3')}
                </TextStagger>
              </span>
              {/* Mobile title — simple, guaranteed visible */}
              <motion.span
                className="block sm:hidden text-[1.75rem] leading-[1.25]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white">{t('title1')}</span>
                <br />
                <span className="text-white/50 font-medium">{t('title2')}</span>
                <br />
                <span className="text-gradient-lime">{t('title3')}</span>
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-sm sm:text-base md:text-lg text-white/60 max-w-xl mb-5 sm:mb-10 leading-relaxed"
            >
              {t('description')}
            </motion.p>

            {/* Channel icons — above CTAs, white gradient */}
            <motion.div
              className="hidden sm:flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[
                { label: 'SAT Push', icon: <span className="text-[9px] font-black leading-none">SAT</span> },
                { label: 'WhatsApp', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg> },
                { label: 'RCS', icon: <span className="text-[9px] font-black leading-none">RCS</span> },
                { label: 'SMS', icon: <MessageCircle size={16} strokeWidth={1.5} /> },
                { label: 'Email', icon: <Mail size={16} strokeWidth={1.5} /> },
                { label: 'Instagram', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="5"/><circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
                { label: 'Messenger', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.26 5.886-3.26-6.558 6.763z"/></svg> },
                { label: 'USSD', icon: <span className="text-[11px] font-black leading-none">#</span> },
              ].map((ch) => (
                <motion.div
                  key={ch.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                  whileHover={{ scale: 1.1, borderColor: 'rgba(139,92,246,0.4)', color: 'rgba(255,255,255,0.7)' }}
                  transition={{ duration: 0.2 }}
                  title={ch.label}
                >
                  {ch.icon}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-14"
            >
              <Link
                href={`/${locale}/contacto`}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 min-h-[44px] sm:min-h-[48px] text-sm font-semibold bg-lime text-deep rounded-xl transition-all duration-300 hover:shadow-[0_0_32px_rgba(205,255,0,0.3)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none w-full sm:w-auto"
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={`/${locale}/qualify`}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 min-h-[44px] sm:min-h-[48px] text-sm font-medium text-white/60 rounded-xl border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] hover:text-white/80 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none w-full sm:w-auto"
              >
                {t('ctaSecondary')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

          </div>

          {/* Mobile orchestration showcase — spectacular mobile animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:hidden mt-8 -mb-4 px-2"
          >
            <MobileOrchestrationShowcase locale={locale} />
          </motion.div>

        </div>
      </div>

      {/* ── Desktop orbit: absolutely positioned, centered in right half ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="hidden lg:flex items-center justify-center absolute top-[45%] right-[2%] -translate-y-1/2 z-10 pointer-events-none"
      >
        <JourneyFlowVisualization locale={locale} />
      </motion.div>

      {/* Bottom fade + radial accent (21st.dev style) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(0deg, rgba(5,5,16,1) 0%, rgba(5,5,16,0.7) 40%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at bottom center, rgba(59,42,206,0.08) 0%, transparent 60%)',
        }}
      />
    </section>
  );
}
