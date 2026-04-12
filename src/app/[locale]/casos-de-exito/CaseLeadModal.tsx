'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { X, Mail, User, Building2, Briefcase, CheckCircle, Lock } from 'lucide-react';

const modalTexts: Record<string, {
  closeLabel: string; heading: string; body: string;
  namePlaceholder: string; emailPlaceholder: string; companyPlaceholder: string; rolePlaceholder: string;
  allRequired: string; invalidEmail: string; submitError: string;
  submitting: string; submit: string;
  successTitle: string; successBody: string; close: string;
}> = {
  es: {
    closeLabel: 'Cerrar', heading: 'Acced\u00e9 al caso de \u00e9xito completo',
    body: 'Dej\u00e1 tus datos y te enviamos el caso detallado con el nombre del operador, m\u00e9tricas completas y metodolog\u00eda.',
    namePlaceholder: 'Nombre', emailPlaceholder: 'Email corporativo', companyPlaceholder: 'Empresa', rolePlaceholder: 'Cargo',
    allRequired: 'Todos los campos son obligatorios', invalidEmail: 'Ingres\u00e1 un email v\u00e1lido',
    submitError: 'Error al enviar. Intent\u00e1 nuevamente.', submitting: 'Enviando...', submit: 'Solicitar caso completo',
    successTitle: 'Solicitud recibida', successBody: 'Te enviaremos el caso completo a tu email en las pr\u00f3ximas 24hs.', close: 'Cerrar',
  },
  en: {
    closeLabel: 'Close', heading: 'Access the full case study',
    body: 'Leave your details and we\'ll send you the detailed case with the operator name, full metrics, and methodology.',
    namePlaceholder: 'Name', emailPlaceholder: 'Work email', companyPlaceholder: 'Company', rolePlaceholder: 'Job title',
    allRequired: 'All fields are required', invalidEmail: 'Enter a valid email',
    submitError: 'Error sending. Please try again.', submitting: 'Sending...', submit: 'Request full case study',
    successTitle: 'Request received', successBody: 'We\'ll send the full case study to your email within 24 hours.', close: 'Close',
  },
  fr: {
    closeLabel: 'Fermer', heading: 'Acc\u00e9dez au cas client complet',
    body: 'Laissez vos coordonn\u00e9es et nous vous enverrons le cas d\u00e9taill\u00e9 avec le nom de l\'op\u00e9rateur, les m\u00e9triques compl\u00e8tes et la m\u00e9thodologie.',
    namePlaceholder: 'Nom', emailPlaceholder: 'Email professionnel', companyPlaceholder: 'Entreprise', rolePlaceholder: 'Poste',
    allRequired: 'Tous les champs sont obligatoires', invalidEmail: 'Entrez un email valide',
    submitError: 'Erreur lors de l\'envoi. Veuillez r\u00e9essayer.', submitting: 'Envoi en cours...', submit: 'Demander le cas complet',
    successTitle: 'Demande re\u00e7ue', successBody: 'Nous vous enverrons le cas complet par email sous 24 heures.', close: 'Fermer',
  },
  pt: {
    closeLabel: 'Fechar', heading: 'Acesse o caso de sucesso completo',
    body: 'Deixe seus dados e enviaremos o caso detalhado com o nome da operadora, m\u00e9tricas completas e metodologia.',
    namePlaceholder: 'Nome', emailPlaceholder: 'Email corporativo', companyPlaceholder: 'Empresa', rolePlaceholder: 'Cargo',
    allRequired: 'Todos os campos s\u00e3o obrigat\u00f3rios', invalidEmail: 'Insira um email v\u00e1lido',
    submitError: 'Erro ao enviar. Tente novamente.', submitting: 'Enviando...', submit: 'Solicitar caso completo',
    successTitle: 'Solicita\u00e7\u00e3o recebida', successBody: 'Enviaremos o caso completo para seu email em at\u00e9 24 horas.', close: 'Fechar',
  },
};

interface CaseLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  caseName: string;
}

export default function CaseLeadModal({ isOpen, onClose, caseId, caseName }: CaseLeadModalProps) {
  const locale = useLocale();
  const t = modalTexts[locale] || modalTexts.es;
  const [formData, setFormData] = useState({ nombre: '', email: '', empresa: '', cargo: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.nombre || !formData.email || !formData.empresa || !formData.cargo) {
      setError(t.allRequired);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError(t.invalidEmail);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/case-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, caseId }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(t.submitError);
      }
    } catch {
      setError('Error al enviar. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nombre: '', email: '', empresa: '', cargo: '' });
      setError('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(5,5,16,0.85) 0%, rgba(5,5,16,0.97) 100%)',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-2xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
              aria-label={t.closeLabel}
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-white font-heading text-xl font-bold mb-2">
                    {t.heading}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t.body}
                  </p>
                  <p className="text-purple-400/70 text-xs mt-2 font-medium">
                    {caseName}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder={t.companyPlaceholder}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      placeholder={t.rolePlaceholder}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {submitting ? t.submitting : t.submit}
                  </button>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-lime" />
                </div>
                <h3 className="text-white font-heading text-xl font-bold mb-3">
                  {t.successTitle}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                  {t.successBody}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
