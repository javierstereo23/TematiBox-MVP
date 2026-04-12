'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';

const stickyTexts: Record<string, { cta: string }> = {
  es: { cta: 'Agendar Demo' },
  en: { cta: 'Book a Demo' },
  fr: { cta: 'Réserver une démo' },
  pt: { cta: 'Agendar Demo' },
};

export default function StickyCTA() {
  const locale = useLocale();
  const t = stickyTexts[locale] || stickyTexts.es;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~600px (past the hero)
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-deep/80 backdrop-blur-xl border-t border-white/[0.06] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <Link
              href={`/${locale}/contacto`}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-lime text-deep font-semibold rounded-xl hover:brightness-110 transition-all duration-200 text-sm mr-16"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
