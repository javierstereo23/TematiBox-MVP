import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import {
  CapabilitiesSection,
  UseCasesSection,
  IntegrationHubSection,
  ResultsSection,
  CVMCTA,
} from './CVMClientSections';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cvm');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/cvm'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

const heroI18n: Record<string, {
  badge: string; titlePre: string; titleHighlight: string;
  subtitle: string; ctaPrimary: string; ctaSecondary: string;
}> = {
  es: {
    badge: 'CVM & CORE Services',
    titlePre: 'Dale a tu equipo de CVM el',
    titleHighlight: 'control total',
    subtitle: 'Plataforma SaaS self-service. Tu equipo construye, lanza y mide journeys omnicanal sin depender de nadie.',
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Descubre tu solución',
  },
  en: {
    badge: 'CVM & CORE Services',
    titlePre: 'Give your CVM team',
    titleHighlight: 'full control',
    subtitle: 'Self-service SaaS platform. Your team builds, launches and measures omnichannel journeys without depending on anyone.',
    ctaPrimary: 'Schedule Demo',
    ctaSecondary: 'Discover your solution',
  },
  fr: {
    badge: 'CVM & CORE Services',
    titlePre: 'Donnez à votre équipe CVM le',
    titleHighlight: 'contrôle total',
    subtitle: 'Plateforme SaaS en libre-service. Votre équipe construit, lance et mesure des journeys omnicanaux sans dépendre de personne.',
    ctaPrimary: 'Planifier une démo',
    ctaSecondary: 'Découvrez votre solution',
  },
  pt: {
    badge: 'CVM & CORE Services',
    titlePre: 'Dê à sua equipe de CVM o',
    titleHighlight: 'controle total',
    subtitle: 'Plataforma SaaS self-service. Sua equipe constrói, lança e mede journeys omnichannel sem depender de ninguém.',
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Descubra sua solução',
  },
};

export default async function CVMPage() {
  const locale = await getLocale();
  const t = heroI18n[locale] || heroI18n.es;
  return (
    <main className="min-h-screen bg-deep">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/cvm-hero.png"
            alt="Server room with blue ambient lighting representing enterprise data infrastructure"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.10]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/60 to-deep" />
        </div>

        {/* Purple ambient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-transparent" />
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-1/4 w-[300px] h-[300px] bg-purple-800/15 rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse-glow" />
            <span className="text-purple-300 text-sm font-medium">{t.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight">
            {t.titlePre}{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>

          <p className="text-w60 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,42,206,0.4)]"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="/qualify"
              className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              {t.ctaSecondary}
            </a>
          </div>

          {/* Stats bar */}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent" />
      </section>

      {/* ── Sections ── */}
      <div id="capacidades">
        <CapabilitiesSection />
      </div>
      <UseCasesSection />
      <IntegrationHubSection />
      <div id="resultados">
        <ResultsSection />
      </div>
      <CVMCTA />
    </main>
  );
}
