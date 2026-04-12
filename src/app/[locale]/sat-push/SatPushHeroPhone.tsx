'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';

/* ────────────────────────────────────────────
   14-second animated phone hero for SAT Push
   ──────────────────────────────────────────── */

const LOOP_DURATION = 14000;
const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SCATTER_EVENTS = [
  { label: 'Recarga', x: -100, y: -120 },
  { label: 'Churn risk', x: 100, y: -120 },
  { label: 'Nueva SIM', x: 155, y: -40 },
  { label: 'NPS bajo', x: 155, y: 40 },
  { label: 'Portabilidad', x: 100, y: 120 },
  { label: 'Consumo > 80%', x: -100, y: 120 },
  { label: 'Vencimiento', x: -155, y: 40 },
  { label: 'Onboarding', x: -155, y: -40 },
];

export default function SatPushHeroPhone() {
  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  const startLoop = useCallback(() => {
    setPhase(1);
    const timers: NodeJS.Timeout[] = [];
    // Phase 1: 0-2s event pill above phone
    // Phase 2: 2-3.5s cable draws down
    timers.push(setTimeout(() => setPhase(2), 2000));
    // Phase 3: 3.5-7s popup appears
    timers.push(setTimeout(() => setPhase(3), 3500));
    // Phase 4: 7-8s user taps OK
    timers.push(setTimeout(() => setPhase(4), 7000));
    // Phase 5: 8-9.5s WhatsApp confirmation
    timers.push(setTimeout(() => setPhase(5), 8000));
    // Phase 6: 9.5-12s scatter events
    timers.push(setTimeout(() => setPhase(6), 9500));
    // Phase 7: 12-14s fade out + reset
    timers.push(setTimeout(() => setPhase(7), 12000));
    timers.push(setTimeout(() => {
      setPhase(0);
      setTimeout(() => setLoopKey((k) => k + 1), 500);
    }, 13300));
    return timers;
  }, []);

  useEffect(() => {
    const kickoff = setTimeout(() => {
      const timers = startLoop();
      return () => timers.forEach(clearTimeout);
    }, 400);
    return () => clearTimeout(kickoff);
  }, [loopKey, startLoop]);

  const phoneGlow = phase === 2 || phase === 3;
  const showFadeOverlay = phase === 7;

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 560, width: 280 }}>
      {/* ── Event pill ABOVE the phone (Phase 1-2) ── */}
      <AnimatePresence>
        {(phase === 1 || phase === 2) && (
          <motion.div
            key={`event-pill-${loopKey}`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.4 } }}
            transition={{ duration: 0.7, ease: SMOOTH_EASE }}
            className="absolute z-30"
            style={{ top: -8, left: '50%', transform: 'translateX(-50%)' }}
          >
            <div className="flex items-center gap-2 bg-[#1e1e28] border border-white/10 rounded-full px-3.5 py-1.5 shadow-lg shadow-black/40 whitespace-nowrap">
              <WifiOff size={13} className="text-red-400 shrink-0" />
              <span className="text-[11px] text-white/80 font-medium">Plan de datos vencido</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Vertical cable from pill into phone (Phase 2) ── */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.svg
            key={`cable-${loopKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 pointer-events-none"
            style={{ top: 18, left: '50%', transform: 'translateX(-50%)' }}
            width="4"
            height="60"
            viewBox="0 0 4 60"
          >
            <defs>
              <linearGradient id="cableGradV" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#cdff00" />
              </linearGradient>
            </defs>
            <motion.line
              x1="2" y1="0" x2="2" y2="60"
              stroke="url(#cableGradV)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            {/* Traveling dot */}
            <motion.circle
              r="3.5"
              cx="2"
              fill="#cdff00"
              filter="drop-shadow(0 0 6px rgba(205,255,0,0.7))"
              initial={{ cy: 0, opacity: 0 }}
              animate={{ cy: 60, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* ── Phone border glow ── */}
      <motion.div
        className="absolute rounded-[40px] pointer-events-none z-10"
        style={{ width: 284, height: 'calc(100% - 40px)', top: 20 }}
        animate={{
          boxShadow: phoneGlow
            ? '0 0 30px 4px rgba(205,255,0,0.15), inset 0 0 20px 2px rgba(205,255,0,0.05)'
            : '0 0 0px 0px rgba(205,255,0,0)',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* ── PHONE FRAME (280px wide, static) ── */}
      <div className="relative z-20" style={{ width: 280 }}>
        <div
          className="relative shadow-2xl shadow-black/70"
          style={{
            borderRadius: 36,
            background: 'linear-gradient(to bottom, #3a3a40, #222228, #1a1a1e)',
            padding: '3px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              borderRadius: 34,
              background: 'linear-gradient(to bottom, #2a2a2e, #0f0f14)',
              padding: '2px',
            }}
          >
            <div
              className="overflow-hidden relative"
              style={{ borderRadius: 32, background: '#0a0a0f' }}
            >
              {/* Dynamic Island */}
              <div className="flex justify-center pt-2.5 pb-0.5 relative z-30">
                <div
                  className="bg-black rounded-full flex items-center justify-center"
                  style={{
                    width: 90,
                    height: 26,
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: 9,
                      height: 9,
                      background: 'radial-gradient(circle at 40% 40%, #1a1a2a, #000)',
                      boxShadow: 'inset 0 0 2px rgba(100,100,255,0.15)',
                      marginLeft: 18,
                    }}
                  />
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-0 pb-1 text-[9px] text-white/50 relative z-30">
                <span className="font-semibold tracking-wide">9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="13" height="10" viewBox="0 0 14 11" className="text-white/50">
                    <rect x="0" y="8" width="2.5" height="3" rx="0.5" fill="currentColor" />
                    <rect x="3.5" y="5.5" width="2.5" height="5.5" rx="0.5" fill="currentColor" />
                    <rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="currentColor" />
                    <rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor" />
                  </svg>
                  <svg width="12" height="9" viewBox="0 0 16 12" fill="none" className="text-white/50">
                    <path d="M1 4C4.5 0.5 11.5 0.5 15 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3.5 7C5.8 4.7 10.2 4.7 12.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="10" r="1.2" fill="currentColor" />
                  </svg>
                  <span className="text-[8px] font-medium text-white/40">87%</span>
                  <div className="relative" style={{ width: 20, height: 9 }}>
                    <div className="absolute inset-0 rounded-[2px] border border-white/30" style={{ width: 18, height: 9 }} />
                    <div className="absolute bg-lime/60" style={{ left: 1.5, top: 1.5, width: 12, height: 6, borderRadius: 1 }} />
                    <div className="absolute bg-white/30 rounded-r-sm" style={{ right: 0, top: 2.5, width: 1.5, height: 4 }} />
                  </div>
                </div>
              </div>

              {/* Screen content area */}
              <div
                className="relative flex items-center justify-center"
                style={{ minHeight: 380, padding: '8px 14px' }}
              >
                {/* Background placeholder lines */}
                <div className="absolute inset-x-4 top-4 space-y-2.5 opacity-20">
                  <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                  <div className="h-1.5 w-1/2 bg-white/10 rounded" />
                  <div className="h-8 w-full bg-white/[0.04] rounded-lg mt-3" />
                  <div className="h-8 w-full bg-white/[0.04] rounded-lg" />
                  <div className="h-8 w-full bg-white/[0.04] rounded-lg" />
                </div>

                {/* Phase 7 fade overlay */}
                <AnimatePresence>
                  {showFadeOverlay && (
                    <motion.div
                      key="fade-overlay"
                      className="absolute inset-0 z-50 bg-[#0a0a0f]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  )}
                </AnimatePresence>

                {/* SAT Push popup (Phase 3-4) -- perfectly centered */}
                <AnimatePresence>
                  {(phase === 3 || phase === 4) && (
                    <motion.div
                      key={`popup-${loopKey}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.35, ease: SMOOTH_EASE } }}
                      transition={{ duration: 0.5, ease: SMOOTH_EASE }}
                      className="relative z-10 w-full max-w-[240px]"
                    >
                      {/* Glassmorphism dialog */}
                      <div
                        className="rounded-xl overflow-hidden shadow-2xl shadow-black/60"
                        style={{
                          background: 'rgba(45, 45, 56, 0.85)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        <div className="px-4 py-2.5 border-b border-white/5" style={{ background: 'rgba(58,58,72,0.6)' }}>
                          <p className="text-white/90 text-[10px] font-bold tracking-widest uppercase">
                            OPERADOR M&Oacute;VIL
                          </p>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-white/80 text-[10px] leading-relaxed">
                            Tu plan est&aacute; por vencerse. Migr&aacute; a Pospago Ilimitado 10GB por $15/mes. &iquest;Activar?
                          </p>
                        </div>
                        <div className="flex border-t border-white/10">
                          <span className="flex-1 py-2.5 text-[10px] font-semibold text-white/40 text-center cursor-default">
                            Cancelar
                          </span>
                          <motion.span
                            className="flex-1 py-2.5 text-[10px] font-bold text-center border-l border-white/10 cursor-default rounded-br-xl"
                            animate={{
                              color: phase === 4 ? '#cdff00' : ['rgba(205,255,0,0.7)', 'rgba(205,255,0,1)', 'rgba(205,255,0,0.7)'],
                              backgroundColor: phase === 4
                                ? 'rgba(205,255,0,0.25)'
                                : ['rgba(205,255,0,0.03)', 'rgba(205,255,0,0.12)', 'rgba(205,255,0,0.03)'],
                              boxShadow: phase === 4
                                ? '0 0 20px rgba(205,255,0,0.5)'
                                : ['0 0 0px rgba(205,255,0,0)', '0 0 14px rgba(205,255,0,0.3)', '0 0 0px rgba(205,255,0,0)'],
                            }}
                            transition={{
                              duration: phase === 4 ? 0.2 : 1.8,
                              repeat: phase === 3 ? Infinity : 0,
                              ease: 'easeInOut',
                            }}
                          >
                            OK
                          </motion.span>
                        </div>
                      </div>
                      {/* Press flash */}
                      {phase === 4 && (
                        <motion.div
                          className="absolute bottom-0 right-0 w-1/2 h-[36px] rounded-br-xl bg-lime/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.6, 0] }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* WhatsApp confirmation (Phase 5) */}
                <AnimatePresence>
                  {phase === 5 && (
                    <motion.div
                      key={`whatsapp-${loopKey}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.5, ease: SMOOTH_EASE }}
                      className="relative z-10 w-full max-w-[240px]"
                    >
                      <div className="bg-[#0b4a3e] rounded-xl p-3 space-y-1.5">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-[#25d366] flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            </svg>
                          </div>
                          <span className="text-white/90 text-[10px] font-semibold">Mi Operador</span>
                        </div>
                        <div className="bg-[#025144] rounded-lg px-3 py-2">
                          <p className="text-white/90 text-[10px] leading-relaxed">
                            &iexcl;Plan activado! Disfrut&aacute; navegaci&oacute;n sin l&iacute;mites.
                          </p>
                          <span className="text-white/30 text-[7px] mt-1 block text-right">9:42 AM</span>
                        </div>
                      </div>
                      {/* Conversion badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35, duration: 0.5, type: 'spring', stiffness: 280, damping: 18 }}
                        className="mt-2.5 flex justify-center"
                      >
                        <div className="bg-lime text-deep text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-lime/30 flex items-center gap-1.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Conversi&oacute;n &#10003;
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Phase 6: content inside phone fades */}
                <AnimatePresence>
                  {phase === 6 && (
                    <motion.div
                      key="inner-fade"
                      className="absolute inset-0 z-20 bg-[#0a0a0f]/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Home indicator */}
              <div className="h-7 flex items-center justify-center relative z-30">
                <div className="w-[90px] h-[4px] rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scatter events (Phase 6) ── */}
      <AnimatePresence>
        {phase === 6 &&
          SCATTER_EVENTS.map((evt, i) => (
            <motion.div
              key={`scatter-${i}-${loopKey}`}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
              animate={{ opacity: 1, x: evt.x, y: evt.y, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.6 } }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: SMOOTH_EASE,
              }}
              className="absolute z-30"
            >
              <div className="flex items-center gap-1.5 bg-[#1e1e28] border border-white/10 rounded-full px-2.5 py-1 shadow-lg shadow-black/40 whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-[10px] text-white/70 font-medium">{evt.label}</span>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* ── Cable flashes for scatter (Phase 6) ── */}
      <AnimatePresence>
        {phase === 6 &&
          SCATTER_EVENTS.map((evt, i) => (
            <motion.svg
              key={`cable-flash-${i}-${loopKey}`}
              className="absolute z-10 pointer-events-none overflow-visible"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              width="400"
              height="400"
              viewBox="-200 -200 400 400"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }}
            >
              <defs>
                <linearGradient id={`cableGS-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#cdff00" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="0"
                x2={evt.x}
                y2={evt.y}
                stroke={`url(#cableGS-${i})`}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
              />
            </motion.svg>
          ))}
      </AnimatePresence>

      {/* ── Global fade for Phase 7 (outside phone) ── */}
      <AnimatePresence>
        {phase === 7 && (
          <motion.div
            key="global-fade"
            className="absolute inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.95), transparent 80%)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
