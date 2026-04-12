import { setRequestLocale } from 'next-intl/server';
import { getAlternates } from '@/lib/seo';
import QualifyJourney from './QualifyJourney';

export async function generateMetadata() {
  return {
    title: 'Encuentra tu Solución Ideal | DYNAMO',
    description:
      'Responde unas preguntas y descubre qué solución de DYNAMO se adapta mejor a tu operación Telco. Journeys, CVM, VAS o SAT Push.',
    alternates: getAlternates('/qualify'),
  };
}

export default async function QualifyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <QualifyJourney />;
}
