'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Server,
  CreditCard,
  Users,
  Radio,
  Phone,
  MapPin,
  BarChart3,
  MessageSquare,
  Mail,
  Smartphone,
  Globe,
  Code2,
  Webhook,
  FileText,
  Headphones,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Clock,
  Wrench,
  Send,
  MonitorSmartphone,
  Cpu,
  Database,
  Layers,
} from 'lucide-react';

/* ================================================================
   I18N DICTIONARY
   ================================================================ */

const i18n: Record<string, {
  hubLabels: { telcoCore: string; channels: string; businessTools: string; dataAnalytics: string };
  hero: { badge: string; titlePre: string; titleHighlight: string; titlePost: string; description: string; ctaPrimary: string; ctaSecondary: string };
  telco: { badge: string; title: string; description: string; nodes: { title: string; fullName: string; description: string }[] };
  channels: { badge: string; title: string; description: string; starLabel: string; items: { description: string }[] };
  businessToolsSection: { badge: string; title: string; description: string; footer: string; items: { description: string }[] };
  api: { badge: string; title: string; description: string; points: string[]; cta: string };
  custom: { badge: string; title: string; description: string; items: { title: string; description: string }[] };
  cta: { title: string; description: string; ctaPrimary: string; ctaSecondary: string };
}> = {
  es: {
    hubLabels: { telcoCore: 'Telco Core', channels: 'Canales', businessTools: 'Business Tools', dataAnalytics: 'Data & Analytics' },
    hero: {
      badge: 'Integraciones',
      titlePre: 'Conectamos todo tu ',
      titleHighlight: 'ecosistema',
      titlePost: ' en una sola plataforma',
      description: 'DYNAMO se integra con tu infraestructura Telco, CRMs, herramientas de negocio y todos los canales de comunicación. También podemos conectar nuestros canales vía API a tu plataforma de CVM existente.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Ver documentación API',
    },
    telco: {
      badge: 'Infraestructura Telco',
      title: 'Integración nativa con tu infraestructura',
      description: 'Nos conectamos directamente a los sistemas core de tu operación para captar eventos en tiempo real.',
      nodes: [
        { title: 'HLR', fullName: 'Home Location Register', description: 'Consulta de estado del suscriptor, tipo de terminal, ubicación.' },
        { title: 'Billing System', fullName: 'Sistema de Facturación', description: 'Saldo, consumo, historial de pagos, cobros DCB.' },
        { title: 'CRM', fullName: 'Customer Relationship Management', description: 'Perfil del cliente, historial de interacciones, segmentos.' },
        { title: 'SDP', fullName: 'Service Delivery Platform', description: 'Activación/desactivación de servicios, suscripciones VAS.' },
        { title: 'SMSC', fullName: 'Short Message Service Center', description: 'Conexión SMPP directa para envío masivo SMS y SAT Push.' },
        { title: 'LBS', fullName: 'Location Based Services', description: 'Ubicación geográfica para campañas geo-targeting.' },
        { title: 'CDRs', fullName: 'Call Detail Records', description: 'Patrones de consumo, comportamiento de llamadas y datos.' },
      ],
    },
    channels: {
      badge: 'Todos los canales, una sola plataforma',
      title: '12 canales integrados y orquestados',
      description: 'Cada canal tiene sus propias capacidades. DYNAMO los orquesta todos en un journey coherente.',
      starLabel: 'Canal estrella',
      items: [
        { description: 'Canal nativo SIM con interactividad real. Applet propietario + OTA Cloud.' },
        { description: 'Mensajería masiva con alta tasa de entrega. Conexión SMPP directa.' },
        { description: 'Mensajes que aparecen directamente en pantalla sin almacenarse en inbox.' },
        { description: 'Sesiones interactivas en tiempo real, ideales para menús y transacciones.' },
        { description: 'Campañas de email marketing con templates HTML personalizables.' },
        { description: 'WhatsApp Business API con templates HSM, multimedia y botones interactivos.' },
        { description: 'Mensajería directa automatizada para engagement y soporte.' },
        { description: 'Chatbots y campañas automatizadas en Messenger.' },
        { description: 'Widget de chat embebible en el sitio web del operador.' },
        { description: 'Rich Communication Services con carruseles, botones y multimedia.' },
        { description: 'Push notifications desde la app del operador con SDK integrable.' },
        { description: 'Integra cualquier canal adicional vía nuestra API REST.' },
      ],
    },
    businessToolsSection: {
      badge: 'Herramientas de negocio',
      title: 'Conecta con tus herramientas favoritas',
      description: 'Integraciones nativas con CRMs y plataformas de productividad.',
      footer: '¿Usas otra herramienta? Desarrollamos integraciones custom a medida.',
      items: [
        { description: 'Sincronización bidireccional de contactos, oportunidades y campañas.' },
        { description: 'Integración con workflows, listas y propiedades de contacto.' },
        { description: 'Conexión con deals, contactos y actividades.' },
        { description: 'Acceso a documentos, reportes y assets de campaña.' },
      ],
    },
    api: {
      badge: 'API-first',
      title: 'Integra nuestros canales a tu plataforma existente',
      description: 'Si ya cuentas con una plataforma de CVM o campaign manager, puedes integrar todos los canales de DYNAMO vía API. En especial si no cuentas con SAT Push y quieres agregarlo a tu suite de canales, interconectado con Journeys.',
      points: [
        'API REST completa con documentación Swagger',
        'Webhooks para eventos en tiempo real',
        'SDKs disponibles para integración rápida',
        'Soporte técnico dedicado para onboarding',
      ],
      cta: 'Hablar con nuestro equipo de integraciones',
    },
    custom: {
      badge: 'Integraciones custom',
      title: 'Actuamos como tu software factory',
      description: 'Desarrollamos integraciones a medida de tus necesidades. Nuestro equipo de ingeniería trabaja con tu stack tecnológico.',
      items: [
        { title: 'Desarrollo a medida', description: 'Desarrollo a medida con tu equipo técnico.' },
        { title: 'Implementación rápida', description: 'SAT Push y SMS en 48hs, RCS en 2 semanas.' },
        { title: 'Soporte proactivo', description: 'Soporte técnico proactivo y mantenimiento continuo.' },
      ],
    },
    cta: {
      title: '¿Necesitas conectar DYNAMO con tu ecosistema?',
      description: 'Nuestro equipo de integraciones te ayuda a conectar todo en tiempo récord.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Contactar ingeniería',
    },
  },
  en: {
    hubLabels: { telcoCore: 'Telco Core', channels: 'Channels', businessTools: 'Business Tools', dataAnalytics: 'Data & Analytics' },
    hero: {
      badge: 'Integrations',
      titlePre: 'We connect your entire ',
      titleHighlight: 'ecosystem',
      titlePost: ' into a single platform',
      description: 'DYNAMO integrates with your Telco infrastructure, CRMs, business tools, and all communication channels. We can also connect our channels via API to your existing CVM platform.',
      ctaPrimary: 'Schedule Demo',
      ctaSecondary: 'View API Documentation',
    },
    telco: {
      badge: 'Telco Infrastructure',
      title: 'Native integration with your infrastructure',
      description: 'We connect directly to your core systems to capture events in real time.',
      nodes: [
        { title: 'HLR', fullName: 'Home Location Register', description: 'Subscriber status, terminal type, and location queries.' },
        { title: 'Billing System', fullName: 'Billing System', description: 'Balance, usage, payment history, DCB charges.' },
        { title: 'CRM', fullName: 'Customer Relationship Management', description: 'Customer profile, interaction history, segments.' },
        { title: 'SDP', fullName: 'Service Delivery Platform', description: 'Service activation/deactivation, VAS subscriptions.' },
        { title: 'SMSC', fullName: 'Short Message Service Center', description: 'Direct SMPP connection for bulk SMS and SAT Push delivery.' },
        { title: 'LBS', fullName: 'Location Based Services', description: 'Geographic location for geo-targeting campaigns.' },
        { title: 'CDRs', fullName: 'Call Detail Records', description: 'Usage patterns, call and data behavior analysis.' },
      ],
    },
    channels: {
      badge: 'All channels, one platform',
      title: '12 integrated and orchestrated channels',
      description: 'Each channel has its own capabilities. DYNAMO orchestrates them all into a coherent journey.',
      starLabel: 'Star channel',
      items: [
        { description: 'Native SIM channel with real interactivity. Proprietary applet + OTA Cloud.' },
        { description: 'Bulk messaging with high delivery rates. Direct SMPP connection.' },
        { description: 'Messages that appear directly on screen without being stored in inbox.' },
        { description: 'Real-time interactive sessions, ideal for menus and transactions.' },
        { description: 'Email marketing campaigns with customizable HTML templates.' },
        { description: 'WhatsApp Business API with HSM templates, multimedia, and interactive buttons.' },
        { description: 'Automated direct messaging for engagement and support.' },
        { description: 'Chatbots and automated campaigns on Messenger.' },
        { description: 'Embeddable chat widget for the operator\'s website.' },
        { description: 'Rich Communication Services with carousels, buttons, and multimedia.' },
        { description: 'Push notifications from the operator\'s app with integrable SDK.' },
        { description: 'Integrate any additional channel via our REST API.' },
      ],
    },
    businessToolsSection: {
      badge: 'Business tools',
      title: 'Connect with your favorite tools',
      description: 'Native integrations with CRMs and productivity platforms.',
      footer: 'Using another tool? We develop custom integrations tailored to your needs.',
      items: [
        { description: 'Bidirectional sync of contacts, opportunities, and campaigns.' },
        { description: 'Integration with workflows, lists, and contact properties.' },
        { description: 'Connection with deals, contacts, and activities.' },
        { description: 'Access to documents, reports, and campaign assets.' },
      ],
    },
    api: {
      badge: 'API-first',
      title: 'Integrate our channels into your existing platform',
      description: 'If you already have a CVM platform or campaign manager, you can integrate all DYNAMO channels via API. Especially if you don\'t have SAT Push and want to add it to your channel suite, interconnected with Journeys.',
      points: [
        'Full REST API with Swagger documentation',
        'Webhooks for real-time events',
        'SDKs available for rapid integration',
        'Dedicated technical support for onboarding',
      ],
      cta: 'Talk to our integrations team',
    },
    custom: {
      badge: 'Custom integrations',
      title: 'We act as your software factory',
      description: 'We develop integrations tailored to your needs. Our engineering team works with your technology stack.',
      items: [
        { title: 'Custom development', description: 'Custom development with your technical team.' },
        { title: 'Rapid deployment', description: 'SAT Push and SMS in 48hrs, RCS in 2 weeks.' },
        { title: 'Proactive support', description: 'Proactive technical support and continuous maintenance.' },
      ],
    },
    cta: {
      title: 'Need to connect DYNAMO with your ecosystem?',
      description: 'Our integrations team helps you connect everything in record time.',
      ctaPrimary: 'Schedule Demo',
      ctaSecondary: 'Contact engineering',
    },
  },
  fr: {
    hubLabels: { telcoCore: 'Telco Core', channels: 'Canaux', businessTools: 'Outils Business', dataAnalytics: 'Data & Analytics' },
    hero: {
      badge: 'Intégrations',
      titlePre: 'Nous connectons tout votre ',
      titleHighlight: 'écosystème',
      titlePost: ' en une seule plateforme',
      description: 'DYNAMO s\'intègre à votre infrastructure Telco, CRMs, outils métier et tous les canaux de communication. Nous pouvons également connecter nos canaux via API à votre plateforme CVM existante.',
      ctaPrimary: 'Planifier une démo',
      ctaSecondary: 'Voir la documentation API',
    },
    telco: {
      badge: 'Infrastructure Telco',
      title: 'Intégration native avec votre infrastructure',
      description: 'Nous nous connectons directement aux systèmes core de votre opération pour capter les événements en temps réel.',
      nodes: [
        { title: 'HLR', fullName: 'Home Location Register', description: 'Consultation du statut abonné, type de terminal, localisation.' },
        { title: 'Billing System', fullName: 'Système de Facturation', description: 'Solde, consommation, historique de paiements, facturation DCB.' },
        { title: 'CRM', fullName: 'Customer Relationship Management', description: 'Profil client, historique d\'interactions, segments.' },
        { title: 'SDP', fullName: 'Service Delivery Platform', description: 'Activation/désactivation de services, abonnements VAS.' },
        { title: 'SMSC', fullName: 'Short Message Service Center', description: 'Connexion SMPP directe pour l\'envoi massif de SMS et SAT Push.' },
        { title: 'LBS', fullName: 'Location Based Services', description: 'Localisation géographique pour les campagnes de géo-ciblage.' },
        { title: 'CDRs', fullName: 'Call Detail Records', description: 'Modèles de consommation, comportement d\'appels et de données.' },
      ],
    },
    channels: {
      badge: 'Tous les canaux, une seule plateforme',
      title: '12 canaux intégrés et orchestrés',
      description: 'Chaque canal a ses propres capacités. DYNAMO les orchestre tous dans un journey cohérent.',
      starLabel: 'Canal vedette',
      items: [
        { description: 'Canal SIM natif avec interactivité réelle. Applet propriétaire + OTA Cloud.' },
        { description: 'Messagerie massive avec un taux de livraison élevé. Connexion SMPP directe.' },
        { description: 'Messages qui s\'affichent directement à l\'écran sans être stockés en inbox.' },
        { description: 'Sessions interactives en temps réel, idéales pour les menus et transactions.' },
        { description: 'Campagnes d\'email marketing avec templates HTML personnalisables.' },
        { description: 'API WhatsApp Business avec templates HSM, multimédia et boutons interactifs.' },
        { description: 'Messagerie directe automatisée pour l\'engagement et le support.' },
        { description: 'Chatbots et campagnes automatisées sur Messenger.' },
        { description: 'Widget de chat intégrable sur le site web de l\'opérateur.' },
        { description: 'Rich Communication Services avec carrousels, boutons et multimédia.' },
        { description: 'Notifications push depuis l\'app de l\'opérateur avec SDK intégrable.' },
        { description: 'Intégrez tout canal supplémentaire via notre API REST.' },
      ],
    },
    businessToolsSection: {
      badge: 'Outils métier',
      title: 'Connectez-vous à vos outils favoris',
      description: 'Intégrations natives avec les CRMs et plateformes de productivité.',
      footer: 'Vous utilisez un autre outil ? Nous développons des intégrations sur mesure.',
      items: [
        { description: 'Synchronisation bidirectionnelle des contacts, opportunités et campagnes.' },
        { description: 'Intégration avec les workflows, listes et propriétés de contact.' },
        { description: 'Connexion avec les deals, contacts et activités.' },
        { description: 'Accès aux documents, rapports et assets de campagne.' },
      ],
    },
    api: {
      badge: 'API-first',
      title: 'Intégrez nos canaux à votre plateforme existante',
      description: 'Si vous disposez déjà d\'une plateforme CVM ou d\'un campaign manager, vous pouvez intégrer tous les canaux DYNAMO via API. Notamment si vous n\'avez pas SAT Push et souhaitez l\'ajouter à votre suite de canaux, interconnecté avec Journeys.',
      points: [
        'API REST complète avec documentation Swagger',
        'Webhooks pour les événements en temps réel',
        'SDKs disponibles pour une intégration rapide',
        'Support technique dédié pour l\'onboarding',
      ],
      cta: 'Parler à notre équipe intégrations',
    },
    custom: {
      badge: 'Intégrations sur mesure',
      title: 'Nous agissons comme votre software factory',
      description: 'Nous développons des intégrations sur mesure selon vos besoins. Notre équipe d\'ingénierie travaille avec votre stack technologique.',
      items: [
        { title: 'Développement sur mesure', description: 'Développement sur mesure avec votre équipe technique.' },
        { title: 'Déploiement rapide', description: 'SAT Push et SMS en 48h, RCS en 2 semaines.' },
        { title: 'Support proactif', description: 'Support technique proactif et maintenance continue.' },
      ],
    },
    cta: {
      title: 'Besoin de connecter DYNAMO à votre écosystème ?',
      description: 'Notre équipe intégrations vous aide à tout connecter en un temps record.',
      ctaPrimary: 'Planifier une démo',
      ctaSecondary: 'Contacter l\'ingénierie',
    },
  },
  pt: {
    hubLabels: { telcoCore: 'Telco Core', channels: 'Canais', businessTools: 'Ferramentas de Negócio', dataAnalytics: 'Data & Analytics' },
    hero: {
      badge: 'Integrações',
      titlePre: 'Conectamos todo o seu ',
      titleHighlight: 'ecossistema',
      titlePost: ' em uma única plataforma',
      description: 'O DYNAMO se integra com sua infraestrutura Telco, CRMs, ferramentas de negócio e todos os canais de comunicação. Também podemos conectar nossos canais via API à sua plataforma de CVM existente.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Ver documentação API',
    },
    telco: {
      badge: 'Infraestrutura Telco',
      title: 'Integração nativa com sua infraestrutura',
      description: 'Nos conectamos diretamente aos sistemas core da sua operação para captar eventos em tempo real.',
      nodes: [
        { title: 'HLR', fullName: 'Home Location Register', description: 'Consulta de status do assinante, tipo de terminal, localização.' },
        { title: 'Billing System', fullName: 'Sistema de Faturamento', description: 'Saldo, consumo, histórico de pagamentos, cobranças DCB.' },
        { title: 'CRM', fullName: 'Customer Relationship Management', description: 'Perfil do cliente, histórico de interações, segmentos.' },
        { title: 'SDP', fullName: 'Service Delivery Platform', description: 'Ativação/desativação de serviços, assinaturas VAS.' },
        { title: 'SMSC', fullName: 'Short Message Service Center', description: 'Conexão SMPP direta para envio massivo de SMS e SAT Push.' },
        { title: 'LBS', fullName: 'Location Based Services', description: 'Localização geográfica para campanhas de geo-targeting.' },
        { title: 'CDRs', fullName: 'Call Detail Records', description: 'Padrões de consumo, comportamento de chamadas e dados.' },
      ],
    },
    channels: {
      badge: 'Todos os canais, uma única plataforma',
      title: '12 canais integrados e orquestrados',
      description: 'Cada canal tem suas próprias capacidades. O DYNAMO os orquestra todos em um journey coerente.',
      starLabel: 'Canal destaque',
      items: [
        { description: 'Canal SIM nativo com interatividade real. Applet proprietário + OTA Cloud.' },
        { description: 'Mensageria em massa com alta taxa de entrega. Conexão SMPP direta.' },
        { description: 'Mensagens que aparecem diretamente na tela sem serem armazenadas na inbox.' },
        { description: 'Sessões interativas em tempo real, ideais para menus e transações.' },
        { description: 'Campanhas de email marketing com templates HTML personalizáveis.' },
        { description: 'API WhatsApp Business com templates HSM, multimídia e botões interativos.' },
        { description: 'Mensageria direta automatizada para engajamento e suporte.' },
        { description: 'Chatbots e campanhas automatizadas no Messenger.' },
        { description: 'Widget de chat incorporável no site do operador.' },
        { description: 'Rich Communication Services com carrosséis, botões e multimídia.' },
        { description: 'Push notifications a partir do app do operador com SDK integrável.' },
        { description: 'Integre qualquer canal adicional via nossa API REST.' },
      ],
    },
    businessToolsSection: {
      badge: 'Ferramentas de negócio',
      title: 'Conecte-se às suas ferramentas favoritas',
      description: 'Integrações nativas com CRMs e plataformas de produtividade.',
      footer: 'Usa outra ferramenta? Desenvolvemos integrações customizadas sob medida.',
      items: [
        { description: 'Sincronização bidirecional de contatos, oportunidades e campanhas.' },
        { description: 'Integração com workflows, listas e propriedades de contato.' },
        { description: 'Conexão com deals, contatos e atividades.' },
        { description: 'Acesso a documentos, relatórios e assets de campanha.' },
      ],
    },
    api: {
      badge: 'API-first',
      title: 'Integre nossos canais à sua plataforma existente',
      description: 'Se você já conta com uma plataforma de CVM ou campaign manager, pode integrar todos os canais do DYNAMO via API. Especialmente se não conta com SAT Push e quer adicioná-lo à sua suíte de canais, interconectado com Journeys.',
      points: [
        'API REST completa com documentação Swagger',
        'Webhooks para eventos em tempo real',
        'SDKs disponíveis para integração rápida',
        'Suporte técnico dedicado para onboarding',
      ],
      cta: 'Falar com nossa equipe de integrações',
    },
    custom: {
      badge: 'Integrações customizadas',
      title: 'Atuamos como sua software factory',
      description: 'Desenvolvemos integrações sob medida para suas necessidades. Nossa equipe de engenharia trabalha com seu stack tecnológico.',
      items: [
        { title: 'Desenvolvimento sob medida', description: 'Desenvolvimento sob medida com sua equipe técnica.' },
        { title: 'Implementação rápida', description: 'SAT Push e SMS em 48h, RCS em 2 semanas.' },
        { title: 'Suporte proativo', description: 'Suporte técnico proativo e manutenção contínua.' },
      ],
    },
    cta: {
      title: 'Precisa conectar o DYNAMO ao seu ecossistema?',
      description: 'Nossa equipe de integrações ajuda você a conectar tudo em tempo recorde.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Contatar engenharia',
    },
  },
};

/* ================================================================
   ANIMATED INTEGRATION HUB — The centerpiece hero visual
   ================================================================ */

function getHubCategories(t: typeof i18n.es) {
  return [
    {
      label: t.hubLabels.telcoCore,
      color: '#8a7de8',
      angle: -90,
      items: ['HLR', 'Billing', 'CRM', 'SDP', 'SMSC', 'LBS', 'CDRs'],
    },
    {
      label: t.hubLabels.channels,
      color: '#cdff00',
      angle: 0,
      items: ['SAT Push', 'SMS', 'FlashSMS', 'USSD', 'Email', 'WhatsApp', 'Instagram', 'Messenger', 'Webchat', 'SDK'],
    },
    {
      label: t.hubLabels.businessTools,
      color: '#5f4ee0',
      angle: 90,
      items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Google Drive'],
    },
    {
      label: t.hubLabels.dataAnalytics,
      color: '#3b82f6',
      angle: 180,
      items: ['APIs', 'Webhooks', 'Data Warehouses'],
    },
  ];
}

function IntegrationNode({ label, color, delay, x, y }: { label: string; color: string; delay: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute flex items-center justify-center"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <div
        className="px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium whitespace-nowrap border backdrop-blur-sm"
        style={{
          borderColor: `${color}40`,
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

function AnimatedLine({ x1, y1, x2, y2, color, delay }: { x1: number; y1: number; x2: number; y2: number; color: string; delay: number }) {
  return (
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={color}
      strokeWidth="1"
      strokeOpacity="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay, duration: 0.8, ease: 'easeInOut' }}
    />
  );
}

export function IntegrationHub() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const hubCategories = getHubCategories(t);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Center of the hub
  const cx = 50;
  const cy = 50;

  // Calculate node positions for each category
  const getNodePositions = (category: typeof hubCategories[number], _catIdx: number) => {
    const angleRad = (category.angle * Math.PI) / 180;
    const branchLen = 32;
    // Branch endpoint
    const bx = cx + Math.cos(angleRad) * branchLen;
    const by = cy + Math.sin(angleRad) * branchLen;

    return category.items.map((item, i) => {
      const total = category.items.length;
      const spread = Math.min(total * 18, 160);
      const perpAngle = angleRad + Math.PI / 2;
      const offset = (i - (total - 1) / 2) * (spread / total);
      const extraRadius = 12 + Math.abs(offset) * 0.4;
      const nx = bx + Math.cos(angleRad) * extraRadius + Math.cos(perpAngle) * offset;
      const ny = by + Math.sin(angleRad) * extraRadius + Math.sin(perpAngle) * offset;
      return { label: item, x: nx, y: ny, bx, by };
    });
  };

  return (
    <div ref={ref} className="relative w-full aspect-square max-w-[500px] mx-auto lg:mx-0">
      {isInView && (
        <>
          {/* SVG lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {hubCategories.map((cat, catIdx) =>
              getNodePositions(cat, catIdx).map((node, i) => (
                <AnimatedLine
                  key={`${catIdx}-${i}`}
                  x1={cx}
                  y1={cy}
                  x2={node.x}
                  y2={node.y}
                  color={cat.color}
                  delay={0.3 + catIdx * 0.15 + i * 0.05}
                />
              ))
            )}
          </svg>

          {/* Pulsing rings */}
          <motion.div
            className="absolute rounded-full border border-purple-500/20"
            style={{ left: '50%', top: '50%', width: '50%', height: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full border border-purple-500/10"
            style={{ left: '50%', top: '50%', width: '75%', height: '75%', transform: 'translate(-50%, -50%)' }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.div
            className="absolute rounded-full border border-white/5"
            style={{ left: '50%', top: '50%', width: '95%', height: '95%', transform: 'translate(-50%, -50%)' }}
            animate={{ scale: [1, 1.02, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Center DYNAMO node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-2xl shadow-purple-500/40">
                <span className="font-heading font-bold text-white text-xs sm:text-sm leading-tight text-center">
                  DYNAMO<br />Journeys
                </span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Category labels */}
          {hubCategories.map((cat, catIdx) => {
            const angleRad = (cat.angle * Math.PI) / 180;
            const labelDist = 20;
            const lx = cx + Math.cos(angleRad) * labelDist;
            const ly = cy + Math.sin(angleRad) * labelDist;
            return (
              <motion.div
                key={cat.label}
                className="absolute z-10"
                style={{ left: `${lx}%`, top: `${ly}%`, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + catIdx * 0.1, duration: 0.4 }}
              >
                <span
                  className="px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap border"
                  style={{
                    borderColor: `${cat.color}30`,
                    backgroundColor: `${cat.color}10`,
                    color: cat.color,
                  }}
                >
                  {cat.label}
                </span>
              </motion.div>
            );
          })}

          {/* Integration nodes */}
          {hubCategories.map((cat, catIdx) =>
            getNodePositions(cat, catIdx).map((node, i) => (
              <IntegrationNode
                key={`${cat.label}-${node.label}`}
                label={node.label}
                color={cat.color}
                delay={0.5 + catIdx * 0.15 + i * 0.06}
                x={node.x}
                y={node.y}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

/* ================================================================
   HERO SECTION
   ================================================================ */
export function IntegrationsHero() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,42,206,0.15) 0%, rgba(59,42,206,0.05) 40%, rgba(5,5,16,0) 70%)',
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">
              {t.hero.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t.hero.titlePre}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime">
                {t.hero.titleHighlight}
              </span>
              {t.hero.titlePost}
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              >
                {t.hero.ctaSecondary}
                <Code2 className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right: animated hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <IntegrationHub />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 1: TELCO CORE
   ================================================================ */

const telcoIcons = [Server, CreditCard, Users, Radio, Phone, MapPin, BarChart3];

export function TelcoCoreSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              {t.telco.badge}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            {t.telco.title}
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl text-lg">
            {t.telco.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {t.telco.nodes.map((item, i) => {
            const Icon = telcoIcons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="group relative rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent p-6 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-heading font-bold text-white text-lg">{item.title}</h3>
                <p className="text-xs text-purple-300/60 mb-2">{item.fullName}</p>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2: CHANNELS
   ================================================================ */

const channelsMeta = [
  { icon: Smartphone, name: 'SAT Push', color: '#cdff00', featured: true },
  { icon: MessageSquare, name: 'SMS', color: '#8a7de8', featured: false },
  { icon: Zap, name: 'FlashSMS', color: '#f59e0b', featured: false },
  { icon: Layers, name: 'USSD', color: '#10b981', featured: false },
  { icon: Mail, name: 'Email', color: '#3b82f6', featured: false },
  { icon: MessageSquare, name: 'WhatsApp', color: '#25D366', featured: false },
  { icon: MonitorSmartphone, name: 'Instagram DM', color: '#E4405F', featured: false },
  { icon: Send, name: 'Facebook Messenger', color: '#0084FF', featured: false },
  { icon: Globe, name: 'Webchat', color: '#6366f1', featured: false },
  { icon: Smartphone, name: 'RCS', color: '#4285F4', featured: false },
  { icon: Smartphone, name: 'SDK App Notifications', color: '#f97316', featured: false },
  { icon: Code2, name: 'API de Canales', color: '#a78bfa', featured: false },
];

export function ChannelsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-lime/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-lime" />
            </div>
            <span className="text-sm font-medium text-lime uppercase tracking-wider">
              {t.channels.badge}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            {t.channels.title}
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl text-lg">
            {t.channels.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {channelsMeta.map((ch, i) => (
            <motion.div
              key={ch.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className={`group relative rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                ch.featured
                  ? 'border-lime/40 bg-gradient-to-br from-lime/10 to-transparent sm:col-span-2 lg:col-span-2'
                  : 'border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-white/20'
              }`}
            >
              {ch.featured && (
                <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-lime/20 text-lime border border-lime/30">
                  <Star className="w-3 h-3" /> {t.channels.starLabel}
                </span>
              )}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${ch.color}20` }}
              >
                <ch.icon className="w-5 h-5" style={{ color: ch.color }} />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">{ch.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed mt-2">{t.channels.items[i]?.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 3: BUSINESS TOOLS
   ================================================================ */

const businessToolsMeta = [
  { icon: Database, name: 'Salesforce', color: '#00A1E0' },
  { icon: Users, name: 'HubSpot', color: '#FF7A59' },
  { icon: BarChart3, name: 'Pipedrive', color: '#017737' },
  { icon: FileText, name: 'Google Drive', color: '#4285F4' },
];

export function BusinessToolsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-sm font-medium text-purple-300 uppercase tracking-wider">
              {t.businessToolsSection.badge}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            {t.businessToolsSection.title}
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl text-lg">
            {t.businessToolsSection.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessToolsMeta.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${tool.color}20` }}
              >
                <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">{tool.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed mt-2">{t.businessToolsSection.items[i]?.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-center text-white/60 text-sm"
        >
          {t.businessToolsSection.footer}
        </motion.p>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4: API SECTION
   ================================================================ */

const apiIcons = [FileText, Webhook, Code2, Headphones];

export function APISection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
              {t.api.badge}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            {t.api.title}
          </h2>
          <p className="mt-4 text-white/60 max-w-3xl text-lg">
            {t.api.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Key points */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            {t.api.points.map((text, i) => {
              const Icon = apiIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed pt-2">{text}</p>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-4"
            >
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                {t.api.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Code snippet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="rounded-xl border border-white/10 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-white/30 font-mono">api-request.json</span>
              </div>
              {/* Code content */}
              <div className="p-6 bg-[#0a0a1a] overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed">
                  <span className="text-green-400">POST</span>{' '}
                  <span className="text-blue-300">/api/v1/campaigns/send</span>
                  {'\n'}
                  <span className="text-white/30">{'{'}</span>
                  {'\n'}
                  {'  '}<span className="text-purple-300">&quot;channel&quot;</span>
                  <span className="text-white/30">: </span>
                  <span className="text-lime">&quot;sat_push&quot;</span>
                  <span className="text-white/30">,</span>
                  {'\n'}
                  {'  '}<span className="text-purple-300">&quot;audience&quot;</span>
                  <span className="text-white/30">: </span>
                  <span className="text-lime">&quot;cluster_high_value&quot;</span>
                  <span className="text-white/30">,</span>
                  {'\n'}
                  {'  '}<span className="text-purple-300">&quot;template&quot;</span>
                  <span className="text-white/30">: </span>
                  <span className="text-lime">&quot;plan_upgrade_q4&quot;</span>
                  <span className="text-white/30">,</span>
                  {'\n'}
                  {'  '}<span className="text-purple-300">&quot;rules&quot;</span>
                  <span className="text-white/30">: {'{'}</span>
                  {'\n'}
                  {'    '}<span className="text-purple-300">&quot;windowing&quot;</span>
                  <span className="text-white/30">: </span>
                  <span className="text-lime">&quot;09:00-21:00&quot;</span>
                  <span className="text-white/30">,</span>
                  {'\n'}
                  {'    '}<span className="text-purple-300">&quot;max_impacts&quot;</span>
                  <span className="text-white/30">: </span>
                  <span className="text-amber-300">2</span>
                  <span className="text-white/30">,</span>
                  {'\n'}
                  {'    '}<span className="text-purple-300">&quot;fallback&quot;</span>
                  <span className="text-white/30">: </span>
                  <span className="text-lime">&quot;whatsapp&quot;</span>
                  {'\n'}
                  {'  '}<span className="text-white/30">{'}'}</span>
                  {'\n'}
                  <span className="text-white/30">{'}'}</span>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5: CUSTOM INTEGRATIONS
   ================================================================ */

const customIcons = [Users, Clock, Shield];

export function CustomSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              {t.custom.badge}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            {t.custom.title}
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl text-lg">
            {t.custom.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.custom.items.map((item, i) => {
            const Icon = customIcons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="relative rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent p-8 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="font-heading font-bold text-white text-xl mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6: CTA
   ================================================================ */

export function IntegrationsCTA() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-deep p-12 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,42,206,0.15),transparent_70%)]" />
          <div className="relative">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              {t.cta.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                {t.cta.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:segundo.salvadores@dynamo.tech"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              >
                {t.cta.ctaSecondary}
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
