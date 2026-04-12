'use client';

import { motion, useInView } from 'framer-motion';
import { Unplug, Timer, Users, EyeOff, ShieldAlert } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRef } from 'react';

/* ── i18n ────────────────────────────────────────────────────── */
const i18n = {
  es: {
    tag: 'El desafío',
    titleBefore: 'Los problemas que frenan ',
    titleHighlight: 'tu operación hoy',
    painPoints: [
      { title: 'Canales que no se hablan', description: 'Cada canal opera en su silo. La experiencia del usuario se fragmenta y la conversión cae.' },
      { title: 'Campañas manuales que pierden timing', description: 'Sin automatización real, cada campaña requiere intervención. Imposible operar a escala.' },
      { title: 'Segmentación que no distingue', description: 'Mensajes genéricos para todos. Sin capacidad de segmentar por comportamiento, afinidad o momento del usuario.' },
      { title: 'Sin visibilidad del impacto real', description: '¿Qué canal convierte más? ¿Qué producto performa mejor? Sin datos end-to-end, las decisiones son a ciegas.' },
      { title: 'Fraude digital y sin gobernanza', description: 'Altas tasas de reclamación por fraude en pauta digital. Baja capacidad de control sobre canales de adquisición VAS.' },
    ],
  },
  en: {
    tag: 'The challenge',
    titleBefore: 'The problems holding back ',
    titleHighlight: 'your operation today',
    painPoints: [
      { title: 'Channels that don\'t talk', description: 'Each channel operates in its own silo. User experience fragments and conversion drops.' },
      { title: 'Manual campaigns miss timing', description: 'Without real automation, every campaign requires intervention. Impossible to operate at scale.' },
      { title: 'Segmentation that doesn\'t distinguish', description: 'Generic messages for everyone. No ability to segment by behavior, affinity, or user moment.' },
      { title: 'No visibility into real impact', description: 'Which channel converts more? Without end-to-end data, decisions are made blindly.' },
      { title: 'Digital ad fraud and no governance', description: 'High complaint rates due to digital ad fraud. Low control capacity over VAS acquisition channels.' },
    ],
  },
  fr: {
    tag: 'Le défi',
    titleBefore: 'Les problèmes qui freinent ',
    titleHighlight: 'votre opération aujourd\'hui',
    painPoints: [
      { title: 'Des canaux cloisonnés', description: 'Chaque canal fonctionne en silo. L\'expérience se fragmente et la conversion chute.' },
      { title: 'Des campagnes manuelles', description: 'Sans automatisation réelle, chaque campagne nécessite une intervention. Impossible d\'opérer à l\'échelle.' },
      { title: 'Une segmentation imprécise', description: 'Des messages génériques pour tous. Aucune segmentation par comportement ou affinité.' },
      { title: 'Aucune visibilité sur l\'impact', description: 'Quel canal convertit le plus ? Sans données end-to-end, les décisions sont prises à l\'aveugle.' },
      { title: 'Fraude digitale sans gouvernance', description: 'Taux de réclamation élevés. Faible contrôle sur les canaux d\'acquisition VAS.' },
    ],
  },
  pt: {
    tag: 'O desafio',
    titleBefore: 'Os problemas que freiam ',
    titleHighlight: 'sua operação hoje',
    painPoints: [
      { title: 'Canais que não se comunicam', description: 'Cada canal opera em seu silo. A experiência se fragmenta e a conversão cai.' },
      { title: 'Campanhas manuais sem timing', description: 'Sem automação real, cada campanha requer intervenção. Impossível operar em escala.' },
      { title: 'Segmentação que não diferencia', description: 'Mensagens genéricas para todos. Sem segmentação por comportamento ou afinidade.' },
      { title: 'Sem visibilidade do impacto real', description: 'Qual canal converte mais? Sem dados end-to-end, decisões são tomadas às cegas.' },
      { title: 'Fraude digital e sem governança', description: 'Altas taxas de reclamação. Baixa capacidade de controle sobre canais de aquisição VAS.' },
    ],
  },
};

const painPointIcons = [Unplug, Timer, Users, EyeOff, ShieldAlert];

export default function ChallengeSection() {
  const locale = useLocale();
  const t = i18n[locale as keyof typeof i18n] || i18n.es;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220,38,38,0.06) 0%, rgba(245,158,11,0.03) 30%, transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header — compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-4 tracking-wide">
            {t.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15]">
            {t.titleBefore}
            <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Pain points grid — 2 cols on tablet, 3+2 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.painPoints.map((point, i) => {
            const Icon = painPointIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 hover:border-red-500/20 hover:bg-red-500/[0.03] transition-all duration-300 ${
                  i >= 3 ? 'lg:col-span-1' : ''
                } ${i === 3 ? 'sm:col-start-1 lg:col-start-auto' : ''}`}
              >
                {/* Icon + number */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-red-400/80" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-base font-bold text-white mb-1.5 leading-snug">
                  {point.title}
                </h3>
                <p className="text-base sm:text-[13px] text-white/70 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
