import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import {
  ProblemSolution,
  JourneyBuilderSection,
  ChannelsSection,
  CapabilitiesSection,
  TriggersSection,
  AnalyticsSection,
  ResultsSection,
  JourneysCTA,
} from './JourneysClientSections';

/* ── Hero texts per locale ─── */
const heroTexts: Record<string, {
  title1: string; titleHighlight: string;
  subtitle: string;
  ctaPrimary: string; ctaSecondary: string;
  stats: { value: string; label: string }[];
}> = {
  es: {
    title1: 'Orquestación omnicanal ',
    titleHighlight: 'impulsada por AI',
    subtitle: 'Conecta tu infraestructura, captura eventos en tiempo real, construye audiencias con AI y activa journeys automatizados en todos los canales. Todo desde una sola plataforma.',
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Descubre tu solución',
    stats: [
      { value: '+500M', label: 'usuarios/mes' },
      { value: '+20', label: 'Telcos' },
      { value: '8+', label: 'canales' },
      { value: '22%', label: 'conversión promedio' },
    ],
  },
  en: {
    title1: 'Omnichannel orchestration ',
    titleHighlight: 'powered by AI',
    subtitle: 'Connect your infrastructure, capture real-time events, build AI-powered audiences, and activate automated journeys across every channel. All from a single platform.',
    ctaPrimary: 'Book a Demo',
    ctaSecondary: 'Find your solution',
    stats: [
      { value: '+500M', label: 'users/month' },
      { value: '+20', label: 'Telcos' },
      { value: '8+', label: 'channels' },
      { value: '22%', label: 'avg. conversion' },
    ],
  },
  fr: {
    title1: 'Orchestration omnicanale ',
    titleHighlight: 'propulsée par l\'IA',
    subtitle: 'Connectez votre infrastructure, capturez des événements en temps réel, construisez des audiences avec l\'IA et activez des journeys automatisés sur tous les canaux. Le tout depuis une seule plateforme.',
    ctaPrimary: 'Réserver une démo',
    ctaSecondary: 'Découvrez votre solution',
    stats: [
      { value: '+500M', label: 'utilisateurs/mois' },
      { value: '+20', label: 'Telcos' },
      { value: '8+', label: 'canaux' },
      { value: '22%', label: 'conversion moyenne' },
    ],
  },
  pt: {
    title1: 'Orquestração omnichannel ',
    titleHighlight: 'impulsionada por IA',
    subtitle: 'Conecte sua infraestrutura, capture eventos em tempo real, construa audiências com IA e ative journeys automatizados em todos os canais. Tudo em uma única plataforma.',
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Descubra sua solução',
    stats: [
      { value: '+500M', label: 'usuários/mês' },
      { value: '+20', label: 'Telcos' },
      { value: '8+', label: 'canais' },
      { value: '22%', label: 'conversão média' },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('journeys');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/journeys'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default async function JourneysPage() {
  const locale = await getLocale();
  const ht = heroTexts[locale] || heroTexts.es;
  return (
    <main className="min-h-screen bg-deep">
      {/* ════════════════════════════════════════════════════════════════
          HERO — Cinematic, full-bleed, premium
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient (no image) */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-deep to-deep" />

        {/* Purple ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-purple-500/[0.08] rounded-full blur-[160px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-700/[0.12] rounded-full blur-[140px]" />
          <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-purple-600/[0.06] rounded-full blur-[120px]" />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-40">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-purple-500/10 border border-purple-500/20 rounded-full px-5 py-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-purple-200 text-sm font-medium tracking-wide">
              DYNAMO Journeys
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] tracking-tight max-w-4xl mx-auto">
            {ht.title1}
            <span className="bg-gradient-to-r from-purple-400 to-lime bg-clip-text text-transparent">
              {ht.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-lg md:text-xl lg:text-2xl mt-8 max-w-3xl mx-auto leading-relaxed font-body">
            {ht.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/contacto`}
              className="group inline-flex items-center gap-2.5 bg-lime text-deep px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(205,255,0,0.3)] hover:scale-[1.02]"
            >
              {ht.ctaPrimary}
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href={`/${locale}/qualify`}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-10 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300"
            >
              {ht.ctaSecondary}
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {ht.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm mt-1 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CLIENT SECTIONS
          ════════════════════════════════════════════════════════════════ */}
      <ProblemSolution />
      <JourneyBuilderSection />
      <ChannelsSection />
      <CapabilitiesSection />
      <TriggersSection />
      <AnalyticsSection />
      <ResultsSection />
      <JourneysCTA />
    </main>
  );
}
