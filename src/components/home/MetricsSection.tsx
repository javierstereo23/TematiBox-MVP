'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

function AnimatedCounter({
  target,
  prefix,
  suffix,
  duration = 2000,
  isInView,
}: {
  target: number;
  prefix: string;
  suffix: string;
  duration?: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span className="counter-gradient">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function MetricsSection() {
  const t = useTranslations('metrics');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const metrics = [
    { target: 20, prefix: '+', suffix: '', label: t('clients') },
    { target: 500, prefix: '+', suffix: 'M', label: t('users') },
    { target: 10, prefix: '+', suffix: '', label: t('countries') },
    { target: 9, prefix: '+', suffix: '', label: t('nps') },
  ];

  return (
    <section className="py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-16" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl font-extrabold mb-3">
                <AnimatedCounter
                  target={m.target}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  isInView={isInView}
                />
              </div>
              <p className="text-sm text-white/40 font-medium">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mt-16" />
      </div>
    </section>
  );
}
