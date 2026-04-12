'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

const COOKIE_CONSENT_KEY = 'dynamo-cookie-consent';

const texts: Record<string, { message: string; policy: string; reject: string; accept: string }> = {
  es: {
    message: 'Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra',
    policy: 'política de privacidad',
    reject: 'Rechazar',
    accept: 'Aceptar',
  },
  en: {
    message: 'We use cookies to improve your experience. By continuing to browse, you accept our',
    policy: 'privacy policy',
    reject: 'Decline',
    accept: 'Accept',
  },
  fr: {
    message: 'Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre',
    policy: 'politique de confidentialité',
    reject: 'Refuser',
    accept: 'Accepter',
  },
  pt: {
    message: 'Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você aceita nossa',
    policy: 'política de privacidade',
    reject: 'Recusar',
    accept: 'Aceitar',
  },
};

export default function CookieConsent() {
  const locale = useLocale();
  const t = texts[locale] || texts.es;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
    // Analytics will load because consent is 'accepted'
    window.location.reload();
  }

  function reject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 p-5 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <p className="text-sm text-white/60 leading-relaxed flex-1">
                {t.message}{' '}
                <a
                  href={`/${locale}/legal`}
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
                >
                  {t.policy}
                </a>
                .
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={reject}
                  className="px-5 py-2 text-sm font-medium text-white/60 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  {t.reject}
                </button>
                <button
                  onClick={accept}
                  className="px-5 py-2 text-sm font-semibold bg-lime text-deep rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 cursor-pointer"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
