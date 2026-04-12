import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import RoiCalculatorClient from './RoiCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Calculadora ROI SAT Push | DYNAMO',
    description: 'Calcula cuánto ahorra tu operación usando SAT Push + WhatsApp vs WhatsApp solo. Simulador interactivo de ROI para Telcos.',
    alternates: getAlternates('/roi-calculator'),
  };
}

export default function RoiCalculatorPage() {
  return <RoiCalculatorClient />;
}
