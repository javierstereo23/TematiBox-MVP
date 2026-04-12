import type { Metadata } from 'next';
import { getAlternates } from '@/lib/seo';
import Image from 'next/image';
import { StudioClientSections } from './StudioClientSections';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'DYNAMO Studio — Plataforma Conversacional para Empresas',
    description:
      'Automatiza la comunicación con clientes, genera leads de calidad y brinda soporte 24/7 con chatbots inteligentes y campañas omnicanal.',
    alternates: getAlternates('/studio'),
    openGraph: {
      title: 'DYNAMO Studio — Plataforma Conversacional para Empresas',
      description:
        'Automatiza la comunicación con clientes, genera leads de calidad y brinda soporte 24/7 con chatbots inteligentes y campañas omnicanal.',
    },
  };
}

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-deep">
      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/home-platform-mockup.png"
            alt="Dynamo Studio platform interface"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.10]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/60 to-deep" />
        </div>

        {/* Purple ambient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/25 via-transparent to-transparent" />
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-purple-700/10 rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse-glow" />
            <span className="text-purple-300 text-sm font-medium">Para Empresas</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight">
            La plataforma conversacional que{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              impulsa tus ventas
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            Automatiz&aacute; la comunicaci&oacute;n con tus clientes, gener&aacute; leads de calidad y brind&aacute; atenci&oacute;n 24/7 con chatbots inteligentes y campa&ntilde;as omnicanal. Sin c&oacute;digo.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            >
              Agendar Demo
            </a>
            <a
              href="#planes"
              className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Ver planes
            </a>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent" />
      </section>

      {/* ── Client Sections ── */}
      <StudioClientSections />
    </main>
  );
}
