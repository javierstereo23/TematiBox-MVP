'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ── Funnel data from the real DYNAMO platform ──────────────── */
const funnelSteps = [
  { label: 'Sent', value: '1.4M', pct: 100, width: 100 },
  { label: 'Delivered', value: '1.2M', pct: 87, width: 87 },
  { label: 'Read', value: '648.6K', pct: 53.9, width: 54 },
  { label: 'Replied', value: '28.8K', pct: 2.4, width: 24 },
  { label: 'Clicks', value: '120.8K', pct: 18.6, width: 40 },
  { label: 'Conversions', value: '27.2K', pct: 22.5, width: 22 },
];

const channelBars = [
  { channel: 'SatPush', pct: 2.8, color: '#cdff00' },
  { channel: 'WhatsApp', pct: 2.3, color: '#22c55e' },
  { channel: 'SMS', pct: 0.9, color: '#8b5cf6' },
  { channel: 'Email', pct: 0.9, color: '#f59e0b' },
];

function AnimatedBar({ width, delay, isConversion }: { width: number; delay: number; isConversion: boolean }) {
  return (
    <motion.div
      className="h-full rounded-r-sm"
      style={{
        background: isConversion
          ? 'linear-gradient(90deg, rgba(205,255,0,0.3), rgba(205,255,0,0.6))'
          : 'linear-gradient(90deg, rgba(139,92,246,0.2), rgba(139,92,246,0.5))',
      }}
      initial={{ width: 0 }}
      whileInView={{ width: `${width}%` }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    />
  );
}

export default function StatsPreview() {
  const ref = useRef(null);
  const _isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <span className="text-xs text-white/40 font-medium ml-2">Campaign Analytics</span>
        <span className="text-[10px] text-white/20 ml-auto">Upgrade Plan Q1</span>
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Funnel Visualization ── */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-6">
              Conversion Funnel
            </h4>
            <div className="space-y-3">
              {funnelSteps.map((step, idx) => {
                const isConversion = step.label === 'Conversions';
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-24 text-right">
                      <span className="text-xs text-white/50">{step.label}</span>
                    </div>
                    <div className="flex-1 h-8 bg-white/[0.03] rounded-sm overflow-hidden border border-white/[0.04]">
                      <AnimatedBar
                        width={step.width}
                        delay={0.2 + idx * 0.1}
                        isConversion={isConversion}
                      />
                    </div>
                    <div className="w-16 text-right">
                      <span className={`text-sm font-heading font-bold ${isConversion ? 'text-lime' : 'text-white/70'}`}>
                        {step.value}
                      </span>
                    </div>
                    <div className="w-12 text-right">
                      <span className={`text-xs ${isConversion ? 'text-lime/70' : 'text-white/30'}`}>
                        {step.pct}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Side metrics ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Channel comparison */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                Conversion by Channel
              </h4>
              <div className="space-y-3">
                {channelBars.map((ch, idx) => (
                  <motion.div
                    key={ch.channel}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: ch.color }}
                        />
                        <span className="text-xs text-white/60">{ch.channel}</span>
                      </div>
                      <span className="text-xs font-heading font-bold text-white/80">
                        {ch.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: ch.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(ch.pct / 3) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 + idx * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key metrics grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Reach Rate', value: '87%', trend: '+3%' },
                { label: 'Conv. Rate', value: '22.5%', trend: '+8%' },
                { label: 'Avg CTR', value: '18.6%', trend: '+12%' },
                { label: 'ROI', value: '4.2x', trend: '+0.8x' },
              ].map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + idx * 0.08 }}
                  className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">
                    {metric.label}
                  </div>
                  <div className="font-heading text-lg font-bold text-white mt-1">
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-lime/70 mt-0.5">{metric.trend}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-white/[0.06] text-[10px] text-white/30">
        <span>Updated in real-time</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            Live
          </span>
          <span>Last 30 days</span>
        </div>
      </div>
    </div>
  );
}
