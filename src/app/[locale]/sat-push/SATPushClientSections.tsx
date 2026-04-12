'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';
import RevealOnScroll from '@/components/RevealOnScroll';
import Link from 'next/link';
import {
  Smartphone,
  Cloud,
  Cpu,
  CheckCircle2,
  Shield,
  ArrowRight,
  Zap,
  Wifi,
  Bell,
  ShoppingCart,
  Users,
  Target,
  BarChart3,
  Gamepad2,
  Download,
  Megaphone,
  PhoneCall,
  CreditCard,
  UserPlus,
  Tag,
  Ticket,
  Trophy,
  Tv,
  Package,
  Rocket,
  Globe,
  Phone,
  Menu,
  Signal,
  Layers,
  Settings,
  Activity,
  TrendingUp,
  Database,
  ChevronDown,
  Monitor,
  FlaskConical,
  RotateCcw,
  SlidersHorizontal,
  PieChart,
  ExternalLink,
  DollarSign,
  Code,
  Quote,
  ShieldCheck,
  AlertTriangle,
  Eye,
  Lock,
  Repeat,
  Star,
  CircleDot,
  Crosshair,
  Play,
  Award,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   I18N DICTIONARY
   ═══════════════════════════════════════════ */

const i18n: Record<string, {
  ui: { cancel: string; select: string; send: string; typeHere: string; mobileCarrier: string; before: string; withDynamo: string };
  journey: { tag: string; title: string; titleHighlight: string; subtitle: string; steps: { label: string; message?: string; title?: string; tags?: string[] }[] };
  formats: { tag: string; title: string; titleHighlight: string; displayMsg: string; menuTitle: string; menuItems: string[]; inputTitle: string; inputTags: string[]; cards: { title: string; desc: string }[] };
  mediaKit: { tag: string; title: string; titleHighlight: string; subtitle: string; tabs: { label: string }[]; stats: { value: string; label: string }[]; ctasLabel: string; ctaLabels: string[]; useCases: Record<string, { title: string; description: string }[]> };
  objections: { tag: string; title: string; titleHighlight: string; subtitle: string; items: { problem: string; problemDesc: string; solution: string; solutionDesc: string; pills: string[] }[] };
  platform: { tag: string; title: string; titleHighlight: string; subtitle: string; steps: { title: string; desc: string }[]; modesTitle: string; modes: { name: string; desc: string }[]; toolsTitle: string; tools: string[] };
  differentiators: { tag: string; title: string; titleHighlight: string; items: { title: string; desc: string }[] };
  ota: { tag: string; title: string; titleHighlight: string; points: string[]; link: string };
  analytics: { tag: string; title: string; titleHighlight: string; operatorDash: string; operatorDesc: string; advertiserDash: string; advertiserDesc: string; quote: string };
  results: { tag: string; title: string; titleHighlight: string; cases: { operator: string; desc: string }[]; link: string };
  cta: { title: string; titleHighlight: string; subtitle: string; ctaPrimary: string; ctaSecondary: string; ctaTertiary: string; trust: string };
}> = {
  es: {
    ui: { cancel: 'Cancelar', select: 'Seleccionar', send: 'Enviar', typeHere: 'Escriba aquí...', mobileCarrier: 'OPERADOR MÓVIL', before: 'Antes', withDynamo: 'Con DYNAMO' },
    journey: {
      tag: 'Flujo interactivo',
      title: 'Mira ',
      titleHighlight: 'cómo funciona',
      subtitle: 'Un journey completo de 5 pasos que convierte usuarios anónimos en miembros VIP',
      steps: [
        { label: 'Discovery', message: '¡Hola! Responde 3 preguntas y conviértete en miembro VIP. Es gratis.' },
        { label: 'Relevancia', title: '¿Cuál es tu nombre?' },
        { label: 'Interacción', title: 'Selecciona tu interés:' },
        { label: 'Optimización', title: 'Tu rango de edad:' },
        { label: 'Efectividad', message: '¡Gracias Caroline! Ya eres miembro VIP. Recibirás tu primer premio en segundos.' },
      ],
    },
    formats: {
      tag: 'Formatos',
      title: '3 formatos, ',
      titleHighlight: 'infinitas posibilidades',
      displayMsg: 'Su plan de datos está a punto de agotarse. Renuévelo ahora por $5/semana, plan 4GB con WhatsApp ilimitado. OK para activarlo!',
      menuTitle: 'Seleccione una opción:',
      menuItems: ['Plan Básico 2GB $3/mes', 'Plan Plus 5GB $5/mes', 'Plan Ilimitado 10GB $10/mes', 'Plan Familiar 20GB $15/mes'],
      inputTitle: '¿Cuál es tu interés?',
      inputTags: ['Deportes', 'Música', 'Noticias', 'Gaming'],
      cards: [
        { title: 'Múltiples formatos', desc: 'Display, menú y recolección de datos' },
        { title: 'Compatibilidad total', desc: '95% de terminales, básicos a smartphones' },
        { title: 'Interactividad real', desc: 'Diálogo bidireccional con el consumidor' },
        { title: 'CTAs accionables', desc: 'SMS, llamada, browser, USSD, descarga apps' },
      ],
    },
    mediaKit: {
      tag: 'Media Kit',
      title: 'Casos de uso del canal ',
      titleHighlight: 'SAT Push',
      subtitle: 'Explora cómo SAT Push puede transformar cada área de tu negocio',
      tabs: [{ label: 'Core Services' }, { label: 'Marcas' }, { label: 'VAS' }, { label: 'Engagement' }, { label: 'Multimedia' }],
      stats: [{ value: '97%', label: 'compatibilidad con terminales' }, { value: '2-10x', label: 'más conversión que SMS' }, { value: '5', label: 'tipos de CTA disponibles' }],
      ctasLabel: 'CTAs disponibles:',
      ctaLabels: ['SMS', 'Llamada', 'USSD', 'Web', 'Descarga de Apps'],
      useCases: {
        core: [
          { title: 'Drive to Call', description: 'Dirigir clientes deudores a llamar al centro de atención' },
          { title: 'Drive to Web', description: 'Enviar teaser con intereses del usuario para generar tráfico web' },
          { title: 'Notificaciones', description: 'Derivar al menú SIM Toolkit para aumentar tráfico' },
          { title: 'Venta cruzada', description: 'Notificaciones personalizadas con oferta extra como segunda acción' },
          { title: 'Nuevo teléfono/SIM', description: 'Reducir churn con campañas de retención proactiva' },
          { title: 'Seguro de teléfono', description: 'Seguros, opciones smartphone, try & buy de datos' },
          { title: 'Minutos internacionales', description: 'Generar revenue constante de tráfico internacional' },
          { title: 'Cuota de datos alcanzada', description: 'Vender paquete extra de datos one-shot o plan mayor' },
          { title: 'Opciones de roaming', description: 'Vender opciones de roaming según país de destino' },
        ],
        brands: [
          { title: 'Confirmación de cita', description: 'Confirmar turnos y recordatorios' },
          { title: 'Seguimiento de pago', description: 'Recordar vencimientos de pagos' },
          { title: 'Registro', description: 'Confirmar registros y suscripciones' },
          { title: 'Alerta de oferta', description: 'Enviar promociones y cupones' },
          { title: 'Call back', description: 'Solicitar que el usuario devuelva la llamada' },
        ],
        vas: [
          { title: 'Double opt-in', description: 'Adquisición de usuarios con doble confirmación' },
          { title: 'Single opt-in + menú', description: 'Activación con menú de opciones' },
          { title: 'Cupones y promociones', description: 'Ofrecer descuentos por categoría' },
          { title: 'Descarga de apps', description: 'Dirigir a descarga en Android Market' },
        ],
        engagement: [
          { title: 'Encuestas', description: 'Perfilamiento de usuarios con preguntas interactivas' },
          { title: 'Trivias', description: 'Juegos y entretenimiento para TV shows' },
          { title: 'Segmentación y venta', description: 'Perfilar + ofrecer contenido personalizado' },
          { title: 'Concursos', description: 'Promociones interactivas con premios' },
        ],
        multimedia: [
          { title: 'Branding', description: 'Impresiones y tráfico de alta calidad' },
          { title: 'Core', description: 'Landing pages de adquisición' },
          { title: 'Valor agregado', description: 'Activaciones de servicios VAS' },
          { title: 'Descarga de apps', description: 'Descarga directa de aplicaciones' },
        ],
      },
    },
    objections: {
      tag: 'Objeciones resueltas',
      title: '¿Ya usaste SAT Push ',
      titleHighlight: 'y no tuviste los mejores resultados?',
      subtitle: 'Con DYNAMO, la historia es diferente.',
      items: [
        { problem: 'Es invasivo', problemDesc: 'Mensajes sin control de frecuencia ni segmentación que molestan al usuario.', solution: 'Windowing inteligente', solutionDesc: 'Frecuencia controlada, segmentación AI, ventanas de entrega optimizadas.', pills: ['Windowing', 'Frecuencia controlada', 'Segmentación AI'] },
        { problem: 'Generaba reclamos', problemDesc: 'Sin control de spam ni listas de exclusión, el usuario quedaba atrapado.', solution: 'Anti-spam nativo', solutionDesc: 'Blacklists automáticas, índice de repetición y opt-out garantizado.', pills: ['Blacklists', 'Índice repetición', 'Opt-out'] },
        { problem: 'Había fraude VAS', problemDesc: 'Suscripciones sin consentimiento y cobros indebidos al usuario.', solution: 'Compliance total', solutionDesc: 'Double opt-in obligatorio, marketplace transparente, aprobación del operador.', pills: ['Double opt-in', 'Marketplace', 'Aprobación operador'] },
      ],
    },
    platform: {
      tag: 'Plataforma',
      title: 'No somos senders. ',
      titleHighlight: 'Optimizamos cada impresión.',
      subtitle: 'Campaign Manager Mobile Programmatic',
      steps: [
        { title: 'Productos', desc: 'El Operador define comunicación y CTA mediante templates y flujos automatizados' },
        { title: 'Audiencia', desc: 'Seleccione la audiencia por fuente de datos interna o externa' },
        { title: 'Estrategia', desc: '4 modos de optimización automática para maximizar resultados' },
      ],
      modesTitle: 'Modos de optimización',
      modes: [
        { name: 'Performance', desc: 'Asignación por tasa de conversión' },
        { name: 'The Best One', desc: 'Al mejor producto' },
        { name: 'Above X%', desc: 'Solo sobre mínimo de conversión' },
        { name: 'Revenue Driven', desc: 'Por revenue potencial' },
      ],
      toolsTitle: 'Herramientas de performance',
      tools: ['Solo usuarios compatibles (detección RCS/SAT)', 'Ancho de banda autodimensionable', 'A/B testing de creatividades', 'Segundas acciones y límites por campaña', 'Reintentos automáticos'],
    },
    differentiators: {
      tag: 'Diferenciales',
      title: 'Diferenciales de ',
      titleHighlight: 'nuestra solución',
      items: [
        { title: 'Solución autoescalable', desc: '100% cloud SaaS' },
        { title: 'Expertos a su servicio', desc: 'Presentes día a día' },
        { title: 'Sin costos de HW/SW', desc: 'Bajos costos mantenimiento' },
        { title: 'Estadísticas aumentadas', desc: 'Resultados detallados' },
        { title: 'Desarrollos e integraciones', desc: 'Software factory a medida' },
        { title: 'Campaign Manager inteligente', desc: 'Mobile programmatic' },
        { title: 'Generamos nuevos ingresos', desc: 'Inventario con marcas/CPs' },
        { title: 'Implementación rápida', desc: 'SAT Push 48hs, RCS 2 semanas' },
      ],
    },
    ota: { tag: 'Tecnología OTA', title: 'Applet propietario + ', titleHighlight: 'OTA Cloud', points: ['Applet desarrollado in-house', 'Instalación OTA sin cambiar SIM', 'Compatible todos los SIM vendors + eSIM', 'Encriptación en la nube del Operador'], link: 'Ver tecnología OTA en detalle' },
    analytics: { tag: 'Analytics', title: 'Analytics en ', titleHighlight: 'tiempo real', operatorDash: 'Dashboard Operador', operatorDesc: 'Todas las variables del negocio por anunciante, producto, canal, ingresos', advertiserDash: 'Dashboard Anunciante', advertiserDesc: 'Solo KPIs de sus campañas', quote: 'Cuanta mayor transparencia en los KPIs, mayor nivel de inversión publicitaria y mayor confianza' },
    results: { tag: 'Resultados', title: 'Resultados ', titleHighlight: 'comprobados', cases: [{ operator: 'Operador — Sudáfrica', desc: 'Revenue generado con SAT Push en un solo operador' }, { operator: 'Operador Tier 1 — LATAM', desc: 'Tasa de conversión promedio en campañas de upsell' }, { operator: 'Operador — África Occidental', desc: 'CTR en campañas de adquisición de datos' }], link: 'Ver todos los casos de éxito' },
    cta: { title: 'Activa ', titleHighlight: 'SAT Push', subtitle: 'Agenda una demo y descubre cómo el canal más efectivo del mercado puede transformar tu operación.', ctaPrimary: 'Agendar Demo', ctaSecondary: 'Calcular ROI', ctaTertiary: 'Ver tecnología OTA', trust: '+20 Telcos ya usan SAT Push con DYNAMO' },
  },
  en: {
    ui: { cancel: 'Cancel', select: 'Select', send: 'Send', typeHere: 'Type here...', mobileCarrier: 'MOBILE CARRIER', before: 'Before', withDynamo: 'With DYNAMO' },
    journey: {
      tag: 'Interactive flow',
      title: 'See ',
      titleHighlight: 'how it works',
      subtitle: 'A complete 5-step journey that converts anonymous users into VIP members',
      steps: [
        { label: 'Discovery', message: 'Hello! Answer 3 questions and become a VIP member. It\'s free.' },
        { label: 'Relevance', title: 'What is your name?' },
        { label: 'Interaction', title: 'Select your interest:' },
        { label: 'Optimization', title: 'Your age range:' },
        { label: 'Effectiveness', message: 'Thank you Caroline! You are now a VIP member. You\'ll receive your first reward in seconds.' },
      ],
    },
    formats: {
      tag: 'Formats',
      title: '3 formats, ',
      titleHighlight: 'infinite possibilities',
      displayMsg: 'Your data plan is about to run out. Renew now for $5/week, 4GB plan with unlimited WhatsApp. OK to activate!',
      menuTitle: 'Select an option:',
      menuItems: ['Basic Plan 2GB $3/mo', 'Plus Plan 5GB $5/mo', 'Unlimited Plan 10GB $10/mo', 'Family Plan 20GB $15/mo'],
      inputTitle: 'What is your interest?',
      inputTags: ['Sports', 'Music', 'News', 'Gaming'],
      cards: [
        { title: 'Multiple formats', desc: 'Display, menu and data collection' },
        { title: 'Full compatibility', desc: '95% of devices, from basic to smartphones' },
        { title: 'Real interactivity', desc: 'Two-way dialog with the consumer' },
        { title: 'Actionable CTAs', desc: 'SMS, call, browser, USSD, app download' },
      ],
    },
    mediaKit: {
      tag: 'Media Kit',
      title: 'Use cases for the ',
      titleHighlight: 'SAT Push',
      subtitle: 'Explore how SAT Push can transform every area of your business',
      tabs: [{ label: 'Core Services' }, { label: 'Brands' }, { label: 'VAS' }, { label: 'Engagement' }, { label: 'Multimedia' }],
      stats: [{ value: '97%', label: 'device compatibility' }, { value: '2-10x', label: 'more conversion than SMS' }, { value: '5', label: 'CTA types available' }],
      ctasLabel: 'Available CTAs:',
      ctaLabels: ['SMS', 'Call', 'USSD', 'Web', 'App Download'],
      useCases: {
        core: [
          { title: 'Drive to Call', description: 'Direct delinquent customers to call the service center' },
          { title: 'Drive to Web', description: 'Send teaser with user interests to generate web traffic' },
          { title: 'Notifications', description: 'Redirect to SIM Toolkit menu to increase traffic' },
          { title: 'Cross-selling', description: 'Personalized notifications with extra offer as second action' },
          { title: 'New phone/SIM', description: 'Reduce churn with proactive retention campaigns' },
          { title: 'Phone insurance', description: 'Insurance, smartphone options, data try & buy' },
          { title: 'International minutes', description: 'Generate steady revenue from international traffic' },
          { title: 'Data quota reached', description: 'Sell extra data pack one-shot or upgrade plan' },
          { title: 'Roaming options', description: 'Sell roaming options by destination country' },
        ],
        brands: [
          { title: 'Appointment confirmation', description: 'Confirm appointments and reminders' },
          { title: 'Payment follow-up', description: 'Remind about payment due dates' },
          { title: 'Registration', description: 'Confirm registrations and subscriptions' },
          { title: 'Offer alert', description: 'Send promotions and coupons' },
          { title: 'Call back', description: 'Request the user to return the call' },
        ],
        vas: [
          { title: 'Double opt-in', description: 'User acquisition with double confirmation' },
          { title: 'Single opt-in + menu', description: 'Activation with options menu' },
          { title: 'Coupons and promotions', description: 'Offer discounts by category' },
          { title: 'App download', description: 'Direct to Android Market download' },
        ],
        engagement: [
          { title: 'Surveys', description: 'User profiling with interactive questions' },
          { title: 'Trivia', description: 'Games and entertainment for TV shows' },
          { title: 'Segmentation and sales', description: 'Profile + offer personalized content' },
          { title: 'Contests', description: 'Interactive promotions with prizes' },
        ],
        multimedia: [
          { title: 'Branding', description: 'High-quality impressions and traffic' },
          { title: 'Core', description: 'Acquisition landing pages' },
          { title: 'Value-added', description: 'VAS service activations' },
          { title: 'App download', description: 'Direct app downloads' },
        ],
      },
    },
    objections: {
      tag: 'Objections resolved',
      title: 'Already used SAT Push ',
      titleHighlight: 'and didn\'t get the best results?',
      subtitle: 'With DYNAMO, the story is different.',
      items: [
        { problem: 'It\'s invasive', problemDesc: 'Messages without frequency control or segmentation that annoy the user.', solution: 'Intelligent windowing', solutionDesc: 'Controlled frequency, AI segmentation, optimized delivery windows.', pills: ['Windowing', 'Controlled frequency', 'AI segmentation'] },
        { problem: 'It generated complaints', problemDesc: 'Without spam control or exclusion lists, the user was trapped.', solution: 'Native anti-spam', solutionDesc: 'Automatic blacklists, repetition index, and guaranteed opt-out.', pills: ['Blacklists', 'Repetition index', 'Opt-out'] },
        { problem: 'There was VAS fraud', problemDesc: 'Subscriptions without consent and undue charges to the user.', solution: 'Full compliance', solutionDesc: 'Mandatory double opt-in, transparent marketplace, operator approval.', pills: ['Double opt-in', 'Marketplace', 'Operator approval'] },
      ],
    },
    platform: {
      tag: 'Platform',
      title: 'We\'re not senders. ',
      titleHighlight: 'We optimize every impression.',
      subtitle: 'Campaign Manager Mobile Programmatic',
      steps: [
        { title: 'Products', desc: 'The Operator defines communication and CTA through templates and automated flows' },
        { title: 'Audience', desc: 'Select the audience by internal or external data source' },
        { title: 'Strategy', desc: '4 automatic optimization modes to maximize results' },
      ],
      modesTitle: 'Optimization modes',
      modes: [
        { name: 'Performance', desc: 'Allocation by conversion rate' },
        { name: 'The Best One', desc: 'To the best product' },
        { name: 'Above X%', desc: 'Only above minimum conversion' },
        { name: 'Revenue Driven', desc: 'By potential revenue' },
      ],
      toolsTitle: 'Performance tools',
      tools: ['Compatible users only (RCS/SAT detection)', 'Auto-scalable bandwidth', 'A/B testing of creatives', 'Second actions and limits per campaign', 'Automatic retries'],
    },
    differentiators: {
      tag: 'Differentiators',
      title: 'Differentiators of ',
      titleHighlight: 'our solution',
      items: [
        { title: 'Auto-scalable solution', desc: '100% cloud SaaS' },
        { title: 'Experts at your service', desc: 'Present day by day' },
        { title: 'No HW/SW costs', desc: 'Low maintenance costs' },
        { title: 'Enhanced analytics', desc: 'Detailed results' },
        { title: 'Development & integrations', desc: 'Custom software factory' },
        { title: 'Intelligent Campaign Manager', desc: 'Mobile programmatic' },
        { title: 'We generate new revenue', desc: 'Inventory with brands/CPs' },
        { title: 'Rapid deployment', desc: 'SAT Push 48hrs, RCS 2 weeks' },
      ],
    },
    ota: { tag: 'OTA Technology', title: 'Proprietary applet + ', titleHighlight: 'OTA Cloud', points: ['Applet developed in-house', 'OTA installation without changing SIM', 'Compatible with all SIM vendors + eSIM', 'Encryption in the Operator\'s cloud'], link: 'See OTA technology in detail' },
    analytics: { tag: 'Analytics', title: 'Real-time ', titleHighlight: 'analytics', operatorDash: 'Operator Dashboard', operatorDesc: 'All business variables by advertiser, product, channel, revenue', advertiserDash: 'Advertiser Dashboard', advertiserDesc: 'Only their campaign KPIs', quote: 'The greater the transparency in KPIs, the higher the advertising investment and trust' },
    results: { tag: 'Results', title: 'Proven ', titleHighlight: 'results', cases: [{ operator: 'Operator — South Africa', desc: 'Revenue generated with SAT Push at a single operator' }, { operator: 'Tier 1 Operator — LATAM', desc: 'Average conversion rate in upsell campaigns' }, { operator: 'Operator — West Africa', desc: 'CTR in data acquisition campaigns' }], link: 'See all success stories' },
    cta: { title: 'Activate ', titleHighlight: 'SAT Push', subtitle: 'Schedule a demo and discover how the most effective channel in the market can transform your operation.', ctaPrimary: 'Schedule Demo', ctaSecondary: 'Calculate ROI', ctaTertiary: 'See OTA technology', trust: '+20 Telcos already use SAT Push with DYNAMO' },
  },
  fr: {
    ui: { cancel: 'Annuler', select: 'Sélectionner', send: 'Envoyer', typeHere: 'Saisissez ici...', mobileCarrier: 'OPÉRATEUR MOBILE', before: 'Avant', withDynamo: 'Avec DYNAMO' },
    journey: {
      tag: 'Flux interactif',
      title: 'Découvrez ',
      titleHighlight: 'comment ça fonctionne',
      subtitle: 'Un journey complet en 5 étapes qui convertit les utilisateurs anonymes en membres VIP',
      steps: [
        { label: 'Discovery', message: 'Bonjour ! Répondez à 3 questions et devenez membre VIP. C\'est gratuit.' },
        { label: 'Pertinence', title: 'Quel est votre nom ?' },
        { label: 'Interaction', title: 'Sélectionnez votre intérêt :' },
        { label: 'Optimisation', title: 'Votre tranche d\'âge :' },
        { label: 'Efficacité', message: 'Merci Caroline ! Vous êtes désormais membre VIP. Vous recevrez votre premier prix dans quelques secondes.' },
      ],
    },
    formats: {
      tag: 'Formats',
      title: '3 formats, ',
      titleHighlight: 'des possibilités infinies',
      displayMsg: 'Votre forfait data est sur le point d\'expirer. Renouvelez maintenant pour 5$/semaine, forfait 4Go avec WhatsApp illimité. OK pour activer !',
      menuTitle: 'Sélectionnez une option :',
      menuItems: ['Forfait Basic 2Go 3$/mois', 'Forfait Plus 5Go 5$/mois', 'Forfait Illimité 10Go 10$/mois', 'Forfait Famille 20Go 15$/mois'],
      inputTitle: 'Quel est votre intérêt ?',
      inputTags: ['Sports', 'Musique', 'Actualités', 'Gaming'],
      cards: [
        { title: 'Formats multiples', desc: 'Affichage, menu et collecte de données' },
        { title: 'Compatibilité totale', desc: '95% des terminaux, basiques aux smartphones' },
        { title: 'Interactivité réelle', desc: 'Dialogue bidirectionnel avec le consommateur' },
        { title: 'CTAs actionnables', desc: 'SMS, appel, navigateur, USSD, téléchargement d\'apps' },
      ],
    },
    mediaKit: {
      tag: 'Media Kit', title: 'Cas d\'usage du canal ', titleHighlight: 'SAT Push', subtitle: 'Explorez comment SAT Push peut transformer chaque domaine de votre activité',
      tabs: [{ label: 'Services Core' }, { label: 'Marques' }, { label: 'VAS' }, { label: 'Engagement' }, { label: 'Multimédia' }],
      stats: [{ value: '97%', label: 'compatibilité terminaux' }, { value: '2-10x', label: 'plus de conversion que le SMS' }, { value: '5', label: 'types de CTA disponibles' }],
      ctasLabel: 'CTAs disponibles :', ctaLabels: ['SMS', 'Appel', 'USSD', 'Web', 'Téléchargement d\'apps'],
      useCases: {
        core: [
          { title: 'Drive to Call', description: 'Diriger les clients débiteurs vers le centre d\'appels' },
          { title: 'Drive to Web', description: 'Envoyer un teaser avec les intérêts de l\'utilisateur pour générer du trafic web' },
          { title: 'Notifications', description: 'Rediriger vers le menu SIM Toolkit pour augmenter le trafic' },
          { title: 'Vente croisée', description: 'Notifications personnalisées avec offre supplémentaire en seconde action' },
          { title: 'Nouveau téléphone/SIM', description: 'Réduire le churn avec des campagnes de rétention proactives' },
          { title: 'Assurance téléphone', description: 'Assurances, options smartphone, try & buy data' },
          { title: 'Minutes internationales', description: 'Générer un revenu constant du trafic international' },
          { title: 'Quota data atteint', description: 'Vendre un pack data supplémentaire ou un forfait supérieur' },
          { title: 'Options roaming', description: 'Vendre des options roaming selon le pays de destination' },
        ],
        brands: [
          { title: 'Confirmation de RDV', description: 'Confirmer les rendez-vous et rappels' },
          { title: 'Suivi de paiement', description: 'Rappeler les échéances de paiement' },
          { title: 'Inscription', description: 'Confirmer les inscriptions et abonnements' },
          { title: 'Alerte offre', description: 'Envoyer des promotions et coupons' },
          { title: 'Rappel', description: 'Demander à l\'utilisateur de rappeler' },
        ],
        vas: [
          { title: 'Double opt-in', description: 'Acquisition d\'utilisateurs avec double confirmation' },
          { title: 'Single opt-in + menu', description: 'Activation avec menu d\'options' },
          { title: 'Coupons et promotions', description: 'Offrir des réductions par catégorie' },
          { title: 'Téléchargement d\'apps', description: 'Diriger vers le téléchargement sur Android Market' },
        ],
        engagement: [
          { title: 'Sondages', description: 'Profilage des utilisateurs avec des questions interactives' },
          { title: 'Quiz', description: 'Jeux et divertissement pour les émissions TV' },
          { title: 'Segmentation et vente', description: 'Profiler + offrir du contenu personnalisé' },
          { title: 'Concours', description: 'Promotions interactives avec des prix' },
        ],
        multimedia: [
          { title: 'Branding', description: 'Impressions et trafic de haute qualité' },
          { title: 'Core', description: 'Landing pages d\'acquisition' },
          { title: 'Valeur ajoutée', description: 'Activations de services VAS' },
          { title: 'Téléchargement d\'apps', description: 'Téléchargement direct d\'applications' },
        ],
      },
    },
    objections: {
      tag: 'Objections résolues', title: 'Vous avez déjà utilisé SAT Push ', titleHighlight: 'et n\'avez pas obtenu les meilleurs résultats ?', subtitle: 'Avec DYNAMO, l\'histoire est différente.',
      items: [
        { problem: 'C\'est invasif', problemDesc: 'Messages sans contrôle de fréquence ni segmentation qui agacent l\'utilisateur.', solution: 'Windowing intelligent', solutionDesc: 'Fréquence contrôlée, segmentation IA, fenêtres de livraison optimisées.', pills: ['Windowing', 'Fréquence contrôlée', 'Segmentation IA'] },
        { problem: 'Ça générait des plaintes', problemDesc: 'Sans contrôle anti-spam ni listes d\'exclusion, l\'utilisateur était piégé.', solution: 'Anti-spam natif', solutionDesc: 'Listes noires automatiques, indice de répétition et opt-out garanti.', pills: ['Listes noires', 'Indice répétition', 'Opt-out'] },
        { problem: 'Il y avait de la fraude VAS', problemDesc: 'Abonnements sans consentement et frais indus pour l\'utilisateur.', solution: 'Conformité totale', solutionDesc: 'Double opt-in obligatoire, marketplace transparent, approbation de l\'opérateur.', pills: ['Double opt-in', 'Marketplace', 'Approbation opérateur'] },
      ],
    },
    platform: {
      tag: 'Plateforme', title: 'Nous ne sommes pas des senders. ', titleHighlight: 'Nous optimisons chaque impression.', subtitle: 'Campaign Manager Mobile Programmatic',
      steps: [{ title: 'Produits', desc: 'L\'Opérateur définit la communication et le CTA via des templates et des flux automatisés' }, { title: 'Audience', desc: 'Sélectionnez l\'audience par source de données interne ou externe' }, { title: 'Stratégie', desc: '4 modes d\'optimisation automatique pour maximiser les résultats' }],
      modesTitle: 'Modes d\'optimisation',
      modes: [{ name: 'Performance', desc: 'Attribution par taux de conversion' }, { name: 'The Best One', desc: 'Au meilleur produit' }, { name: 'Above X%', desc: 'Uniquement au-dessus du minimum de conversion' }, { name: 'Revenue Driven', desc: 'Par revenu potentiel' }],
      toolsTitle: 'Outils de performance',
      tools: ['Utilisateurs compatibles uniquement (détection RCS/SAT)', 'Bande passante auto-dimensionnable', 'A/B testing des créatifs', 'Secondes actions et limites par campagne', 'Tentatives automatiques'],
    },
    differentiators: {
      tag: 'Différenciateurs', title: 'Les différenciateurs de ', titleHighlight: 'notre solution',
      items: [{ title: 'Solution auto-scalable', desc: '100% cloud SaaS' }, { title: 'Experts à votre service', desc: 'Présents au quotidien' }, { title: 'Pas de coûts HW/SW', desc: 'Faibles coûts de maintenance' }, { title: 'Analytics augmentées', desc: 'Résultats détaillés' }, { title: 'Développements & intégrations', desc: 'Software factory sur mesure' }, { title: 'Campaign Manager intelligent', desc: 'Mobile programmatic' }, { title: 'Nous générons de nouveaux revenus', desc: 'Inventaire avec marques/CPs' }, { title: 'Déploiement rapide', desc: 'SAT Push 48h, RCS 2 semaines' }],
    },
    ota: { tag: 'Technologie OTA', title: 'Applet propriétaire + ', titleHighlight: 'OTA Cloud', points: ['Applet développé en interne', 'Installation OTA sans changer de SIM', 'Compatible avec tous les fournisseurs SIM + eSIM', 'Chiffrement dans le cloud de l\'Opérateur'], link: 'Voir la technologie OTA en détail' },
    analytics: { tag: 'Analytics', title: 'Analytics en ', titleHighlight: 'temps réel', operatorDash: 'Dashboard Opérateur', operatorDesc: 'Toutes les variables métier par annonceur, produit, canal, revenus', advertiserDash: 'Dashboard Annonceur', advertiserDesc: 'Uniquement les KPIs de ses campagnes', quote: 'Plus il y a de transparence dans les KPIs, plus le niveau d\'investissement publicitaire et de confiance est élevé' },
    results: { tag: 'Résultats', title: 'Résultats ', titleHighlight: 'prouvés', cases: [{ operator: 'Opérateur — Afrique du Sud', desc: 'Revenue généré avec SAT Push chez un seul opérateur' }, { operator: 'Opérateur Tier 1 — LATAM', desc: 'Taux de conversion moyen dans les campagnes d\'upsell' }, { operator: 'Opérateur — Afrique de l\'Ouest', desc: 'CTR dans les campagnes d\'acquisition de données' }], link: 'Voir tous les cas de succès' },
    cta: { title: 'Activez ', titleHighlight: 'SAT Push', subtitle: 'Planifiez une démo et découvrez comment le canal le plus efficace du marché peut transformer votre opération.', ctaPrimary: 'Planifier une démo', ctaSecondary: 'Calculer le ROI', ctaTertiary: 'Voir la technologie OTA', trust: '+20 Telcos utilisent déjà SAT Push avec DYNAMO' },
  },
  pt: {
    ui: { cancel: 'Cancelar', select: 'Selecionar', send: 'Enviar', typeHere: 'Digite aqui...', mobileCarrier: 'OPERADORA MÓVEL', before: 'Antes', withDynamo: 'Com DYNAMO' },
    journey: {
      tag: 'Fluxo interativo',
      title: 'Veja ',
      titleHighlight: 'como funciona',
      subtitle: 'Um journey completo de 5 passos que converte usuários anônimos em membros VIP',
      steps: [
        { label: 'Discovery', message: 'Olá! Responda 3 perguntas e torne-se membro VIP. É grátis.' },
        { label: 'Relevância', title: 'Qual é o seu nome?' },
        { label: 'Interação', title: 'Selecione seu interesse:' },
        { label: 'Otimização', title: 'Sua faixa etária:' },
        { label: 'Efetividade', message: 'Obrigado Caroline! Você já é membro VIP. Receberá seu primeiro prêmio em segundos.' },
      ],
    },
    formats: {
      tag: 'Formatos', title: '3 formatos, ', titleHighlight: 'possibilidades infinitas',
      displayMsg: 'Seu plano de dados está prestes a esgotar. Renove agora por $5/semana, plano 4GB com WhatsApp ilimitado. OK para ativar!',
      menuTitle: 'Selecione uma opção:', menuItems: ['Plano Básico 2GB R$3/mês', 'Plano Plus 5GB R$5/mês', 'Plano Ilimitado 10GB R$10/mês', 'Plano Família 20GB R$15/mês'],
      inputTitle: 'Qual é seu interesse?', inputTags: ['Esportes', 'Música', 'Notícias', 'Gaming'],
      cards: [{ title: 'Múltiplos formatos', desc: 'Display, menu e coleta de dados' }, { title: 'Compatibilidade total', desc: '95% dos dispositivos, básicos a smartphones' }, { title: 'Interatividade real', desc: 'Diálogo bidirecional com o consumidor' }, { title: 'CTAs acionáveis', desc: 'SMS, ligação, browser, USSD, download de apps' }],
    },
    mediaKit: {
      tag: 'Media Kit', title: 'Casos de uso do canal ', titleHighlight: 'SAT Push', subtitle: 'Explore como o SAT Push pode transformar cada área do seu negócio',
      tabs: [{ label: 'Core Services' }, { label: 'Marcas' }, { label: 'VAS' }, { label: 'Engagement' }, { label: 'Multimídia' }],
      stats: [{ value: '97%', label: 'compatibilidade com dispositivos' }, { value: '2-10x', label: 'mais conversão que SMS' }, { value: '5', label: 'tipos de CTA disponíveis' }],
      ctasLabel: 'CTAs disponíveis:', ctaLabels: ['SMS', 'Ligação', 'USSD', 'Web', 'Download de Apps'],
      useCases: {
        core: [{ title: 'Drive to Call', description: 'Direcionar clientes devedores para ligar ao centro de atendimento' }, { title: 'Drive to Web', description: 'Enviar teaser com interesses do usuário para gerar tráfego web' }, { title: 'Notificações', description: 'Redirecionar ao menu SIM Toolkit para aumentar tráfego' }, { title: 'Venda cruzada', description: 'Notificações personalizadas com oferta extra como segunda ação' }, { title: 'Novo celular/SIM', description: 'Reduzir churn com campanhas de retenção proativa' }, { title: 'Seguro de celular', description: 'Seguros, opções de smartphone, try & buy de dados' }, { title: 'Minutos internacionais', description: 'Gerar receita constante de tráfego internacional' }, { title: 'Cota de dados atingida', description: 'Vender pacote extra de dados one-shot ou plano maior' }, { title: 'Opções de roaming', description: 'Vender opções de roaming por país de destino' }],
        brands: [{ title: 'Confirmação de consulta', description: 'Confirmar agendamentos e lembretes' }, { title: 'Acompanhamento de pagamento', description: 'Lembrar vencimentos de pagamentos' }, { title: 'Registro', description: 'Confirmar registros e assinaturas' }, { title: 'Alerta de oferta', description: 'Enviar promoções e cupons' }, { title: 'Call back', description: 'Solicitar que o usuário retorne a ligação' }],
        vas: [{ title: 'Double opt-in', description: 'Aquisição de usuários com dupla confirmação' }, { title: 'Single opt-in + menu', description: 'Ativação com menu de opções' }, { title: 'Cupons e promoções', description: 'Oferecer descontos por categoria' }, { title: 'Download de apps', description: 'Direcionar para download na Play Store' }],
        engagement: [{ title: 'Pesquisas', description: 'Perfilamento de usuários com perguntas interativas' }, { title: 'Trivias', description: 'Jogos e entretenimento para programas de TV' }, { title: 'Segmentação e venda', description: 'Perfilar + oferecer conteúdo personalizado' }, { title: 'Concursos', description: 'Promoções interativas com prêmios' }],
        multimedia: [{ title: 'Branding', description: 'Impressões e tráfego de alta qualidade' }, { title: 'Core', description: 'Landing pages de aquisição' }, { title: 'Valor agregado', description: 'Ativações de serviços VAS' }, { title: 'Download de apps', description: 'Download direto de aplicativos' }],
      },
    },
    objections: {
      tag: 'Objeções resolvidas', title: 'Já usou SAT Push ', titleHighlight: 'e não teve os melhores resultados?', subtitle: 'Com o DYNAMO, a história é diferente.',
      items: [
        { problem: 'É invasivo', problemDesc: 'Mensagens sem controle de frequência nem segmentação que incomodam o usuário.', solution: 'Windowing inteligente', solutionDesc: 'Frequência controlada, segmentação IA, janelas de entrega otimizadas.', pills: ['Windowing', 'Frequência controlada', 'Segmentação IA'] },
        { problem: 'Gerava reclamações', problemDesc: 'Sem controle de spam nem listas de exclusão, o usuário ficava preso.', solution: 'Anti-spam nativo', solutionDesc: 'Blacklists automáticas, índice de repetição e opt-out garantido.', pills: ['Blacklists', 'Índice repetição', 'Opt-out'] },
        { problem: 'Havia fraude VAS', problemDesc: 'Assinaturas sem consentimento e cobranças indevidas ao usuário.', solution: 'Compliance total', solutionDesc: 'Double opt-in obrigatório, marketplace transparente, aprovação do operador.', pills: ['Double opt-in', 'Marketplace', 'Aprovação operador'] },
      ],
    },
    platform: {
      tag: 'Plataforma', title: 'Não somos senders. ', titleHighlight: 'Otimizamos cada impressão.', subtitle: 'Campaign Manager Mobile Programmatic',
      steps: [{ title: 'Produtos', desc: 'O Operador define comunicação e CTA através de templates e fluxos automatizados' }, { title: 'Audiência', desc: 'Selecione a audiência por fonte de dados interna ou externa' }, { title: 'Estratégia', desc: '4 modos de otimização automática para maximizar resultados' }],
      modesTitle: 'Modos de otimização',
      modes: [{ name: 'Performance', desc: 'Alocação por taxa de conversão' }, { name: 'The Best One', desc: 'Para o melhor produto' }, { name: 'Above X%', desc: 'Apenas acima do mínimo de conversão' }, { name: 'Revenue Driven', desc: 'Por receita potencial' }],
      toolsTitle: 'Ferramentas de performance',
      tools: ['Apenas usuários compatíveis (detecção RCS/SAT)', 'Largura de banda autodimensionável', 'A/B testing de criativos', 'Segundas ações e limites por campanha', 'Retentativas automáticas'],
    },
    differentiators: {
      tag: 'Diferenciais', title: 'Diferenciais da ', titleHighlight: 'nossa solução',
      items: [{ title: 'Solução autoescalável', desc: '100% cloud SaaS' }, { title: 'Especialistas ao seu serviço', desc: 'Presentes dia a dia' }, { title: 'Sem custos de HW/SW', desc: 'Baixos custos de manutenção' }, { title: 'Analytics aumentadas', desc: 'Resultados detalhados' }, { title: 'Desenvolvimento e integrações', desc: 'Software factory sob medida' }, { title: 'Campaign Manager inteligente', desc: 'Mobile programmatic' }, { title: 'Geramos novas receitas', desc: 'Inventário com marcas/CPs' }, { title: 'Implementação rápida', desc: 'SAT Push 48h, RCS 2 semanas' }],
    },
    ota: { tag: 'Tecnologia OTA', title: 'Applet proprietário + ', titleHighlight: 'OTA Cloud', points: ['Applet desenvolvido internamente', 'Instalação OTA sem trocar SIM', 'Compatível com todos os fornecedores SIM + eSIM', 'Criptografia na nuvem do Operador'], link: 'Ver tecnologia OTA em detalhe' },
    analytics: { tag: 'Analytics', title: 'Analytics em ', titleHighlight: 'tempo real', operatorDash: 'Dashboard Operador', operatorDesc: 'Todas as variáveis do negócio por anunciante, produto, canal, receita', advertiserDash: 'Dashboard Anunciante', advertiserDesc: 'Apenas KPIs das suas campanhas', quote: 'Quanto maior a transparência nos KPIs, maior o nível de investimento publicitário e maior a confiança' },
    results: { tag: 'Resultados', title: 'Resultados ', titleHighlight: 'comprovados', cases: [{ operator: 'Operador — África do Sul', desc: 'Receita gerada com SAT Push em um único operador' }, { operator: 'Operador Tier 1 — LATAM', desc: 'Taxa de conversão média em campanhas de upsell' }, { operator: 'Operador — África Ocidental', desc: 'CTR em campanhas de aquisição de dados' }], link: 'Ver todos os casos de sucesso' },
    cta: { title: 'Ative ', titleHighlight: 'SAT Push', subtitle: 'Agende uma demo e descubra como o canal mais eficaz do mercado pode transformar sua operação.', ctaPrimary: 'Agendar Demo', ctaSecondary: 'Calcular ROI', ctaTertiary: 'Ver tecnologia OTA', trust: '+20 Telcos já usam SAT Push com DYNAMO' },
  },
};

/* ═══════════════════════════════════════════
   SHARED: PHONE MOCKUP COMPONENTS
   ═══════════════════════════════════════════ */

function MiniPhone({
  children,
  label,
  active = false,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <div
        className={`relative w-[170px] sm:w-[180px] transition-all duration-500 ${
          active ? 'scale-105' : 'scale-100'
        }`}
      >
        <div className="bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] rounded-[1.8rem] p-1.5 shadow-xl shadow-black/50 border border-white/[0.06]">
          <div className="bg-[#0a0a0f] rounded-[1.4rem] overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-3 py-1.5 text-[7px] text-white/40">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-1.5 rounded-[1px] border border-white/20 relative">
                  <div className="absolute inset-[1px] bg-lime/50 rounded-[0.5px]" />
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="px-2 pb-1.5 min-h-[180px]">{children}</div>
            {/* Home bar */}
            <div className="h-4 flex items-center justify-center">
              <div className="w-10 h-0.5 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
        {active && (
          <div className="absolute -inset-4 bg-lime/[0.04] rounded-[2.5rem] blur-xl -z-10" />
        )}
      </div>
      <span
        className={`text-xs font-medium transition-colors ${
          active ? 'text-lime' : 'text-white/40'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function PhoneMockup({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-[280px] sm:w-[300px] ${className}`}>
      <div className="relative bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] rounded-[2.8rem] p-3 shadow-2xl shadow-black/60 border border-white/[0.08]">
        <div className="bg-[#0a0a0f] rounded-[2.2rem] overflow-hidden">
          {/* Notch */}
          <div className="flex justify-center pt-2 pb-0.5">
            <div className="w-16 h-4 bg-[#1a1a1e] rounded-full" />
          </div>
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 py-1.5 text-[10px] text-white/50">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="w-5 h-2.5 rounded-sm border border-white/30 relative">
                <div className="absolute inset-0.5 bg-lime/60 rounded-[1px]" />
              </div>
            </div>
          </div>
          {/* Screen */}
          <div className="px-4 pb-3 min-h-[320px]">{children}</div>
          {/* Home bar */}
          <div className="h-6 flex items-center justify-center">
            <div className="w-20 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
      <div className="absolute -inset-8 bg-lime/[0.04] rounded-[4rem] blur-3xl -z-10" />
    </div>
  );
}

/* SAT Push dialog */
function SatDialog({
  carrier = 'OPERADOR MÓVIL',
  message,
  buttons,
  small = false,
}: {
  carrier?: string;
  message: string;
  buttons: { label: string; primary?: boolean }[];
  small?: boolean;
}) {
  const sz = small ? 'text-[8px]' : 'text-[10px]';
  return (
    <div className="relative">
      <div className="bg-[#1a1a20] rounded-lg p-2 opacity-30 mb-2">
        <div className="h-1.5 w-3/4 bg-white/10 rounded mb-1.5" />
        <div className="h-1.5 w-1/2 bg-white/10 rounded" />
      </div>
      <div className="bg-[#2d2d35] border border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/30">
        <div className="bg-[#3a3a45] px-3 py-1.5 border-b border-white/5">
          <p className={`text-white/90 ${small ? 'text-[7px]' : 'text-[9px]'} font-bold tracking-wide uppercase`}>
            {carrier}
          </p>
        </div>
        <div className="px-3 py-2">
          <p className={`text-white/80 ${sz} leading-relaxed`}>{message}</p>
        </div>
        <div className="flex border-t border-white/10">
          {buttons.map((btn, i) => (
            <span
              key={btn.label}
              className={`flex-1 py-2 ${sz} font-semibold text-center ${
                i > 0 ? 'border-l border-white/10' : ''
              } ${btn.primary ? 'text-lime bg-lime/10' : 'text-white/40'}`}
            >
              {btn.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Menu dialog */
function SatMenu({
  carrier = 'OPERADOR MÓVIL',
  title,
  items,
  small = false,
  cancelLabel = 'Cancelar',
  selectLabel = 'Seleccionar',
}: {
  carrier?: string;
  title: string;
  items: string[];
  small?: boolean;
  cancelLabel?: string;
  selectLabel?: string;
}) {
  const sz = small ? 'text-[7px]' : 'text-[9px]';
  return (
    <div className="bg-[#2d2d35] border border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/30">
      <div className="bg-[#3a3a45] px-3 py-1.5 border-b border-white/5">
        <p className={`text-white/90 ${small ? 'text-[7px]' : 'text-[9px]'} font-bold tracking-wide uppercase`}>
          {carrier}
        </p>
      </div>
      <div className="px-3 py-2">
        <p className={`text-white/80 ${sz} font-medium mb-1.5`}>{title}</p>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 py-1.5 border-b border-white/5 last:border-0">
            <span className={`text-lime ${sz} font-bold w-3`}>{i + 1}.</span>
            <span className={`text-white/70 ${sz}`}>{item}</span>
          </div>
        ))}
      </div>
      <div className="flex border-t border-white/10">
        <span className={`flex-1 py-2 ${sz} font-semibold text-white/40 text-center`}>{cancelLabel}</span>
        <span className={`flex-1 py-2 ${sz} font-semibold text-lime bg-lime/10 text-center border-l border-white/10`}>{selectLabel}</span>
      </div>
    </div>
  );
}

/* Get Input dialog */
function SatInput({
  carrier = 'OPERADOR MÓVIL',
  title,
  tags,
  small = false,
  cancelLabel = 'Cancelar',
  sendLabel = 'Enviar',
  placeholder = 'Escriba aquí...',
}: {
  carrier?: string;
  title: string;
  tags: string[];
  small?: boolean;
  cancelLabel?: string;
  sendLabel?: string;
  placeholder?: string;
}) {
  const sz = small ? 'text-[7px]' : 'text-[9px]';
  return (
    <div className="bg-[#2d2d35] border border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/30">
      <div className="bg-[#3a3a45] px-3 py-1.5 border-b border-white/5">
        <p className={`text-white/90 ${small ? 'text-[7px]' : 'text-[9px]'} font-bold tracking-wide uppercase`}>
          {carrier}
        </p>
      </div>
      <div className="px-3 py-2">
        <p className={`text-white/80 ${sz} font-medium mb-2`}>{title}</p>
        <div className="bg-[#1a1a20] rounded-lg px-2 py-1.5 border border-white/5 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-0.5 h-2.5 bg-lime animate-pulse" />
            <span className="text-white/25 text-[7px]">{placeholder}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="bg-lime/10 text-lime text-[7px] font-medium px-1.5 py-0.5 rounded-full border border-lime/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex border-t border-white/10">
        <span className={`flex-1 py-2 ${sz} font-semibold text-white/40 text-center`}>{cancelLabel}</span>
        <span className={`flex-1 py-2 ${sz} font-semibold text-lime bg-lime/10 text-center border-l border-white/10`}>{sendLabel}</span>
      </div>
    </div>
  );
}

/* Animated counter */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display % 1 === 0 ? Math.floor(display) : display.toFixed(1)}
      {suffix}
    </span>
  );
}

/* Section wrapper */
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/20 rounded-full px-4 py-1.5 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-lime" />
      <span className="text-lime text-xs font-medium tracking-wide uppercase">{children}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1: JOURNEY SHOWCASE
   ═══════════════════════════════════════════ */

/* journeySteps are now built dynamically inside JourneyShowcase */

export function JourneyShowcase() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const journeySteps = [
    {
      label: t.journey.steps[0].label,
      content: (<SatDialog small message={t.journey.steps[0].message!} buttons={[{ label: t.ui.cancel }, { label: 'OK', primary: true }]} carrier={t.ui.mobileCarrier} />),
    },
    {
      label: t.journey.steps[1].label,
      content: (<SatInput small title={t.journey.steps[1].title!} tags={[]} carrier={t.ui.mobileCarrier} cancelLabel={t.ui.cancel} sendLabel={t.ui.send} placeholder={t.ui.typeHere} />),
    },
    {
      label: t.journey.steps[2].label,
      content: (<SatMenu small title={t.journey.steps[2].title!} items={['Travel', 'Sports', 'Music', 'Shopping', 'Technology']} carrier={t.ui.mobileCarrier} cancelLabel={t.ui.cancel} selectLabel={t.ui.select} />),
    },
    {
      label: t.journey.steps[3].label,
      content: (<SatMenu small title={t.journey.steps[3].title!} items={['18-25', '26-35', '36-45', '46-55', '56+']} carrier={t.ui.mobileCarrier} cancelLabel={t.ui.cancel} selectLabel={t.ui.select} />),
    },
    {
      label: t.journey.steps[4].label,
      content: (<SatDialog small message={t.journey.steps[4].message!} buttons={[{ label: t.ui.cancel }, { label: 'OK', primary: true }]} carrier={t.ui.mobileCarrier} />),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.journey.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.journey.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.journey.titleHighlight}
              </span>
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
              {t.journey.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* Phones row — scrollable on mobile */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-2 sm:gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory lg:overflow-visible lg:justify-center"
          >
            {journeySteps.map((step, i) => (
              <div key={step.label} className="snap-center relative">
                <motion.div
                  animate={{ y: activeIdx === i ? -8 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <MiniPhone label={step.label} active={activeIdx === i}>
                    {step.content}
                  </MiniPhone>
                </motion.div>

                {/* Connecting cable */}
                {i < 4 && (
                  <div className="hidden lg:block absolute top-[50%] -right-3 w-6 h-px">
                    <div className="absolute inset-0 bg-gradient-to-r from-lime/30 to-lime/10" />
                    {/* Traveling dot */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 rounded-full bg-lime shadow-lg shadow-lime/50"
                      style={{ top: '-2.5px' }}
                      animate={{ x: [0, 24, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step indicators for mobile */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {journeySteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIdx === i ? 'bg-lime w-6' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2: FORMATS SECTION
   ═══════════════════════════════════════════ */

const formatTabs = [
  { id: 'display', label: 'Display' },
  { id: 'menu', label: 'Menú' },
  { id: 'input', label: 'Get Input' },
] as const;
type FormatTab = (typeof formatTabs)[number]['id'];

const capabilityIcons = [Layers, Smartphone, Repeat, Crosshair];
const capabilityPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export function FormatsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const [activeFormat, setActiveFormat] = useState<FormatTab>('display');

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.formats.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.formats.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.formats.titleHighlight}
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="relative flex flex-col items-center">
          {/* Capability cards — positioned around on lg */}
          <div className="hidden lg:block absolute inset-0">
            {t.formats.cards.map((card, idx) => {
              const Icon = capabilityIcons[idx];
              const pos = capabilityPositions[idx];
              const posClass =
                pos === 'top-left' ? 'top-8 left-0' :
                pos === 'top-right' ? 'top-8 right-0' :
                pos === 'bottom-left' ? 'bottom-8 left-0' :
                'bottom-8 right-0';
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`absolute ${posClass} w-[240px] bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 backdrop-blur-sm hover:border-lime/20 transition-all duration-300`}
                >
                  <Icon className="w-5 h-5 text-lime/70 mb-2" />
                  <h4 className="text-white text-sm font-semibold">{card.title}</h4>
                  <p className="text-white/60 text-xs mt-1">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Center phone */}
          <PhoneMockup>
            <AnimatePresence mode="wait">
              {activeFormat === 'display' && (
                <motion.div
                  key="display"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <SatDialog
                    carrier={t.ui.mobileCarrier}
                    message={t.formats.displayMsg}
                    buttons={[{ label: t.ui.cancel }, { label: 'OK', primary: true }]}
                  />
                </motion.div>
              )}
              {activeFormat === 'menu' && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <SatMenu
                    carrier={t.ui.mobileCarrier}
                    title={t.formats.menuTitle}
                    items={t.formats.menuItems}
                    cancelLabel={t.ui.cancel}
                    selectLabel={t.ui.select}
                  />
                </motion.div>
              )}
              {activeFormat === 'input' && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <SatInput
                    carrier={t.ui.mobileCarrier}
                    title={t.formats.inputTitle}
                    tags={t.formats.inputTags}
                    cancelLabel={t.ui.cancel}
                    sendLabel={t.ui.send}
                    placeholder={t.ui.typeHere}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </PhoneMockup>

          {/* Format tabs */}
          <div className="mt-8 inline-flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-1">
            {formatTabs.map((tab) => {
              const isActive = activeFormat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFormat(tab.id)}
                  className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-deep' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="formatTab"
                      className="absolute inset-0 bg-lime rounded-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Capability cards on mobile */}
          <div className="grid grid-cols-2 gap-3 mt-10 lg:hidden">
            {t.formats.cards.map((card, idx) => {
              const Icon = capabilityIcons[idx];
              return (
                <div key={card.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <Icon className="w-5 h-5 text-lime/70 mb-2" />
                  <h4 className="text-white text-sm font-semibold">{card.title}</h4>
                  <p className="text-white/60 text-xs mt-1">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3: MEDIA KIT (USE CASES)
   ═══════════════════════════════════════════ */

type UseCaseCard = {
  title: string;
  description: string;
  icon: typeof Phone;
  ctaType: 'Click to Call' | 'Click to Web' | 'USSD' | 'Click to SMS' | 'Get Input';
};

const ctaBadgeColors: Record<string, string> = {
  'Click to Call': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  'Click to Web': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  'Click to SMS': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  USSD: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  'Get Input': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
};

const mediaKitTabsMeta = [
  { key: 'core', icon: Cpu },
  { key: 'brands', icon: Tag },
  { key: 'vas', icon: Package },
  { key: 'engagement', icon: Users },
  { key: 'multimedia', icon: Tv },
] as const;

const mediaKitData: Record<string, UseCaseCard[]> = {
  core: [
    { title: 'Drive to Call', description: 'Dirigir clientes deudores a llamar al centro de atención', icon: PhoneCall, ctaType: 'Click to Call' },
    { title: 'Drive to Web', description: 'Enviar teaser con intereses del usuario para generar tráfico web', icon: Globe, ctaType: 'Click to Web' },
    { title: 'Notificaciones', description: 'Derivar al menú SIM Toolkit para aumentar tráfico', icon: Bell, ctaType: 'USSD' },
    { title: 'Venta cruzada', description: 'Notificaciones personalizadas con oferta extra como segunda acción', icon: ShoppingCart, ctaType: 'Click to SMS' },
    { title: 'Nuevo teléfono/SIM', description: 'Reducir churn con campañas de retención proactiva', icon: Smartphone, ctaType: 'Click to Call' },
    { title: 'Seguro de teléfono', description: 'Seguros, opciones smartphone, try & buy de datos', icon: Shield, ctaType: 'Click to Web' },
    { title: 'Minutos internacionales', description: 'Generar revenue constante de tráfico internacional', icon: Globe, ctaType: 'Click to SMS' },
    { title: 'Cuota de datos alcanzada', description: 'Vender paquete extra de datos one-shot o plan mayor', icon: Wifi, ctaType: 'Click to SMS' },
    { title: 'Opciones de roaming', description: 'Vender opciones de roaming según país de destino', icon: Signal, ctaType: 'Click to Web' },
  ],
  brands: [
    { title: 'Confirmación de cita', description: 'Confirmar turnos y recordatorios', icon: CheckCircle2, ctaType: 'Click to SMS' },
    { title: 'Seguimiento de pago', description: 'Recordar vencimientos de pagos', icon: CreditCard, ctaType: 'Click to Call' },
    { title: 'Registro', description: 'Confirmar registros y suscripciones', icon: UserPlus, ctaType: 'Click to SMS' },
    { title: 'Alerta de oferta', description: 'Enviar promociones y cupones', icon: Tag, ctaType: 'Click to Web' },
    { title: 'Call back', description: 'Solicitar que el usuario devuelva la llamada', icon: PhoneCall, ctaType: 'Click to Call' },
  ],
  vas: [
    { title: 'Double opt-in', description: 'Adquisición de usuarios con doble confirmación', icon: CheckCircle2, ctaType: 'Click to SMS' },
    { title: 'Single opt-in + menú', description: 'Activación con menú de opciones', icon: Menu, ctaType: 'Click to SMS' },
    { title: 'Cupones y promociones', description: 'Ofrecer descuentos por categoría', icon: Ticket, ctaType: 'Click to Web' },
    { title: 'Descarga de apps', description: 'Dirigir a descarga en Android Market', icon: Download, ctaType: 'Click to Web' },
  ],
  engagement: [
    { title: 'Encuestas', description: 'Perfilamiento de usuarios con preguntas interactivas', icon: BarChart3, ctaType: 'Get Input' },
    { title: 'Trivias', description: 'Juegos y entretenimiento para TV shows', icon: Gamepad2, ctaType: 'Click to SMS' },
    { title: 'Segmentación y venta', description: 'Perfilar + ofrecer contenido personalizado', icon: Target, ctaType: 'Click to SMS' },
    { title: 'Concursos', description: 'Promociones interactivas con premios', icon: Trophy, ctaType: 'Click to Web' },
  ],
  multimedia: [
    { title: 'Branding', description: 'Impresiones y tráfico de alta calidad', icon: Megaphone, ctaType: 'Click to Web' },
    { title: 'Core', description: 'Landing pages de adquisición', icon: Layers, ctaType: 'Click to Web' },
    { title: 'Valor agregado', description: 'Activaciones de servicios VAS', icon: Zap, ctaType: 'Click to SMS' },
    { title: 'Descarga de apps', description: 'Descarga directa de aplicaciones', icon: Download, ctaType: 'Click to Web' },
  ],
};

const availableCTAs = [
  { label: 'SMS', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  { label: 'Llamada', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
  { label: 'USSD', color: 'bg-purple-500/15 text-purple-400 border-purple-500/20' },
  { label: 'Web', color: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
  { label: 'Descarga de Apps', color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20' },
];

export function MediaKitSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const [activeTab, setActiveTab] = useState<string>('core');
  const origItems = mediaKitData[activeTab] || [];
  const localizedUC = t.mediaKit.useCases[activeTab] || [];
  const items = origItems.map((uc, idx) => ({ ...uc, title: localizedUC[idx]?.title || uc.title, description: localizedUC[idx]?.description || uc.description }));

  return (
    <section id="media-kit" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-14">
            <SectionTag>{t.mediaKit.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.mediaKit.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.mediaKit.titleHighlight}
              </span>
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
              {t.mediaKit.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* Tabs */}
        <RevealOnScroll>
          <div className="mb-10 relative flex overflow-x-auto pb-1 scrollbar-hide">
            <div className="inline-flex items-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1.5 mx-auto">
              {mediaKitTabsMeta.map((tab, tabIdx) => {
                const isActive = activeTab === tab.key;
                const TabIcon = tab.icon;
                const tabLabel = t.mediaKit.tabs[tabIdx]?.label || tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive ? 'text-deep' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mkTabPill"
                        className="absolute inset-0 bg-lime rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <TabIcon className="w-4 h-4" />
                      {tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {items.map((uc, i) => {
              const Icon = uc.icon;
              const badgeColor = ctaBadgeColors[uc.ctaType] || 'bg-white/10 text-white/60 border-white/10';
              return (
                <motion.div
                  key={uc.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 hover:border-lime/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-lime/[0.08] flex items-center justify-center shrink-0 group-hover:bg-lime/15 transition-colors">
                      <Icon className="w-5 h-5 text-lime/70 group-hover:text-lime transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm">{uc.title}</h4>
                      <p className="text-white/60 text-xs mt-1.5 leading-relaxed">{uc.description}</p>
                      <span className={`inline-block mt-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {uc.ctaType}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <RevealOnScroll>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.mediaKit.stats.map((stat) => (
              <div key={stat.label} className="text-center py-5 px-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <div className="text-2xl font-heading font-bold text-lime">{stat.value}</div>
                <div className="text-white/60 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* CTAs strip */}
        <RevealOnScroll>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-white/50 text-xs uppercase tracking-wider mr-2">{t.mediaKit.ctasLabel}</span>
            {availableCTAs.map((cta, ctaIdx) => (
              <span key={cta.label} className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${cta.color}`}>
                {cta.label}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4: OBJECTIONS
   ═══════════════════════════════════════════ */

const objections = [
  {
    problem: 'Es invasivo',
    problemDesc: 'Mensajes sin control de frecuencia ni segmentación que molestan al usuario.',
    solution: 'Windowing inteligente',
    solutionDesc: 'Frecuencia controlada, segmentación AI, ventanas de entrega optimizadas.',
    pills: ['Windowing', 'Frecuencia controlada', 'Segmentación AI'],
  },
  {
    problem: 'Generaba reclamos',
    problemDesc: 'Sin control de spam ni listas de exclusión, el usuario quedaba atrapado.',
    solution: 'Anti-spam nativo',
    solutionDesc: 'Blacklists automáticas, índice de repetición y opt-out garantizado.',
    pills: ['Blacklists', 'Índice repetición', 'Opt-out'],
  },
  {
    problem: 'Había fraude VAS',
    problemDesc: 'Suscripciones sin consentimiento y cobros indebidos al usuario.',
    solution: 'Compliance total',
    solutionDesc: 'Double opt-in obligatorio, marketplace transparente, aprobación del operador.',
    pills: ['Double opt-in', 'Marketplace', 'Aprobación operador'],
  },
];

export function ObjectionsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.objections.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.objections.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.objections.titleHighlight}
              </span>
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
              {t.objections.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.objections.items.map((obj, i) => (
            <RevealOnScroll key={obj.problem} delay={i * 0.1}>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-lime/20 transition-all duration-300 group">
                {/* Problem (top) */}
                <div className="p-6 border-b border-white/[0.06] bg-red-500/[0.03]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">{t.ui.before}</span>
                  </div>
                  <h4 className="text-white font-heading font-bold text-lg">&ldquo;{obj.problem}&rdquo;</h4>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">{obj.problemDesc}</p>
                </div>

                {/* Solution (bottom) */}
                <div className="p-6 bg-lime/[0.02]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-lime" />
                    </div>
                    <span className="text-lime text-xs font-semibold uppercase tracking-wider">{t.ui.withDynamo}</span>
                  </div>
                  <h4 className="text-white font-heading font-bold text-lg">{obj.solution}</h4>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">{obj.solutionDesc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {obj.pills.map((pill) => (
                      <span key={pill} className="bg-lime/10 text-lime text-[10px] font-semibold px-3 py-1 rounded-full border border-lime/20">
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5: PLATFORM (CAMPAIGN MANAGER)
   ═══════════════════════════════════════════ */

const strategyIcons = [TrendingUp, Award, BarChart3, DollarSign];
const perfToolIcons = [Smartphone, Activity, FlaskConical, SlidersHorizontal, RotateCcw];
const platformStepIcons = [Package, Users, Target];

export function PlatformSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/[0.01] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.platform.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.platform.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.platform.titleHighlight}
              </span>
            </h2>
            <p className="text-white/60 text-lg mt-4">{t.platform.subtitle}</p>
          </div>
        </RevealOnScroll>

        {/* Platform window frame */}
        <RevealOnScroll>
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/30 text-xs ml-3 font-mono">campaign-manager.dynamo.com</span>
            </div>

            <div className="p-6 lg:p-10">
              {/* 3-step flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {t.platform.steps.map((s, i) => {
                const stepNum = `0${i + 1}`;
                const StepIcon = platformStepIcons[i];
                return (
                  <div key={stepNum} className="relative">
                    {i > 0 && (
                      <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2">
                        <ArrowRight className="w-5 h-5 text-lime/30" />
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-lime/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-lime/30 text-3xl font-heading font-black">{stepNum}</span>
                        <StepIcon className="w-5 h-5 text-lime/60" />
                      </div>
                      <h4 className="text-white font-heading font-bold text-lg">{s.title}</h4>
                      <p className="text-white/60 text-sm mt-2 leading-relaxed">{s.desc}</p>
                    </motion.div>
                  </div>
                );
                })}
              </div>

              {/* Strategy modes */}
              <div className="mb-10">
                <h3 className="text-white font-heading font-semibold text-lg mb-5 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-lime" />
                  {t.platform.modesTitle}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {t.platform.modes.map((s, si) => {
                    const Icon = strategyIcons[si];
                    return (
                      <div key={s.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center hover:border-lime/20 transition-colors">
                        <Icon className="w-5 h-5 text-lime/60 mx-auto mb-2" />
                        <p className="text-white text-sm font-semibold">{s.name}</p>
                        <p className="text-white/35 text-[10px] mt-1">{s.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Performance tools */}
              <h3 className="text-white font-heading font-semibold text-lg mb-5 flex items-center gap-2">
                <Settings className="w-5 h-5 text-lime" />
                {t.platform.toolsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {t.platform.tools.map((toolText, ti) => {
                  const Icon = perfToolIcons[ti];
                  return (
                    <div key={toolText} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                      <Icon className="w-4 h-4 text-lime/60 shrink-0 mt-0.5" />
                      <span className="text-white/60 text-xs leading-relaxed">{toolText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6: DIFFERENTIATORS
   ═══════════════════════════════════════════ */

const diffIcons = [Cloud, Users, DollarSign, BarChart3, Code, Zap, TrendingUp, Rocket];

export function DifferentiatorsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.differentiators.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.differentiators.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.differentiators.titleHighlight}
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.differentiators.items.map((d, i) => {
            const Icon = diffIcons[i];
            return (
              <RevealOnScroll key={d.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(205,255,0,0.25)' }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center group transition-all duration-300 hover:bg-white/[0.05]"
                >
                  <div className="w-12 h-12 rounded-xl bg-lime/[0.08] flex items-center justify-center mx-auto mb-4 group-hover:bg-lime/15 transition-colors">
                    <Icon className="w-6 h-6 text-lime/60 group-hover:text-lime transition-colors" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">{d.title}</h4>
                  <p className="text-white/35 text-xs mt-1.5">{d.desc}</p>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7: OTA SECTION
   ═══════════════════════════════════════════ */

const otaIcons = [Cpu, Cloud, Smartphone, Lock];

export function OTASection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.04] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.ota.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.ota.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.ota.titleHighlight}
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — 3D SIM visual */}
          <RevealOnScroll>
            <div className="flex justify-center">
              <div className="relative w-[300px] h-[340px]">
                {/* Cloud icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center shadow-lg shadow-lime/10">
                    <Cloud className="w-10 h-10 text-lime/70" />
                  </div>
                  <span className="text-lime/60 text-xs font-semibold mt-2">OTA Cloud</span>
                </motion.div>

                {/* Beam (dashed line with traveling dots) */}
                <div className="absolute top-[110px] left-1/2 -translate-x-1/2 w-px h-[80px]">
                  <div className="w-full h-full border-l-2 border-dashed border-lime/20" />
                  <motion.div
                    className="absolute left-[-3px] w-2 h-2 rounded-full bg-lime shadow-lg shadow-lime/50"
                    animate={{ y: [0, 80] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute left-[-3px] w-2 h-2 rounded-full bg-lime shadow-lg shadow-lime/50"
                    animate={{ y: [0, 80] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
                  />
                </div>

                {/* SIM Card */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                >
                  <div className="relative w-[140px] h-[100px] rounded-2xl bg-gradient-to-br from-[#2a2a35] to-[#15151e] border border-white/10 shadow-2xl overflow-hidden">
                    {/* Gold chip */}
                    <div className="absolute top-3 left-3 w-[50px] h-[38px] rounded-lg bg-gradient-to-br from-amber-300/80 to-amber-600/60 border border-amber-400/30">
                      <div className="absolute inset-1 grid grid-cols-2 gap-px">
                        <div className="bg-amber-400/30 rounded-sm" />
                        <div className="bg-amber-400/20 rounded-sm" />
                        <div className="bg-amber-400/20 rounded-sm" />
                        <div className="bg-amber-400/30 rounded-sm" />
                      </div>
                    </div>
                    {/* Labels */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-lime text-[8px] font-bold tracking-wider">DYNAMO</p>
                      <p className="text-white/30 text-[7px] font-mono mt-0.5">ad-engine v4.2</p>
                    </div>
                    {/* Glow on receive */}
                    <motion.div
                      className="absolute inset-0 bg-lime/[0.08] rounded-2xl"
                      animate={{ opacity: [0, 0.15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — Points */}
          <div className="space-y-4">
            {t.ota.points.map((pointText, i) => {
              const Icon = otaIcons[i];
              return (
                <RevealOnScroll key={pointText} delay={i * 0.1}>
                  <div className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-lime/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-lime/[0.08] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-lime/70" />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed pt-2">{pointText}</p>
                  </div>
                </RevealOnScroll>
              );
            })}

            <RevealOnScroll delay={0.4}>
              <Link
                href="/ota-sim"
                className="inline-flex items-center gap-2 text-lime text-sm font-medium hover:underline mt-4"
              >
                {t.ota.link}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8: ANALYTICS
   ═══════════════════════════════════════════ */

export function AnalyticsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.analytics.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.analytics.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.analytics.titleHighlight}
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Dashboard mock in platform frame */}
        <RevealOnScroll>
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/30 text-xs ml-3 font-mono">analytics.dynamo.com</span>
            </div>

            <div className="p-6 lg:p-8">
              {/* Two dashboards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Operator dashboard */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="w-5 h-5 text-lime/60" />
                    <h4 className="text-white font-semibold text-sm">{t.analytics.operatorDash}</h4>
                  </div>
                  <p className="text-white/60 text-xs mb-4">{t.analytics.operatorDesc}</p>
                  {/* Mock charts */}
                  <div className="space-y-3">
                    <div className="flex items-end gap-1 h-16">
                      {[40, 60, 35, 80, 65, 90, 55, 75, 85, 50, 70, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className="flex-1 rounded-t bg-gradient-to-t from-lime/20 to-lime/40"
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['Revenue', 'CTR', 'Conv.'].map((label) => (
                        <div key={label} className="bg-white/[0.03] rounded-lg p-2 text-center">
                          <span className="text-lime text-xs font-bold">{label === 'Revenue' ? '$142K' : label === 'CTR' ? '8.3%' : '22%'}</span>
                          <p className="text-white/30 text-[8px] mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advertiser dashboard */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-purple-400/60" />
                    <h4 className="text-white font-semibold text-sm">{t.analytics.advertiserDash}</h4>
                  </div>
                  <p className="text-white/60 text-xs mb-4">{t.analytics.advertiserDesc}</p>
                  {/* Mock pie + table */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative w-16 h-16">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" stroke="rgba(255,255,255,0.05)" />
                        <motion.circle
                          cx="18" cy="18" r="15" fill="none" strokeWidth="3" stroke="#cdff00"
                          strokeDasharray="94" strokeDashoffset="94"
                          whileInView={{ strokeDashoffset: 30 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lime text-[10px] font-bold">68%</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      {['Enviados: 1.2M', 'Entregados: 1.1M', 'Convertidos: 245K'].map((r) => (
                        <div key={r} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-lime/50" />
                          <span className="text-white/50 text-[10px]">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Mini table */}
                  <div className="bg-white/[0.02] rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 gap-px text-[8px] font-semibold text-white/30 p-2 border-b border-white/5">
                      <span>Campaña</span><span>Envíos</span><span>Conv.</span><span>Revenue</span>
                    </div>
                    {[
                      ['Data Pack', '450K', '22%', '$32K'],
                      ['VIP Club', '320K', '18%', '$28K'],
                      ['Roaming', '180K', '12%', '$15K'],
                    ].map((row) => (
                      <div key={row[0]} className="grid grid-cols-4 gap-px text-[8px] text-white/50 p-2 border-b border-white/[0.03]">
                        {row.map((cell, ci) => (
                          <span key={ci} className={ci === 2 ? 'text-lime' : ''}>{cell}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="flex items-start gap-4 bg-lime/[0.03] border border-lime/10 rounded-xl p-6">
                <Quote className="w-8 h-8 text-lime/30 shrink-0" />
                <p className="text-white/60 text-sm italic leading-relaxed">
                  &ldquo;{t.analytics.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 9: RESULTS
   ═══════════════════════════════════════════ */

const resultsMeta = [
  { metric: 2, suffix: 'M+', prefix: 'USD ', color: 'from-amber-400 to-amber-600', borderColor: 'border-amber-500/20', bgColor: 'bg-amber-500/[0.03]', textColor: 'text-amber-400' },
  { metric: 22, suffix: '%', prefix: '', color: 'from-purple-400 to-purple-600', borderColor: 'border-purple-500/20', bgColor: 'bg-purple-500/[0.03]', textColor: 'text-purple-400' },
  { metric: 8.3, suffix: '%', prefix: '', color: 'from-lime to-lime-dark', borderColor: 'border-lime/20', bgColor: 'bg-lime/[0.03]', textColor: 'text-lime' },
];

export function ResultsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionTag>{t.results.tag}</SectionTag>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.results.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.results.titleHighlight}
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resultsMeta.map((r, i) => {
            const rc = t.results.cases[i];
            return (
            <RevealOnScroll key={rc.operator} delay={i * 0.1}>
              <div className={`${r.bgColor} border ${r.borderColor} rounded-2xl p-8 text-center hover:scale-[1.02] transition-transform duration-300`}>
                <span className={`text-xs font-semibold uppercase tracking-wider ${r.textColor}`}>{rc.operator}</span>
                <div className="mt-4">
                  <span className={`text-5xl md:text-6xl font-heading font-black bg-gradient-to-r ${r.color} bg-clip-text text-transparent`}>
                    {r.prefix}
                    <AnimatedCounter value={r.metric} suffix={r.suffix} />
                  </span>
                </div>
                <p className="text-white/60 text-sm mt-4 leading-relaxed">{rc.desc}</p>
              </div>
            </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/casos-de-exito`}
              className="inline-flex items-center gap-2 text-lime text-sm font-medium hover:underline"
            >
              {t.results.link}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 10: CTA
   ═══════════════════════════════════════════ */

export function SatPushCTA() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <RevealOnScroll>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              {t.cta.title}
              <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
                {t.cta.titleHighlight}
              </span>
              {locale === 'es' ? ' en tu red' : locale === 'en' ? ' on your network' : locale === 'fr' ? ' sur votre réseau' : ' na sua rede'}
            </h2>
            <p className="text-white/60 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              {t.cta.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-deep px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(205,255,0,0.3)]"
              >
                {t.cta.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/roi-calculator`}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                {t.cta.ctaSecondary}
              </Link>
              <Link
                href={`/${locale}/ota-sim`}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                {t.cta.ctaTertiary}
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-12 flex items-center justify-center gap-2 text-white/30">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-lime/20 to-purple-600/20 border-2 border-deep flex items-center justify-center"
                  >
                    <span className="text-[8px] text-white/50 font-bold">{['C', 'M', 'V', 'A', 'T'][i]}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm ml-2">{t.cta.trust}</span>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
