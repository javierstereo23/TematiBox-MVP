'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';

const WHATSAPP_NUMBER = '5491123306752';

const whatsAppTexts: Record<string, { greeting: string; title: string; subtitle: string; ariaLabel: string; closeLabel: string }> = {
  es: {
    greeting: 'Hola! Me gustaría conocer más sobre DYNAMO Journeys.',
    title: '¿Necesitas ayuda?',
    subtitle: 'Escribinos por WhatsApp y te respondemos al instante.',
    ariaLabel: 'Contactar por WhatsApp',
    closeLabel: 'Cerrar',
  },
  en: {
    greeting: 'Hi! I would like to learn more about DYNAMO Journeys.',
    title: 'Need help?',
    subtitle: 'Message us on WhatsApp and we\'ll reply instantly.',
    ariaLabel: 'Contact us on WhatsApp',
    closeLabel: 'Close',
  },
  fr: {
    greeting: 'Bonjour ! Je souhaite en savoir plus sur DYNAMO Journeys.',
    title: 'Besoin d\'aide ?',
    subtitle: 'Écrivez-nous sur WhatsApp, nous vous répondons instantanément.',
    ariaLabel: 'Contactez-nous sur WhatsApp',
    closeLabel: 'Fermer',
  },
  pt: {
    greeting: 'Olá! Gostaria de saber mais sobre o DYNAMO Journeys.',
    title: 'Precisa de ajuda?',
    subtitle: 'Fale conosco pelo WhatsApp e respondemos na hora.',
    ariaLabel: 'Contato pelo WhatsApp',
    closeLabel: 'Fechar',
  },
};

export default function WhatsAppButton() {
  const locale = useLocale();
  const t = whatsAppTexts[locale] || whatsAppTexts.es;
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.greeting)}`;
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white text-gray-800 rounded-2xl shadow-2xl px-4 py-3 max-w-[240px] text-sm leading-relaxed"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
              aria-label={t.closeLabel}
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>
            <p className="font-semibold text-gray-900 mb-0.5">{t.title}</p>
            <p className="text-gray-500 text-xs">{t.subtitle}</p>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.ariaLabel}
        className="group relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/25 cursor-pointer hover:shadow-xl hover:shadow-[#25D366]/35 transition-shadow"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        {/* WhatsApp icon */}
        <svg
          className="w-7 h-7 text-white relative z-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.616l4.578-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.738-6.388-1.995l-.29-.196-3.01.96.997-2.96-.212-.31A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </motion.a>
    </div>
  );
}
