'use client';

import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Users,
  Headphones,
  Workflow,
  Zap,
  Brain,
  LayoutDashboard,
  ShieldCheck,
  BarChart3,
  Gauge,
  Radio,
  Store,
  DollarSign,
  TrendingUp,
  PieChart,
  Wallet,
  UserCheck,
  Network,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRef } from 'react';

/* ── Feature icons (locale-independent) ──────────────────────── */
const cvmIcons = [Workflow, Zap, Brain, LayoutDashboard, ShieldCheck, BarChart3, Gauge, Radio];
const vasIcons = [Store, DollarSign, TrendingUp, PieChart, Wallet, UserCheck, Network, ShieldAlert];

/* ── Locale texts for SolutionPaths ──────────────────────────── */
const spTexts: Record<string, {
  tag: string;
  heading1: string;
  heading2: string;
  cvmHeadline: string;
  cvmSubtitle: string;
  cvmFeatures: string[];
  cvmCta: string;
  vasHeadline: string;
  vasSubtitle: string;
  vasBadge: string;
  vasFeatures: string[];
  vasCta: string;
  vasTeamLine: string;
  qualifyLink: string;
}> = {
  es: {
    tag: 'Tu modelo, tu solución',
    heading1: 'Elige el camino que mejor ',
    heading2: 'se adapta a tu operación',
    cvmHeadline: 'Tu equipo controla todo',
    cvmSubtitle: 'Plataforma SaaS self-service para equipos de CVM y CORE',
    cvmFeatures: [
      'Journey builder visual drag-and-drop',
      'Triggers en tiempo real desde tu infraestructura (HLR, Billing, CRM)',
      'Segmentación AI con clusters por afinidad',
      'Campaign Manager 4-en-1 (single, A/B, eventos, journeys)',
      'Motor de reglas: windowing, anti-spam, priorización de canales',
      'Analytics full-funnel: intención → conversión → venta real',
      'Control de impactos por usuario, canal y período',
      'Orquestación de 8+ canales con fallback inteligente',
    ],
    cvmCta: 'Conocer Journeys para CVM',
    vasHeadline: 'Nosotros operamos por ti',
    vasSubtitle: 'Managed services + marketplace para áreas de VAS',
    vasBadge: 'Incluye DYNAMO Plus+',
    vasFeatures: [
      'Marketplace transparente para Content Providers',
      'Modelos de monetización CPM, CPC y CPA',
      'Sistema de bidding para compra de inventario',
      'Dashboard ROI en tiempo real por CP y producto',
      'Wallet integrado con múltiples medios de pago',
      'Operación diaria experta con equipo dedicado DYNAMO',
      'Integración con MCP/SDP para optimización de audiencias',
      'Anti-fraude y compliance regulatorio por país',
    ],
    vasCta: 'Conocer Journeys para VAS',
    vasTeamLine: 'Nuestro equipo opera por ti, todos los días',
    qualifyLink: '¿No sabes cuál es para ti? Te ayudamos a elegir',
  },
  en: {
    tag: 'Your model, your solution',
    heading1: 'Choose the path that best ',
    heading2: 'fits your operation',
    cvmHeadline: 'Your team controls everything',
    cvmSubtitle: 'Self-service SaaS platform for CVM and CORE teams',
    cvmFeatures: [
      'Visual drag-and-drop journey builder',
      'Real-time triggers from your infrastructure (HLR, Billing, CRM)',
      'AI segmentation with affinity-based clusters',
      '4-in-1 Campaign Manager (single, A/B, event-based, journeys)',
      'Rules engine: windowing, anti-spam, channel prioritization',
      'Full-funnel analytics: intent → conversion → actual sale',
      'Impact control by user, channel, and period',
      '8+ channel orchestration with intelligent fallback',
    ],
    cvmCta: 'Explore Journeys for CVM',
    vasHeadline: 'We operate for you',
    vasSubtitle: 'Managed services + marketplace for VAS teams',
    vasBadge: 'Includes DYNAMO Plus+',
    vasFeatures: [
      'Transparent marketplace for Content Providers',
      'CPM, CPC, and CPA monetization models',
      'Bidding system for inventory purchase',
      'Real-time ROI dashboard by CP and product',
      'Integrated wallet with multiple payment methods',
      'Expert daily operations with a dedicated DYNAMO team',
      'MCP/SDP integration for audience optimization',
      'Anti-fraud and regulatory compliance by country',
    ],
    vasCta: 'Explore Journeys for VAS',
    vasTeamLine: 'Our team operates for you, every day',
    qualifyLink: 'Not sure which is right for you? We\'ll help you choose',
  },
  fr: {
    tag: 'Votre modèle, votre solution',
    heading1: 'Choisissez le parcours qui ',
    heading2: 's\'adapte le mieux à votre activité',
    cvmHeadline: 'Votre équipe contrôle tout',
    cvmSubtitle: 'Plateforme SaaS en self-service pour les équipes CVM et CORE',
    cvmFeatures: [
      'Journey builder visuel drag-and-drop',
      'Déclencheurs en temps réel depuis votre infrastructure (HLR, Billing, CRM)',
      'Segmentation IA avec clusters par affinité',
      'Campaign Manager 4-en-1 (single, A/B, événements, journeys)',
      'Moteur de règles : windowing, anti-spam, priorisation des canaux',
      'Analytics full-funnel : intention → conversion → vente réelle',
      'Contrôle des impacts par utilisateur, canal et période',
      'Orchestration de 8+ canaux avec fallback intelligent',
    ],
    cvmCta: 'Découvrir Journeys pour CVM',
    vasHeadline: 'Nous opérons pour vous',
    vasSubtitle: 'Services managés + marketplace pour les équipes VAS',
    vasBadge: 'Inclut DYNAMO Plus+',
    vasFeatures: [
      'Marketplace transparent pour les Content Providers',
      'Modèles de monétisation CPM, CPC et CPA',
      'Système de bidding pour l\'achat d\'inventaire',
      'Dashboard ROI en temps réel par CP et produit',
      'Wallet intégré avec multiples moyens de paiement',
      'Opérations quotidiennes expertes avec équipe dédiée DYNAMO',
      'Intégration MCP/SDP pour l\'optimisation des audiences',
      'Anti-fraude et conformité réglementaire par pays',
    ],
    vasCta: 'Découvrir Journeys pour VAS',
    vasTeamLine: 'Notre équipe opère pour vous, chaque jour',
    qualifyLink: 'Vous ne savez pas lequel choisir ? Nous vous aidons',
  },
  pt: {
    tag: 'Seu modelo, sua solução',
    heading1: 'Escolha o caminho que melhor ',
    heading2: 'se adapta à sua operação',
    cvmHeadline: 'Sua equipe controla tudo',
    cvmSubtitle: 'Plataforma SaaS self-service para equipes de CVM e CORE',
    cvmFeatures: [
      'Journey builder visual drag-and-drop',
      'Triggers em tempo real da sua infraestrutura (HLR, Billing, CRM)',
      'Segmentação com IA e clusters por afinidade',
      'Campaign Manager 4-em-1 (single, A/B, eventos, journeys)',
      'Motor de regras: windowing, anti-spam, priorização de canais',
      'Analytics full-funnel: intenção → conversão → venda real',
      'Controle de impactos por usuário, canal e período',
      'Orquestração de 8+ canais com fallback inteligente',
    ],
    cvmCta: 'Conhecer Journeys para CVM',
    vasHeadline: 'Nós operamos para você',
    vasSubtitle: 'Serviços gerenciados + marketplace para áreas de VAS',
    vasBadge: 'Inclui DYNAMO Plus+',
    vasFeatures: [
      'Marketplace transparente para Content Providers',
      'Modelos de monetização CPM, CPC e CPA',
      'Sistema de bidding para compra de inventário',
      'Dashboard ROI em tempo real por CP e produto',
      'Wallet integrado com múltiplos meios de pagamento',
      'Operação diária especializada com equipe dedicada DYNAMO',
      'Integração com MCP/SDP para otimização de audiências',
      'Antifraude e compliance regulatório por país',
    ],
    vasCta: 'Conhecer Journeys para VAS',
    vasTeamLine: 'Nossa equipe opera para você, todos os dias',
    qualifyLink: 'Não sabe qual é para você? Ajudamos a escolher',
  },
};

/* ── Path data (locale-independent visual config) ────────────── */
const pathConfigs = [
  {
    key: 'cvm' as const,
    title: 'CVM / CORE',
    featureIcons: cvmIcons,
    ctaHref: '/cvm',
    accent: 'purple' as const,
    hasBadge: false,
    icon: Users,
    gradient: 'from-purple-950/80 via-purple-900/40 to-deep',
    pattern:
      'radial-gradient(circle at 85% 15%, rgba(59,42,206,0.18) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(59,42,206,0.1) 0%, transparent 50%)',
    borderGlow: 'group-hover:shadow-[0_0_80px_rgba(59,42,206,0.2)]',
    borderHover: 'group-hover:border-purple-500/30',
    geometricBg: true,
  },
  {
    key: 'vas' as const,
    title: 'VAS + DYNAMO Plus',
    featureIcons: vasIcons,
    ctaHref: '/vas',
    accent: 'lime' as const,
    hasBadge: true,
    icon: Headphones,
    gradient: 'from-emerald-950/60 via-lime/[0.08] to-deep',
    pattern:
      'radial-gradient(circle at 15% 15%, rgba(205,255,0,0.1) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(205,255,0,0.06) 0%, transparent 50%)',
    borderGlow: 'group-hover:shadow-[0_0_80px_rgba(205,255,0,0.12)]',
    borderHover: 'group-hover:border-lime/30',
    geometricBg: false,
  },
];

const accentStyles = {
  purple: {
    featureIcon: 'text-purple-400/70',
    featureDot: 'bg-purple-500/20 border-purple-500/30',
    cta: 'bg-purple-500 hover:bg-purple-400 text-white',
    secondary: 'text-purple-400 hover:text-purple-300 border-purple-500/20 hover:border-purple-500/40',
    tag: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
    iconBg: 'bg-purple-500/15 border-purple-500/20',
    iconColor: 'text-purple-400',
    line: 'from-purple-500/40 via-purple-500/20 to-transparent',
    headlineColor: 'text-purple-200',
  },
  lime: {
    featureIcon: 'text-lime/70',
    featureDot: 'bg-lime/15 border-lime/25',
    cta: 'bg-lime hover:bg-lime/90 text-deep',
    secondary: 'text-lime hover:text-lime/80 border-lime/20 hover:border-lime/40',
    tag: 'bg-lime/15 text-lime border-lime/20',
    iconBg: 'bg-lime/10 border-lime/20',
    iconColor: 'text-lime',
    line: 'from-lime/40 via-lime/20 to-transparent',
    headlineColor: 'text-lime/90',
  },
};

export default function SolutionPaths() {
  const locale = useLocale();
  const t = spTexts[locale] || spTexts.es;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-5 tracking-wide">
            {t.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            {t.heading1}
            <span className="bg-gradient-to-r from-purple-300 to-lime bg-clip-text text-transparent">
              {t.heading2}
            </span>
          </h2>
        </motion.div>

        {/* Two large portal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {pathConfigs.map((path, i) => {
            const styles = accentStyles[path.accent];
            const Icon = path.icon;
            const isCvm = path.key === 'cvm';
            const headline = isCvm ? t.cvmHeadline : t.vasHeadline;
            const subtitle = isCvm ? t.cvmSubtitle : t.vasSubtitle;
            const featureTexts = isCvm ? t.cvmFeatures : t.vasFeatures;
            const ctaLabel = isCvm ? t.cvmCta : t.vasCta;
            const badge = path.hasBadge ? t.vasBadge : null;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-500 ${path.borderHover} ${path.borderGlow}`}
              >
                {/* Background gradient + pattern */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${path.gradient}`}
                />
                <div
                  className="absolute inset-0 opacity-100"
                  style={{ background: path.pattern }}
                />

                {/* Animated geometric shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute w-80 h-80 rounded-full border border-white/[0.03]"
                    style={{ right: '-40px', top: '-40px' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute w-56 h-56 rounded-full border border-white/[0.02]"
                    style={{ left: '-28px', bottom: '-28px' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Extra geometric for CVM (techy feel) */}
                  {path.geometricBg && (
                    <>
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                          backgroundSize: '32px 32px',
                        }}
                      />
                    </>
                  )}
                  {/* Organic blobs for VAS */}
                  {!path.geometricBg && (
                    <>
                      <motion.div
                        className="absolute w-40 h-40 rounded-full bg-lime/[0.04] blur-3xl"
                        style={{ right: '10%', top: '20%' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        className="absolute w-32 h-32 rounded-full bg-emerald-500/[0.03] blur-2xl"
                        style={{ left: '5%', bottom: '15%' }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </>
                  )}
                </div>

                {/* Top gradient line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${styles.line} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-8 lg:p-10 xl:p-12">
                  {/* Icon + title row */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-xl ${styles.iconBg} border flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-7 h-7 ${styles.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{path.title}</h3>
                      {badge && (
                        <motion.span
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`inline-block mt-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold border ${styles.tag}`}
                        >
                          {badge}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  <h4 className={`text-lg font-semibold ${styles.headlineColor} mb-1`}>
                    {headline}
                  </h4>
                  <p className="text-base sm:text-sm text-white/70 leading-relaxed mb-8">
                    {subtitle}
                  </p>

                  {/* 8 Features grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10">
                    {featureTexts.map((text, fi) => {
                      const FIcon = path.featureIcons[fi];
                      return (
                        <div key={text} className="flex items-start gap-3 group/feat">
                          <div
                            className={`w-8 h-8 rounded-lg ${styles.featureDot} border flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feat:scale-110 transition-transform duration-200`}
                          >
                            <FIcon className={`w-4 h-4 ${styles.featureIcon}`} />
                          </div>
                          <span className="text-base sm:text-sm text-white/75 leading-snug">{text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Humanizing line for VAS */}
                  {path.accent === 'lime' && (
                    <div className="flex items-center gap-3 mb-8 py-3 px-4 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <div className="flex -space-x-2">
                        {[0, 1, 2].map((j) => (
                          <div
                            key={j}
                            className="w-7 h-7 rounded-full bg-lime/20 border-2 border-deep flex items-center justify-center"
                          >
                            <Users className="w-3.5 h-3.5 text-lime/60" />
                          </div>
                        ))}
                      </div>
                      <span className="text-sm sm:text-xs text-white/75">
                        {t.vasTeamLine}
                      </span>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <Link
                      href={`/${locale}${path.ctaHref}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold ${styles.cta} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
                    >
                      {ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Qualify link - prominent */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href={`/${locale}/qualify`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-base font-semibold text-white/60 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 group"
          >
            {t.qualifyLink}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
