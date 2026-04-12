import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/seo';
import HeroSection from '@/components/home/HeroSection';
import LogoBar from '@/components/home/LogoBar';
import ChallengeSection from '@/components/home/ChallengeSection';
import JourneysSection from '@/components/home/JourneysSection';
import SatPushDifferentiator from '@/components/home/SatPushDifferentiator';
import ResultsSection from '@/components/home/ResultsSection';
import SolutionPaths from '@/components/home/SolutionPaths';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates(''),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoBar />
      <ChallengeSection />
      <JourneysSection />
      <SatPushDifferentiator />
      <ResultsSection />
      <TestimonialsSection />
      <SolutionPaths />
      <CtaSection />
    </>
  );
}
