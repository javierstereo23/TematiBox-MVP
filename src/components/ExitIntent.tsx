'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { X, ArrowRight } from 'lucide-react';

const exitTexts: Record<string, { badge: string; heading: string; body: string; cta: string; dismiss: string; closeLabel: string }> = {
  es: {
    badge: 'Demo gratuita',
    heading: '¿Te vas sin ver la plataforma en acción?',
    body: 'Agenda una demo de 15 minutos y descubre cómo DYNAMO Journeys puede transformar tu operación.',
    cta: 'Agendar Demo Gratuita',
    dismiss: 'No gracias',
    closeLabel: 'Cerrar',
  },
  en: {
    badge: 'Free demo',
    heading: 'Leaving without seeing the platform in action?',
    body: 'Book a 15-minute demo and discover how DYNAMO Journeys can transform your operation.',
    cta: 'Book a Free Demo',
    dismiss: 'No thanks',
    closeLabel: 'Close',
  },
  fr: {
    badge: 'Démo gratuite',
    heading: 'Vous partez sans voir la plateforme en action ?',
    body: 'Réservez une démo de 15 minutes et découvrez comment DYNAMO Journeys peut transformer votre activité.',
    cta: 'Réserver une démo gratuite',
    dismiss: 'Non merci',
    closeLabel: 'Fermer',
  },
  pt: {
    badge: 'Demo gratuita',
    heading: 'Vai sair sem ver a plataforma em ação?',
    body: 'Agende uma demo de 15 minutos e descubra como o DYNAMO Journeys pode transformar sua operação.',
    cta: 'Agendar Demo Gratuita',
    dismiss: 'Não, obrigado',
    closeLabel: 'Fechar',
  },
};

export default function ExitIntent() {
  const locale = useLocale();
  const t = exitTexts[locale] || exitTexts.es;
  const [show, setShow] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse moves to the top of the viewport
    if (e.clientY <= 5) {
      const alreadyShown = sessionStorage.getItem('dynamo_exit_shown');
      if (!alreadyShown) {
        setShow(true);
        sessionStorage.setItem('dynamo_exit_shown', '1');
      }
    }
  }, []);

  useEffect(() => {
    // Only on desktop — check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Small delay before enabling to avoid false triggers on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={dismiss}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-deep/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 shadow-2xl shadow-purple-500/10"
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={t.closeLabel}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Decorative glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/20">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-xs font-medium text-lime">{t.badge}</span>
              </div>

              <h2 className="font-heading text-2xl font-bold text-white leading-tight">
                {t.heading}
              </h2>

              <p className="text-sm text-white/50 leading-relaxed max-w-sm mx-auto">
                {t.body}
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/${locale}/contacto`}
                  onClick={dismiss}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-lime text-deep font-semibold rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={dismiss}
                  className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer py-2"
                >
                  {t.dismiss}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
