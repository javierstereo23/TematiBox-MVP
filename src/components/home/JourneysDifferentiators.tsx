'use client';

import { motion } from 'framer-motion';
import {
  Layers,
  BarChart3,
  Zap,
  ShieldCheck,
  LayoutGrid,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Differentiator {
  number: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  tagsKey: string;
  accent: string;
}

const differentiatorDefs: Differentiator[] = [
  { number: '01', icon: Layers, titleKey: 'item1Title', descKey: 'item1Desc', tagsKey: 'item1Tags', accent: '#3B2ACE' },
  { number: '02', icon: BarChart3, titleKey: 'item2Title', descKey: 'item2Desc', tagsKey: 'item2Tags', accent: '#CDFF00' },
  { number: '03', icon: Zap, titleKey: 'item3Title', descKey: 'item3Desc', tagsKey: 'item3Tags', accent: '#3B2ACE' },
  { number: '04', icon: ShieldCheck, titleKey: 'item4Title', descKey: 'item4Desc', tagsKey: 'item4Tags', accent: '#CDFF00' },
  { number: '05', icon: LayoutGrid, titleKey: 'item5Title', descKey: 'item5Desc', tagsKey: 'item5Tags', accent: '#3B2ACE' },
];

function DifferentiatorRow({
  item,
  index,
  title,
  description,
  tags,
}: {
  item: Differentiator;
  index: number;
  title: string;
  description: string;
  tags: string[];
}) {
  const Icon = item.icon;
  const isEven = index % 2 === 1;

  const contentBlock = (
    <div className="flex flex-col justify-center">
      {/* Number badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold mb-5"
        style={{
          backgroundColor: `${item.accent}15`,
          color: item.accent,
          border: `1px solid ${item.accent}30`,
        }}
      >
        {item.number}
      </motion.span>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-white/50 leading-relaxed mb-6 max-w-lg"
      >
        {description}
      </motion.p>

      {/* Feature tags */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-wrap gap-2"
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border"
            style={{
              backgroundColor: `${item.accent}08`,
              borderColor: `${item.accent}20`,
              color: `${item.accent}cc`,
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );

  const visualBlock = (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative flex items-center justify-center"
    >
      {/* Glow background */}
      <div
        className="absolute w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: item.accent }}
      />

      {/* Icon container */}
      <div className="relative">
        {/* Decorative ring */}
        <div
          className="absolute -inset-6 rounded-3xl opacity-[0.06]"
          style={{
            background: `conic-gradient(from 180deg, ${item.accent}, transparent, ${item.accent})`,
          }}
        />
        <div
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl flex items-center justify-center border"
          style={{
            backgroundColor: `${item.accent}08`,
            borderColor: `${item.accent}15`,
            boxShadow: `0 0 60px ${item.accent}10`,
          }}
        >
          <Icon
            className="w-14 h-14 sm:w-16 sm:h-16"
            style={{ color: item.accent }}
            strokeWidth={1.5}
          />
        </div>

        {/* Small decorative dots */}
        <div
          className="absolute -top-2 -right-2 w-3 h-3 rounded-full"
          style={{ backgroundColor: `${item.accent}40` }}
        />
        <div
          className="absolute -bottom-3 -left-3 w-2 h-2 rounded-full"
          style={{ backgroundColor: `${item.accent}25` }}
        />
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 lg:py-20"
    >
      {/* Separator line */}
      {index > 0 && (
        <div className="col-span-full -mt-16 lg:-mt-20 mb-0">
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${item.accent}20, transparent)`,
            }}
          />
        </div>
      )}

      {isEven ? (
        <>
          <div className="order-2 lg:order-1">{contentBlock}</div>
          <div className="order-1 lg:order-2 flex justify-center">
            {visualBlock}
          </div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-2">{contentBlock}</div>
          <div className="order-1 lg:order-1 flex justify-center">
            {visualBlock}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function JourneysDifferentiators() {
  const t = useTranslations('differentiators');
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-lime/[0.02] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-purple-500/40" />
            {t('tag')}
            <span className="w-8 h-px bg-purple-500/40" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
            {t('title')}
            <br />
            <span className="text-gradient-lime">{t('titleHighlight')}</span>
          </h2>
          <p className="text-white/40 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Differentiator rows */}
        {differentiatorDefs.map((item, i) => (
          <DifferentiatorRow
            key={item.number}
            item={item}
            index={i}
            title={t(item.titleKey)}
            description={t(item.descKey)}
            tags={t(item.tagsKey).split(',')}
          />
        ))}
      </div>
    </section>
  );
}
