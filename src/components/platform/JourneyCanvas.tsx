'use client';

import { motion } from 'framer-motion';

/* ── Node types with brand colors ──────────────────────────── */
const nodeTypes = {
  satpush: { label: 'SAT Push', color: '#cdff00', bg: 'rgba(205,255,0,0.1)', icon: '📡' },
  sms: { label: 'SMS', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', icon: '💬' },
  rcs: { label: 'RCS', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: '🔵' },
  whatsapp: { label: 'WhatsApp', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: '📱' },
  email: { label: 'Email', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '📧' },
  target: { label: 'Target', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: '🎯' },
  wait: { label: 'Wait', color: '#6b7280', bg: 'rgba(107,114,128,0.1)', icon: '⏱' },
  menu: { label: 'Menu', color: '#cdff00', bg: 'rgba(205,255,0,0.08)', icon: '☰' },
} as const;

type NodeType = keyof typeof nodeTypes;

interface FlowNode {
  type: NodeType;
  x: number;
  y: number;
}

/* ── Journey flow layout ───────────────────────────────────── */
const rows: FlowNode[][] = [
  [
    { type: 'satpush', x: 40, y: 50 },
    { type: 'target', x: 190, y: 50 },
    { type: 'sms', x: 340, y: 50 },
    { type: 'wait', x: 490, y: 50 },
    { type: 'rcs', x: 640, y: 50 },
  ],
  [
    { type: 'whatsapp', x: 40, y: 150 },
    { type: 'email', x: 190, y: 150 },
    { type: 'wait', x: 340, y: 150 },
    { type: 'target', x: 490, y: 150 },
    { type: 'sms', x: 640, y: 150 },
  ],
  [
    { type: 'menu', x: 40, y: 250 },
    { type: 'rcs', x: 190, y: 250 },
    { type: 'target', x: 340, y: 250 },
    { type: 'sms', x: 490, y: 250 },
  ],
];

function JourneyNode({ node, delay }: { node: FlowNode; delay: number }) {
  const cfg = nodeTypes[node.type];
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <rect
        x={node.x}
        y={node.y}
        width={120}
        height={56}
        rx={12}
        fill={cfg.bg}
        stroke={cfg.color}
        strokeWidth={1.5}
        strokeOpacity={0.4}
      />
      <text
        x={node.x + 28}
        y={node.y + 24}
        fontSize={14}
        fill="white"
        fontWeight={600}
        fontFamily="system-ui, sans-serif"
      >
        {cfg.icon}
      </text>
      <text
        x={node.x + 48}
        y={node.y + 26}
        fontSize={11}
        fill="white"
        fontWeight={500}
        fontFamily="system-ui, sans-serif"
        opacity={0.9}
      >
        {cfg.label}
      </text>
      <text
        x={node.x + 48}
        y={node.y + 42}
        fontSize={9}
        fill="white"
        opacity={0.4}
        fontFamily="system-ui, sans-serif"
      >
        {node.type === 'wait' ? '2h delay' : node.type === 'target' ? 'Segment A' : 'Active'}
      </text>
    </motion.g>
  );
}

function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}) {
  return (
    <motion.line
      x1={x1 + 120}
      y1={y1 + 28}
      x2={x2}
      y2={y2 + 28}
      stroke="rgba(139,92,246,0.3)"
      strokeWidth={1.5}
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    />
  );
}

export default function JourneyCanvas() {
  let nodeIndex = 0;

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header bar */}
      <div className="relative flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <span className="text-xs text-white/40 font-medium ml-2">Journey Builder</span>
        <span className="text-[10px] text-white/20 ml-auto">Upgrade de Plan</span>
      </div>

      {/* Canvas */}
      <div className="relative p-4 overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full h-auto min-w-[600px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connection lines */}
          {rows.map((row, ri) =>
            row.slice(0, -1).map((node, ni) => {
              const next = row[ni + 1];
              return (
                <ConnectionLine
                  key={`line-${ri}-${ni}`}
                  x1={node.x}
                  y1={node.y}
                  x2={next.x}
                  y2={next.y}
                  delay={0.1 + (ri * row.length + ni) * 0.08}
                />
              );
            })
          )}

          {/* Cross-row connections */}
          <ConnectionLine x1={490} y1={50} x2={40} y2={150} delay={0.6} />
          <ConnectionLine x1={490} y1={150} x2={40} y2={250} delay={0.9} />

          {/* Nodes */}
          {rows.map((row, ri) =>
            row.map((node, ni) => {
              const delay = 0.05 + nodeIndex * 0.08;
              nodeIndex++;
              return (
                <JourneyNode
                  key={`node-${ri}-${ni}`}
                  node={node}
                  delay={delay}
                />
              );
            })
          )}

          {/* Animated pulse on the first node */}
          <motion.circle
            cx={100}
            cy={78}
            r={4}
            fill="#cdff00"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </div>

      {/* Bottom status bar */}
      <div className="relative flex items-center justify-between px-6 py-3 border-t border-white/[0.06] text-[10px] text-white/30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            Active
          </span>
          <span>14 nodes</span>
          <span>3 channels</span>
        </div>
        <span>Last edited 2h ago</span>
      </div>
    </div>
  );
}
