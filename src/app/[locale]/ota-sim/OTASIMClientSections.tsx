'use client';

import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/RevealOnScroll';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  Smartphone,
  Cloud,
  Cpu,
  CheckCircle2,
  Shield,
  MonitorSmartphone,
  Menu,
  ClipboardList,
  Wifi,
  ArrowRight,
  Download,
  RefreshCw,
  Activity,
  Server,
  Layers,
  Signal,
  Zap,
  Lock,
  Eye,
  FileCheck,
  type LucideIcon,
} from 'lucide-react';

/* =================================================================
   i18n — all user-visible strings
   ================================================================= */

type OtaFeatureI18n = { icon: LucideIcon; title: string; desc: string };
type SecurityItemI18n = { icon: LucideIcon; title: string; desc: string };
type AppletBulletI18n = { icon: LucideIcon; text: string };
type TimelinePhaseI18n = { phase: string; desc: string; color: string };

interface OtaTexts {
  /* Section 1 — What is SAT Push */
  satBadge: string;
  satTitle: string;
  satDesc: string;
  satBullets: string[];
  /* Phone mockup */
  phoneDisplay: string;
  phoneDisplayTitle: string;
  phoneDisplayDesc: string;
  phoneActivate: string;
  phoneLater: string;
  phoneMenuLabel: string;

  /* Section 2 — Applet */
  appletBadge: string;
  appletTitle: string;
  appletDesc: string;
  appletOtaLabel: string;
  appletBullets: AppletBulletI18n[];

  /* Section 3 — OTA Cloud */
  otaBadge: string;
  otaTitle: string;
  otaSubtitle: string;
  otaCentralLabel: string;
  otaCentralDesc: string;
  otaFeatures: OtaFeatureI18n[];

  /* Section 4 — Cell C Case */
  caseBadge: string;
  caseTitle: string;
  caseSubtitle: string;
  caseOperator: string;
  caseCountry: string;
  caseRevenueLabel: string;
  caseLinkText: string;
  timeline: TimelinePhaseI18n[];
  caseStats: { value: string; label: string }[];

  /* Section 5 — Security */
  secBadge: string;
  secTitle: string;
  secSubtitle: string;
  secLinkText: string;
  securityItems: SecurityItemI18n[];

  /* Section 6 — CTA */
  ctaTitle: string;
  ctaDesc: string;
  ctaDemo: string;
  ctaCases: string;
}

const i18n: Record<string, OtaTexts> = {
  es: {
    satBadge: 'SAT Push',
    satTitle: 'Qué es SAT Push y por qué importa',
    satDesc: 'SAT Push (SIM Application Toolkit) es una tecnología nativa de la SIM card que permite enviar mensajes interactivos directamente al dispositivo sin necesidad de app, datos móviles ni smartphone.',
    satBullets: [
      'Nativo de la SIM: funciona en cualquier celular, incluso básicos',
      'No requiere app ni conexión a datos',
      '10x conversión vs SMS en campañas de DCB',
      'Formatos interactivos: display, menú, get input',
    ],
    phoneDisplay: 'Display',
    phoneDisplayTitle: '2GB GRATIS por 24h',
    phoneDisplayDesc: 'Activa ahora y navega sin límites',
    phoneActivate: 'Activar',
    phoneLater: 'Más tarde',
    phoneMenuLabel: 'Menú',

    appletBadge: 'Tecnología propietaria',
    appletTitle: 'Applet propietario: ad-engine',
    appletDesc: 'Nuestro applet propietario se instala remotamente en cualquier SIM del mundo via OTA. Es el motor que habilita SAT Push como canal de conversión de alta performance.',
    appletOtaLabel: 'Instalación OTA',
    appletBullets: [
      { icon: Shield, text: 'Desarrollado in-house por el equipo de DYNAMO' },
      { icon: Download, text: 'Instalable over-the-air (OTA) sin intervención del usuario' },
      { icon: Cpu, text: 'Independiente del SIM vendor: Gemalto, G&D, IDEMIA' },
      { icon: Zap, text: 'Compatible con eSIM y SIM tradicionales' },
    ],

    otaBadge: 'Infraestructura',
    otaTitle: 'OTA Cloud',
    otaSubtitle: 'Plataforma cloud para gestionar millones de SIMs de forma remota: despliegue masivo, actualizaciones y monitoreo en tiempo real.',
    otaCentralLabel: 'DYNAMO OTA Cloud',
    otaCentralDesc: 'Gestión centralizada de SIMs',
    otaFeatures: [
      { icon: Server, title: 'Despliegue masivo', desc: 'Instalación de applets en millones de SIMs simultáneamente, con control de throughput y priorización.' },
      { icon: Signal, title: 'Gestión remota del ciclo de vida', desc: 'Actualización, desactivación y reinstalación de applets sin intervención del usuario ni visita a tienda.' },
      { icon: RefreshCw, title: 'Actualizaciones OTA', desc: 'Push de nuevas versiones del applet de forma transparente, manteniendo compatibilidad con todas las SIMs.' },
      { icon: Activity, title: 'Monitoreo en tiempo real', desc: 'Dashboard de estado de instalación, compatibilidad, errores y success rate por lote y vendedor de SIM.' },
      { icon: Layers, title: 'Multi-vendor', desc: 'Compatible con Gemalto/Thales, G&D, IDEMIA y eSIM. Independiente del fabricante de SIM card.' },
      { icon: Shield, title: 'Seguridad end-to-end', desc: 'Encriptación de canal OTA, keys propias del operador, compliance con estándares de GlobalPlatform.' },
    ],

    caseBadge: 'Caso de éxito',
    caseTitle: 'Operador — Sudáfrica: de incompatibilidad a USD 2M+',
    caseSubtitle: 'Cómo DYNAMO transformó una base de 10M de usuarios incompatibles en un canal de revenue de alta performance.',
    caseOperator: 'Operador — Sudáfrica',
    caseCountry: 'South Africa',
    caseRevenueLabel: 'revenue / year',
    caseLinkText: 'Ver caso completo',
    timeline: [
      { phase: 'Desafío', desc: '10 millones de usuarios con SIMs incompatibles con SAT Push. Sin canal de conversión directa para VAS. Revenue cero desde la base móvil.', color: '#EF4444' },
      { phase: 'Plan de acción', desc: 'Desarrollo de applet propietario compatible con múltiples vendors de SIM. Estrategia de despliegue OTA por lotes progresivos.', color: '#F59E0B' },
      { phase: 'Solución', desc: 'Instalación OTA masiva del ad-engine. Año 1: 60% de penetración. Optimización continua hasta alcanzar 80% de la base activa.', color: '#22C55E' },
      { phase: 'Resultados', desc: '6M+ usuarios con SAT Push activo. Revenue de USD 2M+ anuales. Canal de conversión 10x superior a SMS para productos DCB.', color: '#CDFF00' },
    ],
    caseStats: [
      { value: '6M+', label: 'usuarios activos' },
      { value: '80%', label: 'penetración final' },
      { value: 'USD 2M+', label: 'revenue anual' },
      { value: '4', label: 'vendors de SIM' },
    ],

    secBadge: 'Seguridad',
    secTitle: 'Framework de seguridad',
    secSubtitle: 'La seguridad no es un feature, es la base de todo lo que construimos.',
    secLinkText: 'Ver framework completo de seguridad',
    securityItems: [
      { icon: Lock, title: 'Encriptación end-to-end', desc: 'Canal OTA encriptado con keys del operador. Datos en tránsito y en reposo protegidos con estándares de la industria.' },
      { icon: Server, title: 'Cloud del operador', desc: 'La infraestructura OTA corre en el cloud del operador o en ambientes dedicados. Sin datos sensibles fuera del perímetro.' },
      { icon: FileCheck, title: 'Compliance', desc: 'Cumplimiento con GlobalPlatform, GSMA y regulaciones locales de protección de datos y telecomunicaciones.' },
      { icon: Eye, title: 'Auditoría y trazabilidad', desc: 'Logs completos de cada operación OTA: instalación, actualización, desactivación. Trazabilidad total.' },
    ],

    ctaTitle: '¿Quieres activar SAT Push en tu red?',
    ctaDesc: 'Nuestro equipo de expertos en SIM card está listo para evaluar tu infraestructura y diseñar el plan de despliegue OTA.',
    ctaDemo: 'Agendar Demo',
    ctaCases: 'Ver casos de uso SAT Push',
  },

  en: {
    satBadge: 'SAT Push',
    satTitle: 'What is SAT Push and why it matters',
    satDesc: 'SAT Push (SIM Application Toolkit) is a SIM card-native technology that enables sending interactive messages directly to the device without requiring an app, mobile data, or a smartphone.',
    satBullets: [
      'SIM-native: works on any phone, even basic ones',
      'No app or data connection required',
      '10x conversion vs SMS in DCB campaigns',
      'Interactive formats: display, menu, get input',
    ],
    phoneDisplay: 'Display',
    phoneDisplayTitle: '2GB FREE for 24h',
    phoneDisplayDesc: 'Activate now and browse without limits',
    phoneActivate: 'Activate',
    phoneLater: 'Later',
    phoneMenuLabel: 'Menu',

    appletBadge: 'Proprietary technology',
    appletTitle: 'Proprietary applet: ad-engine',
    appletDesc: 'Our proprietary applet is remotely installed on any SIM worldwide via OTA. It is the engine that enables SAT Push as a high-performance conversion channel.',
    appletOtaLabel: 'OTA Installation',
    appletBullets: [
      { icon: Shield, text: 'Developed in-house by the DYNAMO team' },
      { icon: Download, text: 'Installable over-the-air (OTA) without user intervention' },
      { icon: Cpu, text: 'SIM vendor-independent: Gemalto, G&D, IDEMIA' },
      { icon: Zap, text: 'Compatible with eSIM and traditional SIM cards' },
    ],

    otaBadge: 'Infrastructure',
    otaTitle: 'OTA Cloud',
    otaSubtitle: 'Cloud platform to manage millions of SIMs remotely: massive deployment, updates, and real-time monitoring.',
    otaCentralLabel: 'DYNAMO OTA Cloud',
    otaCentralDesc: 'Centralized SIM management',
    otaFeatures: [
      { icon: Server, title: 'Massive deployment', desc: 'Applet installation on millions of SIMs simultaneously, with throughput control and prioritization.' },
      { icon: Signal, title: 'Remote lifecycle management', desc: 'Applet update, deactivation, and reinstallation without user intervention or store visit.' },
      { icon: RefreshCw, title: 'OTA updates', desc: 'Transparent push of new applet versions, maintaining compatibility with all SIMs.' },
      { icon: Activity, title: 'Real-time monitoring', desc: 'Installation status dashboard, compatibility, errors, and success rate by batch and SIM vendor.' },
      { icon: Layers, title: 'Multi-vendor', desc: 'Compatible with Gemalto/Thales, G&D, IDEMIA, and eSIM. SIM card manufacturer-independent.' },
      { icon: Shield, title: 'End-to-end security', desc: 'OTA channel encryption, operator-owned keys, GlobalPlatform standards compliance.' },
    ],

    caseBadge: 'Success story',
    caseTitle: 'Operator — South Africa: from incompatibility to USD 2M+',
    caseSubtitle: 'How DYNAMO transformed a base of 10M incompatible users into a high-performance revenue channel.',
    caseOperator: 'Operator — South Africa',
    caseCountry: 'South Africa',
    caseRevenueLabel: 'revenue / year',
    caseLinkText: 'View full case study',
    timeline: [
      { phase: 'Challenge', desc: '10 million users with SAT Push-incompatible SIMs. No direct conversion channel for VAS. Zero revenue from the mobile base.', color: '#EF4444' },
      { phase: 'Action plan', desc: 'Development of a proprietary applet compatible with multiple SIM vendors. Progressive OTA batch deployment strategy.', color: '#F59E0B' },
      { phase: 'Solution', desc: 'Massive OTA installation of ad-engine. Year 1: 60% penetration. Continuous optimization to reach 80% of the active base.', color: '#22C55E' },
      { phase: 'Results', desc: '6M+ users with active SAT Push. USD 2M+ annual revenue. Conversion channel 10x superior to SMS for DCB products.', color: '#CDFF00' },
    ],
    caseStats: [
      { value: '6M+', label: 'active users' },
      { value: '80%', label: 'final penetration' },
      { value: 'USD 2M+', label: 'annual revenue' },
      { value: '4', label: 'SIM vendors' },
    ],

    secBadge: 'Security',
    secTitle: 'Security framework',
    secSubtitle: 'Security is not a feature, it is the foundation of everything we build.',
    secLinkText: 'View full security framework',
    securityItems: [
      { icon: Lock, title: 'End-to-end encryption', desc: 'OTA channel encrypted with operator keys. Data in transit and at rest protected with industry standards.' },
      { icon: Server, title: 'Operator cloud', desc: 'OTA infrastructure runs on the operator\'s cloud or dedicated environments. No sensitive data outside the perimeter.' },
      { icon: FileCheck, title: 'Compliance', desc: 'Compliance with GlobalPlatform, GSMA, and local data protection and telecommunications regulations.' },
      { icon: Eye, title: 'Audit and traceability', desc: 'Complete logs of every OTA operation: installation, update, deactivation. Full traceability.' },
    ],

    ctaTitle: 'Want to activate SAT Push on your network?',
    ctaDesc: 'Our SIM card expert team is ready to evaluate your infrastructure and design the OTA deployment plan.',
    ctaDemo: 'Schedule Demo',
    ctaCases: 'View SAT Push use cases',
  },

  fr: {
    satBadge: 'SAT Push',
    satTitle: 'Qu\'est-ce que SAT Push et pourquoi c\'est important',
    satDesc: 'SAT Push (SIM Application Toolkit) est une technologie native de la carte SIM qui permet d\'envoyer des messages interactifs directement sur l\'appareil sans application, données mobiles ni smartphone.',
    satBullets: [
      'Natif de la SIM : fonctionne sur tout téléphone, même basique',
      'Aucune application ni connexion de données requise',
      '10x de conversion vs SMS dans les campagnes DCB',
      'Formats interactifs : display, menu, get input',
    ],
    phoneDisplay: 'Display',
    phoneDisplayTitle: '2 Go GRATUITS pour 24h',
    phoneDisplayDesc: 'Activez maintenant et naviguez sans limites',
    phoneActivate: 'Activer',
    phoneLater: 'Plus tard',
    phoneMenuLabel: 'Menu',

    appletBadge: 'Technologie propriétaire',
    appletTitle: 'Applet propriétaire : ad-engine',
    appletDesc: 'Notre applet propriétaire s\'installe à distance sur n\'importe quelle SIM au monde via OTA. C\'est le moteur qui active SAT Push comme canal de conversion haute performance.',
    appletOtaLabel: 'Installation OTA',
    appletBullets: [
      { icon: Shield, text: 'Développé en interne par l\'équipe DYNAMO' },
      { icon: Download, text: 'Installable over-the-air (OTA) sans intervention de l\'utilisateur' },
      { icon: Cpu, text: 'Indépendant du fournisseur SIM : Gemalto, G&D, IDEMIA' },
      { icon: Zap, text: 'Compatible avec eSIM et SIM traditionnelles' },
    ],

    otaBadge: 'Infrastructure',
    otaTitle: 'OTA Cloud',
    otaSubtitle: 'Plateforme cloud pour gérer des millions de SIMs à distance : déploiement massif, mises à jour et monitoring en temps réel.',
    otaCentralLabel: 'DYNAMO OTA Cloud',
    otaCentralDesc: 'Gestion centralisée des SIMs',
    otaFeatures: [
      { icon: Server, title: 'Déploiement massif', desc: 'Installation d\'applets sur des millions de SIMs simultanément, avec contrôle du débit et priorisation.' },
      { icon: Signal, title: 'Gestion à distance du cycle de vie', desc: 'Mise à jour, désactivation et réinstallation des applets sans intervention de l\'utilisateur ni visite en magasin.' },
      { icon: RefreshCw, title: 'Mises à jour OTA', desc: 'Push de nouvelles versions de l\'applet de manière transparente, en maintenant la compatibilité avec toutes les SIMs.' },
      { icon: Activity, title: 'Monitoring en temps réel', desc: 'Dashboard de l\'état d\'installation, compatibilité, erreurs et taux de succès par lot et fournisseur SIM.' },
      { icon: Layers, title: 'Multi-vendor', desc: 'Compatible avec Gemalto/Thales, G&D, IDEMIA et eSIM. Indépendant du fabricant de carte SIM.' },
      { icon: Shield, title: 'Sécurité end-to-end', desc: 'Chiffrement du canal OTA, clés propres à l\'opérateur, conformité aux standards GlobalPlatform.' },
    ],

    caseBadge: 'Cas de succès',
    caseTitle: 'Opérateur — Afrique du Sud : de l\'incompatibilité à USD 2M+',
    caseSubtitle: 'Comment DYNAMO a transformé une base de 10M d\'utilisateurs incompatibles en un canal de revenus haute performance.',
    caseOperator: 'Opérateur — Afrique du Sud',
    caseCountry: 'South Africa',
    caseRevenueLabel: 'revenus / an',
    caseLinkText: 'Voir le cas complet',
    timeline: [
      { phase: 'Défi', desc: '10 millions d\'utilisateurs avec des SIMs incompatibles avec SAT Push. Aucun canal de conversion directe pour les VAS. Revenus nuls depuis la base mobile.', color: '#EF4444' },
      { phase: 'Plan d\'action', desc: 'Développement d\'un applet propriétaire compatible avec plusieurs fournisseurs SIM. Stratégie de déploiement OTA par lots progressifs.', color: '#F59E0B' },
      { phase: 'Solution', desc: 'Installation OTA massive de l\'ad-engine. Année 1 : 60% de pénétration. Optimisation continue jusqu\'à atteindre 80% de la base active.', color: '#22C55E' },
      { phase: 'Résultats', desc: '6M+ d\'utilisateurs avec SAT Push actif. Revenus de USD 2M+ par an. Canal de conversion 10x supérieur aux SMS pour les produits DCB.', color: '#CDFF00' },
    ],
    caseStats: [
      { value: '6M+', label: 'utilisateurs actifs' },
      { value: '80%', label: 'pénétration finale' },
      { value: 'USD 2M+', label: 'revenus annuels' },
      { value: '4', label: 'fournisseurs SIM' },
    ],

    secBadge: 'Sécurité',
    secTitle: 'Framework de sécurité',
    secSubtitle: 'La sécurité n\'est pas une fonctionnalité, c\'est la base de tout ce que nous construisons.',
    secLinkText: 'Voir le framework de sécurité complet',
    securityItems: [
      { icon: Lock, title: 'Chiffrement end-to-end', desc: 'Canal OTA chiffré avec les clés de l\'opérateur. Données en transit et au repos protégées selon les standards de l\'industrie.' },
      { icon: Server, title: 'Cloud de l\'opérateur', desc: 'L\'infrastructure OTA fonctionne sur le cloud de l\'opérateur ou dans des environnements dédiés. Aucune donnée sensible en dehors du périmètre.' },
      { icon: FileCheck, title: 'Compliance', desc: 'Conformité avec GlobalPlatform, GSMA et les réglementations locales de protection des données et des télécommunications.' },
      { icon: Eye, title: 'Audit et traçabilité', desc: 'Logs complets de chaque opération OTA : installation, mise à jour, désactivation. Traçabilité totale.' },
    ],

    ctaTitle: 'Vous souhaitez activer SAT Push sur votre réseau ?',
    ctaDesc: 'Notre équipe d\'experts en carte SIM est prête à évaluer votre infrastructure et concevoir le plan de déploiement OTA.',
    ctaDemo: 'Planifier une Démo',
    ctaCases: 'Voir les cas d\'usage SAT Push',
  },

  pt: {
    satBadge: 'SAT Push',
    satTitle: 'O que é SAT Push e por que importa',
    satDesc: 'SAT Push (SIM Application Toolkit) é uma tecnologia nativa do SIM card que permite enviar mensagens interativas diretamente ao dispositivo sem necessidade de app, dados móveis ou smartphone.',
    satBullets: [
      'Nativo do SIM: funciona em qualquer celular, até básicos',
      'Não requer app nem conexão de dados',
      '10x conversão vs SMS em campanhas de DCB',
      'Formatos interativos: display, menu, get input',
    ],
    phoneDisplay: 'Display',
    phoneDisplayTitle: '2GB GRÁTIS por 24h',
    phoneDisplayDesc: 'Ative agora e navegue sem limites',
    phoneActivate: 'Ativar',
    phoneLater: 'Mais tarde',
    phoneMenuLabel: 'Menu',

    appletBadge: 'Tecnologia proprietária',
    appletTitle: 'Applet proprietário: ad-engine',
    appletDesc: 'Nosso applet proprietário é instalado remotamente em qualquer SIM do mundo via OTA. É o motor que habilita SAT Push como canal de conversão de alta performance.',
    appletOtaLabel: 'Instalação OTA',
    appletBullets: [
      { icon: Shield, text: 'Desenvolvido in-house pela equipe da DYNAMO' },
      { icon: Download, text: 'Instalável over-the-air (OTA) sem intervenção do usuário' },
      { icon: Cpu, text: 'Independente do SIM vendor: Gemalto, G&D, IDEMIA' },
      { icon: Zap, text: 'Compatível com eSIM e SIM tradicionais' },
    ],

    otaBadge: 'Infraestrutura',
    otaTitle: 'OTA Cloud',
    otaSubtitle: 'Plataforma cloud para gerenciar milhões de SIMs remotamente: implantação massiva, atualizações e monitoramento em tempo real.',
    otaCentralLabel: 'DYNAMO OTA Cloud',
    otaCentralDesc: 'Gestão centralizada de SIMs',
    otaFeatures: [
      { icon: Server, title: 'Implantação massiva', desc: 'Instalação de applets em milhões de SIMs simultaneamente, com controle de throughput e priorização.' },
      { icon: Signal, title: 'Gestão remota do ciclo de vida', desc: 'Atualização, desativação e reinstalação de applets sem intervenção do usuário nem visita à loja.' },
      { icon: RefreshCw, title: 'Atualizações OTA', desc: 'Push de novas versões do applet de forma transparente, mantendo compatibilidade com todos os SIMs.' },
      { icon: Activity, title: 'Monitoramento em tempo real', desc: 'Dashboard de status de instalação, compatibilidade, erros e taxa de sucesso por lote e fabricante de SIM.' },
      { icon: Layers, title: 'Multi-vendor', desc: 'Compatível com Gemalto/Thales, G&D, IDEMIA e eSIM. Independente do fabricante de SIM card.' },
      { icon: Shield, title: 'Segurança end-to-end', desc: 'Criptografia do canal OTA, chaves do operador, compliance com padrões da GlobalPlatform.' },
    ],

    caseBadge: 'Caso de sucesso',
    caseTitle: 'Operadora — África do Sul: de incompatibilidade a USD 2M+',
    caseSubtitle: 'Como a DYNAMO transformou uma base de 10M de usuários incompatíveis em um canal de receita de alta performance.',
    caseOperator: 'Operadora — África do Sul',
    caseCountry: 'South Africa',
    caseRevenueLabel: 'receita / ano',
    caseLinkText: 'Ver caso completo',
    timeline: [
      { phase: 'Desafio', desc: '10 milhões de usuários com SIMs incompatíveis com SAT Push. Sem canal de conversão direta para VAS. Receita zero da base móvel.', color: '#EF4444' },
      { phase: 'Plano de ação', desc: 'Desenvolvimento de applet proprietário compatível com múltiplos fabricantes de SIM. Estratégia de implantação OTA por lotes progressivos.', color: '#F59E0B' },
      { phase: 'Solução', desc: 'Instalação OTA massiva do ad-engine. Ano 1: 60% de penetração. Otimização contínua até alcançar 80% da base ativa.', color: '#22C55E' },
      { phase: 'Resultados', desc: '6M+ usuários com SAT Push ativo. Receita de USD 2M+ anuais. Canal de conversão 10x superior ao SMS para produtos DCB.', color: '#CDFF00' },
    ],
    caseStats: [
      { value: '6M+', label: 'usuários ativos' },
      { value: '80%', label: 'penetração final' },
      { value: 'USD 2M+', label: 'receita anual' },
      { value: '4', label: 'fabricantes de SIM' },
    ],

    secBadge: 'Segurança',
    secTitle: 'Framework de segurança',
    secSubtitle: 'A segurança não é um feature, é a base de tudo o que construímos.',
    secLinkText: 'Ver framework completo de segurança',
    securityItems: [
      { icon: Lock, title: 'Criptografia end-to-end', desc: 'Canal OTA criptografado com chaves da operadora. Dados em trânsito e em repouso protegidos com padrões da indústria.' },
      { icon: Server, title: 'Cloud da operadora', desc: 'A infraestrutura OTA roda no cloud da operadora ou em ambientes dedicados. Sem dados sensíveis fora do perímetro.' },
      { icon: FileCheck, title: 'Compliance', desc: 'Conformidade com GlobalPlatform, GSMA e regulamentações locais de proteção de dados e telecomunicações.' },
      { icon: Eye, title: 'Auditoria e rastreabilidade', desc: 'Logs completos de cada operação OTA: instalação, atualização, desativação. Rastreabilidade total.' },
    ],

    ctaTitle: 'Quer ativar SAT Push na sua rede?',
    ctaDesc: 'Nossa equipe de especialistas em SIM card está pronta para avaliar sua infraestrutura e projetar o plano de implantação OTA.',
    ctaDemo: 'Agendar Demo',
    ctaCases: 'Ver casos de uso SAT Push',
  },
};

/* =================================================================
   Section 1 -- What is SAT Push
   ================================================================= */

export function WhatIsSATPushSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealOnScroll>
            <div>
              <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">
                {t.satBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
                {t.satTitle}
              </h2>
              <p className="text-w60 text-lg mt-6 leading-relaxed">
                {t.satDesc}
              </p>
              <div className="mt-8 space-y-4">
                {t.satBullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-w60 text-sm">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Animated phone mockup */}
          <RevealOnScroll delay={0.2}>
            <div className="relative mx-auto w-[280px]">
              <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50">
                <div className="bg-deep rounded-[2.4rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 py-3 text-[10px] text-w40">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3" />
                      <span>4G</span>
                    </div>
                  </div>

                  {/* SAT Push display format */}
                  <div className="px-4 pb-2 space-y-3">
                    {/* Display format */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/[0.06] border border-amber-500/20 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center">
                          <MonitorSmartphone className="w-3 h-3 text-amber-400" />
                        </div>
                        <span className="text-[10px] text-amber-400 font-semibold">{t.phoneDisplay}</span>
                      </div>
                      <p className="text-white text-xs font-medium">{t.phoneDisplayTitle}</p>
                      <p className="text-w40 text-[10px] mt-1">{t.phoneDisplayDesc}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-amber-500/20 text-amber-400 text-[9px] font-bold py-1.5 rounded-lg">
                          {t.phoneActivate}
                        </button>
                        <button className="flex-1 bg-white/5 text-w40 text-[9px] py-1.5 rounded-lg">
                          {t.phoneLater}
                        </button>
                      </div>
                    </motion.div>

                    {/* Menu format */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Menu className="w-3 h-3 text-amber-300" />
                        <span className="text-[10px] text-amber-300 font-semibold">{t.phoneMenuLabel}</span>
                      </div>
                      <div className="space-y-1.5">
                        {['1. Pack 1GB - $2.99', '2. Pack 5GB - $4.99', '3. Pack 10GB - $7.99'].map((item) => (
                          <div key={item} className="text-[10px] text-w60 bg-white/[0.03] rounded-md px-2 py-1">{item}</div>
                        ))}
                      </div>
                    </motion.div>

                    <div className="flex items-center gap-2 justify-center py-2 opacity-60">
                      <Signal className="w-3 h-3 text-amber-400" />
                      <span className="text-[9px] text-amber-300">SIM Toolkit Active</span>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="h-8 flex items-center justify-center">
                    <div className="w-24 h-1 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-amber-600/[0.06] rounded-[4rem] blur-2xl -z-10" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 2 -- Applet
   ================================================================= */

export function AppletSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* SIM card visual */}
          <RevealOnScroll>
            <div className="relative">
              <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="relative flex flex-col items-center">
                  {/* SIM card */}
                  <div className="relative w-48 h-64 bg-gradient-to-br from-amber-900/40 to-amber-800/20 border border-amber-500/30 rounded-2xl overflow-hidden">
                    {/* Chip */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-16 rounded-lg border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-amber-400/5">
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-1.5">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                            className="bg-amber-400/30 rounded-sm"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <span className="text-[10px] text-amber-300 font-mono tracking-wider">DYNAMO APPLET</span>
                      <p className="text-[8px] text-amber-400/50 mt-1">ad-engine v3.2</p>
                    </div>
                  </div>

                  {/* OTA animation */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="mt-6 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 text-xs font-medium">{t.appletOtaLabel}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div>
              <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">
                {t.appletBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
                {t.appletTitle}
              </h2>
              <p className="text-w60 text-lg mt-6 leading-relaxed">
                {t.appletDesc}
              </p>
              <div className="mt-8 space-y-5">
                {t.appletBullets.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-w60 text-sm mt-1">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 3 -- OTA Cloud
   ================================================================= */

export function OTACloudSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">
              {t.otaBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.otaTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.otaSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* Cloud hub visual */}
        <RevealOnScroll delay={0.1}>
          <div className="relative max-w-3xl mx-auto mb-16">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.4) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center mb-4"
                >
                  <Cloud className="w-12 h-12 text-amber-400" />
                </motion.div>
                <span className="text-white font-heading font-bold text-lg mb-2">{t.otaCentralLabel}</span>
                <span className="text-w40 text-xs mb-8">{t.otaCentralDesc}</span>
                <div className="w-px h-10 bg-gradient-to-b from-amber-500/40 to-transparent" />
                <div className="flex items-center gap-4 flex-wrap justify-center mt-4">
                  {['Gemalto / Thales', 'G&D', 'IDEMIA', 'eSIM'].map((vendor, i) => (
                    <motion.div
                      key={vendor}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-center"
                    >
                      <Smartphone className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <span className="text-w40 text-[10px] font-medium">{vendor}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.otaFeatures.map((f, i) => (
            <RevealOnScroll key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-amber-500/15 transition-all h-full"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold text-lg font-heading">{f.title}</h3>
                <p className="text-w40 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 4 -- Cell C Case Study
   ================================================================= */

export function CellCCaseSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/[0.04] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">
              {t.caseBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.caseTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.caseSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* Case study card */}
        <RevealOnScroll delay={0.15}>
          <div className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] to-amber-900/[0.04] overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative p-8 lg:p-12">
              {/* Header */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">{t.caseOperator}</h3>
                  <p className="text-sm text-white/60">{t.caseCountry}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="text-4xl font-heading font-bold text-amber-400">USD 2M+</span>
                  <p className="text-xs text-white/60 uppercase tracking-wider text-right">{t.caseRevenueLabel}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {t.timeline.map((step, i) => (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                    className="relative"
                  >
                    <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 h-full">
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: step.color }}
                      >
                        {step.phase}
                      </span>
                      <p className="text-w60 text-sm mt-3 leading-relaxed">{step.desc}</p>
                    </div>
                    {/* Connector */}
                    {i < t.timeline.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-white/5" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {t.caseStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="bg-white/[0.04] border border-amber-500/10 rounded-xl p-5 text-center"
                  >
                    <span className="text-2xl md:text-3xl font-heading font-bold text-amber-400">{stat.value}</span>
                    <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <Link
                  href="/casos-de-exito"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  {t.caseLinkText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* =================================================================
   Section 5 -- Security
   ================================================================= */

export function SecuritySection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-14">
            <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">
              {t.secBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.secTitle}
            </h2>
            <p className="text-w60 text-lg mt-4 max-w-2xl mx-auto">
              {t.secSubtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.securityItems.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-amber-500/15 transition-all h-full"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold text-lg font-heading">{item.title}</h3>
                <p className="text-w40 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/seguridad"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
            >
              {t.secLinkText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* =================================================================
   Section 6 -- CTA
   ================================================================= */

export function OTASIMCTA() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/15 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white">
            {t.ctaTitle}
          </h2>
          <p className="text-w60 text-lg mt-6 max-w-xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-deep px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              {t.ctaDemo}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/sat-push"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              {t.ctaCases}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
