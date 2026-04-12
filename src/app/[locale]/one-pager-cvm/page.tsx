import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import OnePagerCVMClient from './OnePagerCVMClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'One-Pager CVM & CORE | DYNAMO',
    description: 'Resumen ejecutivo: DYNAMO Journeys para equipos CVM & CORE. Prevención de churn, upselling y segmentación AI.',
    alternates: getAlternates('/one-pager-cvm'),
  };
}

export default function OnePagerCVMPage() {
  return <OnePagerCVMClient />;
}
