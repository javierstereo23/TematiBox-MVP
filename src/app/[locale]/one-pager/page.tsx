import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import OnePagerClient from './OnePagerClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'One-Pager DYNAMO Journeys | Resumen Ejecutivo',
    description: 'Descarga el resumen ejecutivo de DYNAMO Journeys para orquestación omnicanal Telco. Canales, AI, segmentación y analytics.',
    alternates: getAlternates('/one-pager'),
  };
}

export default function OnePagerPage() {
  return <OnePagerClient />;
}
