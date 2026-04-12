import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import {
  WhatIsSATPushSection,
  AppletSection,
  OTACloudSection,
  CellCCaseSection,
  SecuritySection,
  OTASIMCTA,
} from './OTASIMClientSections';

export async function generateMetadata(): Promise<Metadata> {
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('otaSim');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/ota-sim'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

const heroI18n: Record<string, {
  tag: string;
  titleSub: string;
  subtitle: string;
  ctaPrimary: string; ctaSecondary: string;
  stats: { value: string; label: string }[];
}> = {
  es: {
    tag: 'Tecnología Propietaria',
    titleSub: 'la tecnología que nadie más tiene',
    subtitle: '15+ años de expertise en soluciones SIM card. Applet propietario capaz de ser instalado over-the-air en cualquier SIM del mundo.',
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Ver SAT Push',
    stats: [
      { value: '95%', label: 'compatibilidad SIM' },
      { value: '6M+', label: 'usuarios Cell C' },
      { value: '4', label: 'SIM manufacturers' },
    ],
  },
  en: {
    tag: 'Proprietary Technology',
    titleSub: 'the technology nobody else has',
    subtitle: '15+ years of expertise in SIM card solutions. Proprietary applet capable of being installed over-the-air on any SIM in the world.',
    ctaPrimary: 'Schedule Demo',
    ctaSecondary: 'View SAT Push',
    stats: [
      { value: '95%', label: 'SIM compatibility' },
      { value: '6M+', label: 'Cell C users' },
      { value: '4', label: 'SIM manufacturers' },
    ],
  },
  fr: {
    tag: 'Technologie Propriétaire',
    titleSub: 'la technologie que personne d\'autre ne possède',
    subtitle: '15+ années d\'expertise en solutions SIM card. Applet propriétaire capable d\'être installé over-the-air sur n\'importe quelle SIM au monde.',
    ctaPrimary: 'Planifier une démo',
    ctaSecondary: 'Voir SAT Push',
    stats: [
      { value: '95%', label: 'compatibilité SIM' },
      { value: '6M+', label: 'utilisateurs Cell C' },
      { value: '4', label: 'fabricants de SIM' },
    ],
  },
  pt: {
    tag: 'Tecnologia Proprietária',
    titleSub: 'a tecnologia que ninguém mais tem',
    subtitle: '15+ anos de expertise em soluções SIM card. Applet proprietário capaz de ser instalado over-the-air em qualquer SIM do mundo.',
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Ver SAT Push',
    stats: [
      { value: '95%', label: 'compatibilidade SIM' },
      { value: '6M+', label: 'usuários Cell C' },
      { value: '4', label: 'fabricantes de SIM' },
    ],
  },
};

export default async function OTASIMPage() {
  const locale = await getLocale();
  const t = heroI18n[locale] || heroI18n.es;
  return (
    <main className="min-h-screen bg-deep">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/sat-push-sim.png"
            alt="Circuit board technology representing SIM card and OTA infrastructure"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.08]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/60 to-deep" />
        </div>

        {/* Ambient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-deep via-transparent to-amber-900/10" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/[0.06] rounded-full blur-[140px]" />
          <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-amber-400/[0.03] rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-sm font-medium tracking-wide">
              {t.tag}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight">
            OTA Cloud &amp;{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              SIM Card Application
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-white/80">
              {t.titleSub}
            </span>
          </h1>

          <p className="text-w60 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-deep px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              {t.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/sat-push"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              {t.ctaSecondary}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.04] border border-white/[0.06] rounded-2xl px-6 py-5 backdrop-blur-sm"
              >
                <div className="text-3xl font-heading font-bold text-amber-400">{stat.value}</div>
                <div className="text-w40 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent" />
      </section>

      {/* ── Sections ── */}
      <div id="que-es">
        <WhatIsSATPushSection />
      </div>
      <AppletSection />
      <OTACloudSection />
      <CellCCaseSection />
      <SecuritySection />
      <OTASIMCTA />
    </main>
  );
}
