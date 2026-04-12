import type { Metadata } from "next";
import { getAlternates } from '@/lib/seo';
import {
  IntegrationsHero,
  TelcoCoreSection,
  ChannelsSection,
  BusinessToolsSection,
  APISection,
  CustomSection,
  IntegrationsCTA,
} from "@/components/integraciones/IntegrationSections";

export async function generateMetadata(): Promise<Metadata> {
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('integrations');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getAlternates('/integraciones'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default function IntegracionesPage() {
  return (
    <div className="min-h-screen">
      <IntegrationsHero />
      <TelcoCoreSection />
      <ChannelsSection />
      <BusinessToolsSection />
      <APISection />
      <CustomSection />
      <IntegrationsCTA />
    </div>
  );
}
