'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import RevealOnScroll from '@/components/RevealOnScroll';
import {
  MessageSquare,
  Send,
  Headphones,
  BarChart3,
  Clock,
  Layers,
  UserX,
  TrendingUp,
  Bot,
  Megaphone,
  PhoneCall,
  PieChart,
  CheckCircle2,
  ArrowRight,
  ShoppingCart,
  Plane,
  Shield,
  Heart,
  GraduationCap,
  Smartphone,
  Globe,
  Zap,
  Users,
  Rocket,
  Settings,
  Award,
  type LucideIcon,
} from 'lucide-react';

/* =================================================================
   I18N DICTIONARY
   ================================================================= */

const i18n: Record<string, {
  painPoints: { badge: string; title: string; items: { title: string; desc: string }[] };
  modules: { badge: string; title: string; subtitle: string; items: { description: string; features: string[]; highlight?: string }[] };
  channels: { badge: string; title: string; subtitle: string; items: { desc: string }[] };
  industries: { badge: string; title: string; subtitle: string; items: { title: string; desc: string; bullets: string[]; highlight?: string }[] };
  stats: { badge: string; title: string; subtitle: string; items: { value: string; label: string }[] };
  implementation: { badge: string; title: string; subtitle: string; items: { title: string; desc: string }[] };
  cta: { title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
}> = {
  es: {
    painPoints: {
      badge: 'El problema',
      title: 'Los desafíos que enfrentan las empresas',
      items: [
        { title: 'No puedes manejar el volumen de consultas en tiempo real', desc: 'Los clientes esperan respuestas inmediatas. Cada minuto de demora es una oportunidad perdida.' },
        { title: 'Gestionas múltiples canales de forma fragmentada', desc: 'WhatsApp por un lado, email por otro, redes sociales aparte. Tu equipo salta entre herramientas sin contexto unificado.' },
        { title: 'Pierdes clientes potenciales por no responder a tiempo', desc: 'El 78% de los consumidores compran a la empresa que les responde primero. La velocidad cierra ventas.' },
        { title: 'Tus procesos no escalan con el crecimiento', desc: 'Lo que funcionaba con 100 clientes no funciona con 10.000. Necesitas automatización sin perder personalización.' },
      ],
    },
    modules: {
      badge: 'Plataforma',
      title: '4 módulos, una sola plataforma',
      subtitle: 'Todo lo que necesitas para automatizar, personalizar y escalar tu comunicación digital.',
      items: [
        {
          description: 'Crea flujos de chatbot sin código, con drag & drop. Diseña conversaciones inteligentes que resuelven consultas, capturan datos y escalan a humanos cuando es necesario.',
          features: ['Diseño de conversaciones con nodos personalizables drag & drop', 'Flujos sin código para cualquier canal', 'Captura de datos durante la interacción del usuario', 'Encuestas de satisfacción post-atención', 'Transferencia automática a operador humano cuando es necesario', 'Templates pre-armados por industria (e-commerce, turismo, seguros, salud, educación)', 'Integraciones vía API con sistemas de terceros (CRUD de datos)', 'Estadísticas de performance del chatbot en tiempo real'],
          highlight: '90% de satisfacción promedio en implementaciones de chatbot',
        },
        {
          description: 'Diseña campañas personalizadas con templates multimedia y envía notificaciones a millones de usuarios con un solo click.',
          features: ['Templates multimedia: texto, imágenes, video, botones y links', 'Importación y validación automática de audiencias (millones de usuarios)', 'Envío manual, programado o automatizado', 'Bot individual por campaña', 'HSM templates pre-aprobados para acelerar operación', 'Métricas de entrega, apertura y conversión en tiempo real', 'Remarketing y retargeting automatizado', 'Segmentación estratégica por etapa del ciclo de vida'],
        },
        {
          description: 'Gestión centralizada de TODAS las conversaciones en una sola interfaz. Unifica todos tus canales y conecta cada cliente con el especialista correcto.',
          features: ['Unificación de WhatsApp, Instagram, Facebook, Google Business, SMS, RCS, Webchat', 'Configuración de agentes por perfil, experiencia y habilidades', 'Routing inteligente: conecta cada cliente con el especialista correcto', 'Categorización de cierres para análisis posterior', 'Administración de horarios de atención', 'Historial completo de conversaciones con auditoría', 'Encuestas de satisfacción del cliente', 'Soporte para texto, emojis, mensajes interactivos y multimedia'],
        },
        {
          description: 'Dashboards operativos en tiempo real para medir, optimizar y demostrar el impacto de tu comunicación digital.',
          features: ['Dashboards operativos en tiempo real', 'Estadísticas de campañas por canal, producto y segmento', 'Evaluación de performance de chatbots (tasa de interacción, sesiones, mensajes)', 'Resultados de encuestas de satisfacción', 'KPIs descargables para reportes', 'Monitoreo de cambios de estado de mensajes', 'Análisis de comportamiento de usuario para mejora continua'],
        },
      ],
    },
    channels: {
      badge: 'Omnicanal',
      title: 'Canales disponibles',
      subtitle: 'Conecta con tus clientes donde ellos están. Una experiencia unificada en todos los canales.',
      items: [
        { desc: 'Mensajes automatizados, chatbots a medida, ventas con WhatsApp Business' },
        { desc: 'Atención 24/7 con chatbot, generación de leads' },
        { desc: 'Bots personalizados para conexión con clientes' },
        { desc: 'Widget embebible para capturar leads y dar soporte' },
        { desc: 'Contacto con clientes que te encuentran en Google' },
        { desc: 'Notificaciones automatizadas, segmentadas y a bajo costo' },
        { desc: 'Canal interactivo con alta tasa de conversión' },
        { desc: 'Mensajería rica con contenido multimedia y CTAs interactivos' },
      ],
    },
    industries: {
      badge: 'Industrias',
      title: 'Soluciones por industria',
      subtitle: 'Cada industria tiene sus desafíos. Studio se adapta a todos.',
      items: [
        { title: 'E-commerce', desc: 'Automatiza la experiencia de compra de principio a fin.', bullets: ['Recupero de carrito abandonado automatizado', 'Recomendaciones personalizadas basadas en historial', 'Notificaciones de envío y seguimiento', 'Soporte 24/7 sin intervención humana'], highlight: '15% más de ingresos con personalización' },
        { title: 'Turismo y hotelería', desc: 'Experiencias de viaje fluidas desde la consulta hasta el check-out.', bullets: ['Consultas de disponibilidad instantáneas', 'Reservas automatizadas con confirmación', 'Check-in/check-out digital', 'Concierge virtual 24/7'] },
        { title: 'Seguros', desc: 'Gestión ágil de pólizas, siniestros y pagos.', bullets: ['Consulta de pólizas y coberturas', 'Gestión de siniestros con seguimiento', 'Recordatorios de pago automatizados', 'Escalación a asesores especializados'] },
        { title: 'Salud', desc: 'Acceso digital a servicios médicos para pacientes y profesionales.', bullets: ['Agendamiento de turnos online', 'Acceso a resultados de estudios', 'Recordatorios de citas', 'Información de servicios y especialidades'] },
        { title: 'Educación', desc: 'Comunicación inteligente con alumnos, padres e instituciones.', bullets: ['Soporte académico automatizado', 'Tutorías personalizadas', 'Automatización administrativa (inscripciones, pagos)', 'Comunicación con padres y alumnos'] },
      ],
    },
    stats: {
      badge: 'Impacto',
      title: 'Datos que hablan',
      subtitle: 'Resultados reales de empresas que ya usan Dynamo Studio.',
      items: [
        { value: '90%', label: 'Satisfacción promedio con chatbots' },
        { value: '88%', label: 'De consumidores valoran la experiencia tanto como el producto' },
        { value: '76%', label: 'Buscan interacción coherente en todos los canales' },
        { value: '+15%', label: 'Más ingresos con personalización' },
        { value: '24/7', label: 'Atención sin intervención humana' },
        { value: '+70', label: 'Empresas confían en DYNAMO' },
      ],
    },
    implementation: {
      badge: 'Implementación',
      title: 'Estás operativo en días, no meses',
      subtitle: 'Soporte dedicado y expertos a tu disposición desde el día uno.',
      items: [
        { title: 'Onboarding', desc: 'Configuramos la plataforma, conectamos canales y entrenamos a tu equipo.' },
        { title: 'Lanzamiento', desc: 'Primeras campañas y chatbots activos en menos de 1 semana.' },
        { title: 'Optimización', desc: 'Nuestro equipo te acompaña para mejorar resultados continuamente.' },
      ],
    },
    cta: {
      title: 'Empieza a transformar la comunicación con tus clientes',
      subtitle: 'Descubre cómo Dynamo Studio puede ayudarte a automatizar, personalizar y escalar tu comunicación.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Contactar ventas',
    },
  },
  en: {
    painPoints: {
      badge: 'The problem',
      title: 'The challenges businesses face',
      items: [
        { title: 'You can\'t handle the volume of queries in real time', desc: 'Customers expect immediate responses. Every minute of delay is a lost opportunity.' },
        { title: 'You manage multiple channels in a fragmented way', desc: 'WhatsApp on one side, email on another, social media apart. Your team jumps between tools without unified context.' },
        { title: 'You lose potential customers by not responding on time', desc: '78% of consumers buy from the company that responds first. Speed closes deals.' },
        { title: 'Your processes don\'t scale with growth', desc: 'What worked with 100 customers doesn\'t work with 10,000. You need automation without losing personalization.' },
      ],
    },
    modules: {
      badge: 'Platform',
      title: '4 modules, one platform',
      subtitle: 'Everything you need to automate, personalize, and scale your digital communication.',
      items: [
        {
          description: 'Create no-code chatbot flows with drag & drop. Design intelligent conversations that resolve queries, capture data, and escalate to humans when needed.',
          features: ['Conversation design with customizable drag & drop nodes', 'No-code flows for any channel', 'Data capture during user interaction', 'Post-service satisfaction surveys', 'Automatic transfer to human operator when needed', 'Pre-built templates by industry (e-commerce, tourism, insurance, health, education)', 'API integrations with third-party systems (data CRUD)', 'Real-time chatbot performance statistics'],
          highlight: '90% average satisfaction in chatbot implementations',
        },
        {
          description: 'Design personalized campaigns with multimedia templates and send notifications to millions of users with a single click.',
          features: ['Multimedia templates: text, images, video, buttons, and links', 'Automatic audience import and validation (millions of users)', 'Manual, scheduled, or automated sending', 'Individual bot per campaign', 'Pre-approved HSM templates to accelerate operations', 'Real-time delivery, open, and conversion metrics', 'Automated remarketing and retargeting', 'Strategic segmentation by lifecycle stage'],
        },
        {
          description: 'Centralized management of ALL conversations in a single interface. Unify all your channels and connect each customer with the right specialist.',
          features: ['Unification of WhatsApp, Instagram, Facebook, Google Business, SMS, RCS, Webchat', 'Agent configuration by profile, experience, and skills', 'Intelligent routing: connect each customer with the right specialist', 'Closure categorization for post-analysis', 'Business hours management', 'Complete conversation history with audit trail', 'Customer satisfaction surveys', 'Support for text, emojis, interactive messages, and multimedia'],
        },
        {
          description: 'Real-time operational dashboards to measure, optimize, and demonstrate the impact of your digital communication.',
          features: ['Real-time operational dashboards', 'Campaign statistics by channel, product, and segment', 'Chatbot performance evaluation (interaction rate, sessions, messages)', 'Satisfaction survey results', 'Downloadable KPIs for reports', 'Message status change monitoring', 'User behavior analysis for continuous improvement'],
        },
      ],
    },
    channels: {
      badge: 'Omnichannel',
      title: 'Available channels',
      subtitle: 'Connect with your customers where they are. A unified experience across all channels.',
      items: [
        { desc: 'Automated messages, custom chatbots, sales with WhatsApp Business' },
        { desc: '24/7 support with chatbot, lead generation' },
        { desc: 'Custom bots for customer engagement' },
        { desc: 'Embeddable widget for lead capture and support' },
        { desc: 'Reach customers who find you on Google' },
        { desc: 'Automated, segmented notifications at low cost' },
        { desc: 'Interactive channel with high conversion rate' },
        { desc: 'Rich messaging with multimedia content and interactive CTAs' },
      ],
    },
    industries: {
      badge: 'Industries',
      title: 'Solutions by industry',
      subtitle: 'Every industry has its challenges. Studio adapts to all of them.',
      items: [
        { title: 'E-commerce', desc: 'Automate the shopping experience from start to finish.', bullets: ['Automated abandoned cart recovery', 'Personalized recommendations based on history', 'Shipping and tracking notifications', '24/7 support without human intervention'], highlight: '15% more revenue with personalization' },
        { title: 'Tourism & hospitality', desc: 'Seamless travel experiences from inquiry to check-out.', bullets: ['Instant availability queries', 'Automated bookings with confirmation', 'Digital check-in/check-out', '24/7 virtual concierge'] },
        { title: 'Insurance', desc: 'Agile management of policies, claims, and payments.', bullets: ['Policy and coverage queries', 'Claims management with tracking', 'Automated payment reminders', 'Escalation to specialized advisors'] },
        { title: 'Healthcare', desc: 'Digital access to medical services for patients and professionals.', bullets: ['Online appointment scheduling', 'Access to test results', 'Appointment reminders', 'Service and specialty information'] },
        { title: 'Education', desc: 'Intelligent communication with students, parents, and institutions.', bullets: ['Automated academic support', 'Personalized tutoring', 'Administrative automation (enrollment, payments)', 'Communication with parents and students'] },
      ],
    },
    stats: {
      badge: 'Impact',
      title: 'Numbers that speak',
      subtitle: 'Real results from companies already using Dynamo Studio.',
      items: [
        { value: '90%', label: 'Average satisfaction with chatbots' },
        { value: '88%', label: 'Of consumers value experience as much as the product' },
        { value: '76%', label: 'Seek coherent interaction across all channels' },
        { value: '+15%', label: 'More revenue with personalization' },
        { value: '24/7', label: 'Support without human intervention' },
        { value: '+70', label: 'Companies trust DYNAMO' },
      ],
    },
    implementation: {
      badge: 'Implementation',
      title: 'Go live in days, not months',
      subtitle: 'Dedicated support and experts at your disposal from day one.',
      items: [
        { title: 'Onboarding', desc: 'We configure the platform, connect channels, and train your team.' },
        { title: 'Launch', desc: 'First campaigns and chatbots active in less than 1 week.' },
        { title: 'Optimization', desc: 'Our team accompanies you to continuously improve results.' },
      ],
    },
    cta: {
      title: 'Start transforming communication with your customers',
      subtitle: 'Discover how Dynamo Studio can help you automate, personalize, and scale your communication.',
      ctaPrimary: 'Schedule Demo',
      ctaSecondary: 'Contact sales',
    },
  },
  fr: {
    painPoints: {
      badge: 'Le problème',
      title: 'Les défis auxquels font face les entreprises',
      items: [
        { title: 'Vous ne pouvez pas gérer le volume de demandes en temps réel', desc: 'Les clients attendent des réponses immédiates. Chaque minute de retard est une opportunité perdue.' },
        { title: 'Vous gérez plusieurs canaux de manière fragmentée', desc: 'WhatsApp d\'un côté, email de l\'autre, réseaux sociaux à part. Votre équipe jongle entre les outils sans contexte unifié.' },
        { title: 'Vous perdez des clients potentiels en ne répondant pas à temps', desc: '78% des consommateurs achètent à l\'entreprise qui répond en premier. La rapidité conclut les ventes.' },
        { title: 'Vos processus ne passent pas à l\'échelle avec la croissance', desc: 'Ce qui fonctionnait avec 100 clients ne fonctionne pas avec 10 000. Vous avez besoin d\'automatisation sans perdre en personnalisation.' },
      ],
    },
    modules: {
      badge: 'Plateforme',
      title: '4 modules, une seule plateforme',
      subtitle: 'Tout ce dont vous avez besoin pour automatiser, personnaliser et faire évoluer votre communication digitale.',
      items: [
        {
          description: 'Créez des flux chatbot sans code, en drag & drop. Concevez des conversations intelligentes qui résolvent les demandes, capturent des données et escaladent vers un humain si nécessaire.',
          features: ['Conception de conversations avec des nœuds personnalisables drag & drop', 'Flux sans code pour tout canal', 'Capture de données pendant l\'interaction utilisateur', 'Enquêtes de satisfaction post-service', 'Transfert automatique vers un opérateur humain si nécessaire', 'Templates pré-construits par industrie (e-commerce, tourisme, assurance, santé, éducation)', 'Intégrations API avec des systèmes tiers (CRUD de données)', 'Statistiques de performance du chatbot en temps réel'],
          highlight: '90% de satisfaction moyenne dans les implémentations de chatbot',
        },
        {
          description: 'Concevez des campagnes personnalisées avec des templates multimédia et envoyez des notifications à des millions d\'utilisateurs en un seul clic.',
          features: ['Templates multimédia : texte, images, vidéo, boutons et liens', 'Import et validation automatique des audiences (millions d\'utilisateurs)', 'Envoi manuel, programmé ou automatisé', 'Bot individuel par campagne', 'Templates HSM pré-approuvés pour accélérer les opérations', 'Métriques de livraison, ouverture et conversion en temps réel', 'Remarketing et retargeting automatisés', 'Segmentation stratégique par étape du cycle de vie'],
        },
        {
          description: 'Gestion centralisée de TOUTES les conversations dans une seule interface. Unifiez tous vos canaux et connectez chaque client avec le bon spécialiste.',
          features: ['Unification de WhatsApp, Instagram, Facebook, Google Business, SMS, RCS, Webchat', 'Configuration des agents par profil, expérience et compétences', 'Routage intelligent : connectez chaque client avec le bon spécialiste', 'Catégorisation des clôtures pour analyse ultérieure', 'Gestion des horaires d\'ouverture', 'Historique complet des conversations avec piste d\'audit', 'Enquêtes de satisfaction client', 'Support pour texte, emojis, messages interactifs et multimédia'],
        },
        {
          description: 'Tableaux de bord opérationnels en temps réel pour mesurer, optimiser et démontrer l\'impact de votre communication digitale.',
          features: ['Tableaux de bord opérationnels en temps réel', 'Statistiques de campagnes par canal, produit et segment', 'Évaluation de la performance des chatbots (taux d\'interaction, sessions, messages)', 'Résultats des enquêtes de satisfaction', 'KPIs téléchargeables pour les rapports', 'Suivi des changements d\'état des messages', 'Analyse du comportement utilisateur pour l\'amélioration continue'],
        },
      ],
    },
    channels: {
      badge: 'Omnicanal',
      title: 'Canaux disponibles',
      subtitle: 'Connectez-vous avec vos clients là où ils se trouvent. Une expérience unifiée sur tous les canaux.',
      items: [
        { desc: 'Messages automatisés, chatbots sur mesure, ventes avec WhatsApp Business' },
        { desc: 'Support 24/7 avec chatbot, génération de leads' },
        { desc: 'Bots personnalisés pour la connexion client' },
        { desc: 'Widget intégrable pour capturer des leads et fournir du support' },
        { desc: 'Contact avec les clients qui vous trouvent sur Google' },
        { desc: 'Notifications automatisées, segmentées et à faible coût' },
        { desc: 'Canal interactif avec un taux de conversion élevé' },
        { desc: 'Messagerie riche avec contenu multimédia et CTAs interactifs' },
      ],
    },
    industries: {
      badge: 'Industries',
      title: 'Solutions par industrie',
      subtitle: 'Chaque industrie a ses défis. Studio s\'adapte à tous.',
      items: [
        { title: 'E-commerce', desc: 'Automatisez l\'expérience d\'achat de bout en bout.', bullets: ['Récupération automatisée de panier abandonné', 'Recommandations personnalisées basées sur l\'historique', 'Notifications d\'expédition et de suivi', 'Support 24/7 sans intervention humaine'], highlight: '15% de revenus supplémentaires avec la personnalisation' },
        { title: 'Tourisme et hôtellerie', desc: 'Expériences de voyage fluides de la demande au check-out.', bullets: ['Demandes de disponibilité instantanées', 'Réservations automatisées avec confirmation', 'Check-in/check-out digital', 'Concierge virtuel 24/7'] },
        { title: 'Assurance', desc: 'Gestion agile des polices, sinistres et paiements.', bullets: ['Consultation des polices et couvertures', 'Gestion des sinistres avec suivi', 'Rappels de paiement automatisés', 'Escalade vers des conseillers spécialisés'] },
        { title: 'Santé', desc: 'Accès digital aux services médicaux pour les patients et professionnels.', bullets: ['Prise de rendez-vous en ligne', 'Accès aux résultats d\'examens', 'Rappels de rendez-vous', 'Information sur les services et spécialités'] },
        { title: 'Éducation', desc: 'Communication intelligente avec les étudiants, parents et institutions.', bullets: ['Support académique automatisé', 'Tutorat personnalisé', 'Automatisation administrative (inscriptions, paiements)', 'Communication avec les parents et étudiants'] },
      ],
    },
    stats: {
      badge: 'Impact',
      title: 'Des chiffres qui parlent',
      subtitle: 'Résultats réels d\'entreprises qui utilisent déjà Dynamo Studio.',
      items: [
        { value: '90%', label: 'Satisfaction moyenne avec les chatbots' },
        { value: '88%', label: 'Des consommateurs valorisent l\'expérience autant que le produit' },
        { value: '76%', label: 'Recherchent une interaction cohérente sur tous les canaux' },
        { value: '+15%', label: 'Plus de revenus avec la personnalisation' },
        { value: '24/7', label: 'Support sans intervention humaine' },
        { value: '+70', label: 'Entreprises font confiance à DYNAMO' },
      ],
    },
    implementation: {
      badge: 'Implémentation',
      title: 'Opérationnel en jours, pas en mois',
      subtitle: 'Support dédié et experts à votre disposition dès le premier jour.',
      items: [
        { title: 'Onboarding', desc: 'Nous configurons la plateforme, connectons les canaux et formons votre équipe.' },
        { title: 'Lancement', desc: 'Premières campagnes et chatbots actifs en moins d\'une semaine.' },
        { title: 'Optimisation', desc: 'Notre équipe vous accompagne pour améliorer les résultats en continu.' },
      ],
    },
    cta: {
      title: 'Commencez à transformer la communication avec vos clients',
      subtitle: 'Découvrez comment Dynamo Studio peut vous aider à automatiser, personnaliser et faire évoluer votre communication.',
      ctaPrimary: 'Planifier une démo',
      ctaSecondary: 'Contacter les ventes',
    },
  },
  pt: {
    painPoints: {
      badge: 'O problema',
      title: 'Os desafios que as empresas enfrentam',
      items: [
        { title: 'Você não consegue lidar com o volume de consultas em tempo real', desc: 'Os clientes esperam respostas imediatas. Cada minuto de atraso é uma oportunidade perdida.' },
        { title: 'Você gerencia múltiplos canais de forma fragmentada', desc: 'WhatsApp de um lado, email do outro, redes sociais à parte. Sua equipe pula entre ferramentas sem contexto unificado.' },
        { title: 'Você perde clientes potenciais por não responder a tempo', desc: '78% dos consumidores compram da empresa que responde primeiro. A velocidade fecha vendas.' },
        { title: 'Seus processos não escalam com o crescimento', desc: 'O que funcionava com 100 clientes não funciona com 10.000. Você precisa de automação sem perder personalização.' },
      ],
    },
    modules: {
      badge: 'Plataforma',
      title: '4 módulos, uma única plataforma',
      subtitle: 'Tudo que você precisa para automatizar, personalizar e escalar sua comunicação digital.',
      items: [
        {
          description: 'Crie fluxos de chatbot sem código, com drag & drop. Projete conversas inteligentes que resolvem consultas, capturam dados e escalam para humanos quando necessário.',
          features: ['Design de conversas com nós personalizáveis drag & drop', 'Fluxos sem código para qualquer canal', 'Captura de dados durante a interação do usuário', 'Pesquisas de satisfação pós-atendimento', 'Transferência automática para operador humano quando necessário', 'Templates pré-construídos por indústria (e-commerce, turismo, seguros, saúde, educação)', 'Integrações via API com sistemas de terceiros (CRUD de dados)', 'Estatísticas de performance do chatbot em tempo real'],
          highlight: '90% de satisfação média nas implementações de chatbot',
        },
        {
          description: 'Projete campanhas personalizadas com templates multimídia e envie notificações para milhões de usuários com um único clique.',
          features: ['Templates multimídia: texto, imagens, vídeo, botões e links', 'Importação e validação automática de audiências (milhões de usuários)', 'Envio manual, programado ou automatizado', 'Bot individual por campanha', 'Templates HSM pré-aprovados para acelerar a operação', 'Métricas de entrega, abertura e conversão em tempo real', 'Remarketing e retargeting automatizado', 'Segmentação estratégica por etapa do ciclo de vida'],
        },
        {
          description: 'Gestão centralizada de TODAS as conversas em uma única interface. Unifique todos os seus canais e conecte cada cliente com o especialista certo.',
          features: ['Unificação de WhatsApp, Instagram, Facebook, Google Business, SMS, RCS, Webchat', 'Configuração de agentes por perfil, experiência e habilidades', 'Roteamento inteligente: conecte cada cliente com o especialista certo', 'Categorização de encerramentos para análise posterior', 'Administração de horários de atendimento', 'Histórico completo de conversas com auditoria', 'Pesquisas de satisfação do cliente', 'Suporte para texto, emojis, mensagens interativas e multimídia'],
        },
        {
          description: 'Dashboards operacionais em tempo real para medir, otimizar e demonstrar o impacto da sua comunicação digital.',
          features: ['Dashboards operacionais em tempo real', 'Estatísticas de campanhas por canal, produto e segmento', 'Avaliação de performance de chatbots (taxa de interação, sessões, mensagens)', 'Resultados de pesquisas de satisfação', 'KPIs para download em relatórios', 'Monitoramento de mudanças de status de mensagens', 'Análise de comportamento do usuário para melhoria contínua'],
        },
      ],
    },
    channels: {
      badge: 'Omnichannel',
      title: 'Canais disponíveis',
      subtitle: 'Conecte-se com seus clientes onde eles estão. Uma experiência unificada em todos os canais.',
      items: [
        { desc: 'Mensagens automatizadas, chatbots sob medida, vendas com WhatsApp Business' },
        { desc: 'Atendimento 24/7 com chatbot, geração de leads' },
        { desc: 'Bots personalizados para conexão com clientes' },
        { desc: 'Widget incorporável para capturar leads e dar suporte' },
        { desc: 'Contato com clientes que encontram você no Google' },
        { desc: 'Notificações automatizadas, segmentadas e de baixo custo' },
        { desc: 'Canal interativo com alta taxa de conversão' },
        { desc: 'Mensageria rica com conteúdo multimídia e CTAs interativos' },
      ],
    },
    industries: {
      badge: 'Indústrias',
      title: 'Soluções por indústria',
      subtitle: 'Cada indústria tem seus desafios. O Studio se adapta a todos.',
      items: [
        { title: 'E-commerce', desc: 'Automatize a experiência de compra do início ao fim.', bullets: ['Recuperação automática de carrinho abandonado', 'Recomendações personalizadas baseadas no histórico', 'Notificações de envio e rastreamento', 'Suporte 24/7 sem intervenção humana'], highlight: '15% mais receita com personalização' },
        { title: 'Turismo e hotelaria', desc: 'Experiências de viagem fluidas da consulta ao check-out.', bullets: ['Consultas de disponibilidade instantâneas', 'Reservas automatizadas com confirmação', 'Check-in/check-out digital', 'Concierge virtual 24/7'] },
        { title: 'Seguros', desc: 'Gestão ágil de apólices, sinistros e pagamentos.', bullets: ['Consulta de apólices e coberturas', 'Gestão de sinistros com acompanhamento', 'Lembretes de pagamento automatizados', 'Escalação para consultores especializados'] },
        { title: 'Saúde', desc: 'Acesso digital a serviços médicos para pacientes e profissionais.', bullets: ['Agendamento de consultas online', 'Acesso a resultados de exames', 'Lembretes de consultas', 'Informações de serviços e especialidades'] },
        { title: 'Educação', desc: 'Comunicação inteligente com alunos, pais e instituições.', bullets: ['Suporte acadêmico automatizado', 'Tutorias personalizadas', 'Automação administrativa (matrículas, pagamentos)', 'Comunicação com pais e alunos'] },
      ],
    },
    stats: {
      badge: 'Impacto',
      title: 'Dados que falam',
      subtitle: 'Resultados reais de empresas que já usam o Dynamo Studio.',
      items: [
        { value: '90%', label: 'Satisfação média com chatbots' },
        { value: '88%', label: 'Dos consumidores valorizam a experiência tanto quanto o produto' },
        { value: '76%', label: 'Buscam interação coerente em todos os canais' },
        { value: '+15%', label: 'Mais receita com personalização' },
        { value: '24/7', label: 'Atendimento sem intervenção humana' },
        { value: '+70', label: 'Empresas confiam no DYNAMO' },
      ],
    },
    implementation: {
      badge: 'Implementação',
      title: 'Operacional em dias, não meses',
      subtitle: 'Suporte dedicado e especialistas à sua disposição desde o primeiro dia.',
      items: [
        { title: 'Onboarding', desc: 'Configuramos a plataforma, conectamos canais e treinamos sua equipe.' },
        { title: 'Lançamento', desc: 'Primeiras campanhas e chatbots ativos em menos de 1 semana.' },
        { title: 'Otimização', desc: 'Nossa equipe acompanha você para melhorar resultados continuamente.' },
      ],
    },
    cta: {
      title: 'Comece a transformar a comunicação com seus clientes',
      subtitle: 'Descubra como o Dynamo Studio pode ajudá-lo a automatizar, personalizar e escalar sua comunicação.',
      ctaPrimary: 'Agendar Demo',
      ctaSecondary: 'Contatar vendas',
    },
  },
};

/* =================================================================
   Section 1 — Pain Points
   ================================================================= */

const painPointIcons = [Clock, Layers, UserX, TrendingUp];

function PainPointsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.painPoints.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.painPoints.title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.painPoints.items.map((point, i) => {
            const Icon = painPointIcons[i];
            return (
              <RevealOnScroll key={point.title} delay={i * 0.1}>
                <div className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{point.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{point.desc}</p>
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
   Section 2 — 4 Modules (enriched)
   ================================================================= */

interface Module {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  highlight?: string;
  visual: string;
  gradient: string;
}

const moduleMeta = [
  { id: 'chatbot', icon: Bot, title: 'Chatbot Builder', visual: 'Flow Diagram', gradient: 'from-purple-500/20 to-purple-600/5' },
  { id: 'campaigns', icon: Megaphone, title: 'Campaign Manager', visual: 'Campaign Cards', gradient: 'from-blue-500/20 to-blue-600/5' },
  { id: 'contact-center', icon: PhoneCall, title: 'Contact Center', visual: 'Chat Interface', gradient: 'from-emerald-500/20 to-emerald-600/5' },
  { id: 'metrics', icon: PieChart, title: 'Metrics', visual: 'Charts Dashboard', gradient: 'from-amber-500/20 to-amber-600/5' },
];

function ModulesSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  const [activeModule, setActiveModule] = useState(0);
  const currentMeta = moduleMeta[activeModule];
  const currentI18n = t.modules.items[activeModule];
  const CurrentIcon = currentMeta.icon;

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.modules.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.modules.title}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
              {t.modules.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        {/* Tab buttons */}
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {moduleMeta.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(i)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeModule === i
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'bg-white/[0.03] text-white/50 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/70'
                }`}
              >
                <mod.icon className="w-4 h-4" />
                {mod.title}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Active module content */}
        <motion.div
          key={currentMeta.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
        >
          {/* Features */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <CurrentIcon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">{currentMeta.title}</h3>
            </div>
            <p className="text-white/60 text-base mb-6 leading-relaxed">{currentI18n.description}</p>
            <ul className="space-y-3">
              {currentI18n.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            {currentI18n.highlight && (
              <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-xl px-5 py-3 flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-purple-300 text-sm font-medium">{currentI18n.highlight}</span>
              </div>
            )}
          </div>

          {/* Visual mockup placeholder */}
          <div
            className={`relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${currentMeta.gradient} p-8 min-h-[320px] flex items-center justify-center overflow-hidden`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]" />

            {/* Decorative mockup */}
            {currentMeta.id === 'chatbot' && <ChatbotMockup />}
            {currentMeta.id === 'campaigns' && <CampaignMockup />}
            {currentMeta.id === 'contact-center' && <ContactCenterMockup />}
            {currentMeta.id === 'metrics' && <MetricsMockup />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Mini mockup components */
function ChatbotMockup() {
  return (
    <div className="relative z-10 w-full max-w-sm space-y-3">
      {['Inicio', 'Bienvenida', 'Men\u00fa opciones', 'Captura datos', 'Encuesta CSAT', 'Derivar a agente'].map((node, i) => (
        <div key={node} className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-purple-400/60" />
          <div className="flex-1 bg-white/[0.06] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/70">
            {node}
          </div>
          {i < 5 && (
            <ArrowRight className="w-4 h-4 text-purple-400/40 absolute -right-2" style={{ position: 'relative' }} />
          )}
        </div>
      ))}
    </div>
  );
}

function CampaignMockup() {
  return (
    <div className="relative z-10 w-full max-w-sm space-y-3">
      {[
        { name: 'Promo Verano', status: 'Enviada', pct: '94%' },
        { name: 'Bienvenida', status: 'Activa', pct: '87%' },
        { name: 'Re-engagement', status: 'Programada', pct: '--' },
        { name: 'Retargeting Q2', status: 'Borrador', pct: '--' },
      ].map((c) => (
        <div key={c.name} className="bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/80 font-medium">{c.name}</div>
            <div className="text-xs text-white/40">{c.status}</div>
          </div>
          <span className="text-sm text-purple-300 font-mono">{c.pct}</span>
        </div>
      ))}
    </div>
  );
}

function ContactCenterMockup() {
  return (
    <div className="relative z-10 w-full max-w-sm space-y-2">
      {[
        { from: 'Mar\u00eda G.', msg: 'Hola, necesito ayuda con mi pedido', ch: 'WA' },
        { from: 'Carlos R.', msg: 'Quiero cambiar mi reserva', ch: 'IG' },
        { from: 'Ana L.', msg: 'Consulta sobre facturaci\u00f3n', ch: 'Web' },
        { from: 'Pedro M.', msg: 'Estado de mi reclamo #4521', ch: 'SMS' },
      ].map((m) => (
        <div key={m.from} className="bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-300 font-medium flex-shrink-0">
            {m.from.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white/80 font-medium">{m.from}</div>
            <div className="text-xs text-white/40 truncate">{m.msg}</div>
          </div>
          <span className="text-[10px] text-purple-300/60 font-medium bg-purple-500/10 px-2 py-0.5 rounded-full">{m.ch}</span>
        </div>
      ))}
    </div>
  );
}

function MetricsMockup() {
  return (
    <div className="relative z-10 w-full max-w-sm">
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[
          { label: 'Conversaciones', val: '12.4K' },
          { label: 'CSAT', val: '94%' },
          { label: 'Resoluci\u00f3n', val: '89%' },
          { label: 'Tiempo medio', val: '2.3m' },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.06] border border-white/10 rounded-lg px-3 py-3 text-center">
            <div className="text-lg font-bold text-white/90 font-mono">{s.val}</div>
            <div className="text-[10px] text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div className="bg-white/[0.06] border border-white/10 rounded-lg p-4 flex items-end gap-2 h-24">
        {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-purple-500/30 rounded-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* =================================================================
   Section 3 — Available Channels (NEW enriched section)
   ================================================================= */

const channelStyles = [
  { name: 'WhatsApp', color: 'from-green-500/20 to-green-600/5', borderHover: 'hover:border-green-500/30', iconBg: 'bg-green-500/15', iconColor: 'text-green-400' },
  { name: 'Facebook Messenger', color: 'from-blue-500/20 to-blue-600/5', borderHover: 'hover:border-blue-500/30', iconBg: 'bg-blue-500/15', iconColor: 'text-blue-400' },
  { name: 'Instagram DM', color: 'from-pink-500/20 to-pink-600/5', borderHover: 'hover:border-pink-500/30', iconBg: 'bg-pink-500/15', iconColor: 'text-pink-400' },
  { name: 'Webchat', color: 'from-purple-500/20 to-purple-600/5', borderHover: 'hover:border-purple-500/30', iconBg: 'bg-purple-500/15', iconColor: 'text-purple-400' },
  { name: 'Google Business', color: 'from-yellow-500/20 to-yellow-600/5', borderHover: 'hover:border-yellow-500/30', iconBg: 'bg-yellow-500/15', iconColor: 'text-yellow-400' },
  { name: 'SMS', color: 'from-cyan-500/20 to-cyan-600/5', borderHover: 'hover:border-cyan-500/30', iconBg: 'bg-cyan-500/15', iconColor: 'text-cyan-400' },
  { name: 'SAT Push', color: 'from-orange-500/20 to-orange-600/5', borderHover: 'hover:border-orange-500/30', iconBg: 'bg-orange-500/15', iconColor: 'text-orange-400' },
  { name: 'RCS', color: 'from-indigo-500/20 to-indigo-600/5', borderHover: 'hover:border-indigo-500/30', iconBg: 'bg-indigo-500/15', iconColor: 'text-indigo-400' },
];

function AvailableChannelsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/8 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.channels.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.channels.title}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
              {t.channels.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channelStyles.map((ch, i) => (
            <RevealOnScroll key={ch.name} delay={i * 0.06}>
              <div
                className={`group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 ${ch.borderHover} hover:bg-white/[0.05] transition-all duration-300 h-full flex flex-col`}
              >
                <div className={`w-11 h-11 rounded-xl ${ch.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <MessageSquare className={`w-5 h-5 ${ch.iconColor}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{ch.name}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{t.channels.items[i]?.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 4 — Industries (enriched with bullet points)
   ================================================================= */

interface Industry {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  highlight?: string;
}

const industryIcons: LucideIcon[] = [ShoppingCart, Plane, Shield, Heart, GraduationCap];

/* kept for type only */
const _industries_placeholder: Industry[] = [
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    desc: 'Automatiz\u00e1 la experiencia de compra de principio a fin.',
    bullets: [
      'Recupero de carrito abandonado automatizado',
      'Recomendaciones personalizadas basadas en historial',
      'Notificaciones de env\u00edo y seguimiento',
      'Soporte 24/7 sin intervenci\u00f3n humana',
    ],
    highlight: '15% m\u00e1s de ingresos con personalizaci\u00f3n',
  },
  {
    icon: Plane,
    title: 'Turismo y hoteler\u00eda',
    desc: 'Experiencias de viaje fluidas desde la consulta hasta el check-out.',
    bullets: [
      'Consultas de disponibilidad instant\u00e1neas',
      'Reservas automatizadas con confirmaci\u00f3n',
      'Check-in/check-out digital',
      'Concierge virtual 24/7',
    ],
  },
  {
    icon: Shield,
    title: 'Seguros',
    desc: 'Gesti\u00f3n \u00e1gil de p\u00f3lizas, siniestros y pagos.',
    bullets: [
      'Consulta de p\u00f3lizas y coberturas',
      'Gesti\u00f3n de siniestros con seguimiento',
      'Recordatorios de pago automatizados',
      'Escalaci\u00f3n a asesores especializados',
    ],
  },
  {
    icon: Heart,
    title: 'Salud',
    desc: 'Acceso digital a servicios m\u00e9dicos para pacientes y profesionales.',
    bullets: [
      'Agendamiento de turnos online',
      'Acceso a resultados de estudios',
      'Recordatorios de citas',
      'Informaci\u00f3n de servicios y especialidades',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Educaci\u00f3n',
    desc: 'Comunicaci\u00f3n inteligente con alumnos, padres e instituciones.',
    bullets: [
      'Soporte acad\u00e9mico automatizado',
      'Tutor\u00edas personalizadas',
      'Automatizaci\u00f3n administrativa (inscripciones, pagos)',
      'Comunicaci\u00f3n con padres y alumnos',
    ],
  },
];

function IndustriesSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.industries.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.industries.title}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
              {t.industries.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.industries.items.map((ind, i) => {
            const Icon = industryIcons[i];
            return (
            <RevealOnScroll key={ind.title} delay={i * 0.08}>
              <div className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{ind.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{ind.desc}</p>
                <ul className="space-y-2 flex-1">
                  {ind.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                      <span className="text-white/55 text-xs leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                {ind.highlight && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-xs font-medium">{ind.highlight}</span>
                    </div>
                  </div>
                )}
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
   Section 5 — Stats (enriched)
   ================================================================= */

const _stats_placeholder = [
  { value: '90%', label: 'Satisfacci\u00f3n promedio con chatbots' },
  { value: '88%', label: 'De consumidores valoran la experiencia tanto como el producto' },
  { value: '76%', label: 'Buscan interacci\u00f3n coherente en todos los canales' },
  { value: '+15%', label: 'M\u00e1s ingresos con personalizaci\u00f3n' },
  { value: '24/7', label: 'Atenci\u00f3n sin intervenci\u00f3n humana' },
  { value: '+70', label: 'Empresas conf\u00edan en DYNAMO' },
];

function StatsSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.stats.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.stats.title}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
              {t.stats.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {t.stats.items.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1}>
              <div className="text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-purple-500/20 transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-heading font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   Section 6 — Implementaci\u00f3n r\u00e1pida (NEW)
   ================================================================= */

const implIcons = [Settings, Rocket, Award];
const implSteps = ['01', '02', '03'];

function ImplementationSection() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              {t.implementation.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mt-4">
              {t.implementation.title}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
              {t.implementation.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.implementation.items.map((s, i) => {
            const Icon = implIcons[i];
            return (
            <RevealOnScroll key={implSteps[i]} delay={i * 0.12}>
              <div className="relative group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-gradient-to-r from-purple-500/30 to-purple-500/10 z-0" />
                )}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-300 relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-3xl font-heading font-bold text-purple-500/30">{implSteps[i]}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
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
   Section 7 — CTA
   ================================================================= */

function StudioCTA() {
  const locale = useLocale();
  const t = i18n[locale] || i18n.es;
  return (
    <section className="py-28 relative">
      <div className="max-w-4xl mx-auto px-6">
        <RevealOnScroll>
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-purple-900/30 via-deep to-deep p-12 md:p-16 text-center overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                {t.cta.title}
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
                {t.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                >
                  {t.cta.ctaPrimary}
                </a>
                <a
                  href="mailto:segundo.salvadores@dynamo.tech"
                  className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  {t.cta.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* =================================================================
   Main Export
   ================================================================= */

export function StudioClientSections() {
  return (
    <>
      <PainPointsSection />
      <ModulesSection />
      <AvailableChannelsSection />
      <IndustriesSection />
      <StatsSection />
      <ImplementationSection />
      <StudioCTA />
    </>
  );
}
