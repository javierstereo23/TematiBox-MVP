import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about');
  return {
    title: 'DYNAMO | ' + t('heroTag'),
    description: t('heroSubtitle').slice(0, 160),
    openGraph: {
      title: 'DYNAMO | ' + t('heroTag'),
      description: t('heroSubtitle').slice(0, 160),
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
