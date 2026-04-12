import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import {
  JourneyShowcase,
  FormatsSection,
  MediaKitSection,
  PlatformSection,
  DifferentiatorsSection,
  OTASection,
  AnalyticsSection,
  ResultsSection,
  SatPushCTA,
} from './SATPushClientSections';
import SatPushHeroPhone from './SatPushHeroPhone';

export async function generateMetadata(): Promise<Metadata> {
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('satPush');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/sat-push'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

const heroI18n: Record<string, {
  tag: string;
  titlePre: string; titleHighlight: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  ctaPrimary: string; ctaSecondary: string;
}> = {
  es: {
    tag: 'Diferencial clave',
    titlePre: 'SAT Push:',
    titleHighlight: 'el canal más performante, ahora con superpowers',
    subtitle: 'Notificaciones nativas de la SIM card con interactividad real, hasta 10x más conversión que SMS y compatible con el 95% de las terminales. Con applet propietario y OTA Cloud de DYNAMO.',
    stats: [
      { value: '10x', label: 'Conversión' },
      { value: '95%', label: 'Compatibilidad' },
      { value: '15+', label: 'Años' },
    ],
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Ver casos de uso',
  },
  en: {
    tag: 'Key differentiator',
    titlePre: 'SAT Push:',
    titleHighlight: 'the highest-performing channel, now with superpowers',
    subtitle: 'Native SIM card notifications with real interactivity, up to 10x more conversion than SMS and compatible with 95% of devices. With proprietary applet and DYNAMO OTA Cloud.',
    stats: [
      { value: '10x', label: 'Conversion' },
      { value: '95%', label: 'Compatibility' },
      { value: '15+', label: 'Years' },
    ],
    ctaPrimary: 'Schedule Demo',
    ctaSecondary: 'View use cases',
  },
  fr: {
    tag: 'Différenciateur clé',
    titlePre: 'SAT Push :',
    titleHighlight: 'le canal le plus performant, désormais avec des superpouvoirs',
    subtitle: 'Notifications natives de la carte SIM avec une interactivité réelle, jusqu\'à 10x plus de conversion que le SMS et compatible avec 95% des terminaux. Avec applet propriétaire et OTA Cloud de DYNAMO.',
    stats: [
      { value: '10x', label: 'Conversion' },
      { value: '95%', label: 'Compatibilité' },
      { value: '15+', label: 'Années' },
    ],
    ctaPrimary: 'Planifier une démo',
    ctaSecondary: 'Voir les cas d\'usage',
  },
  pt: {
    tag: 'Diferencial chave',
    titlePre: 'SAT Push:',
    titleHighlight: 'o canal de maior performance, agora com superpoderes',
    subtitle: 'Notificações nativas do SIM card com interatividade real, até 10x mais conversão que SMS e compatível com 95% dos terminais. Com applet proprietário e OTA Cloud da DYNAMO.',
    stats: [
      { value: '10x', label: 'Conversão' },
      { value: '95%', label: 'Compatibilidade' },
      { value: '15+', label: 'Anos' },
    ],
    ctaPrimary: 'Agendar Demo',
    ctaSecondary: 'Ver casos de uso',
  },
};

export default async function SATPushPage() {
  const locale = await getLocale();
  const t = heroI18n[locale] || heroI18n.es;
  return (
    <main className="min-h-screen bg-deep">
      {/* ── HERO — Split Screen ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/sat-push-hero.png"
            alt="SAT Push technology"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.05]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/80 to-deep" />
        </div>

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-lime/[0.04] rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/[0.06] rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(205,255,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(205,255,0,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content — Split */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT — Text */}
            <div>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="text-lime text-sm font-medium">{t.tag}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.15] tracking-tight">
                {t.titlePre}{' '}
                <span className="bg-gradient-to-r from-lime to-lime/70 bg-clip-text text-transparent">
                  {t.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/55 text-lg mt-6 leading-relaxed max-w-xl">
                {t.subtitle}
              </p>

              {/* Mini stats */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {t.stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    {i > 0 && <div className="w-px h-8 bg-white/10" />}
                    <div className={i > 0 ? 'pl-3' : ''}>
                      <span className="text-2xl font-heading font-bold text-lime">{stat.value}</span>
                      <p className="text-white/35 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-deep px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(205,255,0,0.3)]"
                >
                  {t.ctaPrimary}
                </Link>
                <a
                  href="#media-kit"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  {t.ctaSecondary}
                </a>
              </div>
            </div>

            {/* RIGHT — Animated Phone */}
            <div className="flex justify-center lg:justify-end">
              <SatPushHeroPhone />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent" />
      </section>

      {/* ── Sections ── */}
      <JourneyShowcase />
      <FormatsSection />
      <MediaKitSection />

      <PlatformSection />
      <DifferentiatorsSection />
      <OTASection />
      <AnalyticsSection />
      <ResultsSection />
      <SatPushCTA />

    </main>
  );
}
