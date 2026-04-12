import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import OnePagerSMBClient from './OnePagerSMBClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'One-Pager Studio | DYNAMO',
    description: 'Resumen ejecutivo: DYNAMO Studio plataforma conversacional para empresas. Chatbots, automatización y campañas omnicanal.',
    alternates: getAlternates('/one-pager-smb'),
  };
}

export default function OnePagerSMBPage() {
  return <OnePagerSMBClient />;
}
