'use client';

import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  MessageSquare,
  Smartphone,
  Mail,
  MessageCircle,
  Radio,
  Hash,
  Camera,
  Send,
  Zap,
  FlaskConical,
  CalendarClock,
  Workflow,
  ShieldCheck,
  Ban,
  ListFilter,
  Users,
  TrendingUp,
  MousePointerClick,
  Target,
  DollarSign,
  ArrowRight,
  Play,
  ChevronRight,
  WifiOff,
  CreditCard,
  ShoppingCart,
  ArrowLeftRight,
  ThumbsDown,
  MapPin,
  Layers,
  Gauge,
  Filter,
  BrainCircuit,
  UserCheck,
  AlertTriangle,
  EyeOff,
  CheckCircle2,
  BarChart3,
  Cpu,
  Globe,
  Phone,
  Star,
  Award,
  Clock,
  Bot,
  Sparkles,
  GitBranch,
  Activity,
  CircleDot,
  Network,
  ArrowUpRight,
  ShieldAlert,
  UserPlus,
  RefreshCcw,
  type LucideIcon,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   I18N DICTIONARY
   ═══════════════════════════════════════════════════════════════════════ */

const i18n: Record<string, {
  problem: { badge: string; title: string; painPoints: { title: string; desc: string }[] };
  solution: {
    badge: string; title: string; desc: string;
    checks: string[];
  };
  builder: {
    badge: string; title: string; subtitle: string;
    colTriggers: string; colAction: string; colConditions: string; colResults: string;
    belowCaption: string; belowCaptionHighlight: string; belowCTA: string;
  };
  channels: {
    badge: string; title: string; desc: string;
    starLabel: string;
    items: { desc: string; example: string }[];
  };
  capabilities: {
    badge: string; title: string; desc: string;
    items: { title: string; desc: string; details: string[] }[];
  };
  triggers: {
    badge: string; title: string; desc: string;
    detectBadge: string; channelBadge: string;
    events: string[];
    rules: string[];
    userProfile: string;
    mockMessages: { title: string; body: string }[];
    delivered: string;
    cancel: string;
  };
  analytics: {
    badge: string; title: string; desc: string;
    dashboardTitle: string;
    funnelTitle: string; channelTitle: string;
  };
  demo: {
    badge: string; title: string; desc: string;
    ctaPrimary: string; ctaSecondary: string;
    footer: string;
  };
  results: {
    badge: string; title: string; desc: string;
    cases: { company: string; metricLabel: string; desc: string }[];
    viewAll: string;
  };
  cta: {
    title: string; desc: string;
    ctaPrimary: string; ctaSecondary: string; ctaTertiary: string;
    trust: string;
  };
  useCases: {
    label: string; titleBar: string;
    triggers: { label: string; sub: string }[];
    channel: { sub: string; message: string };
    conditions: { label: string; sub: string }[];
    results: { label: string; sub: string }[];
  }[];
}> = {
  es: {
    problem: {
      badge: 'El problema',
      title: '¿Te suena familiar?',
      painPoints: [
        { title: 'Canales en silos', desc: 'Cada canal opera con su propia herramienta, sin visión unificada del suscriptor ni coordinación entre equipos.' },
        { title: 'Campañas manuales', desc: 'Tu equipo pasa semanas configurando campañas que deberían tomar minutos. Sin automatización real.' },
        { title: 'Sin visibilidad', desc: 'No sabes qué funciona, qué no, ni puedes medir el impacto real de tus comunicaciones.' },
      ],
    },
    solution: {
      badge: 'Así lo resolvemos',
      title: 'Una sola plataforma para toda tu operación de CVM',
      desc: 'DYNAMO Journeys unifica todos tus canales, automatiza la orquestación con reglas de negocio inteligentes y te da visibilidad completa del funnel — desde el trigger hasta la conversión.',
      checks: [
        '8+ canales orquestados desde un solo lugar',
        'Journeys automatizados con triggers en tiempo real',
        'Analytics de funnel completo con KPIs accionables',
      ],
    },
    builder: {
      badge: 'Journey Builder',
      title: 'Construí journeys visuales en minutos',
      subtitle: 'Arrastrá, conectá y publicá. Así de simple.',
      colTriggers: 'Triggers',
      colAction: 'Acción principal',
      colConditions: 'Condiciones',
      colResults: 'Resultados',
      belowCaption: 'Esto es solo un ejemplo. Con DYNAMO Journeys, tu equipo construye journeys como este',
      belowCaptionHighlight: 'en minutos',
      belowCTA: 'Pruébalo en vivo',
    },
    channels: {
      badge: 'Canales',
      title: '8+ canales orquestados desde un solo lugar',
      desc: 'Cada canal con sus reglas, sus métricas y su lógica de fallback. Orquestados en un solo journey.',
      starLabel: 'Canal estrella',
      items: [
        { desc: 'Notificaciones nativas en la SIM del suscriptor. Sin app, sin internet. El canal con mayor alcance y deliverability del mercado.', example: '"Activa tu pack de 10GB por solo $5/mes. Responde 1 para activar."' },
        { desc: 'Mensajes ricos con botones, listas y carruseles. Ideal para conversaciones interactivas.', example: '"Hola Juan, tu plan vence mañana. Renueva con 20% OFF →"' },
        { desc: 'El futuro del SMS. Carruseles, botones y rich media directamente en la app de mensajes.', example: '[Carrusel] 3 planes con imágenes, precios y botón "Activar"' },
        { desc: 'El canal universal. Llega a todos los dispositivos, sin importar la tecnología.', example: '"DYNAMO: Tu recarga de $10 fue exitosa. Saldo: $15.50"' },
        { desc: 'Comunicaciones detalladas con diseño responsive y tracking completo.', example: 'Newsletter con resumen de consumo mensual y ofertas personalizadas' },
        { desc: 'Respuestas automatizadas y campañas en el DM más usado por los jóvenes.', example: '"¡Hola! Tenemos una oferta exclusiva para ti. Desliza para ver →"' },
        { desc: 'Chatbots y flows automatizados en Facebook Messenger para atención y ventas.', example: '"Tu ticket #4521 fue resuelto. ¿Necesitas algo más?"' },
        { desc: 'Menús interactivos en dispositivos básicos. Perfecto para mercados emergentes.', example: '*123# → 1. Ver saldo → 2. Recargar → 3. Ofertas' },
      ],
    },
    capabilities: {
      badge: 'Plataforma',
      title: '6 capacidades que transforman tu operación',
      desc: 'Todo lo que tu equipo de CVM necesita, integrado en una sola plataforma.',
      items: [
        { title: 'Orquestación completa', desc: 'Coordiná 8+ canales con lógica de prioridad, fallback y timing. Cada suscriptor recibe el mensaje correcto, en el canal correcto, en el momento correcto.', details: ['WhatsApp, SAT Push, RCS, SMS, Email, USSD, Instagram DM, Messenger', 'Fallback automático si el canal primario falla', 'Priorización por costo, deliverability o preferencia del usuario'] },
        { title: 'Estadísticas y KPIs', desc: 'Medí todo el funnel: desde el envío hasta la conversión final. Dashboards en tiempo real con los KPIs que importan.', details: ['Funnel: Intent → Sent → Delivered → Read → Click → Conversion', 'Comparación de performance por canal', 'Exportación a BI y reportes automáticos'] },
        { title: 'Triggers basados en comportamiento', desc: 'Detecta eventos de red, billing y comportamiento en tiempo real. Cada evento se convierte en una oportunidad de engagement.', details: ['Eventos de red: fin de cuota, cambio de zona, roaming', 'Eventos de billing: recarga, vencimiento, mora', 'Eventos de comportamiento: NPS bajo, churn risk, portabilidad'] },
        { title: 'Motor de reglas', desc: 'Controla cuándo, cómo y a quién le envías. Reglas de negocio que protegen la experiencia del suscriptor y el revenue.', details: ['Windowing: horarios permitidos por región y canal', 'Anti-spam: frecuencia máxima por suscriptor', 'Blacklist/Whitelist: control granular de audiencias', 'SDP Billing y bandwidth management'] },
        { title: 'Campaign Manager 4-en-1', desc: 'Cuatro modos en un solo motor: campañas individuales, programáticas, basadas en eventos y journeys completos.', details: ['Single: campañas one-shot a audiencias específicas', 'Programáticas: automatizadas por schedule y reglas', 'Event-based: disparadas por triggers en tiempo real', 'Journeys: flujos multi-step con condiciones y branching'] },
        { title: 'Copilot AI + RTB', desc: 'Inteligencia artificial que optimiza en tiempo real: segmentación predictiva, personalización de contenido y bidding inteligente.', details: ['Segmentación predictiva con machine learning', 'Optimización automática de horario y canal', 'RTB (Real-Time Bidding) para maximizar conversión por costo', 'Generación de contenido personalizado con AI'] },
      ],
    },
    triggers: {
      badge: 'Triggers + Rules',
      title: 'Decisiones inteligentes basadas en comportamiento',
      desc: 'Detectamos eventos en tiempo real desde tu infraestructura y activamos el canal correcto, con las reglas de negocio que definís.',
      detectBadge: 'Detectamos un caso de uso',
      channelBadge: 'Canal / Servicio',
      events: ['Nuevo cliente', 'Fin de cuota de datos', 'Falta de saldo', 'Servicios VAS', 'Compras/Beneficios', 'Llamadas perdidas', 'Perfil de usuario'],
      rules: ['Windowing', 'Blacklist', 'Whitelist', 'Anti-spam'],
      userProfile: 'User Profile + Segmentación AI',
      mockMessages: [
        { title: 'Oferta personalizada', body: '[Carrusel] Pack Premium: 50GB + Spotify. Desliza para ver más ofertas →' },
        { title: 'Notificación SIM', body: '"Tu cuota de datos se agotó. Comprá 5GB por $3. Responde 1 para activar."' },
        { title: 'Mensaje de texto', body: '"DYNAMO: Recargá $10 y recibí 3GB bonus + llamadas ilimitadas por 7 días."' },
      ],
      delivered: 'Entregado',
      cancel: 'Cancelar',
    },
    analytics: {
      badge: 'Analytics',
      title: 'Medí todo el funnel, en tiempo real',
      desc: 'Desde el envío hasta la conversión. Cada paso medido, cada canal comparado.',
      dashboardTitle: 'Analytics Dashboard — Campaign: Migración Q1 2026',
      funnelTitle: 'Funnel de conversión',
      channelTitle: 'Conversión por canal',
    },
    demo: {
      badge: 'Demo interactiva',
      title: 'Experimenta un journey en vivo',
      desc: 'Agenda una demo personalizada con nuestro equipo y recorre la plataforma en vivo.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Descubre tu solución',
      footer: 'Representación simplificada — la demo completa incluye branching, métricas en vivo y más.',
    },
    results: {
      badge: 'Casos de éxito',
      title: 'Resultados reales con Telcos',
      desc: 'Estas son métricas reales de operadores que ya transformaron su operación de CVM con DYNAMO.',
      cases: [
        { company: 'Operador Tier 1 — LATAM', metricLabel: 'conversión promedio', desc: 'Aumento en conversión de campañas de upsell utilizando SAT Push + WhatsApp con journeys automatizados.' },
        { company: 'Operador líder — Chile', metricLabel: 'CTR en campañas', desc: 'Click-through rate sostenido en campañas de retención con RCS y segmentación predictiva.' },
        { company: 'Operador — Sudáfrica', metricLabel: 'revenue incremental', desc: 'Revenue adicional generado en 12 meses con DYNAMO Journeys y optimización de canales.' },
      ],
      viewAll: 'Ver todos los casos de éxito',
    },
    cta: {
      title: 'Tu equipo merece la mejor plataforma',
      desc: 'Agenda una demo personalizada y descubre cómo Journeys puede transformar tu operación en semanas.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Descubre tu solución',
      ctaTertiary: 'Calcular ROI',
      trust: '+20 Telcos ya transformaron su operación',
    },
    useCases: [
      {
        label: 'Migración de Plan', titleBar: 'Journey Builder \u2014 Migración Prepago a Pospago',
        triggers: [
          { label: 'Fin de cuota', sub: 'Data plan agotado' },
          { label: 'Vencimiento', sub: 'Plan vence en 3 días' },
          { label: 'Nuevo cliente', sub: 'Alta hace 24hs' },
          { label: 'Portabilidad', sub: 'Solicitud detectada' },
        ],
        channel: { sub: 'Oferta Migración', message: 'Migrá a Pospago y llevate 50GB + Netflix gratis' },
        conditions: [
          { label: 'Acepta', sub: 'Conversión + SMS' },
          { label: 'Rechaza', sub: 'WhatsApp 50% OFF' },
          { label: 'No entregado', sub: 'SMS fallback' },
        ],
        results: [
          { label: 'Upsell', sub: 'ARPU +$2.4' },
          { label: 'Retención', sub: 'Win-back 67%' },
          { label: 'Fallback OK', sub: 'Mensaje entregado' },
        ],
      },
      {
        label: 'Vencimiento de Datos', titleBar: 'Journey Builder \u2014 Vencimiento de Datos',
        triggers: [
          { label: 'Consumo >80%', sub: 'Umbral alcanzado' },
          { label: 'Cuota al 95%', sub: 'Casi agotado' },
          { label: 'Plan vence 24hs', sub: 'Vencimiento próximo' },
          { label: 'Recarga frecuente', sub: 'Patrón detectado' },
        ],
        channel: { sub: 'Oferta Datos Extra', message: 'Tu plan de datos está por vencerse. Activá 5GB extra por $3/mes' },
        conditions: [
          { label: 'Acepta', sub: 'Conversión + SMS' },
          { label: 'Rechaza', sub: 'WhatsApp planes' },
          { label: 'No entregado', sub: 'Email recordatorio' },
        ],
        results: [
          { label: 'Revenue', sub: '+$1.8/user' },
          { label: 'Reactivación', sub: '45% reactivados' },
          { label: 'Email', sub: 'Entrega 88%' },
        ],
      },
      {
        label: 'Prevención de Churn', titleBar: 'Journey Builder \u2014 Prevención de Churn',
        triggers: [
          { label: 'Portabilidad', sub: 'Solicitud detectada' },
          { label: 'NPS negativo', sub: 'Score < 6' },
          { label: 'Inactividad 15d', sub: 'Sin uso detectado' },
          { label: 'Reclamo abierto', sub: 'Ticket pendiente' },
        ],
        channel: { sub: 'Oferta Retención', message: 'Sabemos que estás evaluando opciones. Tenemos una oferta exclusiva para ti' },
        conditions: [
          { label: 'Acepta', sub: 'SAT Push loyalty' },
          { label: 'Rechaza', sub: 'Llamada agente' },
          { label: 'No entregado', sub: 'SMS oferta final' },
        ],
        results: [
          { label: 'Save rate', sub: '34% retenidos' },
          { label: 'Contacto', sub: 'Agente 62%' },
          { label: 'Último intento', sub: 'SMS delivery 96%' },
        ],
      },
      {
        label: 'Onboarding', titleBar: 'Journey Builder \u2014 Onboarding',
        triggers: [
          { label: 'Alta nueva SIM', sub: 'SIM activada' },
          { label: 'Activación eSIM', sub: 'eSIM provisionada' },
          { label: 'Primera recarga', sub: 'Recarga inicial' },
          { label: 'Registro app', sub: 'App instalada' },
        ],
        channel: { sub: 'Bienvenida', message: '¡Bienvenido a [Operador]! Configurá tu plan ideal en 2 minutos' },
        conditions: [
          { label: 'Acepta', sub: 'WhatsApp tutorial' },
          { label: 'No responde', sub: 'SAT Push reminder' },
          { label: 'Completa', sub: 'Email resumen' },
        ],
        results: [
          { label: 'Activación', sub: 'Completa 71%' },
          { label: 'Recordatorio', sub: 'Apertura 89%' },
          { label: 'NPS boost', sub: '+12 puntos' },
        ],
      },
      {
        label: 'Cross-sell Terminal', titleBar: 'Journey Builder \u2014 Cross-sell Terminal',
        triggers: [
          { label: 'Contrato >12m', sub: 'Elegible upgrade' },
          { label: 'Terminal antigua', sub: 'Modelo >2 años' },
          { label: 'Consumo data alto', sub: '>10GB/mes' },
          { label: 'Upgrade elegible', sub: 'Marcado en CRM' },
        ],
        channel: { sub: 'Carrusel Equipos', message: 'Carrusel de equipos con imágenes y precios' },
        conditions: [
          { label: 'Acepta', sub: 'WhatsApp financiación' },
          { label: 'Rechaza', sub: 'SAT Push oferta' },
          { label: 'No entregado', sub: 'SMS link web' },
        ],
        results: [
          { label: 'Venta terminal', sub: '8% conversión' },
          { label: 'Oferta push', sub: '12% CTR' },
          { label: 'Web traffic', sub: '95% entregados' },
        ],
      },
      {
        label: 'Recupero de Carrito', titleBar: 'Journey Builder \u2014 Recupero de Carrito',
        triggers: [
          { label: 'Carrito abandonado', sub: 'App timeout' },
          { label: 'Compra iniciada', sub: 'Web checkout' },
          { label: 'Checkout incompleto', sub: 'Paso 3 abandonado' },
          { label: 'Pago fallido', sub: 'Error transacción' },
        ],
        channel: { sub: 'Recupero', message: 'Tu [producto] te está esperando. Completá tu compra con 10% OFF' },
        conditions: [
          { label: 'Acepta', sub: 'Conversión directa' },
          { label: 'Rechaza', sub: 'SAT Push 24hs' },
          { label: 'No entregado', sub: 'Email con cupón' },
        ],
        results: [
          { label: 'Recupero', sub: '19% conversión' },
          { label: 'Reminder', sub: '22% CTR' },
          { label: 'Cupón email', sub: '91% entregados' },
        ],
      },
      {
        label: 'Reactivación', titleBar: 'Journey Builder \u2014 Reactivación',
        triggers: [
          { label: 'Inactivo 30 días', sub: 'Sin actividad' },
          { label: 'Sin recarga 45d', sub: 'Saldo agotado' },
          { label: 'Saldo $0', sub: 'Sin fondos' },
          { label: 'Última sesión >30d', sub: 'App inactiva' },
        ],
        channel: { sub: 'Win-back', message: '¡Te extrañamos! Recargá hoy y llevate el doble de datos' },
        conditions: [
          { label: 'Acepta', sub: 'Conversión + SMS' },
          { label: 'Rechaza', sub: 'WhatsApp beneficio' },
          { label: 'No entregado', sub: 'Email win-back' },
        ],
        results: [
          { label: 'Reactivación', sub: '15% reactivados' },
          { label: 'Win-back', sub: '11% CTR' },
          { label: 'Email', sub: '89% entregados' },
        ],
      },
    ],
  },
  en: {
    problem: {
      badge: 'The problem',
      title: 'Sound familiar?',
      painPoints: [
        { title: 'Siloed channels', desc: 'Each channel runs on its own tool with no unified subscriber view or team coordination.' },
        { title: 'Manual campaigns', desc: 'Your team spends weeks setting up campaigns that should take minutes. No real automation.' },
        { title: 'Zero visibility', desc: 'You don\'t know what works, what doesn\'t, or how to measure the real impact of your communications.' },
      ],
    },
    solution: {
      badge: 'How we solve it',
      title: 'One platform for your entire CVM operation',
      desc: 'DYNAMO Journeys unifies all your channels, automates orchestration with smart business rules, and gives you full funnel visibility — from trigger to conversion.',
      checks: [
        '8+ channels orchestrated from a single place',
        'Automated journeys with real-time triggers',
        'Full-funnel analytics with actionable KPIs',
      ],
    },
    builder: {
      badge: 'Journey Builder',
      title: 'Build visual journeys in minutes',
      subtitle: 'Drag, connect and publish. That simple.',
      colTriggers: 'Triggers',
      colAction: 'Main action',
      colConditions: 'Conditions',
      colResults: 'Results',
      belowCaption: 'This is just an example. With DYNAMO Journeys, your team builds journeys like this',
      belowCaptionHighlight: 'in minutes',
      belowCTA: 'Try it live',
    },
    channels: {
      badge: 'Channels',
      title: '8+ channels orchestrated from one place',
      desc: 'Each channel with its own rules, metrics and fallback logic. Orchestrated in a single journey.',
      starLabel: 'Star channel',
      items: [
        { desc: 'Native SIM-level notifications. No app, no internet. The channel with the highest reach and deliverability on the market.', example: '"Activate your 10GB pack for just $5/mo. Reply 1 to activate."' },
        { desc: 'Rich messages with buttons, lists and carousels. Ideal for interactive conversations.', example: '"Hi John, your plan expires tomorrow. Renew with 20% OFF →"' },
        { desc: 'The future of SMS. Carousels, buttons and rich media directly in the messaging app.', example: '[Carousel] 3 plans with images, prices and an "Activate" button' },
        { desc: 'The universal channel. Reaches every device regardless of technology.', example: '"DYNAMO: Your $10 top-up was successful. Balance: $15.50"' },
        { desc: 'Detailed communications with responsive design and full tracking.', example: 'Newsletter with monthly usage summary and personalized offers' },
        { desc: 'Automated replies and campaigns in the DM most used by young audiences.', example: '"Hi! We have an exclusive offer for you. Swipe to see →"' },
        { desc: 'Chatbots and automated flows on Facebook Messenger for support and sales.', example: '"Your ticket #4521 has been resolved. Need anything else?"' },
        { desc: 'Interactive menus on basic devices. Perfect for emerging markets.', example: '*123# → 1. Check balance → 2. Top up → 3. Offers' },
      ],
    },
    capabilities: {
      badge: 'Platform',
      title: '6 capabilities that transform your operation',
      desc: 'Everything your CVM team needs, integrated in a single platform.',
      items: [
        { title: 'Full orchestration', desc: 'Coordinate 8+ channels with priority, fallback and timing logic. Every subscriber gets the right message, on the right channel, at the right time.', details: ['WhatsApp, SAT Push, RCS, SMS, Email, USSD, Instagram DM, Messenger', 'Automatic fallback if the primary channel fails', 'Prioritization by cost, deliverability or user preference'] },
        { title: 'Statistics & KPIs', desc: 'Measure the entire funnel: from send to final conversion. Real-time dashboards with the KPIs that matter.', details: ['Funnel: Intent → Sent → Delivered → Read → Click → Conversion', 'Performance comparison by channel', 'BI export and automated reports'] },
        { title: 'Behavior-based triggers', desc: 'Detect network, billing and behavioral events in real time. Every event becomes an engagement opportunity.', details: ['Network events: quota end, zone change, roaming', 'Billing events: top-up, expiry, overdue', 'Behavioral events: low NPS, churn risk, portability'] },
        { title: 'Rules engine', desc: 'Control when, how and to whom you send. Business rules that protect subscriber experience and revenue.', details: ['Windowing: allowed hours by region and channel', 'Anti-spam: maximum frequency per subscriber', 'Blacklist/Whitelist: granular audience control', 'SDP Billing and bandwidth management'] },
        { title: 'Campaign Manager 4-in-1', desc: 'Four modes in one engine: single, programmatic, event-based and full journeys.', details: ['Single: one-shot campaigns to specific audiences', 'Programmatic: automated by schedule and rules', 'Event-based: triggered by real-time events', 'Journeys: multi-step flows with conditions and branching'] },
        { title: 'Copilot AI + RTB', desc: 'AI that optimizes in real time: predictive segmentation, content personalization and smart bidding.', details: ['Predictive segmentation with machine learning', 'Automatic time and channel optimization', 'RTB (Real-Time Bidding) to maximize conversion per cost', 'Personalized content generation with AI'] },
      ],
    },
    triggers: {
      badge: 'Triggers + Rules',
      title: 'Smart decisions based on behavior',
      desc: 'We detect real-time events from your infrastructure and activate the right channel with the business rules you define.',
      detectBadge: 'We detect a use case',
      channelBadge: 'Channel / Service',
      events: ['New customer', 'Data quota end', 'Low balance', 'VAS services', 'Purchases/Benefits', 'Missed calls', 'User profile'],
      rules: ['Windowing', 'Blacklist', 'Whitelist', 'Anti-spam'],
      userProfile: 'User Profile + AI Segmentation',
      mockMessages: [
        { title: 'Personalized offer', body: '[Carousel] Premium Pack: 50GB + Spotify. Swipe to see more offers →' },
        { title: 'SIM notification', body: '"Your data quota is up. Buy 5GB for $3. Reply OK to activate."' },
        { title: 'Text message', body: '"DYNAMO: Top up $10 and get 3GB bonus + unlimited calls for 7 days."' },
      ],
      delivered: 'Delivered',
      cancel: 'Cancel',
    },
    analytics: {
      badge: 'Analytics',
      title: 'Measure the entire funnel in real time',
      desc: 'From send to conversion. Every step measured, every channel compared.',
      dashboardTitle: 'Analytics Dashboard — Campaign: Migration Q1 2026',
      funnelTitle: 'Conversion funnel',
      channelTitle: 'Conversion by channel',
    },
    demo: {
      badge: 'Interactive demo',
      title: 'Experience a live journey',
      desc: 'Schedule a personalized demo with our team and walk through the platform live.',
      ctaPrimary: 'Schedule Demo',
      ctaSecondary: 'Discover your solution',
      footer: 'Simplified representation — the full demo includes branching, live metrics and more.',
    },
    results: {
      badge: 'Case studies',
      title: 'Real results with Telcos',
      desc: 'These are real metrics from operators that already transformed their CVM operations with DYNAMO.',
      cases: [
        { company: 'Tier 1 Operator — LATAM', metricLabel: 'average conversion', desc: 'Increased conversion of upsell campaigns using SAT Push + WhatsApp with automated journeys.' },
        { company: 'Leading Operator — Chile', metricLabel: 'campaign CTR', desc: 'Sustained click-through rate in retention campaigns with RCS and predictive segmentation.' },
        { company: 'Operator — South Africa', metricLabel: 'incremental revenue', desc: 'Additional revenue generated in 12 months with DYNAMO Journeys and channel optimization.' },
      ],
      viewAll: 'View all case studies',
    },
    cta: {
      title: 'Your team deserves the best platform',
      desc: 'Schedule a personalized demo and discover how Journeys can transform your operation in weeks.',
      ctaPrimary: 'Schedule Demo',
      ctaSecondary: 'Discover your solution',
      ctaTertiary: 'Calculate ROI',
      trust: '+20 Telcos already transformed their operation',
    },
    useCases: [
      {
        label: 'Plan Migration', titleBar: 'Journey Builder \u2014 Prepaid to Postpaid Migration',
        triggers: [
          { label: 'Quota end', sub: 'Data plan depleted' },
          { label: 'Expiry', sub: 'Plan expires in 3 days' },
          { label: 'New customer', sub: 'Signed up 24h ago' },
          { label: 'Portability', sub: 'Request detected' },
        ],
        channel: { sub: 'Migration Offer', message: 'Switch to Postpaid and get 50GB + free Netflix' },
        conditions: [
          { label: 'Accepts', sub: 'Conversion + SMS' },
          { label: 'Declines', sub: 'WhatsApp 50% OFF' },
          { label: 'Not delivered', sub: 'SMS fallback' },
        ],
        results: [
          { label: 'Upsell', sub: 'ARPU +$2.4' },
          { label: 'Retention', sub: 'Win-back 67%' },
          { label: 'Fallback OK', sub: 'Message delivered' },
        ],
      },
      {
        label: 'Data Expiry', titleBar: 'Journey Builder \u2014 Data Expiry',
        triggers: [
          { label: 'Usage >80%', sub: 'Threshold reached' },
          { label: 'Quota at 95%', sub: 'Almost depleted' },
          { label: 'Plan expires 24h', sub: 'Expiry imminent' },
          { label: 'Frequent top-up', sub: 'Pattern detected' },
        ],
        channel: { sub: 'Extra Data Offer', message: 'Your data plan is about to expire. Activate 5GB extra for $3/mo' },
        conditions: [
          { label: 'Accepts', sub: 'Conversion + SMS' },
          { label: 'Declines', sub: 'WhatsApp plans' },
          { label: 'Not delivered', sub: 'Reminder email' },
        ],
        results: [
          { label: 'Revenue', sub: '+$1.8/user' },
          { label: 'Reactivation', sub: '45% reactivated' },
          { label: 'Email', sub: '88% delivered' },
        ],
      },
      {
        label: 'Churn Prevention', titleBar: 'Journey Builder \u2014 Churn Prevention',
        triggers: [
          { label: 'Portability', sub: 'Request detected' },
          { label: 'Negative NPS', sub: 'Score < 6' },
          { label: '15d inactivity', sub: 'No usage detected' },
          { label: 'Open complaint', sub: 'Pending ticket' },
        ],
        channel: { sub: 'Retention Offer', message: 'We know you\'re exploring options. We have an exclusive offer for you' },
        conditions: [
          { label: 'Accepts', sub: 'SAT Push loyalty' },
          { label: 'Declines', sub: 'Agent call' },
          { label: 'Not delivered', sub: 'Final SMS offer' },
        ],
        results: [
          { label: 'Save rate', sub: '34% retained' },
          { label: 'Contact', sub: 'Agent 62%' },
          { label: 'Last attempt', sub: 'SMS delivery 96%' },
        ],
      },
      {
        label: 'Onboarding', titleBar: 'Journey Builder \u2014 Onboarding',
        triggers: [
          { label: 'New SIM', sub: 'SIM activated' },
          { label: 'eSIM activation', sub: 'eSIM provisioned' },
          { label: 'First top-up', sub: 'Initial top-up' },
          { label: 'App signup', sub: 'App installed' },
        ],
        channel: { sub: 'Welcome', message: 'Welcome to [Operator]! Set up your ideal plan in 2 minutes' },
        conditions: [
          { label: 'Accepts', sub: 'WhatsApp tutorial' },
          { label: 'No response', sub: 'SAT Push reminder' },
          { label: 'Completed', sub: 'Summary email' },
        ],
        results: [
          { label: 'Activation', sub: '71% completed' },
          { label: 'Reminder', sub: '89% open rate' },
          { label: 'NPS boost', sub: '+12 points' },
        ],
      },
      {
        label: 'Device Cross-sell', titleBar: 'Journey Builder \u2014 Device Cross-sell',
        triggers: [
          { label: 'Contract >12mo', sub: 'Upgrade eligible' },
          { label: 'Old device', sub: 'Model >2 years' },
          { label: 'High data usage', sub: '>10GB/mo' },
          { label: 'Upgrade eligible', sub: 'Flagged in CRM' },
        ],
        channel: { sub: 'Device Carousel', message: 'Device carousel with images and prices' },
        conditions: [
          { label: 'Accepts', sub: 'WhatsApp financing' },
          { label: 'Declines', sub: 'SAT Push offer' },
          { label: 'Not delivered', sub: 'SMS web link' },
        ],
        results: [
          { label: 'Device sale', sub: '8% conversion' },
          { label: 'Push offer', sub: '12% CTR' },
          { label: 'Web traffic', sub: '95% delivered' },
        ],
      },
      {
        label: 'Cart Recovery', titleBar: 'Journey Builder \u2014 Cart Recovery',
        triggers: [
          { label: 'Abandoned cart', sub: 'App timeout' },
          { label: 'Checkout started', sub: 'Web checkout' },
          { label: 'Incomplete checkout', sub: 'Step 3 abandoned' },
          { label: 'Failed payment', sub: 'Transaction error' },
        ],
        channel: { sub: 'Recovery', message: 'Your [product] is waiting. Complete your purchase with 10% OFF' },
        conditions: [
          { label: 'Accepts', sub: 'Direct conversion' },
          { label: 'Declines', sub: 'SAT Push 24h' },
          { label: 'Not delivered', sub: 'Coupon email' },
        ],
        results: [
          { label: 'Recovery', sub: '19% conversion' },
          { label: 'Reminder', sub: '22% CTR' },
          { label: 'Coupon email', sub: '91% delivered' },
        ],
      },
      {
        label: 'Reactivation', titleBar: 'Journey Builder \u2014 Reactivation',
        triggers: [
          { label: '30 days inactive', sub: 'No activity' },
          { label: 'No top-up 45d', sub: 'Balance depleted' },
          { label: 'Balance $0', sub: 'No funds' },
          { label: 'Last session >30d', sub: 'App inactive' },
        ],
        channel: { sub: 'Win-back', message: 'We miss you! Top up today and get double data' },
        conditions: [
          { label: 'Accepts', sub: 'Conversion + SMS' },
          { label: 'Declines', sub: 'WhatsApp benefit' },
          { label: 'Not delivered', sub: 'Win-back email' },
        ],
        results: [
          { label: 'Reactivation', sub: '15% reactivated' },
          { label: 'Win-back', sub: '11% CTR' },
          { label: 'Email', sub: '89% delivered' },
        ],
      },
    ],
  },
  fr: {
    problem: {
      badge: 'Le problème',
      title: 'Cela vous semble familier ?',
      painPoints: [
        { title: 'Canaux en silos', desc: 'Chaque canal fonctionne avec son propre outil, sans vision unifiée de l\'abonné ni coordination entre équipes.' },
        { title: 'Campagnes manuelles', desc: 'Votre équipe passe des semaines à configurer des campagnes qui devraient prendre quelques minutes. Aucune automatisation réelle.' },
        { title: 'Aucune visibilité', desc: 'Vous ne savez pas ce qui fonctionne, ce qui ne fonctionne pas, ni comment mesurer l\'impact réel de vos communications.' },
      ],
    },
    solution: {
      badge: 'Notre solution',
      title: 'Une seule plateforme pour toute votre opération CVM',
      desc: 'DYNAMO Journeys unifie tous vos canaux, automatise l\'orchestration avec des règles métier intelligentes et vous offre une visibilité complète du funnel — du trigger à la conversion.',
      checks: [
        '8+ canaux orchestrés depuis un seul endroit',
        'Journeys automatisés avec triggers en temps réel',
        'Analytics de funnel complet avec KPIs actionnables',
      ],
    },
    builder: {
      badge: 'Journey Builder',
      title: 'Créez des journeys visuels en quelques minutes',
      subtitle: 'Glissez, connectez et publiez. Aussi simple que ça.',
      colTriggers: 'Triggers',
      colAction: 'Action principale',
      colConditions: 'Conditions',
      colResults: 'Résultats',
      belowCaption: 'Ceci n\'est qu\'un exemple. Avec DYNAMO Journeys, votre équipe construit des journeys comme celui-ci',
      belowCaptionHighlight: 'en quelques minutes',
      belowCTA: 'Essayez en direct',
    },
    channels: {
      badge: 'Canaux',
      title: '8+ canaux orchestrés depuis un seul endroit',
      desc: 'Chaque canal avec ses règles, ses métriques et sa logique de fallback. Orchestrés dans un seul journey.',
      starLabel: 'Canal phare',
      items: [
        { desc: 'Notifications natives sur la SIM de l\'abonné. Sans application, sans internet. Le canal avec la plus grande portée et délivrabilité du marché.', example: '"Activez votre pack 10Go pour seulement 5$/mois. Répondez 1 pour activer."' },
        { desc: 'Messages enrichis avec boutons, listes et carrousels. Idéal pour les conversations interactives.', example: '"Bonjour Jean, votre forfait expire demain. Renouvelez avec 20% de remise →"' },
        { desc: 'Le futur du SMS. Carrousels, boutons et rich media directement dans l\'app de messagerie.', example: '[Carrousel] 3 forfaits avec images, prix et bouton "Activer"' },
        { desc: 'Le canal universel. Atteint tous les appareils, quelle que soit la technologie.', example: '"DYNAMO : Votre recharge de 10$ a été effectuée. Solde : 15,50$"' },
        { desc: 'Communications détaillées avec design responsive et suivi complet.', example: 'Newsletter avec résumé de consommation mensuelle et offres personnalisées' },
        { desc: 'Réponses automatisées et campagnes dans le DM le plus utilisé par les jeunes.', example: '"Bonjour ! Nous avons une offre exclusive pour vous. Glissez pour voir →"' },
        { desc: 'Chatbots et flows automatisés sur Facebook Messenger pour le support et les ventes.', example: '"Votre ticket #4521 a été résolu. Besoin d\'autre chose ?"' },
        { desc: 'Menus interactifs sur appareils basiques. Parfait pour les marchés émergents.', example: '*123# → 1. Voir solde → 2. Recharger → 3. Offres' },
      ],
    },
    capabilities: {
      badge: 'Plateforme',
      title: '6 capacités qui transforment votre opération',
      desc: 'Tout ce dont votre équipe CVM a besoin, intégré dans une seule plateforme.',
      items: [
        { title: 'Orchestration complète', desc: 'Coordonnez 8+ canaux avec logique de priorité, fallback et timing. Chaque abonné reçoit le bon message, sur le bon canal, au bon moment.', details: ['WhatsApp, SAT Push, RCS, SMS, Email, USSD, Instagram DM, Messenger', 'Fallback automatique si le canal principal échoue', 'Priorisation par coût, délivrabilité ou préférence utilisateur'] },
        { title: 'Statistiques et KPIs', desc: 'Mesurez tout le funnel : de l\'envoi à la conversion finale. Tableaux de bord en temps réel avec les KPIs qui comptent.', details: ['Funnel : Intent → Sent → Delivered → Read → Click → Conversion', 'Comparaison de performance par canal', 'Export BI et rapports automatiques'] },
        { title: 'Triggers basés sur le comportement', desc: 'Détectez les événements réseau, facturation et comportement en temps réel. Chaque événement devient une opportunité d\'engagement.', details: ['Événements réseau : fin de quota, changement de zone, roaming', 'Événements facturation : recharge, expiration, impayé', 'Événements comportement : NPS bas, risque churn, portabilité'] },
        { title: 'Moteur de règles', desc: 'Contrôlez quand, comment et à qui vous envoyez. Des règles métier qui protègent l\'expérience abonné et le revenu.', details: ['Windowing : horaires autorisés par région et canal', 'Anti-spam : fréquence maximale par abonné', 'Blacklist/Whitelist : contrôle granulaire des audiences', 'SDP Billing et gestion de bande passante'] },
        { title: 'Campaign Manager 4-en-1', desc: 'Quatre modes en un seul moteur : campagnes individuelles, programmatiques, événementielles et journeys complets.', details: ['Single : campagnes one-shot sur audiences ciblées', 'Programmatiques : automatisées par planning et règles', 'Événementielles : déclenchées par triggers temps réel', 'Journeys : flux multi-étapes avec conditions et branching'] },
        { title: 'Copilot AI + RTB', desc: 'Intelligence artificielle qui optimise en temps réel : segmentation prédictive, personnalisation de contenu et enchères intelligentes.', details: ['Segmentation prédictive avec machine learning', 'Optimisation automatique des horaires et canaux', 'RTB (Real-Time Bidding) pour maximiser la conversion par coût', 'Génération de contenu personnalisé avec IA'] },
      ],
    },
    triggers: {
      badge: 'Triggers + Rules',
      title: 'Décisions intelligentes basées sur le comportement',
      desc: 'Nous détectons les événements en temps réel depuis votre infrastructure et activons le bon canal avec les règles métier que vous définissez.',
      detectBadge: 'Nous détectons un cas d\'usage',
      channelBadge: 'Canal / Service',
      events: ['Nouveau client', 'Fin de quota de données', 'Solde insuffisant', 'Services VAS', 'Achats/Avantages', 'Appels manqués', 'Profil utilisateur'],
      rules: ['Windowing', 'Blacklist', 'Whitelist', 'Anti-spam'],
      userProfile: 'Profil utilisateur + Segmentation IA',
      mockMessages: [
        { title: 'Offre personnalisée', body: '[Carrousel] Pack Premium : 50Go + Spotify. Glissez pour voir plus d\'offres →' },
        { title: 'Notification SIM', body: '"Votre quota de données est épuisé. Achetez 5Go pour 3$. OK pour activer."' },
        { title: 'Message texte', body: '"DYNAMO : Rechargez 10$ et recevez 3Go bonus + appels illimités pendant 7 jours."' },
      ],
      delivered: 'Livré',
      cancel: 'Annuler',
    },
    analytics: {
      badge: 'Analytics',
      title: 'Mesurez tout le funnel en temps réel',
      desc: 'De l\'envoi à la conversion. Chaque étape mesurée, chaque canal comparé.',
      dashboardTitle: 'Tableau de bord Analytics — Campagne : Migration T1 2026',
      funnelTitle: 'Funnel de conversion',
      channelTitle: 'Conversion par canal',
    },
    demo: {
      badge: 'Démo interactive',
      title: 'Expérimentez un journey en direct',
      desc: 'Planifiez une démo personnalisée avec notre équipe et parcourez la plateforme en direct.',
      ctaPrimary: 'Planifier une démo',
      ctaSecondary: 'Découvrez votre solution',
      footer: 'Représentation simplifiée — la démo complète inclut le branching, les métriques en direct et plus encore.',
    },
    results: {
      badge: 'Études de cas',
      title: 'Résultats réels avec les Telcos',
      desc: 'Ce sont des métriques réelles d\'opérateurs qui ont déjà transformé leur opération CVM avec DYNAMO.',
      cases: [
        { company: 'Opérateur Tier 1 — LATAM', metricLabel: 'conversion moyenne', desc: 'Augmentation de la conversion des campagnes d\'upsell avec SAT Push + WhatsApp et journeys automatisés.' },
        { company: 'Opérateur leader — Chili', metricLabel: 'CTR campagnes', desc: 'Taux de clic soutenu dans les campagnes de rétention avec RCS et segmentation prédictive.' },
        { company: 'Opérateur — Afrique du Sud', metricLabel: 'revenu incrémental', desc: 'Revenu additionnel généré en 12 mois avec DYNAMO Journeys et optimisation des canaux.' },
      ],
      viewAll: 'Voir toutes les études de cas',
    },
    cta: {
      title: 'Votre équipe mérite la meilleure plateforme',
      desc: 'Planifiez une démo personnalisée et découvrez comment Journeys peut transformer votre opération en quelques semaines.',
      ctaPrimary: 'Planifier une démo',
      ctaSecondary: 'Découvrez votre solution',
      ctaTertiary: 'Calculer le ROI',
      trust: '+20 Telcos ont déjà transformé leur opération',
    },
    useCases: [
      {
        label: 'Migration de forfait', titleBar: 'Journey Builder \u2014 Migration Prépayé vers Postpayé',
        triggers: [{ label: 'Fin de quota', sub: 'Forfait data épuisé' }, { label: 'Expiration', sub: 'Forfait expire dans 3 jours' }, { label: 'Nouveau client', sub: 'Inscription il y a 24h' }, { label: 'Portabilité', sub: 'Demande détectée' }],
        channel: { sub: 'Offre Migration', message: 'Passez au Postpayé et obtenez 50Go + Netflix offert' },
        conditions: [{ label: 'Accepte', sub: 'Conversion + SMS' }, { label: 'Refuse', sub: 'WhatsApp 50% de remise' }, { label: 'Non livré', sub: 'SMS fallback' }],
        results: [{ label: 'Upsell', sub: 'ARPU +2,4$' }, { label: 'Rétention', sub: 'Win-back 67%' }, { label: 'Fallback OK', sub: 'Message livré' }],
      },
      {
        label: 'Expiration de données', titleBar: 'Journey Builder \u2014 Expiration de données',
        triggers: [{ label: 'Conso >80%', sub: 'Seuil atteint' }, { label: 'Quota à 95%', sub: 'Presque épuisé' }, { label: 'Forfait expire 24h', sub: 'Expiration imminente' }, { label: 'Recharge fréquente', sub: 'Schéma détecté' }],
        channel: { sub: 'Offre Data Extra', message: 'Votre forfait data expire bientôt. Activez 5Go extra pour 3$/mois' },
        conditions: [{ label: 'Accepte', sub: 'Conversion + SMS' }, { label: 'Refuse', sub: 'WhatsApp forfaits' }, { label: 'Non livré', sub: 'Email rappel' }],
        results: [{ label: 'Revenu', sub: '+1,8$/user' }, { label: 'Réactivation', sub: '45% réactivés' }, { label: 'Email', sub: 'Livraison 88%' }],
      },
      {
        label: 'Prévention du churn', titleBar: 'Journey Builder \u2014 Prévention du churn',
        triggers: [{ label: 'Portabilité', sub: 'Demande détectée' }, { label: 'NPS négatif', sub: 'Score < 6' }, { label: 'Inactivité 15j', sub: 'Aucun usage détecté' }, { label: 'Réclamation ouverte', sub: 'Ticket en attente' }],
        channel: { sub: 'Offre Rétention', message: 'Nous savons que vous évaluez vos options. Nous avons une offre exclusive pour vous' },
        conditions: [{ label: 'Accepte', sub: 'SAT Push loyalty' }, { label: 'Refuse', sub: 'Appel agent' }, { label: 'Non livré', sub: 'SMS offre finale' }],
        results: [{ label: 'Taux de sauvegarde', sub: '34% retenus' }, { label: 'Contact', sub: 'Agent 62%' }, { label: 'Dernière tentative', sub: 'SMS livraison 96%' }],
      },
      {
        label: 'Onboarding', titleBar: 'Journey Builder \u2014 Onboarding',
        triggers: [{ label: 'Nouvelle SIM', sub: 'SIM activée' }, { label: 'Activation eSIM', sub: 'eSIM provisionnée' }, { label: 'Première recharge', sub: 'Recharge initiale' }, { label: 'Inscription app', sub: 'App installée' }],
        channel: { sub: 'Bienvenue', message: 'Bienvenue chez [Opérateur] ! Configurez votre forfait idéal en 2 minutes' },
        conditions: [{ label: 'Accepte', sub: 'WhatsApp tutoriel' }, { label: 'Pas de réponse', sub: 'SAT Push rappel' }, { label: 'Terminé', sub: 'Email résumé' }],
        results: [{ label: 'Activation', sub: '71% complétée' }, { label: 'Rappel', sub: '89% ouverture' }, { label: 'NPS boost', sub: '+12 points' }],
      },
      {
        label: 'Cross-sell Terminal', titleBar: 'Journey Builder \u2014 Cross-sell Terminal',
        triggers: [{ label: 'Contrat >12m', sub: 'Éligible upgrade' }, { label: 'Terminal ancien', sub: 'Modèle >2 ans' }, { label: 'Conso data élevée', sub: '>10Go/mois' }, { label: 'Upgrade éligible', sub: 'Marqué dans CRM' }],
        channel: { sub: 'Carrousel Appareils', message: 'Carrousel d\'appareils avec images et prix' },
        conditions: [{ label: 'Accepte', sub: 'WhatsApp financement' }, { label: 'Refuse', sub: 'SAT Push offre' }, { label: 'Non livré', sub: 'SMS lien web' }],
        results: [{ label: 'Vente terminal', sub: '8% conversion' }, { label: 'Offre push', sub: '12% CTR' }, { label: 'Trafic web', sub: '95% livrés' }],
      },
      {
        label: 'Récupération de panier', titleBar: 'Journey Builder \u2014 Récupération de panier',
        triggers: [{ label: 'Panier abandonné', sub: 'App timeout' }, { label: 'Achat initié', sub: 'Web checkout' }, { label: 'Checkout incomplet', sub: 'Étape 3 abandonnée' }, { label: 'Paiement échoué', sub: 'Erreur transaction' }],
        channel: { sub: 'Récupération', message: 'Votre [produit] vous attend. Finalisez votre achat avec 10% de remise' },
        conditions: [{ label: 'Accepte', sub: 'Conversion directe' }, { label: 'Refuse', sub: 'SAT Push 24h' }, { label: 'Non livré', sub: 'Email avec coupon' }],
        results: [{ label: 'Récupération', sub: '19% conversion' }, { label: 'Rappel', sub: '22% CTR' }, { label: 'Coupon email', sub: '91% livrés' }],
      },
      {
        label: 'Réactivation', titleBar: 'Journey Builder \u2014 Réactivation',
        triggers: [{ label: 'Inactif 30 jours', sub: 'Sans activité' }, { label: 'Sans recharge 45j', sub: 'Solde épuisé' }, { label: 'Solde 0$', sub: 'Sans fonds' }, { label: 'Dernière session >30j', sub: 'App inactive' }],
        channel: { sub: 'Win-back', message: 'Vous nous manquez ! Rechargez aujourd\'hui et recevez le double de données' },
        conditions: [{ label: 'Accepte', sub: 'Conversion + SMS' }, { label: 'Refuse', sub: 'WhatsApp avantage' }, { label: 'Non livré', sub: 'Email win-back' }],
        results: [{ label: 'Réactivation', sub: '15% réactivés' }, { label: 'Win-back', sub: '11% CTR' }, { label: 'Email', sub: '89% livrés' }],
      },
    ],
  },
  pt: {
    problem: {
      badge: 'O problema',
      title: 'Parece familiar?',
      painPoints: [
        { title: 'Canais em silos', desc: 'Cada canal opera com sua própria ferramenta, sem visão unificada do assinante nem coordenação entre equipes.' },
        { title: 'Campanhas manuais', desc: 'Sua equipe passa semanas configurando campanhas que deveriam levar minutos. Sem automação real.' },
        { title: 'Sem visibilidade', desc: 'Você não sabe o que funciona, o que não funciona, nem como medir o impacto real das suas comunicações.' },
      ],
    },
    solution: {
      badge: 'Como resolvemos',
      title: 'Uma única plataforma para toda sua operação de CVM',
      desc: 'DYNAMO Journeys unifica todos os seus canais, automatiza a orquestração com regras de negócio inteligentes e oferece visibilidade completa do funil — do trigger à conversão.',
      checks: [
        '8+ canais orquestrados a partir de um único lugar',
        'Journeys automatizados com triggers em tempo real',
        'Analytics de funil completo com KPIs acionáveis',
      ],
    },
    builder: {
      badge: 'Journey Builder',
      title: 'Construa journeys visuais em minutos',
      subtitle: 'Arraste, conecte e publique. Simples assim.',
      colTriggers: 'Triggers',
      colAction: 'Ação principal',
      colConditions: 'Condições',
      colResults: 'Resultados',
      belowCaption: 'Isso é apenas um exemplo. Com DYNAMO Journeys, sua equipe constrói journeys como este',
      belowCaptionHighlight: 'em minutos',
      belowCTA: 'Teste ao vivo',
    },
    channels: {
      badge: 'Canais',
      title: '8+ canais orquestrados a partir de um único lugar',
      desc: 'Cada canal com suas regras, métricas e lógica de fallback. Orquestrados em um único journey.',
      starLabel: 'Canal destaque',
      items: [
        { desc: 'Notificações nativas no SIM do assinante. Sem app, sem internet. O canal com maior alcance e entregabilidade do mercado.', example: '"Ative seu pacote de 10GB por apenas R$25/mês. Responda 1 para ativar."' },
        { desc: 'Mensagens ricas com botões, listas e carrosséis. Ideal para conversas interativas.', example: '"Olá João, seu plano vence amanhã. Renove com 20% OFF →"' },
        { desc: 'O futuro do SMS. Carrosséis, botões e rich media diretamente no app de mensagens.', example: '[Carrossel] 3 planos com imagens, preços e botão "Ativar"' },
        { desc: 'O canal universal. Alcança todos os dispositivos, independente da tecnologia.', example: '"DYNAMO: Sua recarga de R$50 foi bem-sucedida. Saldo: R$75,50"' },
        { desc: 'Comunicações detalhadas com design responsivo e rastreamento completo.', example: 'Newsletter com resumo de consumo mensal e ofertas personalizadas' },
        { desc: 'Respostas automatizadas e campanhas no DM mais usado pelos jovens.', example: '"Olá! Temos uma oferta exclusiva para você. Deslize para ver →"' },
        { desc: 'Chatbots e fluxos automatizados no Facebook Messenger para atendimento e vendas.', example: '"Seu chamado #4521 foi resolvido. Precisa de mais alguma coisa?"' },
        { desc: 'Menus interativos em dispositivos básicos. Perfeito para mercados emergentes.', example: '*123# → 1. Ver saldo → 2. Recarregar → 3. Ofertas' },
      ],
    },
    capabilities: {
      badge: 'Plataforma',
      title: '6 capacidades que transformam sua operação',
      desc: 'Tudo que sua equipe de CVM precisa, integrado em uma única plataforma.',
      items: [
        { title: 'Orquestração completa', desc: 'Coordene 8+ canais com lógica de prioridade, fallback e timing. Cada assinante recebe a mensagem certa, no canal certo, no momento certo.', details: ['WhatsApp, SAT Push, RCS, SMS, Email, USSD, Instagram DM, Messenger', 'Fallback automático se o canal primário falhar', 'Priorização por custo, entregabilidade ou preferência do usuário'] },
        { title: 'Estatísticas e KPIs', desc: 'Meça todo o funil: do envio à conversão final. Dashboards em tempo real com os KPIs que importam.', details: ['Funil: Intent → Sent → Delivered → Read → Click → Conversion', 'Comparação de performance por canal', 'Exportação para BI e relatórios automáticos'] },
        { title: 'Triggers baseados em comportamento', desc: 'Detecte eventos de rede, billing e comportamento em tempo real. Cada evento se torna uma oportunidade de engajamento.', details: ['Eventos de rede: fim de cota, mudança de zona, roaming', 'Eventos de billing: recarga, vencimento, inadimplência', 'Eventos de comportamento: NPS baixo, risco de churn, portabilidade'] },
        { title: 'Motor de regras', desc: 'Controle quando, como e para quem você envia. Regras de negócio que protegem a experiência do assinante e a receita.', details: ['Windowing: horários permitidos por região e canal', 'Anti-spam: frequência máxima por assinante', 'Blacklist/Whitelist: controle granular de audiências', 'SDP Billing e gerenciamento de largura de banda'] },
        { title: 'Campaign Manager 4-em-1', desc: 'Quatro modos em um único motor: campanhas individuais, programáticas, baseadas em eventos e journeys completos.', details: ['Single: campanhas one-shot para audiências específicas', 'Programáticas: automatizadas por agendamento e regras', 'Baseadas em eventos: disparadas por triggers em tempo real', 'Journeys: fluxos multi-etapas com condições e branching'] },
        { title: 'Copilot AI + RTB', desc: 'Inteligência artificial que otimiza em tempo real: segmentação preditiva, personalização de conteúdo e bidding inteligente.', details: ['Segmentação preditiva com machine learning', 'Otimização automática de horário e canal', 'RTB (Real-Time Bidding) para maximizar conversão por custo', 'Geração de conteúdo personalizado com IA'] },
      ],
    },
    triggers: {
      badge: 'Triggers + Rules',
      title: 'Decisões inteligentes baseadas em comportamento',
      desc: 'Detectamos eventos em tempo real da sua infraestrutura e ativamos o canal certo com as regras de negócio que você define.',
      detectBadge: 'Detectamos um caso de uso',
      channelBadge: 'Canal / Serviço',
      events: ['Novo cliente', 'Fim de cota de dados', 'Saldo insuficiente', 'Serviços VAS', 'Compras/Benefícios', 'Chamadas perdidas', 'Perfil do usuário'],
      rules: ['Windowing', 'Blacklist', 'Whitelist', 'Anti-spam'],
      userProfile: 'Perfil do Usuário + Segmentação IA',
      mockMessages: [
        { title: 'Oferta personalizada', body: '[Carrossel] Pacote Premium: 50GB + Spotify. Deslize para ver mais ofertas →' },
        { title: 'Notificação SIM', body: '"Sua cota de dados acabou. Compre 5GB por R$15. OK para ativar."' },
        { title: 'Mensagem de texto', body: '"DYNAMO: Recarregue R$50 e ganhe 3GB bônus + chamadas ilimitadas por 7 dias."' },
      ],
      delivered: 'Entregue',
      cancel: 'Cancelar',
    },
    analytics: {
      badge: 'Analytics',
      title: 'Meça todo o funil em tempo real',
      desc: 'Do envio à conversão. Cada etapa medida, cada canal comparado.',
      dashboardTitle: 'Dashboard Analytics — Campanha: Migração Q1 2026',
      funnelTitle: 'Funil de conversão',
      channelTitle: 'Conversão por canal',
    },
    demo: {
      badge: 'Demo interativa',
      title: 'Experimente um journey ao vivo',
      desc: 'Agende uma demo personalizada com nossa equipe e percorra a plataforma ao vivo.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Descubra sua solução',
      footer: 'Representação simplificada — a demo completa inclui branching, métricas ao vivo e mais.',
    },
    results: {
      badge: 'Casos de sucesso',
      title: 'Resultados reais com Telcos',
      desc: 'Estas são métricas reais de operadoras que já transformaram sua operação de CVM com DYNAMO.',
      cases: [
        { company: 'Operadora Tier 1 — LATAM', metricLabel: 'conversão média', desc: 'Aumento na conversão de campanhas de upsell usando SAT Push + WhatsApp com journeys automatizados.' },
        { company: 'Operadora líder — Chile', metricLabel: 'CTR em campanhas', desc: 'Taxa de cliques sustentada em campanhas de retenção com RCS e segmentação preditiva.' },
        { company: 'Operadora — África do Sul', metricLabel: 'receita incremental', desc: 'Receita adicional gerada em 12 meses com DYNAMO Journeys e otimização de canais.' },
      ],
      viewAll: 'Ver todos os casos de sucesso',
    },
    cta: {
      title: 'Sua equipe merece a melhor plataforma',
      desc: 'Agende uma demo personalizada e descubra como Journeys pode transformar sua operação em semanas.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Descubra sua solução',
      ctaTertiary: 'Calcular ROI',
      trust: '+20 Telcos já transformaram sua operação',
    },
    useCases: [
      {
        label: 'Migração de Plano', titleBar: 'Journey Builder \u2014 Migração Pré para Pós-pago',
        triggers: [{ label: 'Fim de cota', sub: 'Plano de dados esgotado' }, { label: 'Vencimento', sub: 'Plano vence em 3 dias' }, { label: 'Novo cliente', sub: 'Cadastro há 24h' }, { label: 'Portabilidade', sub: 'Solicitação detectada' }],
        channel: { sub: 'Oferta Migração', message: 'Migre para Pós-pago e ganhe 50GB + Netflix grátis' },
        conditions: [{ label: 'Aceita', sub: 'Conversão + SMS' }, { label: 'Recusa', sub: 'WhatsApp 50% OFF' }, { label: 'Não entregue', sub: 'SMS fallback' }],
        results: [{ label: 'Upsell', sub: 'ARPU +R$12' }, { label: 'Retenção', sub: 'Win-back 67%' }, { label: 'Fallback OK', sub: 'Mensagem entregue' }],
      },
      {
        label: 'Vencimento de Dados', titleBar: 'Journey Builder \u2014 Vencimento de Dados',
        triggers: [{ label: 'Consumo >80%', sub: 'Limite atingido' }, { label: 'Cota a 95%', sub: 'Quase esgotado' }, { label: 'Plano vence 24h', sub: 'Vencimento próximo' }, { label: 'Recarga frequente', sub: 'Padrão detectado' }],
        channel: { sub: 'Oferta Dados Extra', message: 'Seu plano de dados está prestes a vencer. Ative 5GB extra por R$15/mês' },
        conditions: [{ label: 'Aceita', sub: 'Conversão + SMS' }, { label: 'Recusa', sub: 'WhatsApp planos' }, { label: 'Não entregue', sub: 'Email lembrete' }],
        results: [{ label: 'Receita', sub: '+R$9/user' }, { label: 'Reativação', sub: '45% reativados' }, { label: 'Email', sub: 'Entrega 88%' }],
      },
      {
        label: 'Prevenção de Churn', titleBar: 'Journey Builder \u2014 Prevenção de Churn',
        triggers: [{ label: 'Portabilidade', sub: 'Solicitação detectada' }, { label: 'NPS negativo', sub: 'Score < 6' }, { label: 'Inatividade 15d', sub: 'Sem uso detectado' }, { label: 'Reclamação aberta', sub: 'Chamado pendente' }],
        channel: { sub: 'Oferta Retenção', message: 'Sabemos que você está avaliando opções. Temos uma oferta exclusiva para você' },
        conditions: [{ label: 'Aceita', sub: 'SAT Push loyalty' }, { label: 'Recusa', sub: 'Ligação do agente' }, { label: 'Não entregue', sub: 'SMS oferta final' }],
        results: [{ label: 'Taxa de save', sub: '34% retidos' }, { label: 'Contato', sub: 'Agente 62%' }, { label: 'Última tentativa', sub: 'SMS entrega 96%' }],
      },
      {
        label: 'Onboarding', titleBar: 'Journey Builder \u2014 Onboarding',
        triggers: [{ label: 'Novo SIM', sub: 'SIM ativado' }, { label: 'Ativação eSIM', sub: 'eSIM provisionado' }, { label: 'Primeira recarga', sub: 'Recarga inicial' }, { label: 'Cadastro no app', sub: 'App instalado' }],
        channel: { sub: 'Boas-vindas', message: 'Bem-vindo à [Operadora]! Configure seu plano ideal em 2 minutos' },
        conditions: [{ label: 'Aceita', sub: 'WhatsApp tutorial' }, { label: 'Sem resposta', sub: 'SAT Push lembrete' }, { label: 'Completo', sub: 'Email resumo' }],
        results: [{ label: 'Ativação', sub: '71% completa' }, { label: 'Lembrete', sub: '89% abertura' }, { label: 'NPS boost', sub: '+12 pontos' }],
      },
      {
        label: 'Cross-sell Terminal', titleBar: 'Journey Builder \u2014 Cross-sell Terminal',
        triggers: [{ label: 'Contrato >12m', sub: 'Elegível para upgrade' }, { label: 'Terminal antigo', sub: 'Modelo >2 anos' }, { label: 'Consumo data alto', sub: '>10GB/mês' }, { label: 'Upgrade elegível', sub: 'Marcado no CRM' }],
        channel: { sub: 'Carrossel de Aparelhos', message: 'Carrossel de aparelhos com imagens e preços' },
        conditions: [{ label: 'Aceita', sub: 'WhatsApp financiamento' }, { label: 'Recusa', sub: 'SAT Push oferta' }, { label: 'Não entregue', sub: 'SMS link web' }],
        results: [{ label: 'Venda de terminal', sub: '8% conversão' }, { label: 'Oferta push', sub: '12% CTR' }, { label: 'Tráfego web', sub: '95% entregues' }],
      },
      {
        label: 'Recuperação de Carrinho', titleBar: 'Journey Builder \u2014 Recuperação de Carrinho',
        triggers: [{ label: 'Carrinho abandonado', sub: 'App timeout' }, { label: 'Compra iniciada', sub: 'Web checkout' }, { label: 'Checkout incompleto', sub: 'Etapa 3 abandonada' }, { label: 'Pagamento falhou', sub: 'Erro na transação' }],
        channel: { sub: 'Recuperação', message: 'Seu [produto] está esperando. Finalize sua compra com 10% OFF' },
        conditions: [{ label: 'Aceita', sub: 'Conversão direta' }, { label: 'Recusa', sub: 'SAT Push 24h' }, { label: 'Não entregue', sub: 'Email com cupom' }],
        results: [{ label: 'Recuperação', sub: '19% conversão' }, { label: 'Lembrete', sub: '22% CTR' }, { label: 'Cupom email', sub: '91% entregues' }],
      },
      {
        label: 'Reativação', titleBar: 'Journey Builder \u2014 Reativação',
        triggers: [{ label: 'Inativo 30 dias', sub: 'Sem atividade' }, { label: 'Sem recarga 45d', sub: 'Saldo esgotado' }, { label: 'Saldo R$0', sub: 'Sem fundos' }, { label: 'Última sessão >30d', sub: 'App inativo' }],
        channel: { sub: 'Win-back', message: 'Sentimos sua falta! Recarregue hoje e ganhe o dobro de dados' },
        conditions: [{ label: 'Aceita', sub: 'Conversão + SMS' }, { label: 'Recusa', sub: 'WhatsApp benefício' }, { label: 'Não entregue', sub: 'Email win-back' }],
        results: [{ label: 'Reativação', sub: '15% reativados' }, { label: 'Win-back', sub: '11% CTR' }, { label: 'Email', sub: '89% entregues' }],
      },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 1 — PROBLEM / SOLUTION
   ═══════════════════════════════════════════════════════════════════════ */

const painPointIcons = [AlertTriangle, Clock, EyeOff];
const painPointColors = ['#EF4444', '#F59E0B', '#EF4444'];

export function ProblemSolution() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — Pain Points */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-red-400/80 text-sm font-medium tracking-widest uppercase">
                {t.problem.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4 leading-tight">
                {t.problem.title}
              </h2>
            </motion.div>
            <div className="mt-10 space-y-6">
              {t.problem.painPoints.map((p, i) => {
                const Icon = painPointIcons[i];
                const color = painPointColors[i];
                return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-5 items-start group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg font-heading">
                      {p.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
              })}
            </div>
          </div>

          {/* Right — Solution */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 to-lime/5 rounded-3xl blur-xl" />
            <div className="relative bg-white/[0.03] border border-purple-500/20 rounded-3xl p-8 lg:p-10">
              <span className="text-lime text-sm font-medium tracking-widest uppercase">
                {t.solution.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-4 leading-tight">
                {t.solution.title}
              </h3>
              <p className="text-white/55 mt-5 leading-relaxed">
                {t.solution.desc}
              </p>
              <div className="mt-8 space-y-4">
                {t.solution.checks.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-lime shrink-0" />
                    <span className="text-white/80 text-sm font-medium">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 2 — JOURNEY BUILDER SIMULATOR
   ═══════════════════════════════════════════════════════════════════════ */

interface BuilderNode {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  color: string;
  metric?: string;
  metricLabel?: string;
  x: number;
  y: number;
  type: 'trigger' | 'action' | 'condition' | 'result';
}

/* ---- Use case data for the 7 interactive tabs ---- */

interface UseCaseData {
  id: string;
  label: string;
  icon: LucideIcon;
  titleBar: string;
  triggers: BuilderNode[];
  channel: {
    label: string;
    sub: string;
    icon: LucideIcon;
    color: string;
    message: string;
    metric: string;
    metricLabel: string;
  };
  conditions: BuilderNode[];
  results: BuilderNode[];
}

/* Static structure for use cases (icons, colors, metrics, IDs) — text comes from i18n */
const useCaseStructure = [
  {
    id: 'migracion', icon: ArrowUpRight,
    triggerMeta: [
      { id: 'T1', icon: WifiOff, color: '#EF4444' },
      { id: 'T2', icon: Clock, color: '#F59E0B' },
      { id: 'T3', icon: UserCheck, color: '#22C55E' },
      { id: 'T4', icon: ArrowLeftRight, color: '#EC4899' },
    ],
    channelMeta: { label: 'SAT Push', icon: Smartphone, color: '#CDFF00', metric: '89%', metricLabel: 'delivery' },
    conditionMeta: [
      { id: 'B1', icon: CheckCircle2, color: '#22C55E', metric: '22%', metricLabel: 'conv.' },
      { id: 'B2', icon: MessageSquare, color: '#25D366', metric: '18%', metricLabel: 'CTR' },
      { id: 'B3', icon: Hash, color: '#8B5CF6', metric: '94%', metricLabel: 'delivery' },
    ],
    resultMeta: [
      { id: 'R1', icon: TrendingUp, color: '#CDFF00', metric: '+$2.4', metricLabel: 'ARPU' },
      { id: 'R2', icon: Target, color: '#00D4AA', metric: '67%', metricLabel: 'win-back' },
      { id: 'R3', icon: Send, color: '#3B82F6', metric: '91%', metricLabel: 'sent' },
    ],
  },
  {
    id: 'vencimiento', icon: Clock,
    triggerMeta: [
      { id: 'T1', icon: Gauge, color: '#F59E0B' },
      { id: 'T2', icon: AlertTriangle, color: '#EF4444' },
      { id: 'T3', icon: Clock, color: '#F59E0B' },
      { id: 'T4', icon: CreditCard, color: '#8B5CF6' },
    ],
    channelMeta: { label: 'SAT Push', icon: Smartphone, color: '#CDFF00', metric: '91%', metricLabel: 'delivery' },
    conditionMeta: [
      { id: 'B1', icon: CheckCircle2, color: '#22C55E', metric: '28%', metricLabel: 'conv.' },
      { id: 'B2', icon: MessageSquare, color: '#25D366', metric: '15%', metricLabel: 'CTR' },
      { id: 'B3', icon: Mail, color: '#3B82F6', metric: '92%', metricLabel: 'delivery' },
    ],
    resultMeta: [
      { id: 'R1', icon: DollarSign, color: '#CDFF00', metric: '+$1.8', metricLabel: 'revenue' },
      { id: 'R2', icon: RefreshCcw, color: '#00D4AA', metric: '45%', metricLabel: 'reactivation' },
      { id: 'R3', icon: Mail, color: '#3B82F6', metric: '88%', metricLabel: 'delivery' },
    ],
  },
  {
    id: 'churn', icon: ShieldAlert,
    triggerMeta: [
      { id: 'T1', icon: ArrowLeftRight, color: '#EF4444' },
      { id: 'T2', icon: ThumbsDown, color: '#F59E0B' },
      { id: 'T3', icon: EyeOff, color: '#8B5CF6' },
      { id: 'T4', icon: AlertTriangle, color: '#EC4899' },
    ],
    channelMeta: { label: 'WhatsApp', icon: MessageSquare, color: '#25D366', metric: '92%', metricLabel: 'delivery' },
    conditionMeta: [
      { id: 'B1', icon: CheckCircle2, color: '#22C55E', metric: '34%', metricLabel: 'retention' },
      { id: 'B2', icon: Phone, color: '#F59E0B', metric: '62%', metricLabel: 'contact' },
      { id: 'B3', icon: Hash, color: '#8B5CF6', metric: '96%', metricLabel: 'delivery' },
    ],
    resultMeta: [
      { id: 'R1', icon: ShieldCheck, color: '#CDFF00', metric: '34%', metricLabel: 'save rate' },
      { id: 'R2', icon: Phone, color: '#00D4AA', metric: '62%', metricLabel: 'contact' },
      { id: 'R3', icon: Send, color: '#3B82F6', metric: '96%', metricLabel: 'delivery' },
    ],
  },
  {
    id: 'onboarding', icon: UserPlus,
    triggerMeta: [
      { id: 'T1', icon: Smartphone, color: '#22C55E' },
      { id: 'T2', icon: Cpu, color: '#3B82F6' },
      { id: 'T3', icon: CreditCard, color: '#F59E0B' },
      { id: 'T4', icon: UserCheck, color: '#8B5CF6' },
    ],
    channelMeta: { label: 'SMS', icon: Hash, color: '#8B5CF6', metric: '97%', metricLabel: 'delivery' },
    conditionMeta: [
      { id: 'B1', icon: MessageSquare, color: '#25D366', metric: '71%', metricLabel: 'engagement' },
      { id: 'B2', icon: Smartphone, color: '#CDFF00', metric: '89%', metricLabel: 'open' },
      { id: 'B3', icon: Mail, color: '#3B82F6', metric: '+12pts', metricLabel: 'NPS' },
    ],
    resultMeta: [
      { id: 'R1', icon: CheckCircle2, color: '#CDFF00', metric: '71%', metricLabel: 'activation' },
      { id: 'R2', icon: Smartphone, color: '#00D4AA', metric: '89%', metricLabel: 'open' },
      { id: 'R3', icon: Star, color: '#3B82F6', metric: '+12', metricLabel: 'NPS' },
    ],
  },
  {
    id: 'crosssell', icon: Smartphone,
    triggerMeta: [
      { id: 'T1', icon: Clock, color: '#3B82F6' },
      { id: 'T2', icon: Smartphone, color: '#F59E0B' },
      { id: 'T3', icon: TrendingUp, color: '#22C55E' },
      { id: 'T4', icon: Award, color: '#8B5CF6' },
    ],
    channelMeta: { label: 'RCS', icon: MessageCircle, color: '#4285F4', metric: '85%', metricLabel: 'delivery' },
    conditionMeta: [
      { id: 'B1', icon: MessageSquare, color: '#25D366', metric: '8%', metricLabel: 'conversion' },
      { id: 'B2', icon: Smartphone, color: '#CDFF00', metric: '12%', metricLabel: 'CTR' },
      { id: 'B3', icon: Hash, color: '#8B5CF6', metric: '95%', metricLabel: 'delivery' },
    ],
    resultMeta: [
      { id: 'R1', icon: DollarSign, color: '#CDFF00', metric: '8%', metricLabel: 'sale' },
      { id: 'R2', icon: Target, color: '#00D4AA', metric: '12%', metricLabel: 'CTR' },
      { id: 'R3', icon: Globe, color: '#3B82F6', metric: '95%', metricLabel: 'delivery' },
    ],
  },
  {
    id: 'carrito', icon: ShoppingCart,
    triggerMeta: [
      { id: 'T1', icon: ShoppingCart, color: '#EF4444' },
      { id: 'T2', icon: CreditCard, color: '#F59E0B' },
      { id: 'T3', icon: Ban, color: '#8B5CF6' },
      { id: 'T4', icon: AlertTriangle, color: '#EC4899' },
    ],
    channelMeta: { label: 'WhatsApp', icon: MessageSquare, color: '#25D366', metric: '93%', metricLabel: 'delivery' },
    conditionMeta: [
      { id: 'B1', icon: CheckCircle2, color: '#22C55E', metric: '19%', metricLabel: 'recovery' },
      { id: 'B2', icon: Smartphone, color: '#CDFF00', metric: '22%', metricLabel: 'CTR' },
      { id: 'B3', icon: Mail, color: '#3B82F6', metric: '91%', metricLabel: 'delivery' },
    ],
    resultMeta: [
      { id: 'R1', icon: ShoppingCart, color: '#CDFF00', metric: '19%', metricLabel: 'recovery' },
      { id: 'R2', icon: Target, color: '#00D4AA', metric: '22%', metricLabel: 'CTR' },
      { id: 'R3', icon: Mail, color: '#3B82F6', metric: '91%', metricLabel: 'delivery' },
    ],
  },
  {
    id: 'reactivacion', icon: RefreshCcw,
    triggerMeta: [
      { id: 'T1', icon: EyeOff, color: '#EF4444' },
      { id: 'T2', icon: CreditCard, color: '#F59E0B' },
      { id: 'T3', icon: DollarSign, color: '#8B5CF6' },
      { id: 'T4', icon: Clock, color: '#EC4899' },
    ],
    channelMeta: { label: 'SAT Push', icon: Smartphone, color: '#CDFF00', metric: '90%', metricLabel: 'delivery' },
    conditionMeta: [
      { id: 'B1', icon: CheckCircle2, color: '#22C55E', metric: '15%', metricLabel: 'reactivation' },
      { id: 'B2', icon: MessageSquare, color: '#25D366', metric: '11%', metricLabel: 'CTR' },
      { id: 'B3', icon: Mail, color: '#3B82F6', metric: '89%', metricLabel: 'delivery' },
    ],
    resultMeta: [
      { id: 'R1', icon: RefreshCcw, color: '#CDFF00', metric: '15%', metricLabel: 'reactivation' },
      { id: 'R2', icon: Target, color: '#00D4AA', metric: '11%', metricLabel: 'win-back' },
      { id: 'R3', icon: Mail, color: '#3B82F6', metric: '89%', metricLabel: 'delivery' },
    ],
  },
];

/* Legacy useCases array kept for type compat — now unused */
const useCases: UseCaseData[] = [
  {
    id: 'migracion',
    label: 'Migración de Plan',
    icon: ArrowUpRight,
    titleBar: 'Journey Builder \u2014 Migraci\u00f3n Prepago a Pospago',
    triggers: [
      { id: 'T1', label: 'Fin de cuota', sub: 'Data plan agotado', icon: WifiOff, color: '#EF4444', x: 0, y: 0, type: 'trigger' },
      { id: 'T2', label: 'Vencimiento', sub: 'Plan vence en 3 d\u00edas', icon: Clock, color: '#F59E0B', x: 0, y: 1, type: 'trigger' },
      { id: 'T3', label: 'Nuevo cliente', sub: 'Alta hace 24hs', icon: UserCheck, color: '#22C55E', x: 0, y: 2, type: 'trigger' },
      { id: 'T4', label: 'Portabilidad', sub: 'Solicitud detectada', icon: ArrowLeftRight, color: '#EC4899', x: 0, y: 3, type: 'trigger' },
    ],
    channel: { label: 'SAT Push', sub: 'Oferta Migraci\u00f3n', icon: Smartphone, color: '#CDFF00', message: 'Migr\u00e1 a Pospago y llevate 50GB + Netflix gratis', metric: '89%', metricLabel: 'delivery' },
    conditions: [
      { id: 'B1', label: 'Acepta', sub: 'Conversi\u00f3n + SMS', icon: CheckCircle2, color: '#22C55E', metric: '22%', metricLabel: 'conv.', x: 2, y: 0, type: 'condition' },
      { id: 'B2', label: 'Rechaza', sub: 'WhatsApp 50% OFF', icon: MessageSquare, color: '#25D366', metric: '18%', metricLabel: 'CTR', x: 2, y: 1, type: 'condition' },
      { id: 'B3', label: 'No entregado', sub: 'SMS fallback', icon: Hash, color: '#8B5CF6', metric: '94%', metricLabel: 'delivery', x: 2, y: 2, type: 'condition' },
    ],
    results: [
      { id: 'R1', label: 'Upsell', sub: 'ARPU +$2.4', icon: TrendingUp, color: '#CDFF00', metric: '+$2.4', metricLabel: 'ARPU', x: 3, y: 0, type: 'result' },
      { id: 'R2', label: 'Retenci\u00f3n', sub: 'Win-back 67%', icon: Target, color: '#00D4AA', metric: '67%', metricLabel: 'win-back', x: 3, y: 1, type: 'result' },
      { id: 'R3', label: 'Fallback OK', sub: 'Mensaje entregado', icon: Send, color: '#3B82F6', metric: '91%', metricLabel: 'sent', x: 3, y: 2, type: 'result' },
    ],
  },
  {
    id: 'vencimiento',
    label: 'Vencimiento de Datos',
    icon: Clock,
    titleBar: 'Journey Builder \u2014 Vencimiento de Datos',
    triggers: [
      { id: 'T1', label: 'Consumo >80%', sub: 'Umbral alcanzado', icon: Gauge, color: '#F59E0B', x: 0, y: 0, type: 'trigger' },
      { id: 'T2', label: 'Cuota al 95%', sub: 'Casi agotado', icon: AlertTriangle, color: '#EF4444', x: 0, y: 1, type: 'trigger' },
      { id: 'T3', label: 'Plan vence 24hs', sub: 'Vencimiento pr\u00f3ximo', icon: Clock, color: '#F59E0B', x: 0, y: 2, type: 'trigger' },
      { id: 'T4', label: 'Recarga frecuente', sub: 'Patr\u00f3n detectado', icon: CreditCard, color: '#8B5CF6', x: 0, y: 3, type: 'trigger' },
    ],
    channel: { label: 'SAT Push', sub: 'Oferta Datos Extra', icon: Smartphone, color: '#CDFF00', message: 'Tu plan de datos est\u00e1 por vencerse. Activ\u00e1 5GB extra por $3/mes', metric: '91%', metricLabel: 'delivery' },
    conditions: [
      { id: 'B1', label: 'Acepta', sub: 'Conversi\u00f3n + SMS', icon: CheckCircle2, color: '#22C55E', metric: '28%', metricLabel: 'conv.', x: 2, y: 0, type: 'condition' },
      { id: 'B2', label: 'Rechaza', sub: 'WhatsApp planes', icon: MessageSquare, color: '#25D366', metric: '15%', metricLabel: 'CTR', x: 2, y: 1, type: 'condition' },
      { id: 'B3', label: 'No entregado', sub: 'Email recordatorio', icon: Mail, color: '#3B82F6', metric: '92%', metricLabel: 'delivery', x: 2, y: 2, type: 'condition' },
    ],
    results: [
      { id: 'R1', label: 'Revenue', sub: '+$1.8/user', icon: DollarSign, color: '#CDFF00', metric: '+$1.8', metricLabel: 'revenue', x: 3, y: 0, type: 'result' },
      { id: 'R2', label: 'Reactivaci\u00f3n', sub: '45% reactivados', icon: RefreshCcw, color: '#00D4AA', metric: '45%', metricLabel: 'reactivaci\u00f3n', x: 3, y: 1, type: 'result' },
      { id: 'R3', label: 'Email', sub: 'Entrega 88%', icon: Mail, color: '#3B82F6', metric: '88%', metricLabel: 'delivery', x: 3, y: 2, type: 'result' },
    ],
  },
  {
    id: 'churn',
    label: 'Prevenci\u00f3n de Churn',
    icon: ShieldAlert,
    titleBar: 'Journey Builder \u2014 Prevenci\u00f3n de Churn',
    triggers: [
      { id: 'T1', label: 'Portabilidad', sub: 'Solicitud detectada', icon: ArrowLeftRight, color: '#EF4444', x: 0, y: 0, type: 'trigger' },
      { id: 'T2', label: 'NPS negativo', sub: 'Score < 6', icon: ThumbsDown, color: '#F59E0B', x: 0, y: 1, type: 'trigger' },
      { id: 'T3', label: 'Inactividad 15d', sub: 'Sin uso detectado', icon: EyeOff, color: '#8B5CF6', x: 0, y: 2, type: 'trigger' },
      { id: 'T4', label: 'Reclamo abierto', sub: 'Ticket pendiente', icon: AlertTriangle, color: '#EC4899', x: 0, y: 3, type: 'trigger' },
    ],
    channel: { label: 'WhatsApp', sub: 'Oferta Retenci\u00f3n', icon: MessageSquare, color: '#25D366', message: 'Sabemos que est\u00e1s evaluando opciones. Tenemos una oferta exclusiva para ti', metric: '92%', metricLabel: 'delivery' },
    conditions: [
      { id: 'B1', label: 'Acepta', sub: 'SAT Push loyalty', icon: CheckCircle2, color: '#22C55E', metric: '34%', metricLabel: 'retenci\u00f3n', x: 2, y: 0, type: 'condition' },
      { id: 'B2', label: 'Rechaza', sub: 'Llamada agente', icon: Phone, color: '#F59E0B', metric: '62%', metricLabel: 'contacto', x: 2, y: 1, type: 'condition' },
      { id: 'B3', label: 'No entregado', sub: 'SMS oferta final', icon: Hash, color: '#8B5CF6', metric: '96%', metricLabel: 'delivery', x: 2, y: 2, type: 'condition' },
    ],
    results: [
      { id: 'R1', label: 'Save rate', sub: '34% retenidos', icon: ShieldCheck, color: '#CDFF00', metric: '34%', metricLabel: 'save rate', x: 3, y: 0, type: 'result' },
      { id: 'R2', label: 'Contacto', sub: 'Agente 62%', icon: Phone, color: '#00D4AA', metric: '62%', metricLabel: 'contacto', x: 3, y: 1, type: 'result' },
      { id: 'R3', label: '\u00daltimo intento', sub: 'SMS delivery 96%', icon: Send, color: '#3B82F6', metric: '96%', metricLabel: 'delivery', x: 3, y: 2, type: 'result' },
    ],
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    icon: UserPlus,
    titleBar: 'Journey Builder \u2014 Onboarding',
    triggers: [
      { id: 'T1', label: 'Alta nueva SIM', sub: 'SIM activada', icon: Smartphone, color: '#22C55E', x: 0, y: 0, type: 'trigger' },
      { id: 'T2', label: 'Activaci\u00f3n eSIM', sub: 'eSIM provisionada', icon: Cpu, color: '#3B82F6', x: 0, y: 1, type: 'trigger' },
      { id: 'T3', label: 'Primera recarga', sub: 'Recarga inicial', icon: CreditCard, color: '#F59E0B', x: 0, y: 2, type: 'trigger' },
      { id: 'T4', label: 'Registro app', sub: 'App instalada', icon: UserCheck, color: '#8B5CF6', x: 0, y: 3, type: 'trigger' },
    ],
    channel: { label: 'SMS', sub: 'Bienvenida', icon: Hash, color: '#8B5CF6', message: '\u00a1Bienvenido a [Operador]! Configur\u00e1 tu plan ideal en 2 minutos', metric: '97%', metricLabel: 'delivery' },
    conditions: [
      { id: 'B1', label: 'Acepta', sub: 'WhatsApp tutorial', icon: MessageSquare, color: '#25D366', metric: '71%', metricLabel: 'engagement', x: 2, y: 0, type: 'condition' },
      { id: 'B2', label: 'No responde', sub: 'SAT Push reminder', icon: Smartphone, color: '#CDFF00', metric: '89%', metricLabel: 'apertura', x: 2, y: 1, type: 'condition' },
      { id: 'B3', label: 'Completa', sub: 'Email resumen', icon: Mail, color: '#3B82F6', metric: '+12pts', metricLabel: 'NPS', x: 2, y: 2, type: 'condition' },
    ],
    results: [
      { id: 'R1', label: 'Activaci\u00f3n', sub: 'Completa 71%', icon: CheckCircle2, color: '#CDFF00', metric: '71%', metricLabel: 'activaci\u00f3n', x: 3, y: 0, type: 'result' },
      { id: 'R2', label: 'Recordatorio', sub: 'Apertura 89%', icon: Smartphone, color: '#00D4AA', metric: '89%', metricLabel: 'apertura', x: 3, y: 1, type: 'result' },
      { id: 'R3', label: 'NPS boost', sub: '+12 puntos', icon: Star, color: '#3B82F6', metric: '+12', metricLabel: 'NPS', x: 3, y: 2, type: 'result' },
    ],
  },
  {
    id: 'crosssell',
    label: 'Cross-sell Terminal',
    icon: Smartphone,
    titleBar: 'Journey Builder \u2014 Cross-sell Terminal',
    triggers: [
      { id: 'T1', label: 'Contrato >12m', sub: 'Elegible upgrade', icon: Clock, color: '#3B82F6', x: 0, y: 0, type: 'trigger' },
      { id: 'T2', label: 'Terminal antigua', sub: 'Modelo >2 a\u00f1os', icon: Smartphone, color: '#F59E0B', x: 0, y: 1, type: 'trigger' },
      { id: 'T3', label: 'Consumo data alto', sub: '>10GB/mes', icon: TrendingUp, color: '#22C55E', x: 0, y: 2, type: 'trigger' },
      { id: 'T4', label: 'Upgrade elegible', sub: 'Marcado en CRM', icon: Award, color: '#8B5CF6', x: 0, y: 3, type: 'trigger' },
    ],
    channel: { label: 'RCS', sub: 'Carrusel Equipos', icon: MessageCircle, color: '#4285F4', message: 'Carrusel de equipos con im\u00e1genes y precios', metric: '85%', metricLabel: 'delivery' },
    conditions: [
      { id: 'B1', label: 'Acepta', sub: 'WhatsApp financiaci\u00f3n', icon: MessageSquare, color: '#25D366', metric: '8%', metricLabel: 'conversi\u00f3n', x: 2, y: 0, type: 'condition' },
      { id: 'B2', label: 'Rechaza', sub: 'SAT Push oferta', icon: Smartphone, color: '#CDFF00', metric: '12%', metricLabel: 'CTR', x: 2, y: 1, type: 'condition' },
      { id: 'B3', label: 'No entregado', sub: 'SMS link web', icon: Hash, color: '#8B5CF6', metric: '95%', metricLabel: 'delivery', x: 2, y: 2, type: 'condition' },
    ],
    results: [
      { id: 'R1', label: 'Venta terminal', sub: '8% conversi\u00f3n', icon: DollarSign, color: '#CDFF00', metric: '8%', metricLabel: 'venta', x: 3, y: 0, type: 'result' },
      { id: 'R2', label: 'Oferta push', sub: '12% CTR', icon: Target, color: '#00D4AA', metric: '12%', metricLabel: 'CTR', x: 3, y: 1, type: 'result' },
      { id: 'R3', label: 'Web traffic', sub: '95% entregados', icon: Globe, color: '#3B82F6', metric: '95%', metricLabel: 'delivery', x: 3, y: 2, type: 'result' },
    ],
  },
  {
    id: 'carrito',
    label: 'Recupero de Carrito',
    icon: ShoppingCart,
    titleBar: 'Journey Builder \u2014 Recupero de Carrito',
    triggers: [
      { id: 'T1', label: 'Carrito abandonado', sub: 'App timeout', icon: ShoppingCart, color: '#EF4444', x: 0, y: 0, type: 'trigger' },
      { id: 'T2', label: 'Compra iniciada', sub: 'Web checkout', icon: CreditCard, color: '#F59E0B', x: 0, y: 1, type: 'trigger' },
      { id: 'T3', label: 'Checkout incompleto', sub: 'Paso 3 abandonado', icon: Ban, color: '#8B5CF6', x: 0, y: 2, type: 'trigger' },
      { id: 'T4', label: 'Pago fallido', sub: 'Error transacci\u00f3n', icon: AlertTriangle, color: '#EC4899', x: 0, y: 3, type: 'trigger' },
    ],
    channel: { label: 'WhatsApp', sub: 'Recupero', icon: MessageSquare, color: '#25D366', message: 'Tu [producto] te est\u00e1 esperando. Complet\u00e1 tu compra con 10% OFF', metric: '93%', metricLabel: 'delivery' },
    conditions: [
      { id: 'B1', label: 'Acepta', sub: 'Conversi\u00f3n directa', icon: CheckCircle2, color: '#22C55E', metric: '19%', metricLabel: 'recupero', x: 2, y: 0, type: 'condition' },
      { id: 'B2', label: 'Rechaza', sub: 'SAT Push 24hs', icon: Smartphone, color: '#CDFF00', metric: '22%', metricLabel: 'CTR', x: 2, y: 1, type: 'condition' },
      { id: 'B3', label: 'No entregado', sub: 'Email con cup\u00f3n', icon: Mail, color: '#3B82F6', metric: '91%', metricLabel: 'delivery', x: 2, y: 2, type: 'condition' },
    ],
    results: [
      { id: 'R1', label: 'Recupero', sub: '19% conversi\u00f3n', icon: ShoppingCart, color: '#CDFF00', metric: '19%', metricLabel: 'recupero', x: 3, y: 0, type: 'result' },
      { id: 'R2', label: 'Reminder', sub: '22% CTR', icon: Target, color: '#00D4AA', metric: '22%', metricLabel: 'CTR', x: 3, y: 1, type: 'result' },
      { id: 'R3', label: 'Cup\u00f3n email', sub: '91% entregados', icon: Mail, color: '#3B82F6', metric: '91%', metricLabel: 'delivery', x: 3, y: 2, type: 'result' },
    ],
  },
  {
    id: 'reactivacion',
    label: 'Reactivaci\u00f3n',
    icon: RefreshCcw,
    titleBar: 'Journey Builder \u2014 Reactivaci\u00f3n',
    triggers: [
      { id: 'T1', label: 'Inactivo 30 d\u00edas', sub: 'Sin actividad', icon: EyeOff, color: '#EF4444', x: 0, y: 0, type: 'trigger' },
      { id: 'T2', label: 'Sin recarga 45d', sub: 'Saldo agotado', icon: CreditCard, color: '#F59E0B', x: 0, y: 1, type: 'trigger' },
      { id: 'T3', label: 'Saldo $0', sub: 'Sin fondos', icon: DollarSign, color: '#8B5CF6', x: 0, y: 2, type: 'trigger' },
      { id: 'T4', label: '\u00daltima sesi\u00f3n >30d', sub: 'App inactiva', icon: Clock, color: '#EC4899', x: 0, y: 3, type: 'trigger' },
    ],
    channel: { label: 'SAT Push', sub: 'Win-back', icon: Smartphone, color: '#CDFF00', message: '\u00a1Te extra\u00f1amos! Recarg\u00e1 hoy y llevate el doble de datos', metric: '90%', metricLabel: 'delivery' },
    conditions: [
      { id: 'B1', label: 'Acepta', sub: 'Conversi\u00f3n + SMS', icon: CheckCircle2, color: '#22C55E', metric: '15%', metricLabel: 'reactivaci\u00f3n', x: 2, y: 0, type: 'condition' },
      { id: 'B2', label: 'Rechaza', sub: 'WhatsApp beneficio', icon: MessageSquare, color: '#25D366', metric: '11%', metricLabel: 'CTR', x: 2, y: 1, type: 'condition' },
      { id: 'B3', label: 'No entregado', sub: 'Email win-back', icon: Mail, color: '#3B82F6', metric: '89%', metricLabel: 'delivery', x: 2, y: 2, type: 'condition' },
    ],
    results: [
      { id: 'R1', label: 'Reactivaci\u00f3n', sub: '15% reactivados', icon: RefreshCcw, color: '#CDFF00', metric: '15%', metricLabel: 'reactivaci\u00f3n', x: 3, y: 0, type: 'result' },
      { id: 'R2', label: 'Win-back', sub: '11% CTR', icon: Target, color: '#00D4AA', metric: '11%', metricLabel: 'win-back', x: 3, y: 1, type: 'result' },
      { id: 'R3', label: 'Email', sub: '89% entregados', icon: Mail, color: '#3B82F6', metric: '89%', metricLabel: 'delivery', x: 3, y: 2, type: 'result' },
    ],
  },
];

function BuilderNodeCard({ node, index }: { node: BuilderNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ scale: 1.04, y: -2 }}
      className="relative bg-deep/80 backdrop-blur-sm border rounded-xl p-4 min-w-[150px] cursor-default"
      style={{ borderColor: `${node.color}30` }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${node.color}15` }}
        >
          <node.icon className="w-4 h-4" style={{ color: node.color }} />
        </div>
        <div>
          <div className="text-white font-semibold text-sm font-heading leading-tight">
            {node.label}
          </div>
          <div className="text-white/40 text-xs">{node.sub}</div>
        </div>
      </div>
      {node.metric && (
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
          <span className="text-xs text-white/40">{node.metricLabel}</span>
          <span
            className="text-sm font-bold font-heading"
            style={{ color: node.color }}
          >
            {node.metric}
          </span>
        </div>
      )}
      {/* Pulse dot */}
      <motion.div
        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: node.color }}
        animate={{
          boxShadow: [
            `0 0 0 0px ${node.color}40`,
            `0 0 0 6px ${node.color}00`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />
    </motion.div>
  );
}

export function JourneyBuilderSection() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  const [activeCase, setActiveCase] = useState(0);
  const struct = useCaseStructure[activeCase];
  const ucText = t.useCases[activeCase];
  const ChannelIcon = struct.channelMeta.icon;

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
            {t.builder.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
            {t.builder.title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            {t.builder.subtitle}
          </p>
        </motion.div>

        {/* Use case tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-8 -mx-6 px-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
            {useCaseStructure.map((uc, i) => {
              const Icon = uc.icon;
              const isActive = i === activeCase;
              return (
                <button
                  key={uc.id}
                  onClick={() => setActiveCase(i)}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors shrink-0"
                  style={{
                    color: isActive ? '#0a0a0f' : 'rgba(255,255,255,0.4)',
                    background: 'transparent',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeUseCasePill"
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-white/[0.05] hover:bg-white/[0.08] transition-colors" />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{t.useCases[i].label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Platform window frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Window chrome */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 text-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={struct.id + '-title'}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/50 text-xs font-medium inline-block"
                  >
                    {ucText.titleBar}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-lime/70 font-medium">Live</span>
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              </div>
            </div>

            {/* Canvas */}
            <div className="relative p-4 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[500px] overflow-hidden sm:overflow-x-auto">
              {/* Dot grid background */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Flow layout with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={struct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
                >
                  {/* Column 0: Triggers */}
                  <div className="space-y-4">
                    <div className="text-xs text-white/30 font-medium uppercase tracking-wider mb-3">
                      {t.builder.colTriggers}
                    </div>
                    {struct.triggerMeta.map((tm, i) => (
                      <BuilderNodeCard key={tm.id} node={{ id: tm.id, label: ucText.triggers[i].label, sub: ucText.triggers[i].sub, icon: tm.icon, color: tm.color, x: 0, y: i, type: 'trigger' }} index={i} />
                    ))}
                  </div>

                  {/* Column 1: AI Brain + Main channel + Ghost channels */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-xs text-white/30 font-medium uppercase tracking-wider mb-3">
                      {t.builder.colAction}
                    </div>

                    {/* AI Brain node */}
                    <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                      <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider">AI Dynamo Brain</span>
                    </div>
                    <div className="w-px h-4 bg-gradient-to-b from-purple-500/40 to-lime/40 mb-2" />

                    {/* Main channel card */}
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-2xl blur-xl" style={{ backgroundColor: `${struct.channelMeta.color}08` }} />
                      <div
                        className="relative bg-deep/80 backdrop-blur-sm border-2 rounded-xl p-5 min-w-[170px]"
                        style={{ borderColor: `${struct.channelMeta.color}30` }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${struct.channelMeta.color}15` }}
                          >
                            <ChannelIcon className="w-5 h-5" style={{ color: struct.channelMeta.color }} />
                          </div>
                          <div>
                            <div className="text-white font-bold font-heading">
                              {struct.channelMeta.label}
                            </div>
                            <div className="text-white/40 text-xs">
                              {ucText.channel.sub}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/[0.04] rounded-lg p-3 text-xs text-white/50 leading-relaxed">
                          &quot;{ucText.channel.message}&quot;
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.06]">
                          <span className="text-xs text-white/40">
                            {struct.channelMeta.metricLabel}
                          </span>
                          <span className="text-sm font-bold font-heading" style={{ color: struct.channelMeta.color }}>
                            {struct.channelMeta.metric}
                          </span>
                        </div>
                      </div>

                      {/* Ghost channels (right side, faded) */}
                      <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1.5 opacity-25">
                        {['SMS', 'WA', 'RCS', 'Email'].map((ch) => (
                          <div key={ch} className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">
                            <span className="text-[8px] text-white/50 font-medium">{ch}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Conditions */}
                  <div className="space-y-4">
                    <div className="text-xs text-white/30 font-medium uppercase tracking-wider mb-3">
                      {t.builder.colConditions}
                    </div>
                    {struct.conditionMeta.map((cm, i) => (
                      <BuilderNodeCard key={cm.id} node={{ id: cm.id, label: ucText.conditions[i].label, sub: ucText.conditions[i].sub, icon: cm.icon, color: cm.color, metric: cm.metric, metricLabel: cm.metricLabel, x: 2, y: i, type: 'condition' }} index={i + 5} />
                    ))}
                  </div>

                  {/* Column 3: Results */}
                  <div className="space-y-4">
                    <div className="text-xs text-white/30 font-medium uppercase tracking-wider mb-3">
                      {t.builder.colResults}
                    </div>
                    {struct.resultMeta.map((rm, i) => (
                      <BuilderNodeCard key={rm.id} node={{ id: rm.id, label: ucText.results[i].label, sub: ucText.results[i].sub, icon: rm.icon, color: rm.color, metric: rm.metric, metricLabel: rm.metricLabel, x: 3, y: i, type: 'result' }} index={i + 8} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Animated connection lines (CSS-only between columns on md+) */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute left-[25%] top-[20%] w-px h-[60%]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(205,255,0,0.2), transparent)',
                  }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute left-[50%] top-[15%] w-px h-[70%]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(59,42,206,0.3), transparent)',
                  }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute left-[75%] top-[15%] w-px h-[70%]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(0,212,170,0.2), transparent)',
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Below builder caption + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.builder.belowCaption}{' '}
            <span className="text-lime font-semibold">{t.builder.belowCaptionHighlight}</span>.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 mt-6 text-lime hover:text-lime/80 font-semibold transition-colors"
          >
            {t.builder.belowCTA}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 3 — CHANNELS
   ═══════════════════════════════════════════════════════════════════════ */

interface ChannelData {
  name: string;
  icon: LucideIcon;
  color: string;
  desc: string;
  example: string;
  ctas?: string;
  featured?: boolean;
}

const channels: ChannelData[] = [
  {
    name: 'SAT Push',
    icon: Smartphone,
    color: '#CDFF00',
    desc: 'Notificaciones nativas en la SIM del suscriptor. Sin app, sin internet. El canal con mayor alcance y deliverability del mercado.',
    example: '"Activa tu pack de 10GB por solo $5/mes. Responde 1 para activar."',
    ctas: 'Click to SMS, Call, Browser, USSD',
    featured: true,
  },
  {
    name: 'WhatsApp',
    icon: MessageSquare,
    color: '#25D366',
    desc: 'Mensajes ricos con botones, listas y carruseles. Ideal para conversaciones interactivas.',
    example: '"Hola Juan, tu plan vence mañana. Renueva con 20% OFF →"',
  },
  {
    name: 'RCS',
    icon: MessageCircle,
    color: '#4285F4',
    desc: 'El futuro del SMS. Carruseles, botones y rich media directamente en la app de mensajes.',
    example: '[Carrusel] 3 planes con imágenes, precios y botón "Activar"',
  },
  {
    name: 'SMS',
    icon: Hash,
    color: '#8B5CF6',
    desc: 'El canal universal. Llega a todos los dispositivos, sin importar la tecnología.',
    example: '"DYNAMO: Tu recarga de $10 fue exitosa. Saldo: $15.50"',
  },
  {
    name: 'Email',
    icon: Mail,
    color: '#EA4335',
    desc: 'Comunicaciones detalladas con diseño responsive y tracking completo.',
    example: 'Newsletter con resumen de consumo mensual y ofertas personalizadas',
  },
  {
    name: 'Instagram DM',
    icon: Camera,
    color: '#E1306C',
    desc: 'Respuestas automatizadas y campañas en el DM más usado por los jóvenes.',
    example: '"¡Hola! Tenemos una oferta exclusiva para ti. Desliza para ver →"',
  },
  {
    name: 'Messenger',
    icon: Send,
    color: '#0084FF',
    desc: 'Chatbots y flows automatizados en Facebook Messenger para atención y ventas.',
    example: '"Tu ticket #4521 fue resuelto. ¿Necesitas algo más?"',
  },
  {
    name: 'USSD',
    icon: Radio,
    color: '#FF9800',
    desc: 'Menús interactivos en dispositivos básicos. Perfecto para mercados emergentes.',
    example: '*123# → 1. Ver saldo → 2. Recargar → 3. Ofertas',
  },
];

export function ChannelsSection() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative" id="canales">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/[0.04] via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
            {t.channels.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
            {t.channels.title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            {t.channels.desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6, boxShadow: `0 0 40px ${ch.color}15` }}
              className={`group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.15] transition-all duration-300 ${
                ch.featured ? 'sm:col-span-2 sm:row-span-1' : ''
              }`}
            >
              {/* Featured badge */}
              {ch.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-lime/10 border border-lime/20 rounded-full px-3 py-1">
                  <Star className="w-3 h-3 text-lime" />
                  <span className="text-lime text-[10px] font-bold uppercase tracking-wider">
                    {t.channels.starLabel}
                  </span>
                </div>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${ch.color}12` }}
              >
                <ch.icon className="w-6 h-6" style={{ color: ch.color }} />
              </div>

              <h3 className="text-white font-semibold text-lg font-heading">
                {ch.name}
              </h3>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                {t.channels.items[i]?.desc || ch.desc}
              </p>

              {/* CTAs for SAT Push */}
              {ch.ctas && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ch.ctas.split(', ').map((cta) => (
                    <span
                      key={cta}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-lime/20 text-lime/70"
                    >
                      {cta}
                    </span>
                  ))}
                </div>
              )}

              {/* Color accent dot */}
              <div
                className="absolute top-4 left-4 w-2 h-2 rounded-full opacity-60"
                style={{ backgroundColor: ch.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 4 — CAPABILITIES (6 capabilities, expanded)
   ═══════════════════════════════════════════════════════════════════════ */

interface Capability {
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string[];
  color: string;
}

const capabilities: Capability[] = [
  {
    icon: Network,
    title: 'Orquestación completa',
    desc: 'Coordiná 8+ canales con lógica de prioridad, fallback y timing. Cada suscriptor recibe el mensaje correcto, en el canal correcto, en el momento correcto.',
    details: [
      'WhatsApp, SAT Push, RCS, SMS, Email, USSD, Instagram DM, Messenger',
      'Fallback automático si el canal primario falla',
      'Priorización por costo, deliverability o preferencia del usuario',
    ],
    color: '#3B2ACE',
  },
  {
    icon: BarChart3,
    title: 'Estadísticas y KPIs',
    desc: 'Medí todo el funnel: desde el envío hasta la conversión final. Dashboards en tiempo real con los KPIs que importan.',
    details: [
      'Funnel: Intent → Sent → Delivered → Read → Click → Conversion',
      'Comparación de performance por canal',
      'Exportación a BI y reportes automáticos',
    ],
    color: '#CDFF00',
  },
  {
    icon: Zap,
    title: 'Triggers basados en comportamiento',
    desc: 'Detecta eventos de red, billing y comportamiento en tiempo real. Cada evento se convierte en una oportunidad de engagement.',
    details: [
      'Eventos de red: fin de cuota, cambio de zona, roaming',
      'Eventos de billing: recarga, vencimiento, mora',
      'Eventos de comportamiento: NPS bajo, churn risk, portabilidad',
    ],
    color: '#5F4EE0',
  },
  {
    icon: ShieldCheck,
    title: 'Motor de reglas',
    desc: 'Controla cuándo, cómo y a quién le envías. Reglas de negocio que protegen la experiencia del suscriptor y el revenue.',
    details: [
      'Windowing: horarios permitidos por región y canal',
      'Anti-spam: frecuencia máxima por suscriptor',
      'Blacklist/Whitelist: control granular de audiencias',
      'SDP Billing y bandwidth management',
    ],
    color: '#00D4AA',
  },
  {
    icon: Layers,
    title: 'Campaign Manager 4-en-1',
    desc: 'Cuatro modos en un solo motor: campañas individuales, programáticas, basadas en eventos y journeys completos.',
    details: [
      'Single: campañas one-shot a audiencias específicas',
      'Programáticas: automatizadas por schedule y reglas',
      'Event-based: disparadas por triggers en tiempo real',
      'Journeys: flujos multi-step con condiciones y branching',
    ],
    color: '#8B5CF6',
  },
  {
    icon: BrainCircuit,
    title: 'Copilot AI + RTB',
    desc: 'Inteligencia artificial que optimiza en tiempo real: segmentación predictiva, personalización de contenido y bidding inteligente.',
    details: [
      'Segmentación predictiva con machine learning',
      'Optimización automática de horario y canal',
      'RTB (Real-Time Bidding) para maximizar conversión por costo',
      'Generación de contenido personalizado con AI',
    ],
    color: '#EC4899',
  },
];

export function CapabilitiesSection() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-lime text-sm font-medium tracking-widest uppercase">
            {t.capabilities.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
            {t.capabilities.title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            {t.capabilities.desc}
          </p>
        </motion.div>

        <div className="space-y-8">
          {capabilities.map((cap, i) => {
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  isReversed ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Text side */}
                <div className={isReversed ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${cap.color}15` }}
                    >
                      <cap.icon
                        className="w-6 h-6"
                        style={{ color: cap.color }}
                      />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white">
                      {t.capabilities.items[i]?.title || cap.title}
                    </h3>
                  </div>
                  <p className="text-white/60 leading-relaxed">{t.capabilities.items[i]?.desc || cap.desc}</p>
                  <ul className="mt-5 space-y-3">
                    {(t.capabilities.items[i]?.details || cap.details).map((d, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: cap.color }}
                        />
                        <span className="text-white/60 text-sm">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual side */}
                <div className={isReversed ? 'lg:order-1' : ''}>
                  <div
                    className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 overflow-hidden min-h-[200px] flex items-center justify-center"
                  >
                    {/* Abstract visual element */}
                    <div className="relative">
                      <motion.div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${cap.color}10`, border: `1px solid ${cap.color}25` }}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        <cap.icon
                          className="w-12 h-12"
                          style={{ color: cap.color, opacity: 0.6 }}
                        />
                      </motion.div>
                      <div
                        className="absolute -inset-8 rounded-full blur-3xl opacity-[0.08]"
                        style={{ backgroundColor: cap.color }}
                      />
                    </div>
                    {/* Corner metric */}
                    <div className="absolute bottom-4 right-4 text-xs text-white/20 font-heading">
                      0{i + 1}/06
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 5 — TRIGGERS (Interactive three-column flow)
   ═══════════════════════════════════════════════════════════════════════ */

const triggerEvents = [
  { label: 'Nuevo cliente', icon: UserCheck, color: '#22C55E' },
  { label: 'Fin de cuota de datos', icon: WifiOff, color: '#EF4444' },
  { label: 'Falta de saldo', icon: CreditCard, color: '#F59E0B' },
  { label: 'Servicios VAS', icon: Layers, color: '#8B5CF6' },
  { label: 'Compras/Beneficios', icon: ShoppingCart, color: '#3B82F6' },
  { label: 'Llamadas perdidas', icon: Phone, color: '#EC4899' },
  { label: 'Perfil de usuario', icon: Users, color: '#06B6D4' },
];

const marketingRules = [
  { label: 'Windowing', icon: Clock, color: '#3B2ACE' },
  { label: 'Blacklist', icon: Ban, color: '#EF4444' },
  { label: 'Whitelist', icon: ListFilter, color: '#22C55E' },
  { label: 'Anti-spam', icon: ShieldCheck, color: '#F59E0B' },
];

interface MockMessage {
  channel: string;
  icon: LucideIcon;
  color: string;
  title: string;
  body: string;
}

const mockMessages: MockMessage[] = [
  {
    channel: 'RCS',
    icon: MessageCircle,
    color: '#4285F4',
    title: 'Oferta personalizada',
    body: '[Carrusel] Pack Premium: 50GB + Spotify. Desliza para ver más ofertas →',
  },
  {
    channel: 'SAT Push',
    icon: Smartphone,
    color: '#CDFF00',
    title: 'Notificación SIM',
    body: '"Tu cuota de datos se agotó. Comprá 5GB por $3. Responde 1 para activar."',
  },
  {
    channel: 'SMS',
    icon: Hash,
    color: '#8B5CF6',
    title: 'Mensaje de texto',
    body: '"DYNAMO: Recargá $10 y recibí 3GB bonus + llamadas ilimitadas por 7 días."',
  },
];

export function TriggersSection() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-lime text-sm font-medium tracking-widest uppercase">
            {t.triggers.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
            {t.triggers.title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-3xl mx-auto">
            {t.triggers.desc}
          </p>
        </motion.div>

        {/* Three-column flow */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 items-start">
          {/* LEFT — Event triggers */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5">
                <CircleDot className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-xs font-medium uppercase tracking-wider">
                  {t.triggers.detectBadge}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {triggerEvents.map((ev, i) => (
                <motion.div
                  key={ev.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 hover:border-white/[0.12] transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${ev.color}12` }}
                  >
                    <ev.icon
                      className="w-4.5 h-4.5"
                      style={{ color: ev.color }}
                    />
                  </div>
                  <span className="text-white/70 text-sm font-medium">
                    {t.triggers.events[i] || ev.label}
                  </span>
                  {/* Animated pulse */}
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ backgroundColor: ev.color }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CENTER — Marketing Rules + API */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            {/* API connector */}
            <div className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-5 py-2"
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(59,42,206,0.2)',
                    '0 0 0 8px rgba(59,42,206,0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-xs font-bold uppercase tracking-wider">
                  API + Marketing Rules
                </span>
              </motion.div>
            </div>

            {/* Rule cards */}
            <div className="w-full space-y-3">
              {marketingRules.map((rule, i) => (
                <motion.div
                  key={rule.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${rule.color}12` }}
                  >
                    <rule.icon
                      className="w-4 h-4"
                      style={{ color: rule.color }}
                    />
                  </div>
                  <span className="text-white/70 text-sm font-medium">
                    {rule.label}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-green-500/50 ml-auto" />
                </motion.div>
              ))}
            </div>

            {/* Data flow animation */}
            <div className="my-6 flex items-center gap-2">
              <motion.div
                className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-lime"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 text-lime/60" />
              </motion.div>
              <motion.div
                className="w-8 h-0.5 bg-gradient-to-r from-lime to-purple-500"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>

            {/* User profile badge */}
            <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5">
              <Users className="w-4 h-4 text-white/40" />
              <span className="text-white/50 text-xs font-medium">
                {t.triggers.userProfile}
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Channel output mock messages */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/20 rounded-full px-4 py-1.5">
                <Send className="w-4 h-4 text-lime" />
                <span className="text-lime/80 text-xs font-medium uppercase tracking-wider">
                  {t.triggers.channelBadge}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* RCS — Mini phone with rich carousel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors"
              >
                {/* Phone frame header */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
                  <div className="w-6 h-6 rounded-full bg-[#4285F4]/20 flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-[#4285F4]" />
                  </div>
                  <span className="text-[#4285F4] text-xs font-bold uppercase tracking-wider">RCS</span>
                  <span className="text-white/30 text-[10px] ml-1">{t.triggers.mockMessages[0].title}</span>
                </div>
                {/* Carousel body */}
                <div className="p-3">
                  <div className="flex gap-2.5">
                    {/* Card 1 */}
                    <div className="flex-1 bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.06]">
                      <div className="h-16 bg-gradient-to-br from-[#4285F4]/30 to-purple-500/20" />
                      <div className="p-2.5">
                        <p className="text-white/70 text-[11px] font-semibold leading-tight">Plan Premium 50GB</p>
                        <p className="text-[#4285F4] text-xs font-bold mt-0.5">$15/mes</p>
                        <div className="mt-2 bg-[#4285F4]/20 border border-[#4285F4]/30 rounded-md py-1 text-center">
                          <span className="text-[#4285F4] text-[10px] font-semibold">Activar</span>
                        </div>
                      </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex-1 bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.06]">
                      <div className="h-16 bg-gradient-to-br from-purple-500/30 to-lime/20" />
                      <div className="p-2.5">
                        <p className="text-white/70 text-[11px] font-semibold leading-tight">Pack Familiar 20GB</p>
                        <p className="text-lime text-xs font-bold mt-0.5">$25/mes</p>
                        <div className="mt-2 bg-white/[0.06] border border-white/[0.08] rounded-md py-1 text-center">
                          <span className="text-white/50 text-[10px] font-semibold">Ver más</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-4 pb-2.5">
                  <CheckCircle2 className="w-3 h-3 text-green-500/50" />
                  <span className="text-green-500/50 text-[10px]">{t.triggers.delivered}</span>
                </div>
              </motion.div>

              {/* SAT Push — SIM notification popup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.52 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
                  <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center">
                    <Smartphone className="w-3 h-3 text-lime" />
                  </div>
                  <span className="text-lime text-xs font-bold uppercase tracking-wider">SAT Push</span>
                </div>
                {/* SAT Push popup mock */}
                <div className="p-3">
                  <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl p-4">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2">OPERADOR MÓVIL</p>
                    <p className="text-white/70 text-xs leading-relaxed">
                      {t.triggers.mockMessages[1].body.replace(/^"|"$/g, '')}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg py-1.5 text-center">
                        <span className="text-white/40 text-[11px] font-medium">{t.triggers.cancel}</span>
                      </div>
                      <div className="flex-1 bg-lime/20 border border-lime/30 rounded-lg py-1.5 text-center">
                        <span className="text-lime text-[11px] font-semibold">OK</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-4 pb-2.5">
                  <CheckCircle2 className="w-3 h-3 text-green-500/50" />
                  <span className="text-green-500/50 text-[10px]">{t.triggers.delivered}</span>
                </div>
              </motion.div>

              {/* SMS — Chat bubble style */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.64 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.06]">
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                    <Hash className="w-3 h-3 text-[#8B5CF6]" />
                  </div>
                  <span className="text-[#8B5CF6] text-xs font-bold uppercase tracking-wider">SMS</span>
                </div>
                {/* Chat bubble */}
                <div className="p-3">
                  <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-2xl rounded-tl-md px-4 py-3 max-w-[90%]">
                    <p className="text-white/70 text-xs leading-relaxed">
                      {t.triggers.mockMessages[2].body.replace(/^"|"$/g, '')}
                    </p>
                  </div>
                  <p className="text-white/20 text-[10px] mt-1.5 ml-1">14:32</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 pb-2.5">
                  <CheckCircle2 className="w-3 h-3 text-green-500/50" />
                  <span className="text-green-500/50 text-[10px]">{t.triggers.delivered}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 6 — ANALYTICS (Funnel + Channel comparison in platform frame)
   ═══════════════════════════════════════════════════════════════════════ */

const funnelSteps = [
  { label: 'Sent', value: '1.4M', width: 100, color: '#3B2ACE' },
  { label: 'Delivered', value: '1.2M', width: 86, color: '#5F4EE0' },
  { label: 'Read', value: '648.6K', width: 46, color: '#8A7DE8' },
  { label: 'Replied', value: '28.8K', width: 20, color: '#CDFF00' },
  { label: 'Clicks', value: '120.8K', width: 32, color: '#00D4AA' },
  { label: 'Conversions', value: '27.2K', width: 14, color: '#22C55E' },
];

const channelBars = [
  { name: 'SAT Push', rate: '2.8%', width: 100, color: '#CDFF00' },
  { name: 'WhatsApp', rate: '2.3%', width: 82, color: '#25D366' },
  { name: 'SMS', rate: '0.9%', width: 32, color: '#8B5CF6' },
  { name: 'Email', rate: '0.9%', width: 32, color: '#EA4335' },
];

export function AnalyticsSection() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.05] to-transparent" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-lime text-sm font-medium tracking-widest uppercase">
            {t.analytics.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
            {t.analytics.title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            {t.analytics.desc}
          </p>
        </motion.div>

        {/* Platform window frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/50 text-xs font-medium flex-1 text-center">
                {t.analytics.dashboardTitle}
              </span>
              <span className="text-xs text-white/30">Live</span>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Funnel */}
                <div>
                  <h4 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-6">
                    {t.analytics.funnelTitle}
                  </h4>
                  <div className="space-y-3">
                    {funnelSteps.map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="origin-left"
                        style={{ width: `${step.width}%`, minWidth: '200px' }}
                      >
                        <div
                          className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-lg border border-white/[0.04]"
                          style={{ backgroundColor: `${step.color}08` }}
                        >
                          <span className="text-white/60 text-sm font-medium whitespace-nowrap">
                            {step.label}
                          </span>
                          <span
                            className="text-sm font-bold font-heading whitespace-nowrap"
                            style={{ color: step.color }}
                          >
                            {step.value}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Channel comparison */}
                <div>
                  <h4 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-6">
                    {t.analytics.channelTitle}
                  </h4>
                  <div className="space-y-5">
                    {channelBars.map((ch, i) => (
                      <motion.div
                        key={ch.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white/60 text-sm font-medium">
                            {ch.name}
                          </span>
                          <span
                            className="text-sm font-bold font-heading"
                            style={{ color: ch.color }}
                          >
                            {ch.rate}
                          </span>
                        </div>
                        <div className="h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: ch.color }}
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${ch.width}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: 0.5 + i * 0.1,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 7 — JOURNEY DEMO (placeholder or lazy import)
   ═══════════════════════════════════════════════════════════════════════ */

export function JourneyDemoSection() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" id="demo">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.06] to-transparent" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
            {t.demo.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
            {t.demo.title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            {t.demo.desc}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/qualify"
              className="group inline-flex items-center gap-2.5 bg-lime text-deep px-8 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(205,255,0,0.3)] hover:scale-[1.02]"
            >
              <Play className="w-5 h-5" />
              {t.demo.ctaPrimary}
            </Link>
            <Link
              href="/qualify"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium"
            >
              {t.demo.ctaSecondary}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-12 md:p-16 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative flex items-center justify-center gap-4 flex-wrap">
                {['Trigger', 'Wait', 'SAT Push', 'Condition', 'WhatsApp', 'Convert'].map(
                  (step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-5 py-3"
                      >
                        <span className="text-white/60 text-sm font-heading font-medium">
                          {step}
                        </span>
                      </motion.div>
                      {i < 5 && (
                        <ChevronRight className="w-4 h-4 text-white/20" />
                      )}
                    </div>
                  )
                )}
              </div>
              <p className="text-white/30 text-xs mt-8 text-center">
                {t.demo.footer}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 8 — RESULTS
   ═══════════════════════════════════════════════════════════════════════ */

const caseStudies = [
  {
    company: 'Operador Tier 1 — LATAM',
    metric: '22%',
    metricLabel: 'conversión promedio',
    desc: 'Aumento en conversión de campañas de upsell utilizando SAT Push + WhatsApp con journeys automatizados.',
    color: '#EF4444',
  },
  {
    company: 'Operador líder — Chile',
    metric: '4%',
    metricLabel: 'CTR en campañas',
    desc: 'Click-through rate sostenido en campañas de retención con RCS y segmentación predictiva.',
    color: '#3B82F6',
  },
  {
    company: 'Operador — Sudáfrica',
    metric: 'USD 2M+',
    metricLabel: 'revenue incremental',
    desc: 'Revenue adicional generado en 12 meses con DYNAMO Journeys y optimización de canales.',
    color: '#22C55E',
  },
];

export function ResultsSection() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
            {t.results.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
            {t.results.title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            {t.results.desc}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div
                className="text-4xl md:text-5xl font-heading font-bold"
                style={{ color: cs.color }}
              >
                {cs.metric}
              </div>
              <div className="text-white/60 text-sm mt-1 uppercase tracking-wider font-medium">
                {t.results.cases[i]?.metricLabel || cs.metricLabel}
              </div>
              <div className="text-white font-heading font-semibold text-xl mt-6">
                {t.results.cases[i]?.company || cs.company}
              </div>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                {t.results.cases[i]?.desc || cs.desc}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: cs.color }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 font-semibold transition-colors"
          >
            {t.results.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 9 — CTA FINAL
   ═══════════════════════════════════════════════════════════════════════ */

export function JourneysCTA() {
  const locale = useLocale();
  const t = (i18n[locale] || i18n.es);
  return (
    <section className="py-28 lg:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-purple-900/10 to-transparent" />
      {/* Purple glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/[0.08] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-white/60 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            {t.cta.desc}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2.5 bg-lime text-deep px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(205,255,0,0.3)] hover:scale-[1.02]"
            >
              {t.cta.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/qualify"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-heading font-semibold transition-all duration-300"
            >
              {t.cta.ctaSecondary}
            </Link>
            <Link
              href="/roi-calculator"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-semibold"
            >
              {t.cta.ctaTertiary}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-deep flex items-center justify-center"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-400/60" />
                </div>
              ))}
            </div>
            <span className="text-white/60 text-sm ml-2">
              {t.cta.trust}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
