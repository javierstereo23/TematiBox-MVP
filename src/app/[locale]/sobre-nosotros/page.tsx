import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { getAlternates } from '@/lib/seo';
import SobreNosotrosClient from './SobreNosotrosClient';

const metaTitles: Record<string, string> = {
  es: 'Sobre Nosotros — DYNAMO',
  en: 'About Us — DYNAMO',
  fr: 'A propos — DYNAMO',
  pt: 'Sobre Nos — DYNAMO',
};

const metaDescriptions: Record<string, string> = {
  es: 'Más de una década transformando la comunicación de las Telcos más grandes del mundo. Tecnología, innovación y expertise en orquestación omnicanal.',
  en: 'Over a decade transforming communication for the world\'s largest Telcos. Technology, innovation, and expertise in omnichannel orchestration.',
  fr: 'Plus d\'une décennie à transformer la communication des plus grands opérateurs Telco. Technologie, innovation et expertise en orchestration omnicanale.',
  pt: 'Mais de uma década transformando a comunicação das maiores Telcos do mundo. Tecnologia, inovação e expertise em orquestração omnichannel.',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = metaTitles[locale] || metaTitles.es;
  const description = metaDescriptions[locale] || metaDescriptions.es;

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: getAlternates('/sobre-nosotros'),
  };
}

export default async function SobreNosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SobreNosotrosClient locale={locale} />;
}
