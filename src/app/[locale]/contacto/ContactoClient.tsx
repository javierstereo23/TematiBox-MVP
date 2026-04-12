'use client';

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  MapPin,
  Globe,
  ArrowRight,
  Sparkles,
  Clock,
  MessageSquare,
  ExternalLink,
  Camera,
  Briefcase,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { trackEvent } from "@/components/Analytics";
import DemoBooking from "@/components/DemoBooking";

const contactInfo = [
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+54 9 11 2330-6752",
    href: "https://wa.me/5491123306752",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@dynamo.tech",
    href: "mailto:contact@dynamo.tech",
  },
  {
    icon: Globe,
    label: "Web",
    value: "dynamo.tech",
    href: "https://dynamo.tech",
  },
];

/* ─── i18n inline texts ─── */
const pageTexts = {
  es: {
    jobPortalLabel: 'Portal de empleo',
    jobPortalValue: 'Sumate al equipo',
    directBookingBadge: 'Agenda directa',
    directBookingTitle: '¿Prefieres agendar directamente?',
    directBookingDesc: 'Selecciona un horario que te quede comodo para una demo de 15 minutos. Te mostraremos como DYNAMO Journeys puede optimizar tu operacion.',
    successTitle: 'Solicitud enviada',
    successDesc: 'Recibimos tu mensaje. Nos pondremos en contacto en menos de 24 horas habiles.',
    successAnother: 'Enviar otra solicitud',
    sending: 'Enviando...',
    fallbackError: 'Error al enviar el formulario',
    connectionError: 'Error de conexion. Intenta de nuevo mas tarde.',
  },
  en: {
    jobPortalLabel: 'Job Portal',
    jobPortalValue: 'Join the team',
    directBookingBadge: 'Direct Booking',
    directBookingTitle: 'Prefer to book directly?',
    directBookingDesc: 'Pick a time that works for you for a 15-minute demo. We will show you how DYNAMO Journeys can optimize your operation.',
    successTitle: 'Request sent',
    successDesc: 'We received your message. We will get back to you within 24 business hours.',
    successAnother: 'Send another request',
    sending: 'Sending...',
    fallbackError: 'Error submitting the form',
    connectionError: 'Connection error. Please try again later.',
  },
  fr: {
    jobPortalLabel: "Portail emploi",
    jobPortalValue: "Rejoignez l'equipe",
    directBookingBadge: 'Reservation directe',
    directBookingTitle: 'Vous preferez reserver directement\u00a0?',
    directBookingDesc: 'Choisissez un creneau qui vous convient pour une demo de 15 minutes. Nous vous montrerons comment DYNAMO Journeys peut optimiser vos operations.',
    successTitle: 'Demande envoyee',
    successDesc: 'Nous avons recu votre message. Nous vous recontacterons sous 24 heures ouvrees.',
    successAnother: 'Envoyer une autre demande',
    sending: 'Envoi en cours...',
    fallbackError: "Erreur lors de l'envoi du formulaire",
    connectionError: 'Erreur de connexion. Veuillez reessayer plus tard.',
  },
  pt: {
    jobPortalLabel: 'Portal de vagas',
    jobPortalValue: 'Junte-se ao time',
    directBookingBadge: 'Agendamento direto',
    directBookingTitle: 'Prefere agendar diretamente?',
    directBookingDesc: 'Escolha um horario que funcione para voce para uma demo de 15 minutos. Mostraremos como o DYNAMO Journeys pode otimizar sua operacao.',
    successTitle: 'Solicitacao enviada',
    successDesc: 'Recebemos sua mensagem. Entraremos em contato em ate 24 horas uteis.',
    successAnother: 'Enviar outra solicitacao',
    sending: 'Enviando...',
    fallbackError: 'Erro ao enviar o formulario',
    connectionError: 'Erro de conexao. Tente novamente mais tarde.',
  },
} as const;

type SupportedLocale = keyof typeof pageTexts;

function getSocialLinks(locale: string) {
  const tx = pageTexts[(locale as SupportedLocale)] || pageTexts.es;
  return [
    {
      icon: ExternalLink,
      label: "LinkedIn",
      value: "dynamo-tech",
      href: "https://www.linkedin.com/company/dynamo-tech",
    },
    {
      icon: Camera,
      label: "Instagram",
      value: "@dynamo.tech",
      href: "https://www.instagram.com/dynamo.tech",
    },
    {
      icon: Briefcase,
      label: tx.jobPortalLabel,
      value: tx.jobPortalValue,
      href: "https://dynamotech.notion.site/Portal-de-empleo",
    },
  ];
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactoClient({ locale }: { locale: string }) {
  const t = useTranslations('contact');
  const tx = pageTexts[(locale as SupportedLocale)] || pageTexts.es;
  const socialLinks = getSocialLinks(locale);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, role, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errors = data.errors || {};
        const firstError = Object.values(errors)[0] as string || tx.fallbackError;
        setErrorMessage(firstError);
        setStatus('error');
        return;
      }

      setStatus('success');
      trackEvent('form_submit', { form: 'contact' });
      trackEvent('demo_request', { company, role });

      // Reset form
      setName('');
      setEmail('');
      setCompany('');
      setRole('');
      setMessage('');
    } catch {
      setErrorMessage(tx.connectionError);
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">
                {t('badge')}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t('heroTitle1')}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime">
                  {t('heroTitle2')}
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                {t('heroDesc')}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Demo Booking Section */}
      <section className="py-12 lg:py-16 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <RevealOnScroll>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full">
                  {tx.directBookingBadge}
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">
                  {tx.directBookingTitle}
                </h2>
                <p className="text-white/60 leading-relaxed">
                  {tx.directBookingDesc}
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <DemoBooking />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <RevealOnScroll>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 lg:p-10">
                  <h2 className="font-heading text-2xl font-bold text-white mb-8">
                    {t('formTitle')}
                  </h2>

                  {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle2 className="w-16 h-16 text-lime mb-4" />
                      <h3 className="font-heading text-xl font-bold text-white mb-2">
                        {tx.successTitle}
                      </h3>
                      <p className="text-white/60 max-w-md">
                        {tx.successDesc}
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 px-6 py-2.5 text-sm font-medium text-white/60 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        {tx.successAnother}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-white/60 mb-2"
                          >
                            {t('labelName')}
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 min-h-[44px] bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            placeholder={t('placeholderName')}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white/60 mb-2"
                          >
                            {t('labelEmail')}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 min-h-[44px] bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            placeholder={t('placeholderEmail')}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium text-white/60 mb-2"
                          >
                            {t('labelCompany')}
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-3 min-h-[44px] bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            placeholder={t('placeholderCompany')}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-white/60 mb-2"
                          >
                            {t('labelRole')}
                          </label>
                          <select
                            id="role"
                            name="role"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-3 min-h-[44px] bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none"
                          >
                            <option value="" className="bg-deep text-white/50">
                              {t('placeholderRole')}
                            </option>
                            {[t('roleCVM'), t('roleVAS'), t('roleIT'), t('roleMarketing'), t('roleCLevel'), t('roleOther')].map((option) => (
                              <option key={option} value={option} className="bg-deep">
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-white/60 mb-2"
                        >
                          {t('labelMessage')}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-4 py-3 min-h-[44px] bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                          placeholder={t('placeholderMessage')}
                        />
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <p className="text-sm text-red-400">{errorMessage}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[44px] bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {tx.sending}
                          </>
                        ) : (
                          <>
                            {t('submitButton')}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </RevealOnScroll>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Free trial badge */}
              <RevealOnScroll delay={0.1}>
                <div className="rounded-xl border border-lime/20 bg-lime/5 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-lime" />
                    <h3 className="font-heading font-semibold text-lime">
                      {t('trialTitle')}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {t('trialDesc')}
                  </p>
                </div>
              </RevealOnScroll>

              {/* Contact Info */}
              <RevealOnScroll delay={0.2}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-heading font-semibold text-white mb-5">
                    {t('contactInfoTitle')}
                  </h3>
                  <ul className="space-y-4">
                    {contactInfo.map((info) => (
                      <li key={info.label}>
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                        >
                          <info.icon className="w-4 h-4 text-purple-400 shrink-0" />
                          <div>
                            <span className="block text-white/60 text-xs">
                              {info.label}
                            </span>
                            <span>{info.value}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>

              {/* Address */}
              <RevealOnScroll delay={0.25}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-heading font-semibold text-white mb-5">
                    {t('officeTitle')}
                  </h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-white/80 font-medium">
                        Buenos Aires, Argentina
                      </p>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">
                        Francisco N. de Laprida 771, 7mo piso
                        <br />
                        B1638 Florida, Buenos Aires
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Social & Links */}
              <RevealOnScroll delay={0.3}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-heading font-semibold text-white mb-5">
                    {t('followTitle')}
                  </h3>
                  <ul className="space-y-4">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                        >
                          <link.icon className="w-4 h-4 text-purple-400 shrink-0" />
                          <div>
                            <span className="block text-white/60 text-xs">
                              {link.label}
                            </span>
                            <span>{link.value}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>

              {/* Response time */}
              <RevealOnScroll delay={0.4}>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <Clock className="w-5 h-5 text-purple-400 shrink-0" />
                  <p className="text-sm text-white/60">
                    {t('responseTime')}{" "}
                    <span className="text-white font-medium">{t('responseTimeValue')}</span>
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Visual */}
      <section className="py-16 lg:py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              {t('presenceTitle')}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-12">
              {t('presenceDesc')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-lime mb-1">
                  LATAM
                </div>
                <p className="text-xs text-white/60">{t('presenceLatamCountries')}</p>
              </div>
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-lime mb-1">
                  Africa
                </div>
                <p className="text-xs text-white/60">{t('presenceAfricaCountries')}</p>
              </div>
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-lime mb-1">
                  Europa
                </div>
                <p className="text-xs text-white/60">{t('presenceEuropeCountries')}</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
