import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';
import {
  ModelFlowSection,
  ContentProvidersSection,
  OperatorDashboardSection,
  HandsOnSection,
  ResultsSection,
  VASCTA,
} from './VASClientSections';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('vas');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/vas'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

const heroI18n: Record<string, {
  titlePre: string; titleHighlight: string; titlePost: string;
  subtitle: string; ctaPrimary: string; ctaSecondary: string;
  stats: { value: string; label: string }[];
}> = {
  es: {
    titlePre: 'Monetizá tu inventario con',
    titleHighlight: 'operación experta',
    titlePost: 'y marketplace transparente',
    subtitle: 'DYNAMO opera el negocio VAS de punta a punta. Desde la generación de audiencias hasta el collection.',
    ctaPrimary: 'Hablar con ventas',
    ctaSecondary: 'Descubre tu solución',
    stats: [
      { value: '+45MM', label: 'transacciones procesadas' },
      { value: '98%', label: 'tráfico sin fraude' },
      { value: '7.8%', label: 'conversión promedio' },
    ],
  },
  en: {
    titlePre: 'Monetize your inventory with',
    titleHighlight: 'expert operations',
    titlePost: 'and a transparent marketplace',
    subtitle: 'DYNAMO runs the VAS business end-to-end. From audience generation to collection.',
    ctaPrimary: 'Talk to sales',
    ctaSecondary: 'Discover your solution',
    stats: [
      { value: '+45MM', label: 'transactions processed' },
      { value: '98%', label: 'fraud-free traffic' },
      { value: '7.8%', label: 'average conversion' },
    ],
  },
  fr: {
    titlePre: 'Monétisez votre inventaire avec une',
    titleHighlight: 'opération experte',
    titlePost: 'et un marketplace transparent',
    subtitle: 'DYNAMO gère le business VAS de bout en bout. De la génération d\'audiences à l\'encaissement.',
    ctaPrimary: 'Parler aux ventes',
    ctaSecondary: 'Découvrez votre solution',
    stats: [
      { value: '+45MM', label: 'transactions traitées' },
      { value: '98%', label: 'trafic sans fraude' },
      { value: '7.8%', label: 'conversion moyenne' },
    ],
  },
  pt: {
    titlePre: 'Monetize seu inventário com',
    titleHighlight: 'operação especializada',
    titlePost: 'e marketplace transparente',
    subtitle: 'DYNAMO opera o negócio VAS de ponta a ponta. Da geração de audiências ao collection.',
    ctaPrimary: 'Falar com vendas',
    ctaSecondary: 'Descubra sua solução',
    stats: [
      { value: '+45MM', label: 'transações processadas' },
      { value: '98%', label: 'tráfego sem fraude' },
      { value: '7.8%', label: 'conversão média' },
    ],
  },
};

export default async function VASPage() {
  const locale = await getLocale();
  const t = heroI18n[locale] || heroI18n.es;
  return (
    <main className="min-h-screen bg-deep">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/vas-hero.png"
            alt="VAS marketplace and managed services platform"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.08]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/50 to-deep" />
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-deep via-transparent to-purple-900/10" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.06] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-lime/[0.03] rounded-full blur-[130px]" />
        </div>

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(205,255,0,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-lime text-sm font-medium tracking-wide">
              VAS &amp; Managed Services
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] tracking-tight">
            {t.titlePre}{' '}
            <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>{' '}
            {t.titlePost}
          </h1>

          <p className="text-w60 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:segundo.salvadores@dynamo.tech"
              className="inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-deep px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(205,255,0,0.3)]"
            >
              {t.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/qualify"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              {t.ctaSecondary}
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.04] border border-white/[0.06] rounded-2xl px-6 py-5 backdrop-blur-sm"
              >
                <div className="text-3xl font-heading font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-w40 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent" />
      </section>

      {/* ── Sections ────────────────────────────────────────── */}
      <div id="modelo">
        <ModelFlowSection />
      </div>
      <div id="providers">
        <ContentProvidersSection />
      </div>
      <div id="operador">
        <OperatorDashboardSection />
      </div>
      <HandsOnSection />
      <ResultsSection />
      <VASCTA />
    </main>
  );
}
