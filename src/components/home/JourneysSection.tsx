'use client';

import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  BarChart3,
  BellRing,
  ShieldCheck,
  LayoutGrid,
  BrainCircuit,
  MessageSquare,
  Smartphone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRef, useEffect, useState } from 'react';

/* ================================================================
   i18n — all translatable strings
   ================================================================ */
const i18n = {
  es: {
    // Part A — Journey Builder
    sectionTag: 'DYNAMO Journeys',
    sectionTitle1: 'La plataforma que conecta ',
    sectionTitle2: 'tu infraestructura con cada canal',
    sectionDesc:
      'Capturamos eventos en tiempo real desde tu HLR, Billing y CRM. Construimos audiencias por afinidad con AI. Activamos journeys omnicanal automatizados que convierten.',
    canvasTitle: 'Journey Builder \u2014 Migración Prepago a Pospago',
    triggers: ['Plan vencido', 'Consumo > 80%', 'Recarga frecuente', 'NPS positivo'],
    satPushLabel: 'SAT Push',
    initialChannel: 'Canal inicial',
    satPushMsg:
      '\u201cDetectamos que tu plan prepago no te alcanza. Migra a Pospago Ilimitado 10GB por $15/mes.\u201d',
    cancelBtn: 'Cancelar',
    okBtn: 'OK',
    accepts: 'ACEPTA',
    directConversion: 'Conversión directa',
    rejects: 'RECHAZA',
    retryOther: 'Reintento vía otro canal',
    undelivered: 'UNDELIVERED',
    autoFallback: 'Fallback automático',
    smsUpsell: 'SMS + Upsell',
    smsWelcome: 'SMS de bienvenida + SAT Push upsell de datos adicionales',
    whatsappMsg:
      '\u201c50% OFF primer mes. Plan Ilimitado 10GB por $7.50/mes. \u00bfActivar ahora?\u201d',
    yesActivate: 'Sí, activar',
    viewOthers: 'Ver otros',
    smsFallbackMsg: '\u201cTenemos una oferta para ti. Ingresa: telco.com/migrar\u201d',
    conversionRegistered: 'Conversión registrada en tiempo real',
    // Part B — Capabilities
    capTitle1: 'Todo lo que necesitas para orquestar ',
    capTitle2: 'journeys que convierten',
    expandLink: 'Ampliar',
    ctaButton: 'Conocer DYNAMO Journeys en detalle',
    capabilities: [
      {
        title: 'Orquestación completa de canales',
        description:
          'Coordina, automatiza y encadena experiencias en todos los canales Telco y OTT. SAT Push, RCS, WhatsApp, SMS, Instagram, Messenger, flashSMS y Email se combinan en journeys coherentes que eliminan silos y aumentan la efectividad global.',
      },
      {
        title: 'Estadísticas y KPIs en tiempo real',
        description:
          'Analiza el rendimiento de cada journey como embudo completo: intención, envíos, impactos, clics, conversiones y ventas reales. Segmentado por canal, producto y automatización. Identifica qué canal convierte mejor y qué journey genera mayores ingresos.',
      },
      {
        title: 'Triggers basados en comportamiento',
        description:
          'Activa journeys automáticamente ante eventos críticos: vencimiento de datos, recargas, compra de terminal, consumo superior al plan, riesgo de churn, NPS bajo, portabilidad inminente, cambio de zona, onboarding SIM/eSIM. Integración directa a tu infraestructura.',
      },
      {
        title: 'Motor de reglas de negocio avanzadas',
        description:
          'Ventanas horarias (windowing), filtros anti-spam, blacklists y whitelists, priorización de canales con fallbacks, ancho de banda controlado, filtros de SDP y Billing, segmentación AI con clusters por afinidad.',
      },
      {
        title: 'Campaign Manager 4-en-1',
        description:
          'Lanza campañas single-channel, realiza A/B testing de creatividades, activa campañas programáticas con productos en competencia, ejecuta eventos en tiempo real y construye journeys completos de automatización.',
      },
      {
        title: 'Copilot AI + Real-Time Bidding',
        description:
          'Inteligencia artificial que construye audiencias por afinidad y comportamiento en tiempo real. Incluye sistema de Real-Time Bidding para la venta de inventario a Content Providers y marcas, con optimización automática de performance.',
      },
    ],
  },
  en: {
    sectionTag: 'DYNAMO Journeys',
    sectionTitle1: 'The platform that connects ',
    sectionTitle2: 'your infrastructure with every channel',
    sectionDesc:
      'We capture real-time events from your HLR, Billing, and CRM. We build audiences by affinity with AI. We activate automated omnichannel journeys that convert.',
    canvasTitle: 'Journey Builder \u2014 Prepaid to Postpaid Migration',
    triggers: ['Plan expired', 'Usage > 80%', 'Frequent top-up', 'Positive NPS'],
    satPushLabel: 'SAT Push',
    initialChannel: 'Initial channel',
    satPushMsg:
      '\u201cWe detected your prepaid plan isn\u2019t enough. Switch to Unlimited Postpaid 10GB for $15/mo.\u201d',
    cancelBtn: 'Cancel',
    okBtn: 'OK',
    accepts: 'ACCEPTS',
    directConversion: 'Direct conversion',
    rejects: 'REJECTS',
    retryOther: 'Retry via another channel',
    undelivered: 'UNDELIVERED',
    autoFallback: 'Automatic fallback',
    smsUpsell: 'SMS + Upsell',
    smsWelcome: 'Welcome SMS + SAT Push data upsell',
    whatsappMsg:
      '\u201c50% OFF first month. Unlimited Plan 10GB for $7.50/mo. Activate now?\u201d',
    yesActivate: 'Yes, activate',
    viewOthers: 'See others',
    smsFallbackMsg: '\u201cWe have an offer for you. Visit: telco.com/migrate\u201d',
    conversionRegistered: 'Conversion registered in real time',
    capTitle1: 'Everything you need to orchestrate ',
    capTitle2: 'journeys that convert',
    expandLink: 'Learn more',
    ctaButton: 'Explore DYNAMO Journeys in detail',
    capabilities: [
      {
        title: 'Complete channel orchestration',
        description:
          'Coordinate, automate, and chain experiences across all Telco and OTT channels. SAT Push, RCS, WhatsApp, SMS, Instagram, Messenger, flashSMS, and Email combine into coherent journeys that eliminate silos and boost overall effectiveness.',
      },
      {
        title: 'Real-time statistics and KPIs',
        description:
          'Analyze the performance of each journey as a full funnel: intent, sends, impressions, clicks, conversions, and actual sales. Segmented by channel, product, and automation. Identify which channel converts best and which journey drives the most revenue.',
      },
      {
        title: 'Behavior-based triggers',
        description:
          'Automatically activate journeys on critical events: data expiry, top-ups, device purchase, over-plan usage, churn risk, low NPS, imminent portability, zone change, SIM/eSIM onboarding. Direct integration with your infrastructure.',
      },
      {
        title: 'Advanced business rules engine',
        description:
          'Time windows (windowing), anti-spam filters, blacklists and whitelists, channel prioritization with fallbacks, controlled bandwidth, SDP and Billing filters, AI segmentation with affinity clusters.',
      },
      {
        title: 'Campaign Manager 4-in-1',
        description:
          'Launch single-channel campaigns, run A/B creative testing, activate programmatic campaigns with competing products, execute real-time events, and build complete automation journeys.',
      },
      {
        title: 'Copilot AI + Real-Time Bidding',
        description:
          'Artificial intelligence that builds audiences by affinity and behavior in real time. Includes a Real-Time Bidding system for selling inventory to Content Providers and brands, with automatic performance optimization.',
      },
    ],
  },
  fr: {
    sectionTag: 'DYNAMO Journeys',
    sectionTitle1: 'La plateforme qui connecte ',
    sectionTitle2: 'votre infrastructure à chaque canal',
    sectionDesc:
      'Nous capturons les événements en temps réel depuis votre HLR, Billing et CRM. Nous construisons des audiences par affinité avec l\'AI. Nous activons des journeys omnicanaux automatisés qui convertissent.',
    canvasTitle: 'Journey Builder \u2014 Migration Prépayé vers Postpayé',
    triggers: ['Forfait expiré', 'Conso > 80%', 'Recharge fréquente', 'NPS positif'],
    satPushLabel: 'SAT Push',
    initialChannel: 'Canal initial',
    satPushMsg:
      '\u201cNous avons détecté que votre forfait prépayé ne vous suffit plus. Passez au Postpayé Illimité 10Go pour 15\u00a0$/mois.\u201d',
    cancelBtn: 'Annuler',
    okBtn: 'OK',
    accepts: 'ACCEPTE',
    directConversion: 'Conversion directe',
    rejects: 'REFUSE',
    retryOther: 'Relance via un autre canal',
    undelivered: 'NON LIVRÉ',
    autoFallback: 'Fallback automatique',
    smsUpsell: 'SMS + Upsell',
    smsWelcome: 'SMS de bienvenue + SAT Push upsell données',
    whatsappMsg:
      '\u201c50% OFF premier mois. Forfait Illimité 10Go pour 7,50\u00a0$/mois. Activer maintenant\u00a0?\u201d',
    yesActivate: 'Oui, activer',
    viewOthers: 'Voir autres',
    smsFallbackMsg: '\u201cNous avons une offre pour vous. Visitez : telco.com/migrer\u201d',
    conversionRegistered: 'Conversion enregistrée en temps réel',
    capTitle1: 'Tout ce dont vous avez besoin pour orchestrer des ',
    capTitle2: 'journeys qui convertissent',
    expandLink: 'En savoir plus',
    ctaButton: 'Découvrir DYNAMO Journeys en détail',
    capabilities: [
      {
        title: 'Orchestration complète des canaux',
        description:
          'Coordonnez, automatisez et enchaînez les expériences sur tous les canaux Telco et OTT. SAT Push, RCS, WhatsApp, SMS, Instagram, Messenger, flashSMS et Email se combinent en journeys cohérents qui éliminent les silos et augmentent l\'efficacité globale.',
      },
      {
        title: 'Statistiques et KPIs en temps réel',
        description:
          'Analysez la performance de chaque journey comme un entonnoir complet : intention, envois, impressions, clics, conversions et ventes réelles. Segmenté par canal, produit et automatisation. Identifiez quel canal convertit le mieux et quel journey génère le plus de revenus.',
      },
      {
        title: 'Triggers basés sur le comportement',
        description:
          'Activez automatiquement des journeys lors d\'événements critiques : expiration des données, recharges, achat de terminal, consommation supérieure au forfait, risque de churn, NPS bas, portabilité imminente, changement de zone, onboarding SIM/eSIM. Intégration directe à votre infrastructure.',
      },
      {
        title: 'Moteur de règles métier avancées',
        description:
          'Fenêtres horaires (windowing), filtres anti-spam, blacklists et whitelists, priorisation des canaux avec fallbacks, bande passante contrôlée, filtres SDP et Billing, segmentation AI avec clusters par affinité.',
      },
      {
        title: 'Campaign Manager 4-en-1',
        description:
          'Lancez des campagnes single-channel, réalisez des tests A/B de créatives, activez des campagnes programmatiques avec des produits concurrents, exécutez des événements en temps réel et construisez des journeys d\'automatisation complets.',
      },
      {
        title: 'Copilot AI + Real-Time Bidding',
        description:
          'Intelligence artificielle qui construit des audiences par affinité et comportement en temps réel. Inclut un système de Real-Time Bidding pour la vente d\'inventaire aux Content Providers et marques, avec optimisation automatique de la performance.',
      },
    ],
  },
  pt: {
    sectionTag: 'DYNAMO Journeys',
    sectionTitle1: 'A plataforma que conecta ',
    sectionTitle2: 'sua infraestrutura com cada canal',
    sectionDesc:
      'Capturamos eventos em tempo real do seu HLR, Billing e CRM. Construímos audiências por afinidade com AI. Ativamos journeys omnichannel automatizados que convertem.',
    canvasTitle: 'Journey Builder \u2014 Migração Pré-pago para Pós-pago',
    triggers: ['Plano vencido', 'Consumo > 80%', 'Recarga frequente', 'NPS positivo'],
    satPushLabel: 'SAT Push',
    initialChannel: 'Canal inicial',
    satPushMsg:
      '\u201cDetectamos que seu plano pré-pago não é suficiente. Migre para o Pós-pago Ilimitado 10GB por $15/mês.\u201d',
    cancelBtn: 'Cancelar',
    okBtn: 'OK',
    accepts: 'ACEITA',
    directConversion: 'Conversão direta',
    rejects: 'REJEITA',
    retryOther: 'Retentativa via outro canal',
    undelivered: 'NÃO ENTREGUE',
    autoFallback: 'Fallback automático',
    smsUpsell: 'SMS + Upsell',
    smsWelcome: 'SMS de boas-vindas + SAT Push upsell de dados',
    whatsappMsg:
      '\u201c50% OFF primeiro mês. Plano Ilimitado 10GB por $7,50/mês. Ativar agora?\u201d',
    yesActivate: 'Sim, ativar',
    viewOthers: 'Ver outros',
    smsFallbackMsg: '\u201cTemos uma oferta para você. Acesse: telco.com/migrar\u201d',
    conversionRegistered: 'Conversão registrada em tempo real',
    capTitle1: 'Tudo o que você precisa para orquestrar ',
    capTitle2: 'journeys que convertem',
    expandLink: 'Saiba mais',
    ctaButton: 'Conhecer DYNAMO Journeys em detalhe',
    capabilities: [
      {
        title: 'Orquestração completa de canais',
        description:
          'Coordene, automatize e encadeie experiências em todos os canais Telco e OTT. SAT Push, RCS, WhatsApp, SMS, Instagram, Messenger, flashSMS e Email se combinam em journeys coerentes que eliminam silos e aumentam a efetividade global.',
      },
      {
        title: 'Estatísticas e KPIs em tempo real',
        description:
          'Analise o desempenho de cada journey como funil completo: intenção, envios, impactos, cliques, conversões e vendas reais. Segmentado por canal, produto e automação. Identifique qual canal converte melhor e qual journey gera mais receita.',
      },
      {
        title: 'Triggers baseados em comportamento',
        description:
          'Ative journeys automaticamente diante de eventos críticos: vencimento de dados, recargas, compra de terminal, consumo superior ao plano, risco de churn, NPS baixo, portabilidade iminente, mudança de zona, onboarding SIM/eSIM. Integração direta com sua infraestrutura.',
      },
      {
        title: 'Motor de regras de negócio avançadas',
        description:
          'Janelas horárias (windowing), filtros anti-spam, blacklists e whitelists, priorização de canais com fallbacks, largura de banda controlada, filtros de SDP e Billing, segmentação AI com clusters por afinidade.',
      },
      {
        title: 'Campaign Manager 4-em-1',
        description:
          'Lance campanhas single-channel, realize A/B testing de criativos, ative campanhas programáticas com produtos concorrentes, execute eventos em tempo real e construa journeys completos de automação.',
      },
      {
        title: 'Copilot AI + Real-Time Bidding',
        description:
          'Inteligência artificial que constrói audiências por afinidade e comportamento em tempo real. Inclui sistema de Real-Time Bidding para a venda de inventário a Content Providers e marcas, com otimização automática de performance.',
      },
    ],
  },
};

const capIcons = [Layers, BarChart3, BellRing, ShieldCheck, LayoutGrid, BrainCircuit];
const capIsAI = [false, false, false, false, false, true];
const capHref = '/journeys';

/* ================================================================
   PART A — Journey Builder Canvas Data
   ================================================================ */

const STEP_DURATION = 1200;
const TOTAL_STEPS = 7;

/* ================================================================
   SVG Cable Connections between cards
   ================================================================ */
function CableConnections() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cableCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#cdff00" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Row 1: horizontal connections */}
      <line x1="33%" y1="18%" x2="50%" y2="18%" stroke="url(#cableCapGrad)" strokeWidth="1" />
      <line x1="50%" y1="18%" x2="67%" y2="18%" stroke="url(#cableCapGrad)" strokeWidth="1" />
      {/* Row 2: horizontal connections */}
      <line x1="33%" y1="72%" x2="50%" y2="72%" stroke="url(#cableCapGrad)" strokeWidth="1" />
      <line x1="50%" y1="72%" x2="67%" y2="72%" stroke="url(#cableCapGrad)" strokeWidth="1" />
      {/* Vertical connections */}
      <line x1="17%" y1="35%" x2="17%" y2="55%" stroke="url(#cableCapGrad)" strokeWidth="1" />
      <line x1="50%" y1="35%" x2="50%" y2="55%" stroke="url(#cableCapGrad)" strokeWidth="1" />
      <line x1="83%" y1="35%" x2="83%" y2="55%" stroke="url(#cableCapGrad)" strokeWidth="1" />
      {/* Diagonal cross-connections */}
      <line x1="33%" y1="35%" x2="50%" y2="55%" stroke="url(#cableCapGrad)" strokeWidth="0.5" opacity="0.5" />
      <line x1="67%" y1="35%" x2="50%" y2="55%" stroke="url(#cableCapGrad)" strokeWidth="0.5" opacity="0.5" />
      {/* Dots at intersections */}
      {[
        [33, 18], [50, 18], [67, 18],
        [33, 72], [50, 72], [67, 72],
        [17, 35], [17, 55], [50, 35], [50, 55],
        [83, 35], [83, 55],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={`${cx}%`}
          cy={`${cy}%`}
          r="2"
          fill="#7c3aed"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

/* ================================================================
   Journey Builder Visual Component
   ================================================================ */
function JourneyBuilderCanvas({ t }: { t: (typeof i18n)['es'] }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(canvasRef, { once: true, margin: '-40px' });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      setActiveStep(0);
    }, 600);
    return () => clearTimeout(timeout);
  }, [isInView]);

  useEffect(() => {
    if (activeStep < 0) return;
    if (activeStep >= TOTAL_STEPS) {
      const timeout = setTimeout(() => setActiveStep(0), 2000);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setActiveStep((s) => s + 1), STEP_DURATION);
    return () => clearTimeout(timeout);
  }, [activeStep]);

  const stepActive = (step: number) => activeStep >= step;

  return (
    <div ref={canvasRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,35,0.95) 0%, rgba(10,10,20,0.98) 100%)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs sm:text-[11px] text-white/65 font-medium tracking-wide">
              {t.canvasTitle}
            </span>
          </div>
          <div className="w-12" />
        </div>

        {/* Canvas area */}
        <div
          className="relative p-4 sm:p-6 lg:p-8 min-h-[420px] sm:min-h-[480px] overflow-x-auto"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* -- ROW 1: Event Triggers -- */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2">
            {t.triggers.map(
              (trigger, i) => (
                <motion.div
                  key={trigger}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={stepActive(0) ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-purple-500/15 border border-purple-500/25 text-purple-300 whitespace-nowrap"
                >
                  {trigger}
                </motion.div>
              )
            )}
          </div>

          {/* Cable down */}
          <div className="flex justify-center my-1">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={stepActive(0) ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-px h-8 origin-top"
              style={{
                background: 'linear-gradient(to bottom, #5f4ee0, #cdff00)',
              }}
            />
          </div>

          {/* -- ROW 2: SAT Push Node -- */}
          <div className="flex justify-center mb-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stepActive(1) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[320px] rounded-xl border border-lime/20 bg-lime/[0.05] p-3 sm:p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-lime" />
                <span className="text-[11px] sm:text-xs font-bold text-lime">{t.satPushLabel}</span>
                <span className="text-[9px] sm:text-[10px] text-white/30 ml-auto">{t.initialChannel}</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/50 leading-relaxed rounded-lg bg-black/30 p-2 sm:p-3 border border-white/5">
                {t.satPushMsg}
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/40 text-[9px]">{t.cancelBtn}</span>
                  <span className="px-2 py-0.5 rounded bg-lime/20 text-lime text-[9px] font-semibold">{t.okBtn}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cable splitting into 3 */}
          <div className="flex justify-center mb-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={stepActive(2) ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[320px] h-8"
            >
              <svg viewBox="0 0 320 32" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cableGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5f4ee0" />
                    <stop offset="100%" stopColor="#cdff00" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <path d="M160,0 L60,32" fill="none" stroke="url(#cableGrad)" strokeWidth="1" opacity="0.5" />
                <path d="M160,0 L160,32" fill="none" stroke="url(#cableGrad)" strokeWidth="1" opacity="0.5" />
                <path d="M160,0 L260,32" fill="none" stroke="url(#cableGrad)" strokeWidth="1" opacity="0.5" />
              </svg>
            </motion.div>
          </div>

          {/* -- ROW 3: Three response branches -- */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stepActive(3) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-green-500/20 bg-green-500/[0.06] p-2 sm:p-3"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span className="text-[10px] sm:text-[11px] font-bold text-green-400">{t.accepts}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/40 leading-relaxed">
                {t.directConversion}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stepActive(3) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-lg border border-amber-500/20 bg-amber-500/[0.06] p-2 sm:p-3"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <XCircle className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400">{t.rejects}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/40 leading-relaxed">
                {t.retryOther}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stepActive(3) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-lg border border-red-500/20 bg-red-500/[0.06] p-2 sm:p-3"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span className="text-[9px] sm:text-[10px] font-bold text-red-400">{t.undelivered}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/40 leading-relaxed">
                {t.autoFallback}
              </div>
            </motion.div>
          </div>

          {/* Cables down from each branch */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex justify-center">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={stepActive(4) ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="w-px h-6 origin-top"
                  style={{
                    background: 'linear-gradient(to bottom, #5f4ee0, #cdff00)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* -- ROW 4: Follow-up actions -- */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stepActive(5) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-green-500/15 bg-green-500/[0.04] p-2 sm:p-3"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <Mail className="w-3 h-3 text-green-300/70" />
                <span className="text-[9px] sm:text-[10px] font-semibold text-green-300/80">{t.smsUpsell}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/35 leading-relaxed">
                {t.smsWelcome}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stepActive(5) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-lg border border-green-600/15 bg-green-600/[0.04] p-2 sm:p-3"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <MessageSquare className="w-3 h-3 text-green-400/70" />
                <span className="text-[9px] sm:text-[10px] font-semibold text-green-400/80">WhatsApp</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-white/35 leading-relaxed">
                {t.whatsappMsg}
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-400/70 text-[8px]">{t.yesActivate}</span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/30 text-[8px]">{t.viewOthers}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={stepActive(5) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-lg border border-blue-500/15 bg-blue-500/[0.04] p-2 sm:p-3"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <Mail className="w-3 h-3 text-blue-300/70" />
                <span className="text-[9px] sm:text-[10px] font-semibold text-blue-300/80">SMS Fallback</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-white/35 leading-relaxed">
                {t.smsFallbackMsg}
              </div>
            </motion.div>
          </div>

          {/* Final conversion indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={stepActive(6) ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime/10 border border-lime/20">
              <CheckCircle2 className="w-4 h-4 text-lime" />
              <span className="text-xs font-semibold text-lime">{t.conversionRegistered}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================
   Main Section Component
   ================================================================ */
export default function JourneysSection() {
  const locale = useLocale();
  const t = i18n[locale as keyof typeof i18n] || i18n.es;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* PART A: Journey Builder - Dark background */}
      <div className="relative py-24 lg:py-36">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(59,42,206,0.1) 0%, transparent 60%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-5 tracking-wide">
              {t.sectionTag}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-4xl mx-auto">
              <span className="text-white">{t.sectionTitle1}</span>
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                {t.sectionTitle2}
              </span>
            </h2>
            <p className="mt-5 text-lg sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed">
              {t.sectionDesc}
            </p>
          </motion.div>

          <div className="mt-12 lg:mt-16">
            <JourneyBuilderCanvas t={t} />
          </div>
        </div>
      </div>

      {/* PART B: Capabilities - Subtle contrast background */}
      <div
        className="relative py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, rgba(20,16,61,0.6) 0%, rgba(12,10,42,0.8) 50%, rgba(5,5,16,1) 100%)' }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mx-auto">
              <span className="text-white">{t.capTitle1}</span>
              <span className="bg-gradient-to-r from-purple-400 to-lime bg-clip-text text-transparent">{t.capTitle2}</span>
            </h3>
          </motion.div>

          {/* Capabilities 3x2 grid with cable connections */}
          <div className="relative">
            {/* Cable connections SVG behind cards */}
            <div className="hidden lg:block">
              <CableConnections />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 relative z-10">
              {t.capabilities.map((cap, i) => {
                const Icon = capIcons[i];
                const isAI = capIsAI[i];
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative rounded-2xl bg-white/[0.04] backdrop-blur-sm p-6 lg:p-7 transition-all duration-500 ${
                      isAI
                        ? 'border-2 border-transparent hover:shadow-xl hover:shadow-lime-500/10'
                        : 'border border-white/[0.08] hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30'
                    }`}
                    style={
                      isAI
                        ? {
                            backgroundImage:
                              'linear-gradient(rgba(10,10,28,0.9), rgba(10,10,28,0.9)), linear-gradient(135deg, #cdff00, #7c3aed, #cdff00)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }
                        : undefined
                    }
                  >
                    {/* AI glow effect */}
                    {isAI && (
                      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-lime/20 via-transparent to-purple-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    )}

                    {/* Left gradient border accent (non-AI) */}
                    {!isAI && (
                      <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-purple-400 to-purple-600 opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                    )}
                    {/* Left gradient border accent (AI - lime) */}
                    {isAI && (
                      <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-lime to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    {/* AI badge */}
                    {isAI && (
                      <div className="absolute -top-2.5 right-5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-lime to-lime-dark text-[10px] font-bold text-white tracking-wider shadow-md shadow-lime/20">
                        AI
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                        isAI
                          ? 'bg-lime/10 border border-lime/30 group-hover:bg-lime/20 group-hover:shadow-lg group-hover:shadow-lime/20'
                          : 'bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:shadow-md group-hover:shadow-purple-500/10'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isAI
                            ? 'text-lime group-hover:text-lime'
                            : 'text-purple-400 group-hover:text-purple-300'
                        }`}
                      />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2.5 leading-snug">
                      {cap.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed mb-5">
                      {cap.description}
                    </p>
                    <Link
                      href={`/${locale}${capHref}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                        isAI
                          ? 'text-lime hover:text-lime/80'
                          : 'text-purple-300 hover:text-purple-200 group-hover:text-purple-200'
                      }`}
                    >
                      {t.expandLink}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA to Journeys page */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link
              href={`/${locale}/journeys`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_32px_rgba(59,42,206,0.4)] hover:-translate-y-0.5"
            >
              {t.ctaButton}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
