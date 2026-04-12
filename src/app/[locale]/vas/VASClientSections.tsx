'use client';

import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/RevealOnScroll';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  Database,
  Store,
  CheckCircle2,
  FlaskConical,
  Wrench,
  CreditCard,
  Gavel,
  FileCheck,
  BarChart3,
  Wallet,
  PieChart,
  Smartphone,
  ArrowRight,
  Activity,
  Zap,
  Globe,
  Shield,
  Users,
  Gamepad2,
  Music,
  Heart,
  BookOpen,
  Landmark,
  Trophy,
  Newspaper,
  Cog,
  type LucideIcon,
} from 'lucide-react';

/* =================================================================
   i18n — all user-visible strings
   ================================================================= */

type FlowStepI18n = { num: string; icon: LucideIcon; title: string; desc: string; color: string };
type CpFeatureI18n = { icon: LucideIcon; title: string; desc: string; color: string };
type HandsOnI18n = { icon: LucideIcon; title: string; desc: string };
type VasResultMetric = { label: string; value: string };
type VasResultI18n = { operator: string; metrics: VasResultMetric[]; accent: string; desc: string };

interface VasTexts {
  /* Section 1 — Model Flow */
  modelBadge: string;
  modelTitle: string;
  modelSubtitle: string;
  stepLabel: string; // "Paso" / "Step" / "Étape" / "Passo"
  flowSteps: FlowStepI18n[];

  /* Section 2 — Content Providers */
  cpBadge: string;
  cpTitle: string;
  cpSubtitle: string;
  cpCategoriesTitle: string;
  cpCategoriesDesc: string;
  cpFeatures: CpFeatureI18n[];

  /* Section 3 — Operator Dashboard */
  opBadge: string;
  opTitle: string;
  opSubtitle: string;
  opCapTitle: string;
  operatorCapabilities: string[];
  kpiLabels: { label: string; value: string; color: string }[];
  monthLabels: [string, string, string];

  /* Section 4 — Hands-on */
  hoBadge: string;
  hoTitle: string;
  hoSubtitle: string;
  hoSubtitleHighlight: string;
  hoBannerQuote: string;
  hoBannerDesc: string;
  handsOnItems: HandsOnI18n[];

  /* Section 5 — Results */
  resBadge: string;
  resTitle: string;
  resSubtitle: string;
  results: VasResultI18n[];

  /* Section 6 — CTA */
  ctaTitle: string;
  ctaDesc: string;
  ctaSales: string;
  ctaDiscover: string;
}

const i18n: Record<string, VasTexts> = {
  es: {
    modelBadge: 'Modelo operativo',
    modelTitle: 'Cómo funciona el modelo',
    modelSubtitle: 'Un flujo end-to-end de 6 pasos, desde la generación de audiencias hasta el collection, operado por nuestro equipo de expertos.',
    stepLabel: 'Paso',
    flowSteps: [
      { num: '01', icon: Database, title: 'Generación de audiencias por afinidad', desc: 'Cruce de datos HLR/Billing/CDRs para construir clusters de afinidad a productos DCB. Targeting basado en consumo real.', color: '#3B2ACE' },
      { num: '02', icon: Store, title: 'Marketplace transparente', desc: 'Content Providers cargan ofertas bajo modelos CPM o CPA. Competencia abierta por inventario con visibilidad total para el operador.', color: '#5F4EE0' },
      { num: '03', icon: CheckCircle2, title: 'Aprobación del Operador', desc: 'El operador valida servicios, precios, volúmenes y creatividades antes de cada activación. Control total del negocio.', color: '#CDFF00' },
      { num: '04', icon: FlaskConical, title: 'Activación inteligente', desc: 'Campaign Manager con A/B testing que pone productos en competencia. El inventario se asigna a los que mejor performan.', color: '#22C55E' },
      { num: '05', icon: Wrench, title: 'Operación diaria experta', desc: 'Equipo DYNAMO dedicado trabajando con el MCP/SDP de la Telco para afinar audiencias, optimizar campañas y respetar regulaciones.', color: '#F59E0B' },
      { num: '06', icon: CreditCard, title: 'Collection integrado', desc: 'Wallet con múltiples medios de pago: tarjeta de crédito, transferencia bancaria, billeteras virtuales. Facturación automatizada.', color: '#EF4444' },
    ],

    cpBadge: 'Content Providers',
    cpTitle: 'Para Content Providers',
    cpSubtitle: 'Todo lo que un CP necesita para competir por inventario, optimizar campañas y maximizar ingresos en el ecosistema Telco.',
    cpCategoriesTitle: 'Categorías de productos',
    cpCategoriesDesc: 'Verticales disponibles para los Content Providers en el marketplace',
    cpFeatures: [
      { icon: Gavel, title: 'Plataforma de bidding', desc: 'Compra de inventario en tiempo real bajo modelos CPM y CPA flexibles.', color: '#CDFF00' },
      { icon: FileCheck, title: 'Templates por producto', desc: 'Carga de templates por producto/servicio para aprobación directa de la Telco.', color: '#3B2ACE' },
      { icon: BarChart3, title: 'Dashboard de ROI', desc: 'Estadísticas en tiempo real por campaña, producto y canal con métricas de retorno.', color: '#22C55E' },
      { icon: Wallet, title: 'Wallet virtual', desc: 'Gestión de IOs y pagos integrada. Control total de presupuestos y facturación.', color: '#F59E0B' },
      { icon: PieChart, title: 'Estadísticas completas', desc: 'Métricas abiertas por campaña, producto, canal y período con exportación de datos.', color: '#8B5CF6' },
      { icon: Smartphone, title: 'Modelos CPM y CPA', desc: 'Flexibilidad total para adaptar el modelo de inversión a cada producto y mercado.', color: '#EF4444' },
    ],

    opBadge: 'Dashboard del Operador',
    opTitle: 'Para el Operador',
    opSubtitle: 'Control total sobre el negocio de VAS con un dashboard integral: aprobaciones, pricing, estadísticas y KPIs en tiempo real.',
    opCapTitle: 'Capacidades del dashboard',
    operatorCapabilities: [
      'Aprobación de campañas y creatividades',
      'Definición de reglas de pricing',
      'Aceptar o rechazar IOs',
      'Estadísticas completas abiertas por CP, producto/servicio',
    ],
    kpiLabels: [
      { label: 'Audiencia', value: '2.4M', color: '#3B2ACE' },
      { label: 'Delivery %', value: '94.2%', color: '#5F4EE0' },
      { label: 'Impactados', value: '1.8M', color: '#8B5CF6' },
      { label: 'Aceptación %', value: '7.8%', color: '#CDFF00' },
      { label: 'Altas', value: '142K', color: '#22C55E' },
      { label: 'Leads', value: '89K', color: '#06B6D4' },
      { label: 'Ingresos', value: '$1.2M', color: '#F59E0B' },
      { label: 'Rechazados', value: '12.1%', color: '#EF4444' },
      { label: 'Blacklisteados', value: '0.3%', color: '#EC4899' },
    ],
    monthLabels: ['Ene', 'Jun', 'Dic'],

    hoBadge: 'Operación experta',
    hoTitle: 'Operación hands-on de punta a punta',
    hoSubtitle: 'No somos un proveedor de tecnología más.',
    hoSubtitleHighlight: 'Somos owners de tu operación VAS.',
    hoBannerQuote: '"Somos owners de tu operación VAS"',
    hoBannerDesc: 'DYNAMO trabaja codo a codo con la Telco todos los días: no solo proveemos la plataforma, operamos el negocio.',
    handsOnItems: [
      { icon: Users, title: 'Equipo dedicado', desc: 'DYNAMO asigna expertos dedicados que trabajan como una extensión de tu equipo.' },
      { icon: Activity, title: 'Optimización diaria', desc: 'Ajuste continuo de audiencias, creatividades y reglas de negocio junto al operador.' },
      { icon: Zap, title: 'Integración MCP/SDP', desc: 'Conexión profunda con la plataforma de la Telco para afinar segmentos y reducir fricción.' },
      { icon: Globe, title: 'Compliance regulatorio', desc: 'Cumplimiento normativo por país: Ley de Datos, regulaciones de DCB y protección al consumidor.' },
      { icon: Shield, title: 'Anti-saturación', desc: 'Estrategias de windowing, frequency capping y rotación inteligente para proteger la base.' },
      { icon: CreditCard, title: 'Gestión de collection', desc: 'Wallet integrada con tarjeta de crédito, transferencia bancaria y billeteras virtuales.' },
    ],

    resBadge: 'Track record',
    resTitle: 'Resultados',
    resSubtitle: 'Métricas verificables de operaciones en vivo con operadores líderes de Latinoamérica y África.',
    results: [
      { operator: 'Operador multinacional — Caribe', metrics: [{ label: 'Conversión con subastas al mejor postor', value: '7.8%' }, { label: 'Modelo de pricing dinámico', value: 'CPM + CPA' }], accent: '#CDFF00', desc: 'Marketplace operado con bidding abierto y optimización diaria del inventario.' },
      { operator: 'Operador regional — Colombia', metrics: [{ label: 'Tráfico sin fraude', value: '98%' }, { label: 'Transacciones procesadas', value: '+45MM' }], accent: '#5F4EE0', desc: 'Operación VAS completa con compliance regulatorio y anti-fraude integrado.' },
      { operator: 'Operador — Sudáfrica', metrics: [{ label: 'Revenue anual', value: 'USD 2M+' }, { label: 'Usuarios activos', value: '6M+' }], accent: '#F59E0B', desc: 'Monetización de base via SAT Push con applet propietario DYNAMO.' },
    ],

    ctaTitle: '¿Quieres que operemos tu inventario VAS?',
    ctaDesc: 'Nuestro equipo está listo para maximizar los ingresos de tu negocio de VAS con operación experta y transparencia total.',
    ctaSales: 'Hablar con ventas',
    ctaDiscover: 'Descubre tu solución',
  },

  en: {
    modelBadge: 'Operating model',
    modelTitle: 'How the model works',
    modelSubtitle: 'An end-to-end 6-step flow, from audience generation to collection, operated by our expert team.',
    stepLabel: 'Step',
    flowSteps: [
      { num: '01', icon: Database, title: 'Affinity-based audience generation', desc: 'HLR/Billing/CDR data crossover to build DCB product affinity clusters. Targeting based on real usage.', color: '#3B2ACE' },
      { num: '02', icon: Store, title: 'Transparent marketplace', desc: 'Content Providers load offers under CPM or CPA models. Open competition for inventory with full operator visibility.', color: '#5F4EE0' },
      { num: '03', icon: CheckCircle2, title: 'Operator approval', desc: 'The operator validates services, pricing, volumes, and creatives before each activation. Full business control.', color: '#CDFF00' },
      { num: '04', icon: FlaskConical, title: 'Intelligent activation', desc: 'Campaign Manager with A/B testing that puts products in competition. Inventory is assigned to the best performers.', color: '#22C55E' },
      { num: '05', icon: Wrench, title: 'Expert daily operations', desc: 'Dedicated DYNAMO team working with the Telco\'s MCP/SDP to refine audiences, optimize campaigns, and ensure compliance.', color: '#F59E0B' },
      { num: '06', icon: CreditCard, title: 'Integrated collection', desc: 'Wallet with multiple payment methods: credit card, bank transfer, virtual wallets. Automated billing.', color: '#EF4444' },
    ],

    cpBadge: 'Content Providers',
    cpTitle: 'For Content Providers',
    cpSubtitle: 'Everything a CP needs to compete for inventory, optimize campaigns, and maximize revenue in the Telco ecosystem.',
    cpCategoriesTitle: 'Product categories',
    cpCategoriesDesc: 'Verticals available for Content Providers in the marketplace',
    cpFeatures: [
      { icon: Gavel, title: 'Bidding platform', desc: 'Real-time inventory purchase under flexible CPM and CPA models.', color: '#CDFF00' },
      { icon: FileCheck, title: 'Product templates', desc: 'Template upload per product/service for direct Telco approval.', color: '#3B2ACE' },
      { icon: BarChart3, title: 'ROI Dashboard', desc: 'Real-time statistics by campaign, product, and channel with return metrics.', color: '#22C55E' },
      { icon: Wallet, title: 'Virtual wallet', desc: 'Integrated IO and payment management. Full budget and billing control.', color: '#F59E0B' },
      { icon: PieChart, title: 'Full statistics', desc: 'Open metrics by campaign, product, channel, and period with data export.', color: '#8B5CF6' },
      { icon: Smartphone, title: 'CPM and CPA models', desc: 'Full flexibility to adapt the investment model to each product and market.', color: '#EF4444' },
    ],

    opBadge: 'Operator Dashboard',
    opTitle: 'For the Operator',
    opSubtitle: 'Full control over the VAS business with a comprehensive dashboard: approvals, pricing, statistics, and real-time KPIs.',
    opCapTitle: 'Dashboard capabilities',
    operatorCapabilities: [
      'Campaign and creative approval',
      'Pricing rule definition',
      'Accept or reject IOs',
      'Full statistics broken down by CP, product/service',
    ],
    kpiLabels: [
      { label: 'Audience', value: '2.4M', color: '#3B2ACE' },
      { label: 'Delivery %', value: '94.2%', color: '#5F4EE0' },
      { label: 'Impacted', value: '1.8M', color: '#8B5CF6' },
      { label: 'Acceptance %', value: '7.8%', color: '#CDFF00' },
      { label: 'Activations', value: '142K', color: '#22C55E' },
      { label: 'Leads', value: '89K', color: '#06B6D4' },
      { label: 'Revenue', value: '$1.2M', color: '#F59E0B' },
      { label: 'Rejected', value: '12.1%', color: '#EF4444' },
      { label: 'Blacklisted', value: '0.3%', color: '#EC4899' },
    ],
    monthLabels: ['Jan', 'Jun', 'Dec'],

    hoBadge: 'Expert operation',
    hoTitle: 'End-to-end hands-on operation',
    hoSubtitle: 'We are not just another technology vendor.',
    hoSubtitleHighlight: 'We are owners of your VAS operation.',
    hoBannerQuote: '"We are owners of your VAS operation"',
    hoBannerDesc: 'DYNAMO works side by side with the Telco every day: we don\'t just provide the platform, we operate the business.',
    handsOnItems: [
      { icon: Users, title: 'Dedicated team', desc: 'DYNAMO assigns dedicated experts who work as an extension of your team.' },
      { icon: Activity, title: 'Daily optimization', desc: 'Continuous tuning of audiences, creatives, and business rules alongside the operator.' },
      { icon: Zap, title: 'MCP/SDP integration', desc: 'Deep connection with the Telco platform to refine segments and reduce friction.' },
      { icon: Globe, title: 'Regulatory compliance', desc: 'Country-level regulatory compliance: data protection laws, DCB regulations, and consumer protection.' },
      { icon: Shield, title: 'Anti-saturation', desc: 'Windowing, frequency capping, and intelligent rotation strategies to protect the subscriber base.' },
      { icon: CreditCard, title: 'Collection management', desc: 'Integrated wallet with credit card, bank transfer, and virtual wallets.' },
    ],

    resBadge: 'Track record',
    resTitle: 'Results',
    resSubtitle: 'Verifiable metrics from live operations with leading operators in Latin America and Africa.',
    results: [
      { operator: 'Multinational Operator — Caribbean', metrics: [{ label: 'Conversion with best-bidder auctions', value: '7.8%' }, { label: 'Dynamic pricing model', value: 'CPM + CPA' }], accent: '#CDFF00', desc: 'Marketplace operated with open bidding and daily inventory optimization.' },
      { operator: 'Regional Operator — Colombia', metrics: [{ label: 'Fraud-free traffic', value: '98%' }, { label: 'Processed transactions', value: '+45MM' }], accent: '#5F4EE0', desc: 'Full VAS operation with regulatory compliance and integrated anti-fraud.' },
      { operator: 'Operator — South Africa', metrics: [{ label: 'Annual revenue', value: 'USD 2M+' }, { label: 'Active users', value: '6M+' }], accent: '#F59E0B', desc: 'Base monetization via SAT Push with proprietary DYNAMO applet.' },
    ],

    ctaTitle: 'Want us to operate your VAS inventory?',
    ctaDesc: 'Our team is ready to maximize your VAS business revenue with expert operation and full transparency.',
    ctaSales: 'Talk to sales',
    ctaDiscover: 'Discover your solution',
  },

  fr: {
    modelBadge: 'Modèle opérationnel',
    modelTitle: 'Comment fonctionne le modèle',
    modelSubtitle: 'Un flux end-to-end en 6 étapes, de la génération d\'audiences au collection, opéré par notre équipe d\'experts.',
    stepLabel: 'Étape',
    flowSteps: [
      { num: '01', icon: Database, title: 'Génération d\'audiences par affinité', desc: 'Croisement de données HLR/Billing/CDRs pour construire des clusters d\'affinité aux produits DCB. Targeting basé sur la consommation réelle.', color: '#3B2ACE' },
      { num: '02', icon: Store, title: 'Marketplace transparent', desc: 'Les Content Providers chargent leurs offres sous modèles CPM ou CPA. Concurrence ouverte pour l\'inventaire avec visibilité totale pour l\'opérateur.', color: '#5F4EE0' },
      { num: '03', icon: CheckCircle2, title: 'Approbation de l\'Opérateur', desc: 'L\'opérateur valide services, prix, volumes et créatives avant chaque activation. Contrôle total du business.', color: '#CDFF00' },
      { num: '04', icon: FlaskConical, title: 'Activation intelligente', desc: 'Campaign Manager avec A/B testing qui met les produits en compétition. L\'inventaire est attribué aux plus performants.', color: '#22C55E' },
      { num: '05', icon: Wrench, title: 'Opération quotidienne experte', desc: 'Équipe DYNAMO dédiée travaillant avec le MCP/SDP du Telco pour affiner les audiences, optimiser les campagnes et respecter les réglementations.', color: '#F59E0B' },
      { num: '06', icon: CreditCard, title: 'Collection intégré', desc: 'Wallet avec multiples moyens de paiement : carte de crédit, virement bancaire, portefeuilles virtuels. Facturation automatisée.', color: '#EF4444' },
    ],

    cpBadge: 'Content Providers',
    cpTitle: 'Pour les Content Providers',
    cpSubtitle: 'Tout ce dont un CP a besoin pour concourir pour l\'inventaire, optimiser les campagnes et maximiser les revenus dans l\'écosystème Telco.',
    cpCategoriesTitle: 'Catégories de produits',
    cpCategoriesDesc: 'Verticales disponibles pour les Content Providers dans le marketplace',
    cpFeatures: [
      { icon: Gavel, title: 'Plateforme de bidding', desc: 'Achat d\'inventaire en temps réel sous modèles CPM et CPA flexibles.', color: '#CDFF00' },
      { icon: FileCheck, title: 'Templates par produit', desc: 'Chargement de templates par produit/service pour approbation directe du Telco.', color: '#3B2ACE' },
      { icon: BarChart3, title: 'Dashboard ROI', desc: 'Statistiques en temps réel par campagne, produit et canal avec métriques de retour.', color: '#22C55E' },
      { icon: Wallet, title: 'Wallet virtuel', desc: 'Gestion des IOs et paiements intégrée. Contrôle total des budgets et de la facturation.', color: '#F59E0B' },
      { icon: PieChart, title: 'Statistiques complètes', desc: 'Métriques ouvertes par campagne, produit, canal et période avec export de données.', color: '#8B5CF6' },
      { icon: Smartphone, title: 'Modèles CPM et CPA', desc: 'Flexibilité totale pour adapter le modèle d\'investissement à chaque produit et marché.', color: '#EF4444' },
    ],

    opBadge: 'Dashboard Opérateur',
    opTitle: 'Pour l\'Opérateur',
    opSubtitle: 'Contrôle total sur le business VAS avec un dashboard complet : approbations, pricing, statistiques et KPIs en temps réel.',
    opCapTitle: 'Capacités du dashboard',
    operatorCapabilities: [
      'Approbation des campagnes et créatives',
      'Définition des règles de pricing',
      'Accepter ou rejeter les IOs',
      'Statistiques complètes par CP, produit/service',
    ],
    kpiLabels: [
      { label: 'Audience', value: '2,4M', color: '#3B2ACE' },
      { label: 'Livraison %', value: '94,2%', color: '#5F4EE0' },
      { label: 'Impactés', value: '1,8M', color: '#8B5CF6' },
      { label: 'Acceptation %', value: '7,8%', color: '#CDFF00' },
      { label: 'Activations', value: '142K', color: '#22C55E' },
      { label: 'Leads', value: '89K', color: '#06B6D4' },
      { label: 'Revenus', value: '1,2M $', color: '#F59E0B' },
      { label: 'Rejetés', value: '12,1%', color: '#EF4444' },
      { label: 'Blacklistés', value: '0,3%', color: '#EC4899' },
    ],
    monthLabels: ['Jan', 'Juin', 'Déc'],

    hoBadge: 'Opération experte',
    hoTitle: 'Opération hands-on de bout en bout',
    hoSubtitle: 'Nous ne sommes pas un simple fournisseur de technologie.',
    hoSubtitleHighlight: 'Nous sommes owners de votre opération VAS.',
    hoBannerQuote: '"Nous sommes owners de votre opération VAS"',
    hoBannerDesc: 'DYNAMO travaille au quotidien aux côtés du Telco : nous ne fournissons pas seulement la plateforme, nous opérons le business.',
    handsOnItems: [
      { icon: Users, title: 'Équipe dédiée', desc: 'DYNAMO assigne des experts dédiés qui travaillent comme une extension de votre équipe.' },
      { icon: Activity, title: 'Optimisation quotidienne', desc: 'Ajustement continu des audiences, créatives et règles de business avec l\'opérateur.' },
      { icon: Zap, title: 'Intégration MCP/SDP', desc: 'Connexion profonde avec la plateforme du Telco pour affiner les segments et réduire les frictions.' },
      { icon: Globe, title: 'Compliance réglementaire', desc: 'Conformité réglementaire par pays : lois sur les données, réglementations DCB et protection du consommateur.' },
      { icon: Shield, title: 'Anti-saturation', desc: 'Stratégies de windowing, frequency capping et rotation intelligente pour protéger la base.' },
      { icon: CreditCard, title: 'Gestion du collection', desc: 'Wallet intégré avec carte de crédit, virement bancaire et portefeuilles virtuels.' },
    ],

    resBadge: 'Track record',
    resTitle: 'Résultats',
    resSubtitle: 'Métriques vérifiables d\'opérations en production avec des opérateurs leaders d\'Amérique latine et d\'Afrique.',
    results: [
      { operator: 'Opérateur multinational — Caraïbes', metrics: [{ label: 'Conversion avec enchères au meilleur offrant', value: '7,8%' }, { label: 'Modèle de pricing dynamique', value: 'CPM + CPA' }], accent: '#CDFF00', desc: 'Marketplace opéré avec bidding ouvert et optimisation quotidienne de l\'inventaire.' },
      { operator: 'Opérateur régional — Colombie', metrics: [{ label: 'Trafic sans fraude', value: '98%' }, { label: 'Transactions traitées', value: '+45MM' }], accent: '#5F4EE0', desc: 'Opération VAS complète avec compliance réglementaire et anti-fraude intégré.' },
      { operator: 'Opérateur — Afrique du Sud', metrics: [{ label: 'Revenu annuel', value: 'USD 2M+' }, { label: 'Utilisateurs actifs', value: '6M+' }], accent: '#F59E0B', desc: 'Monétisation de la base via SAT Push avec applet propriétaire DYNAMO.' },
    ],

    ctaTitle: 'Vous souhaitez que nous opérions votre inventaire VAS ?',
    ctaDesc: 'Notre équipe est prête à maximiser les revenus de votre business VAS avec une opération experte et une transparence totale.',
    ctaSales: 'Parler aux ventes',
    ctaDiscover: 'Découvrez votre solution',
  },

  pt: {
    modelBadge: 'Modelo operacional',
    modelTitle: 'Como funciona o modelo',
    modelSubtitle: 'Um fluxo end-to-end de 6 passos, da geração de audiências ao collection, operado pela nossa equipe de especialistas.',
    stepLabel: 'Passo',
    flowSteps: [
      { num: '01', icon: Database, title: 'Geração de audiências por afinidade', desc: 'Cruzamento de dados HLR/Billing/CDRs para construir clusters de afinidade a produtos DCB. Targeting baseado em consumo real.', color: '#3B2ACE' },
      { num: '02', icon: Store, title: 'Marketplace transparente', desc: 'Content Providers carregam ofertas sob modelos CPM ou CPA. Competição aberta por inventário com visibilidade total para a operadora.', color: '#5F4EE0' },
      { num: '03', icon: CheckCircle2, title: 'Aprovação da Operadora', desc: 'A operadora valida serviços, preços, volumes e criativos antes de cada ativação. Controle total do negócio.', color: '#CDFF00' },
      { num: '04', icon: FlaskConical, title: 'Ativação inteligente', desc: 'Campaign Manager com A/B testing que coloca produtos em competição. O inventário é atribuído aos que melhor performam.', color: '#22C55E' },
      { num: '05', icon: Wrench, title: 'Operação diária especializada', desc: 'Equipe DYNAMO dedicada trabalhando com o MCP/SDP da Telco para refinar audiências, otimizar campanhas e respeitar regulamentações.', color: '#F59E0B' },
      { num: '06', icon: CreditCard, title: 'Collection integrado', desc: 'Wallet com múltiplos meios de pagamento: cartão de crédito, transferência bancária, carteiras virtuais. Faturamento automatizado.', color: '#EF4444' },
    ],

    cpBadge: 'Content Providers',
    cpTitle: 'Para Content Providers',
    cpSubtitle: 'Tudo o que um CP precisa para competir por inventário, otimizar campanhas e maximizar receitas no ecossistema Telco.',
    cpCategoriesTitle: 'Categorias de produtos',
    cpCategoriesDesc: 'Verticais disponíveis para os Content Providers no marketplace',
    cpFeatures: [
      { icon: Gavel, title: 'Plataforma de bidding', desc: 'Compra de inventário em tempo real sob modelos CPM e CPA flexíveis.', color: '#CDFF00' },
      { icon: FileCheck, title: 'Templates por produto', desc: 'Upload de templates por produto/serviço para aprovação direta da Telco.', color: '#3B2ACE' },
      { icon: BarChart3, title: 'Dashboard de ROI', desc: 'Estatísticas em tempo real por campanha, produto e canal com métricas de retorno.', color: '#22C55E' },
      { icon: Wallet, title: 'Wallet virtual', desc: 'Gestão de IOs e pagamentos integrada. Controle total de orçamentos e faturamento.', color: '#F59E0B' },
      { icon: PieChart, title: 'Estatísticas completas', desc: 'Métricas abertas por campanha, produto, canal e período com exportação de dados.', color: '#8B5CF6' },
      { icon: Smartphone, title: 'Modelos CPM e CPA', desc: 'Flexibilidade total para adaptar o modelo de investimento a cada produto e mercado.', color: '#EF4444' },
    ],

    opBadge: 'Dashboard da Operadora',
    opTitle: 'Para a Operadora',
    opSubtitle: 'Controle total sobre o negócio de VAS com um dashboard integral: aprovações, pricing, estatísticas e KPIs em tempo real.',
    opCapTitle: 'Capacidades do dashboard',
    operatorCapabilities: [
      'Aprovação de campanhas e criativos',
      'Definição de regras de pricing',
      'Aceitar ou rejeitar IOs',
      'Estatísticas completas por CP, produto/serviço',
    ],
    kpiLabels: [
      { label: 'Audiência', value: '2,4M', color: '#3B2ACE' },
      { label: 'Delivery %', value: '94,2%', color: '#5F4EE0' },
      { label: 'Impactados', value: '1,8M', color: '#8B5CF6' },
      { label: 'Aceitação %', value: '7,8%', color: '#CDFF00' },
      { label: 'Ativações', value: '142K', color: '#22C55E' },
      { label: 'Leads', value: '89K', color: '#06B6D4' },
      { label: 'Receita', value: 'R$ 1,2M', color: '#F59E0B' },
      { label: 'Rejeitados', value: '12,1%', color: '#EF4444' },
      { label: 'Blacklistados', value: '0,3%', color: '#EC4899' },
    ],
    monthLabels: ['Jan', 'Jun', 'Dez'],

    hoBadge: 'Operação especializada',
    hoTitle: 'Operação hands-on de ponta a ponta',
    hoSubtitle: 'Não somos apenas mais um fornecedor de tecnologia.',
    hoSubtitleHighlight: 'Somos owners da sua operação VAS.',
    hoBannerQuote: '"Somos owners da sua operação VAS"',
    hoBannerDesc: 'A DYNAMO trabalha lado a lado com a Telco todos os dias: não apenas fornecemos a plataforma, operamos o negócio.',
    handsOnItems: [
      { icon: Users, title: 'Equipe dedicada', desc: 'A DYNAMO designa especialistas dedicados que trabalham como uma extensão da sua equipe.' },
      { icon: Activity, title: 'Otimização diária', desc: 'Ajuste contínuo de audiências, criativos e regras de negócio junto à operadora.' },
      { icon: Zap, title: 'Integração MCP/SDP', desc: 'Conexão profunda com a plataforma da Telco para refinar segmentos e reduzir fricção.' },
      { icon: Globe, title: 'Compliance regulatório', desc: 'Conformidade regulatória por país: Lei de Dados, regulamentações de DCB e proteção ao consumidor.' },
      { icon: Shield, title: 'Anti-saturação', desc: 'Estratégias de windowing, frequency capping e rotação inteligente para proteger a base.' },
      { icon: CreditCard, title: 'Gestão de collection', desc: 'Wallet integrada com cartão de crédito, transferência bancária e carteiras virtuais.' },
    ],

    resBadge: 'Track record',
    resTitle: 'Resultados',
    resSubtitle: 'Métricas verificáveis de operações em produção com operadoras líderes da América Latina e África.',
    results: [
      { operator: 'Operadora multinacional — Caribe', metrics: [{ label: 'Conversão com leilão ao melhor lance', value: '7,8%' }, { label: 'Modelo de pricing dinâmico', value: 'CPM + CPA' }], accent: '#CDFF00', desc: 'Marketplace operado com bidding aberto e otimização diária do inventário.' },
      { operator: 'Operadora regional — Colômbia', metrics: [{ label: 'Tráfego sem fraude', value: '98%' }, { label: 'Transações processadas', value: '+45MM' }], accent: '#5F4EE0', desc: 'Operação VAS completa com compliance regulatório e anti-fraude integrado.' },
      { operator: 'Operadora — África do Sul', metrics: [{ label: 'Receita anual', value: 'USD 2M+' }, { label: 'Usuários ativos', value: '6M+' }], accent: '#F59E0B', desc: 'Monetização da base via SAT Push com applet proprietário DYNAMO.' },
    ],

    ctaTitle: 'Quer que operemos seu inventário VAS?',
    ctaDesc: 'Nossa equipe está pronta para maximizar as receitas do seu negócio de VAS com operação especializada e transparência total.',
    ctaSales: 'Falar com vendas',
    ctaDiscover: 'Descubra sua solução',
  },
};

/* =================================================================
   Product categories (language-independent labels)
   ================================================================= */

const productCategories = [
  { icon: Music, name: 'Entertainment', color: '#EF4444' },
  { icon: Gamepad2, name: 'Gaming', color: '#8B5CF6' },
  { icon: Newspaper, name: 'Infotainment', color: '#3B82F6' },
  { icon: Heart, name: 'Lifestyle', color: '#EC4899' },
  { icon: Landmark, name: 'Fintech', color: '#22C55E' },
  { icon: Cog, name: 'Utilities', color: '#F59E0B' },
  { icon: Trophy, name: 'Sports', color: '#CDFF00' },
  { icon: BookOpen, name: 'Education', color: '#06B6D4' },
];

/* =================================================================
   Section 1 -- Model Flow
   ================================================================= */

export function ModelFlowSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.04] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <span className="text-lime text-sm font-medium tracking-widest uppercase">
              {t.modelBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.modelTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.modelSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* Flow steps -- vertical timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-lime/20 to-purple-500/40 hidden sm:block" />

          {t.flowSteps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <RevealOnScroll
                key={step.num}
                delay={i * 0.1}
                direction={isEven ? 'left' : 'right'}
              >
                <div
                  className={`relative flex items-start gap-6 mb-12 sm:mb-16 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${step.color}14` }}
                      >
                        <step.icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                      <div>
                        <span
                          className="text-xs font-bold tracking-widest uppercase"
                          style={{ color: step.color }}
                        >
                          {t.stepLabel} {step.num}
                        </span>
                        <h3 className="text-white font-semibold text-lg font-heading">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-w40 text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>

                  {/* Timeline node */}
                  <div className="hidden md:flex items-center justify-center w-10 shrink-0">
                    <div
                      className="w-4 h-4 rounded-full border-2 relative z-10"
                      style={{
                        borderColor: step.color,
                        backgroundColor: '#050510',
                        boxShadow: `0 0 12px ${step.color}40`,
                      }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 2 -- Content Providers
   ================================================================= */

export function ContentProvidersSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-lime text-sm font-medium tracking-widest uppercase">
              {t.cpBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.cpTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.cpSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {t.cpFeatures.map((f, i) => (
            <RevealOnScroll key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3, boxShadow: `0 0 30px ${f.color}10` }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all h-full"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${f.color}14` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-white font-semibold text-lg font-heading">{f.title}</h3>
                <p className="text-w40 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Product categories */}
        <RevealOnScroll>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-heading font-semibold text-white">
              {t.cpCategoriesTitle}
            </h3>
            <p className="text-w40 text-sm mt-2">
              {t.cpCategoriesDesc}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {productCategories.map((cat, i) => (
            <RevealOnScroll key={cat.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center hover:border-white/[0.12] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${cat.color}14` }}
                >
                  <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <span className="text-white text-sm font-medium">{cat.name}</span>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 3 -- Operator Dashboard
   ================================================================= */

export function OperatorDashboardSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.opBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.opTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.opSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
          {/* Left -- capabilities list */}
          <RevealOnScroll direction="left">
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">
                {t.opCapTitle}
              </h3>
              {t.operatorCapabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <span className="text-w80 text-sm leading-relaxed">{cap}</span>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Right -- mock dashboard */}
          <RevealOnScroll direction="right">
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-w40 text-xs ml-2 font-mono">
                  DYNAMO VAS Dashboard
                </span>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-3 gap-3">
                {t.kpiLabels.map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 text-center"
                  >
                    <div className="text-lg font-heading font-bold" style={{ color: kpi.color }}>
                      {kpi.value}
                    </div>
                    <div className="text-w40 text-[10px] mt-1 leading-tight">{kpi.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Mock chart bars */}
              <div className="mt-6 flex items-end gap-2 h-24 px-2">
                {[65, 82, 45, 91, 73, 88, 56, 94, 70, 85, 60, 78].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.04, duration: 0.5 }}
                    className="flex-1 rounded-t bg-gradient-to-t from-purple-500/40 to-lime/30"
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-w20 mt-1 px-2">
                <span>{t.monthLabels[0]}</span>
                <span>{t.monthLabels[1]}</span>
                <span>{t.monthLabels[2]}</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 4 -- Hands-on
   ================================================================= */

export function HandsOnSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-lime text-sm font-medium tracking-widest uppercase">
              {t.hoBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.hoTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.hoSubtitle}{' '}
              <span className="text-lime font-medium">{t.hoSubtitleHighlight}</span>
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.handsOnItems.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-lime/20 transition-all h-full group"
              >
                <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center mb-5 group-hover:bg-lime/15 transition-colors">
                  <item.icon className="w-6 h-6 text-lime" />
                </div>
                <h3 className="text-white font-semibold text-lg font-heading">{item.title}</h3>
                <p className="text-w40 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="mt-16 bg-gradient-to-r from-lime/[0.06] to-purple-500/[0.06] border border-lime/10 rounded-2xl p-8 text-center">
            <p className="text-white text-lg md:text-xl font-heading font-semibold">
              {t.hoBannerQuote}
            </p>
            <p className="text-w40 text-sm mt-3 max-w-xl mx-auto">
              {t.hoBannerDesc}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* =================================================================
   Section 5 -- Results
   ================================================================= */

export function ResultsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-lime text-sm font-medium tracking-widest uppercase">
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
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] transition-all h-full relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${r.accent}, transparent)` }}
                />

                <h3 className="text-2xl font-heading font-bold mb-6" style={{ color: r.accent }}>
                  {r.operator}
                </h3>

                <div className="space-y-5">
                  {r.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-3xl font-heading font-bold text-white">{m.value}</div>
                      <div className="text-w40 text-sm mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <p className="text-w40 text-xs leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 6 -- CTA
   ================================================================= */

export function VASCTA() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/15 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white">
            {t.ctaTitle}
          </h2>
          <p className="text-w60 text-lg mt-6 max-w-xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:segundo.salvadores@dynamo.tech"
              className="group inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-deep px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(205,255,0,0.3)]"
            >
              {t.ctaSales}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/qualify"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              {t.ctaDiscover}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
