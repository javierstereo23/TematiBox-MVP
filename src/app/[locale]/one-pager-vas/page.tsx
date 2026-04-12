import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import OnePagerVASClient from './OnePagerVASClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'One-Pager VAS | DYNAMO',
    description: 'Resumen ejecutivo: DYNAMO Journeys para VAS & Managed Services. Marketplace de contenido, DCB y mobile advertising.',
    alternates: getAlternates('/one-pager-vas'),
  };
}

export default function OnePagerVASPage() {
  return <OnePagerVASClient />;
}
