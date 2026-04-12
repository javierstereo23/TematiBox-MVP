import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { getAlternates } from '@/lib/seo';
import ContactoClient from './ContactoClient';

const metaTitles: Record<string, string> = {
  es: 'Contacto — Agenda tu Demo con DYNAMO',
  en: 'Contact — Schedule Your Demo with DYNAMO',
  fr: 'Contact — Reservez Votre Demo avec DYNAMO',
  pt: 'Contato — Agende Sua Demo com DYNAMO',
};

const metaDescriptions: Record<string, string> = {
  es: 'Agenda una demo personalizada con DYNAMO. WhatsApp, email o reserva directa. Respuesta en menos de 24 horas hábiles.',
  en: 'Schedule a personalized demo with DYNAMO. WhatsApp, email, or direct booking. Response within 24 business hours.',
  fr: 'Réservez une démo personnalisée avec DYNAMO. WhatsApp, email ou réservation directe. Réponse sous 24 heures ouvrées.',
  pt: 'Agende uma demo personalizada com a DYNAMO. WhatsApp, email ou agendamento direto. Resposta em até 24 horas úteis.',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = metaTitles[locale] || metaTitles.es;
  const description = metaDescriptions[locale] || metaDescriptions.es;

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: getAlternates('/contacto'),
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ContactoClient locale={locale} />;
}
