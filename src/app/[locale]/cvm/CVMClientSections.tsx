'use client';

import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/RevealOnScroll';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  Workflow,
  Zap,
  Brain,
  LayoutGrid,
  ShieldCheck,
  BarChart3,
  ArrowUpCircle,
  HardDrive,
  TrendingDown,
  UserPlus,
  ThumbsUp,
  Repeat,
  ShoppingBag,
  Award,
  ArrowRight,
  CheckCircle2,
  Server,
  Database,
  Radio,
  Globe,
  Cpu,
  Cable,
  type LucideIcon,
} from 'lucide-react';

/* =================================================================
   i18n — all user-visible strings
   ================================================================= */

type CapabilityI18n = { icon: LucideIcon; title: string; desc: string };
type UseCaseI18n = { icon: LucideIcon; title: string; desc: string; color: string };
type IntegrationI18n = { icon: LucideIcon; name: string; desc: string; color: string };
type ResultMetric = { label: string; value: string };
type ResultI18n = {
  operator: string;
  metrics: ResultMetric[];
  color: string;
  highlight: string;
  desc: string;
};

interface CvmTexts {
  /* Section 1 — Capabilities */
  capBadge: string;
  capTitle: string;
  capSubtitle: string;
  capBannerTitle: string;
  capBannerDesc: string;
  capabilities: CapabilityI18n[];

  /* Section 2 — Use Cases */
  ucBadge: string;
  ucTitle: string;
  ucSubtitle: string;
  useCases: UseCaseI18n[];

  /* Section 3 — Integrations */
  intBadge: string;
  intTitle: string;
  intSubtitle: string;
  intLinkText: string;
  integrations: IntegrationI18n[];

  /* Section 4 — Results */
  resBadge: string;
  resTitle: string;
  resSubtitle: string;
  resLinkText: string;
  results: ResultI18n[];

  /* Section 5 — CTA */
  ctaTitle: string;
  ctaDesc: string;
  ctaDemo: string;
  ctaDiscover: string;
  ctaRoi: string;
}

const i18n: Record<string, CvmTexts> = {
  es: {
    capBadge: 'Self-service',
    capTitle: '¿Qué puede hacer tu equipo con Journeys?',
    capSubtitle: '6 capacidades que le dan a tu área de CVM autonomía total sobre la operación comercial omnicanal.',
    capBannerTitle: 'Tu equipo configura, ejecuta y mide. Sin intervención técnica.',
    capBannerDesc: 'Autonomía total para el área de CVM — desde la creación de audiencias hasta el análisis de resultados.',
    capabilities: [
      { icon: Workflow, title: 'Construir journeys visuales drag & drop', desc: 'Diseña flows omnicanal con lógica de fallback, esperas, decisiones y ramificaciones. Sin código, sin IT.' },
      { icon: Zap, title: 'Configurar triggers desde tu infraestructura', desc: 'Eventos reales de HLR, Billing y CRM activan journeys automáticamente: vencimiento de datos, recarga, cambio de zona.' },
      { icon: Brain, title: 'Segmentar con AI y clusters por afinidad', desc: 'Modelos de machine learning construyen audiencias dinámicas basadas en consumo, comportamiento y resultados previos.' },
      { icon: LayoutGrid, title: 'Lanzar campañas en 4 modalidades', desc: 'Single-channel, A/B testing programático, eventos en tiempo real y journeys completos. Todo desde un solo Campaign Manager.' },
      { icon: ShieldCheck, title: 'Definir reglas: windowing, anti-spam, priorización', desc: 'Control total de frecuencia, blacklists/whitelists, priorización de canales y límites de impacto por usuario y período.' },
      { icon: BarChart3, title: 'Medir el funnel completo: intención → venta real', desc: 'Analytics end-to-end: desde la intención hasta la conversión y la venta real, segmentado por canal, producto y automatización.' },
    ],

    ucBadge: 'Casos de uso',
    ucTitle: '8 casos de uso para tu operación',
    ucSubtitle: 'Cada caso orquestado con triggers reales, segmentación inteligente y medición end-to-end.',
    useCases: [
      { icon: ArrowUpCircle, title: 'Migración de plan', desc: 'Detecta usuarios con consumo superior y ofrece el upgrade en el momento justo.', color: '#8b5cf6' },
      { icon: HardDrive, title: 'Vencimiento de datos', desc: 'Ofrece upgrades antes de que se queden sin datos, con timing basado en consumo real.', color: '#a78bfa' },
      { icon: TrendingDown, title: 'Prevención de churn', desc: 'Identifica señales de portabilidad y actúa proactivamente con ofertas de retención.', color: '#ef4444' },
      { icon: UserPlus, title: 'Onboarding SIM/eSIM', desc: 'Guía al nuevo usuario en su primera experiencia con journeys automáticos de activación.', color: '#22c55e' },
      { icon: ThumbsUp, title: 'Mejora NPS', desc: 'Recontacta usuarios insatisfechos con ofertas personalizadas basadas en historial.', color: '#f59e0b' },
      { icon: Repeat, title: 'Incentivos de recarga', desc: 'Activa recargas con promociones contextualizadas según perfil y momento.', color: '#06b6d4' },
      { icon: ShoppingBag, title: 'Cross-sell terminal', desc: 'Ofrece terminales complementarias basadas en perfil de consumo y afinidad del segmento.', color: '#cdff00' },
      { icon: Award, title: 'Retención y loyalty', desc: 'Premia la fidelidad con beneficios exclusivos y journeys de reconocimiento automáticos.', color: '#c084fc' },
    ],

    intBadge: 'Integraciones',
    intTitle: 'Integración directa con tu infraestructura',
    intSubtitle: 'DYNAMO Journeys se conecta nativamente con los sistemas core de la Telco para activar datos reales en cada decisión de campaña.',
    intLinkText: 'Ver todas las integraciones',
    integrations: [
      { icon: Radio, name: 'HLR', desc: 'Estado de SIM, tipo de terminal, zona, estado de red en tiempo real.', color: '#8b5cf6' },
      { icon: Database, name: 'Billing', desc: 'Saldo, ciclo de facturación, consumo, plan activo, fecha de renovación.', color: '#3b2ace' },
      { icon: Globe, name: 'CRM', desc: 'Perfil de cliente, historial de interacciones, NPS, segmentos comerciales.', color: '#22c55e' },
      { icon: Server, name: 'SDP', desc: 'Catálogo de productos, aprovisionamiento, activación de servicios VAS.', color: '#f59e0b' },
      { icon: Cpu, name: 'LBS', desc: 'Geolocalización para campañas basadas en ubicación y contexto geográfico.', color: '#06b6d4' },
      { icon: Cable, name: 'CDRs', desc: 'Registros de llamadas y datos para análisis de consumo y afinidad.', color: '#ef4444' },
    ],

    resBadge: 'Resultados',
    resTitle: 'Resultados reales',
    resSubtitle: 'Operadores de América Latina y África ya usan Journeys para potenciar sus equipos de CVM.',
    resLinkText: 'Ver todos los casos de éxito',
    results: [
      {
        operator: 'Operador Tier 1 — LATAM',
        metrics: [
          { label: 'Usuarios alcanzados', value: '24MM' },
          { label: 'Tasa de entrega', value: '98%' },
          { label: 'Conversión', value: '22%' },
        ],
        color: '#EF4444',
        highlight: '22% conversión end-to-end en campañas omnicanal',
        desc: 'Operación CVM completa con triggers desde HLR y Billing, segmentación AI y journeys automáticos en SAT Push + WhatsApp.',
      },
      {
        operator: 'Operador líder — Chile',
        metrics: [
          { label: 'CTR con AI', value: '4%' },
          { label: 'CTR anterior', value: '2.4%' },
          { label: 'Mejora', value: '+67%' },
        ],
        color: '#22C55E',
        highlight: '+67% mejora con segmentación AI',
        desc: 'Implementación de clusters por afinidad con machine learning, mejorando el targeting en campañas de migración de plan.',
      },
      {
        operator: 'Operador — África Occidental',
        metrics: [
          { label: 'Conversión', value: '8.3%' },
          { label: 'Alcance', value: '97%' },
          { label: 'Anti-spam', value: 'Activo' },
        ],
        color: '#F59E0B',
        highlight: '8.3% conversión con control anti-spam',
        desc: 'Motor de reglas con windowing y frequency capping garantizando conversión sin saturar la base de usuarios.',
      },
    ],

    ctaTitle: 'Tu equipo merece la mejor plataforma',
    ctaDesc: 'Agenda una demo y descubre cómo los equipos de CVM de operadores líderes gestionan sus campañas omnicanal desde Journeys.',
    ctaDemo: 'Agendar Demo',
    ctaDiscover: 'Descubre tu solución',
    ctaRoi: 'Calculadora ROI',
  },

  en: {
    capBadge: 'Self-service',
    capTitle: 'What can your team do with Journeys?',
    capSubtitle: '6 capabilities that give your CVM team full autonomy over omnichannel commercial operations.',
    capBannerTitle: 'Your team configures, executes, and measures. No technical intervention.',
    capBannerDesc: 'Full autonomy for the CVM team — from audience creation to results analysis.',
    capabilities: [
      { icon: Workflow, title: 'Build visual drag & drop journeys', desc: 'Design omnichannel flows with fallback logic, waits, decisions, and branching. No code, no IT.' },
      { icon: Zap, title: 'Set triggers from your infrastructure', desc: 'Real events from HLR, Billing, and CRM automatically trigger journeys: data expiration, top-up, zone change.' },
      { icon: Brain, title: 'Segment with AI and affinity clusters', desc: 'Machine learning models build dynamic audiences based on usage, behavior, and prior results.' },
      { icon: LayoutGrid, title: 'Launch campaigns in 4 modes', desc: 'Single-channel, programmatic A/B testing, real-time events, and full journeys. All from one Campaign Manager.' },
      { icon: ShieldCheck, title: 'Define rules: windowing, anti-spam, prioritization', desc: 'Full control of frequency, blacklists/whitelists, channel prioritization, and impact limits per user and period.' },
      { icon: BarChart3, title: 'Measure the full funnel: intent → actual sale', desc: 'End-to-end analytics: from intent to conversion and actual sale, segmented by channel, product, and automation.' },
    ],

    ucBadge: 'Use cases',
    ucTitle: '8 use cases for your operation',
    ucSubtitle: 'Each case orchestrated with real triggers, intelligent segmentation, and end-to-end measurement.',
    useCases: [
      { icon: ArrowUpCircle, title: 'Plan migration', desc: 'Detect users with higher usage and offer an upgrade at the right time.', color: '#8b5cf6' },
      { icon: HardDrive, title: 'Data expiration', desc: 'Offer upgrades before they run out of data, with timing based on real usage.', color: '#a78bfa' },
      { icon: TrendingDown, title: 'Churn prevention', desc: 'Identify portability signals and act proactively with retention offers.', color: '#ef4444' },
      { icon: UserPlus, title: 'SIM/eSIM onboarding', desc: 'Guide new users through their first experience with automated activation journeys.', color: '#22c55e' },
      { icon: ThumbsUp, title: 'NPS improvement', desc: 'Re-engage dissatisfied users with personalized offers based on history.', color: '#f59e0b' },
      { icon: Repeat, title: 'Top-up incentives', desc: 'Trigger top-ups with contextualized promotions based on profile and timing.', color: '#06b6d4' },
      { icon: ShoppingBag, title: 'Terminal cross-sell', desc: 'Offer complementary devices based on usage profile and segment affinity.', color: '#cdff00' },
      { icon: Award, title: 'Retention & loyalty', desc: 'Reward loyalty with exclusive benefits and automated recognition journeys.', color: '#c084fc' },
    ],

    intBadge: 'Integrations',
    intTitle: 'Direct integration with your infrastructure',
    intSubtitle: 'DYNAMO Journeys natively connects with the Telco\'s core systems to activate real data in every campaign decision.',
    intLinkText: 'View all integrations',
    integrations: [
      { icon: Radio, name: 'HLR', desc: 'SIM status, device type, zone, real-time network status.', color: '#8b5cf6' },
      { icon: Database, name: 'Billing', desc: 'Balance, billing cycle, usage, active plan, renewal date.', color: '#3b2ace' },
      { icon: Globe, name: 'CRM', desc: 'Customer profile, interaction history, NPS, commercial segments.', color: '#22c55e' },
      { icon: Server, name: 'SDP', desc: 'Product catalog, provisioning, VAS service activation.', color: '#f59e0b' },
      { icon: Cpu, name: 'LBS', desc: 'Geolocation for location-based and geographic context campaigns.', color: '#06b6d4' },
      { icon: Cable, name: 'CDRs', desc: 'Call and data records for usage and affinity analysis.', color: '#ef4444' },
    ],

    resBadge: 'Results',
    resTitle: 'Real results',
    resSubtitle: 'Operators in Latin America and Africa already use Journeys to empower their CVM teams.',
    resLinkText: 'View all success stories',
    results: [
      {
        operator: 'Tier 1 Operator — LATAM',
        metrics: [
          { label: 'Users reached', value: '24MM' },
          { label: 'Delivery rate', value: '98%' },
          { label: 'Conversion', value: '22%' },
        ],
        color: '#EF4444',
        highlight: '22% end-to-end conversion in omnichannel campaigns',
        desc: 'Full CVM operation with HLR and Billing triggers, AI segmentation, and automated journeys via SAT Push + WhatsApp.',
      },
      {
        operator: 'Leading Operator — Chile',
        metrics: [
          { label: 'CTR with AI', value: '4%' },
          { label: 'Previous CTR', value: '2.4%' },
          { label: 'Improvement', value: '+67%' },
        ],
        color: '#22C55E',
        highlight: '+67% improvement with AI segmentation',
        desc: 'Affinity cluster implementation with machine learning, improving targeting in plan migration campaigns.',
      },
      {
        operator: 'Operator — West Africa',
        metrics: [
          { label: 'Conversion', value: '8.3%' },
          { label: 'Reach', value: '97%' },
          { label: 'Anti-spam', value: 'Active' },
        ],
        color: '#F59E0B',
        highlight: '8.3% conversion with anti-spam control',
        desc: 'Rules engine with windowing and frequency capping ensuring conversion without saturating the user base.',
      },
    ],

    ctaTitle: 'Your team deserves the best platform',
    ctaDesc: 'Schedule a demo and discover how CVM teams at leading operators manage their omnichannel campaigns from Journeys.',
    ctaDemo: 'Schedule Demo',
    ctaDiscover: 'Discover your solution',
    ctaRoi: 'ROI Calculator',
  },

  fr: {
    capBadge: 'Self-service',
    capTitle: 'Que peut faire votre équipe avec Journeys ?',
    capSubtitle: '6 capacités qui offrent à votre équipe CVM une autonomie totale sur les opérations commerciales omnicanales.',
    capBannerTitle: 'Votre équipe configure, exécute et mesure. Sans intervention technique.',
    capBannerDesc: 'Autonomie totale pour l\'équipe CVM — de la création d\'audiences à l\'analyse des résultats.',
    capabilities: [
      { icon: Workflow, title: 'Créer des journeys visuels drag & drop', desc: 'Concevez des flows omnicanaux avec logique de fallback, attentes, décisions et ramifications. Sans code, sans IT.' },
      { icon: Zap, title: 'Configurer des triggers depuis votre infrastructure', desc: 'Des événements réels du HLR, Billing et CRM déclenchent automatiquement les journeys : expiration de données, recharge, changement de zone.' },
      { icon: Brain, title: 'Segmenter avec l\'AI et les clusters d\'affinité', desc: 'Des modèles de machine learning construisent des audiences dynamiques basées sur la consommation, le comportement et les résultats antérieurs.' },
      { icon: LayoutGrid, title: 'Lancer des campagnes en 4 modalités', desc: 'Single-channel, A/B testing programmatique, événements en temps réel et journeys complets. Le tout depuis un seul Campaign Manager.' },
      { icon: ShieldCheck, title: 'Définir des règles : windowing, anti-spam, priorisation', desc: 'Contrôle total de la fréquence, blacklists/whitelists, priorisation des canaux et limites d\'impact par utilisateur et période.' },
      { icon: BarChart3, title: 'Mesurer le funnel complet : intention → vente réelle', desc: 'Analytics end-to-end : de l\'intention à la conversion et la vente réelle, segmenté par canal, produit et automatisation.' },
    ],

    ucBadge: 'Cas d\'usage',
    ucTitle: '8 cas d\'usage pour votre opération',
    ucSubtitle: 'Chaque cas orchestré avec des triggers réels, une segmentation intelligente et une mesure end-to-end.',
    useCases: [
      { icon: ArrowUpCircle, title: 'Migration de forfait', desc: 'Détectez les utilisateurs avec une consommation élevée et proposez l\'upgrade au bon moment.', color: '#8b5cf6' },
      { icon: HardDrive, title: 'Expiration de données', desc: 'Proposez des upgrades avant qu\'ils n\'aient plus de données, avec un timing basé sur la consommation réelle.', color: '#a78bfa' },
      { icon: TrendingDown, title: 'Prévention du churn', desc: 'Identifiez les signaux de portabilité et agissez de manière proactive avec des offres de rétention.', color: '#ef4444' },
      { icon: UserPlus, title: 'Onboarding SIM/eSIM', desc: 'Guidez le nouvel utilisateur dans sa première expérience avec des journeys automatiques d\'activation.', color: '#22c55e' },
      { icon: ThumbsUp, title: 'Amélioration NPS', desc: 'Recontactez les utilisateurs insatisfaits avec des offres personnalisées basées sur l\'historique.', color: '#f59e0b' },
      { icon: Repeat, title: 'Incitations à la recharge', desc: 'Activez les recharges avec des promotions contextualisées selon le profil et le moment.', color: '#06b6d4' },
      { icon: ShoppingBag, title: 'Cross-sell terminal', desc: 'Proposez des terminaux complémentaires basés sur le profil de consommation et l\'affinité du segment.', color: '#cdff00' },
      { icon: Award, title: 'Rétention et fidélité', desc: 'Récompensez la fidélité avec des avantages exclusifs et des journeys de reconnaissance automatiques.', color: '#c084fc' },
    ],

    intBadge: 'Intégrations',
    intTitle: 'Intégration directe avec votre infrastructure',
    intSubtitle: 'DYNAMO Journeys se connecte nativement aux systèmes core du Telco pour activer des données réelles dans chaque décision de campagne.',
    intLinkText: 'Voir toutes les intégrations',
    integrations: [
      { icon: Radio, name: 'HLR', desc: 'État de la SIM, type de terminal, zone, état du réseau en temps réel.', color: '#8b5cf6' },
      { icon: Database, name: 'Billing', desc: 'Solde, cycle de facturation, consommation, forfait actif, date de renouvellement.', color: '#3b2ace' },
      { icon: Globe, name: 'CRM', desc: 'Profil client, historique des interactions, NPS, segments commerciaux.', color: '#22c55e' },
      { icon: Server, name: 'SDP', desc: 'Catalogue de produits, provisionnement, activation de services VAS.', color: '#f59e0b' },
      { icon: Cpu, name: 'LBS', desc: 'Géolocalisation pour les campagnes basées sur la localisation et le contexte géographique.', color: '#06b6d4' },
      { icon: Cable, name: 'CDRs', desc: 'Registres d\'appels et de données pour l\'analyse de consommation et d\'affinité.', color: '#ef4444' },
    ],

    resBadge: 'Résultats',
    resTitle: 'Résultats réels',
    resSubtitle: 'Des opérateurs d\'Amérique latine et d\'Afrique utilisent déjà Journeys pour renforcer leurs équipes CVM.',
    resLinkText: 'Voir tous les cas de succès',
    results: [
      {
        operator: 'Opérateur Tier 1 — LATAM',
        metrics: [
          { label: 'Utilisateurs atteints', value: '24MM' },
          { label: 'Taux de livraison', value: '98%' },
          { label: 'Conversion', value: '22%' },
        ],
        color: '#EF4444',
        highlight: '22% de conversion end-to-end en campagnes omnicanales',
        desc: 'Opération CVM complète avec triggers HLR et Billing, segmentation AI et journeys automatiques via SAT Push + WhatsApp.',
      },
      {
        operator: 'Opérateur leader — Chili',
        metrics: [
          { label: 'CTR avec AI', value: '4%' },
          { label: 'CTR précédent', value: '2,4%' },
          { label: 'Amélioration', value: '+67%' },
        ],
        color: '#22C55E',
        highlight: '+67% d\'amélioration avec la segmentation AI',
        desc: 'Implémentation de clusters d\'affinité avec machine learning, améliorant le targeting des campagnes de migration de forfait.',
      },
      {
        operator: 'Opérateur — Afrique de l\'Ouest',
        metrics: [
          { label: 'Conversion', value: '8,3%' },
          { label: 'Portée', value: '97%' },
          { label: 'Anti-spam', value: 'Actif' },
        ],
        color: '#F59E0B',
        highlight: '8,3% de conversion avec contrôle anti-spam',
        desc: 'Moteur de règles avec windowing et frequency capping garantissant la conversion sans saturer la base d\'utilisateurs.',
      },
    ],

    ctaTitle: 'Votre équipe mérite la meilleure plateforme',
    ctaDesc: 'Planifiez une démo et découvrez comment les équipes CVM des opérateurs leaders gèrent leurs campagnes omnicanales depuis Journeys.',
    ctaDemo: 'Planifier une Démo',
    ctaDiscover: 'Découvrez votre solution',
    ctaRoi: 'Calculateur ROI',
  },

  pt: {
    capBadge: 'Self-service',
    capTitle: 'O que sua equipe pode fazer com Journeys?',
    capSubtitle: '6 capacidades que dão à sua área de CVM autonomia total sobre a operação comercial omnichannel.',
    capBannerTitle: 'Sua equipe configura, executa e mede. Sem intervenção técnica.',
    capBannerDesc: 'Autonomia total para a área de CVM — da criação de audiências à análise de resultados.',
    capabilities: [
      { icon: Workflow, title: 'Construir journeys visuais drag & drop', desc: 'Projete flows omnichannel com lógica de fallback, esperas, decisões e ramificações. Sem código, sem IT.' },
      { icon: Zap, title: 'Configurar triggers a partir da sua infraestrutura', desc: 'Eventos reais de HLR, Billing e CRM ativam journeys automaticamente: vencimento de dados, recarga, mudança de zona.' },
      { icon: Brain, title: 'Segmentar com AI e clusters por afinidade', desc: 'Modelos de machine learning constroem audiências dinâmicas baseadas em consumo, comportamento e resultados anteriores.' },
      { icon: LayoutGrid, title: 'Lançar campanhas em 4 modalidades', desc: 'Single-channel, A/B testing programático, eventos em tempo real e journeys completos. Tudo a partir de um único Campaign Manager.' },
      { icon: ShieldCheck, title: 'Definir regras: windowing, anti-spam, priorização', desc: 'Controle total de frequência, blacklists/whitelists, priorização de canais e limites de impacto por usuário e período.' },
      { icon: BarChart3, title: 'Medir o funil completo: intenção → venda real', desc: 'Analytics end-to-end: da intenção à conversão e à venda real, segmentado por canal, produto e automação.' },
    ],

    ucBadge: 'Casos de uso',
    ucTitle: '8 casos de uso para sua operação',
    ucSubtitle: 'Cada caso orquestrado com triggers reais, segmentação inteligente e medição end-to-end.',
    useCases: [
      { icon: ArrowUpCircle, title: 'Migração de plano', desc: 'Detecte usuários com consumo superior e ofereça o upgrade no momento certo.', color: '#8b5cf6' },
      { icon: HardDrive, title: 'Vencimento de dados', desc: 'Ofereça upgrades antes que fiquem sem dados, com timing baseado no consumo real.', color: '#a78bfa' },
      { icon: TrendingDown, title: 'Prevenção de churn', desc: 'Identifique sinais de portabilidade e atue proativamente com ofertas de retenção.', color: '#ef4444' },
      { icon: UserPlus, title: 'Onboarding SIM/eSIM', desc: 'Guie o novo usuário em sua primeira experiência com journeys automáticos de ativação.', color: '#22c55e' },
      { icon: ThumbsUp, title: 'Melhoria NPS', desc: 'Recontacte usuários insatisfeitos com ofertas personalizadas baseadas no histórico.', color: '#f59e0b' },
      { icon: Repeat, title: 'Incentivos de recarga', desc: 'Ative recargas com promoções contextualizadas segundo perfil e momento.', color: '#06b6d4' },
      { icon: ShoppingBag, title: 'Cross-sell terminal', desc: 'Ofereça terminais complementares baseados no perfil de consumo e afinidade do segmento.', color: '#cdff00' },
      { icon: Award, title: 'Retenção e fidelidade', desc: 'Premie a fidelidade com benefícios exclusivos e journeys de reconhecimento automáticos.', color: '#c084fc' },
    ],

    intBadge: 'Integrações',
    intTitle: 'Integração direta com sua infraestrutura',
    intSubtitle: 'DYNAMO Journeys se conecta nativamente com os sistemas core da Telco para ativar dados reais em cada decisão de campanha.',
    intLinkText: 'Ver todas as integrações',
    integrations: [
      { icon: Radio, name: 'HLR', desc: 'Estado da SIM, tipo de terminal, zona, estado da rede em tempo real.', color: '#8b5cf6' },
      { icon: Database, name: 'Billing', desc: 'Saldo, ciclo de faturamento, consumo, plano ativo, data de renovação.', color: '#3b2ace' },
      { icon: Globe, name: 'CRM', desc: 'Perfil do cliente, histórico de interações, NPS, segmentos comerciais.', color: '#22c55e' },
      { icon: Server, name: 'SDP', desc: 'Catálogo de produtos, provisionamento, ativação de serviços VAS.', color: '#f59e0b' },
      { icon: Cpu, name: 'LBS', desc: 'Geolocalização para campanhas baseadas em localização e contexto geográfico.', color: '#06b6d4' },
      { icon: Cable, name: 'CDRs', desc: 'Registros de chamadas e dados para análise de consumo e afinidade.', color: '#ef4444' },
    ],

    resBadge: 'Resultados',
    resTitle: 'Resultados reais',
    resSubtitle: 'Operadoras da América Latina e África já usam Journeys para potencializar suas equipes de CVM.',
    resLinkText: 'Ver todos os casos de sucesso',
    results: [
      {
        operator: 'Operadora Tier 1 — LATAM',
        metrics: [
          { label: 'Usuários alcançados', value: '24MM' },
          { label: 'Taxa de entrega', value: '98%' },
          { label: 'Conversão', value: '22%' },
        ],
        color: '#EF4444',
        highlight: '22% conversão end-to-end em campanhas omnichannel',
        desc: 'Operação CVM completa com triggers de HLR e Billing, segmentação AI e journeys automáticos via SAT Push + WhatsApp.',
      },
      {
        operator: 'Operadora líder — Chile',
        metrics: [
          { label: 'CTR com AI', value: '4%' },
          { label: 'CTR anterior', value: '2,4%' },
          { label: 'Melhoria', value: '+67%' },
        ],
        color: '#22C55E',
        highlight: '+67% melhoria com segmentação AI',
        desc: 'Implementação de clusters por afinidade com machine learning, melhorando o targeting em campanhas de migração de plano.',
      },
      {
        operator: 'Operadora — África Ocidental',
        metrics: [
          { label: 'Conversão', value: '8,3%' },
          { label: 'Alcance', value: '97%' },
          { label: 'Anti-spam', value: 'Ativo' },
        ],
        color: '#F59E0B',
        highlight: '8,3% conversão com controle anti-spam',
        desc: 'Motor de regras com windowing e frequency capping garantindo conversão sem saturar a base de usuários.',
      },
    ],

    ctaTitle: 'Sua equipe merece a melhor plataforma',
    ctaDesc: 'Agende uma demo e descubra como as equipes de CVM de operadoras líderes gerenciam suas campanhas omnichannel a partir de Journeys.',
    ctaDemo: 'Agendar Demo',
    ctaDiscover: 'Descubra sua solução',
    ctaRoi: 'Calculadora ROI',
  },
};

/* =================================================================
   Section 1 -- Capabilities
   ================================================================= */

export function CapabilitiesSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.capBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.capTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.capSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.capabilities.map((f, i) => (
            <RevealOnScroll key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-purple-500/20 transition-all h-full group"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <f.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-lg font-heading">{f.title}</h3>
                <p className="text-w40 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Self-service emphasis banner */}
        <RevealOnScroll delay={0.3}>
          <div className="mt-14 bg-gradient-to-r from-purple-500/10 via-purple-600/5 to-purple-500/10 border border-purple-500/20 rounded-2xl p-8 text-center">
            <p className="text-white/90 text-lg font-heading font-semibold">
              {t.capBannerTitle}
            </p>
            <p className="text-purple-300/70 text-sm mt-2">
              {t.capBannerDesc}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* =================================================================
   Section 2 -- Use Cases
   ================================================================= */

export function UseCasesSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.ucBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.ucTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.ucSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.useCases.map((uc, i) => (
            <RevealOnScroll key={uc.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 0 30px ${uc.color}10` }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all h-full"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${uc.color}14` }}
                >
                  <uc.icon className="w-5 h-5" style={{ color: uc.color }} />
                </div>
                <h3 className="text-white font-semibold text-base font-heading">{uc.title}</h3>
                <p className="text-w40 text-sm mt-2 leading-relaxed">{uc.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 3 -- Integration Hub
   ================================================================= */

export function IntegrationHubSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/8 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.intBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.intTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.intSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* Hub visual */}
        <RevealOnScroll delay={0.1}>
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 lg:p-12 overflow-hidden">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(59,42,206,0.4) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative">
                {/* Central hub */}
                <div className="flex flex-col items-center mb-10">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex items-center justify-center mb-3"
                  >
                    <span className="text-purple-300 font-heading font-bold text-sm text-center leading-tight">DYNAMO<br />Journeys</span>
                  </motion.div>
                  <div className="w-px h-8 bg-gradient-to-b from-purple-500/40 to-transparent" />
                </div>

                {/* Integration nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {t.integrations.map((int, i) => (
                    <motion.div
                      key={int.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      whileHover={{ y: -3 }}
                      className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-center hover:border-white/[0.12] transition-all"
                    >
                      <div
                        className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${int.color}14` }}
                      >
                        <int.icon className="w-5 h-5" style={{ color: int.color }} />
                      </div>
                      <h4 className="text-white font-heading font-bold text-sm">{int.name}</h4>
                      <p className="text-w40 text-[11px] mt-1 leading-snug">{int.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="text-center">
            <Link
              href="/integraciones"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
              {t.intLinkText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* =================================================================
   Section 4 -- Results
   ================================================================= */

export function ResultsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.resBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.resTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.resSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.results.map((r, i) => (
            <RevealOnScroll key={r.operator} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all h-full"
              >
                {/* Top accent line */}
                <div className="h-1 w-full" style={{ backgroundColor: r.color }} />

                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${r.color}15` }}
                    >
                      <CheckCircle2 className="w-5 h-5" style={{ color: r.color }} />
                    </div>
                    <h3 className="text-white font-heading font-bold text-xl">{r.operator}</h3>
                  </div>

                  <div className="space-y-4">
                    {r.metrics.map((m) => (
                      <div key={m.label} className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{m.label}</span>
                        <span className="text-lg font-heading font-bold text-white">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.06]">
                    <p className="text-sm font-medium" style={{ color: r.color }}>
                      {r.highlight}
                    </p>
                    <p className="text-w40 text-xs mt-2 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/casos-de-exito"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
              {t.resLinkText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* =================================================================
   Section 5 -- CTA
   ================================================================= */

export function CVMCTA() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-w60 text-lg mt-6 max-w-xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,42,206,0.4)]"
            >
              {t.ctaDemo}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/qualify"
              className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              {t.ctaDiscover}
            </Link>
            <Link
              href="/roi-calculator"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 px-4 py-4 font-semibold transition-all duration-300"
            >
              {t.ctaRoi}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
