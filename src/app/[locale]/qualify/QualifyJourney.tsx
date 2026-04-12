'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import {
  Building2,
  Globe,
  Users,
  Target,
  Smartphone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

/* ─── Types ─── */
interface StepOption {
  id: string;
  label: string;
  description?: string;
}

interface Step {
  id: number;
  question: string;
  subtitle?: string;
  icon: React.ElementType;
  options: StepOption[];
  multiSelect?: boolean;
}

/* ─── Locale-keyed step texts ─── */
const stepTexts: Record<string, {
  questions: { question: string; subtitle?: string; options: { label: string; description?: string }[] }[];
  stepOf: string;
  prev: string;
  next: string;
  seeResults: string;
  resultTitle: string;
  resultSubtitle: string;
  back: string;
  restart: string;
}> = {
  es: {
    questions: [
      { question: '¿Qué tipo de organización sos?', subtitle: 'Esto nos ayuda a personalizar tu experiencia', options: [
        { label: 'Operador Móvil / Telco', description: 'MNO, MVNO o empresa de telecomunicaciones' },
        { label: 'Agregador / Proveedor VAS', description: 'Content provider, agregador de servicios móviles' },
        { label: 'IT / Tecnología', description: 'Empresa de tecnología o software' },
        { label: 'Otro tipo de organización', description: 'Consultoría, agencia u otro' },
      ]},
      { question: '¿En qué país o región operás?', subtitle: 'Selecciona tu mercado principal', options: [
        { label: '🇦🇷 Argentina' }, { label: '🇨🇱 Chile' }, { label: '🇨🇴 Colombia' }, { label: '🇵🇪 Perú' },
        { label: '🇲🇽 México' }, { label: '🇧🇷 Brasil' }, { label: '🇪🇸 España' }, { label: '🇿🇦 Sudáfrica' },
        { label: '🌎 Centroamérica' }, { label: '🇩🇴 República Dominicana' }, { label: '🌍 Otro país' },
      ]},
      { question: '¿Cuál es tu rol en la organización?', subtitle: 'Para recomendarte el contenido más relevante', options: [
        { label: 'C-Level / Dirección', description: 'CEO, CTO, COO, VP' },
        { label: 'Producto / Marketing', description: 'Product Manager, Marketing Manager, CVM' },
        { label: 'Tecnología / Ingeniería', description: 'IT Manager, Arquitecto, Developer' },
        { label: 'Operaciones / Comercial', description: 'Operaciones, ventas, business development' },
      ]},
      { question: '¿Qué desafíos quieres resolver?', subtitle: 'Puedes elegir más de uno', options: [
        { label: 'Reducir costos de mensajería' }, { label: 'Mejorar retención de suscriptores' },
        { label: 'Optimizar campañas de CVM' }, { label: 'Automatizar la operación' },
        { label: 'Mejorar segmentación y personalización' }, { label: 'Monetizar servicios VAS' },
        { label: 'Aumentar conversión de Adquisición' },
      ]},
      { question: '¿Conocés SAT Push como canal de comunicación?', subtitle: 'SAT Push es un canal nativo de la SIM card', options: [
        { label: 'Sí, ya lo usamos' }, { label: 'Sí, lo conozco pero no lo uso' }, { label: 'No sé qué es' },
      ]},
      { question: '¿Con qué operadores o marcas trabajás?', subtitle: 'Opcional — nos ayuda a personalizar tu demo', options: [
        { label: 'Claro / América Móvil' }, { label: 'Telefónica/Movistar' }, { label: 'Tigo / Millicom' },
        { label: 'Personal / Telecom' }, { label: 'Entel' }, { label: 'WOM' }, { label: 'Otro operador' },
      ]},
    ],
    stepOf: 'Paso',
    prev: 'Anterior',
    next: 'Siguiente',
    seeResults: 'Ver resultados',
    resultTitle: 'Tu solución recomendada',
    resultSubtitle: 'Basándonos en tus respuestas, estas son las soluciones que mejor se adaptan a tu operación.',
    back: 'Volver',
    restart: 'Empezar de nuevo',
  },
  en: {
    questions: [
      { question: 'What type of organization are you?', subtitle: 'This helps us personalize your experience', options: [
        { label: 'Mobile Operator / Telco', description: 'MNO, MVNO, or telecom company' },
        { label: 'Aggregator / VAS Provider', description: 'Content provider, mobile services aggregator' },
        { label: 'IT / Technology', description: 'Technology or software company' },
        { label: 'Other type of organization', description: 'Consulting, agency, or other' },
      ]},
      { question: 'In which country or region do you operate?', subtitle: 'Select your primary market', options: [
        { label: '🇦🇷 Argentina' }, { label: '🇨🇱 Chile' }, { label: '🇨🇴 Colombia' }, { label: '🇵🇪 Peru' },
        { label: '🇲🇽 Mexico' }, { label: '🇧🇷 Brazil' }, { label: '🇪🇸 Spain' }, { label: '🇿🇦 South Africa' },
        { label: '🌎 Central America' }, { label: '🇩🇴 Dominican Republic' }, { label: '🌍 Other country' },
      ]},
      { question: 'What is your role in the organization?', subtitle: 'So we can recommend the most relevant content', options: [
        { label: 'C-Level / Executive', description: 'CEO, CTO, COO, VP' },
        { label: 'Product / Marketing', description: 'Product Manager, Marketing Manager, CVM' },
        { label: 'Technology / Engineering', description: 'IT Manager, Architect, Developer' },
        { label: 'Operations / Commercial', description: 'Operations, sales, business development' },
      ]},
      { question: 'What challenges do you want to solve?', subtitle: 'You can select more than one', options: [
        { label: 'Reduce messaging costs' }, { label: 'Improve subscriber retention' },
        { label: 'Optimize CVM campaigns' }, { label: 'Automate operations' },
        { label: 'Improve segmentation and personalization' }, { label: 'Monetize VAS services' },
        { label: 'Increase acquisition conversion' },
      ]},
      { question: 'Are you familiar with SAT Push as a communication channel?', subtitle: 'SAT Push is a native SIM card channel', options: [
        { label: 'Yes, we already use it' }, { label: 'Yes, I know it but we don\'t use it' }, { label: 'I don\'t know what it is' },
      ]},
      { question: 'Which operators or brands do you work with?', subtitle: 'Optional — helps us personalize your demo', options: [
        { label: 'Claro / Am\u00e9rica M\u00f3vil' }, { label: 'Telef\u00f3nica/Movistar' }, { label: 'Tigo / Millicom' },
        { label: 'Personal / Telecom' }, { label: 'Entel' }, { label: 'WOM' }, { label: 'Other operator' },
      ]},
    ],
    stepOf: 'Step',
    prev: 'Previous',
    next: 'Next',
    seeResults: 'See results',
    resultTitle: 'Your recommended solution',
    resultSubtitle: 'Based on your answers, these are the solutions that best fit your operation.',
    back: 'Back',
    restart: 'Start over',
  },
  fr: {
    questions: [
      { question: 'Quel type d\'organisation \u00eates-vous ?', subtitle: 'Cela nous aide \u00e0 personnaliser votre exp\u00e9rience', options: [
        { label: 'Op\u00e9rateur mobile / Telco', description: 'MNO, MVNO ou entreprise de t\u00e9l\u00e9communications' },
        { label: 'Agr\u00e9gateur / Fournisseur VAS', description: 'Content provider, agr\u00e9gateur de services mobiles' },
        { label: 'IT / Technologie', description: 'Entreprise de technologie ou de logiciels' },
        { label: 'Autre type d\'organisation', description: 'Conseil, agence ou autre' },
      ]},
      { question: 'Dans quel pays ou r\u00e9gion op\u00e9rez-vous ?', subtitle: 'S\u00e9lectionnez votre march\u00e9 principal', options: [
        { label: '🇦🇷 Argentine' }, { label: '🇨🇱 Chili' }, { label: '🇨🇴 Colombie' }, { label: '🇵🇪 P\u00e9rou' },
        { label: '🇲🇽 Mexique' }, { label: '🇧🇷 Br\u00e9sil' }, { label: '🇪🇸 Espagne' }, { label: '🇿🇦 Afrique du Sud' },
        { label: '🌎 Am\u00e9rique centrale' }, { label: '🇩🇴 R\u00e9publique dominicaine' }, { label: '🌍 Autre pays' },
      ]},
      { question: 'Quel est votre r\u00f4le dans l\'organisation ?', subtitle: 'Pour vous recommander le contenu le plus pertinent', options: [
        { label: 'C-Level / Direction', description: 'CEO, CTO, COO, VP' },
        { label: 'Produit / Marketing', description: 'Product Manager, Marketing Manager, CVM' },
        { label: 'Technologie / Ing\u00e9nierie', description: 'IT Manager, Architecte, D\u00e9veloppeur' },
        { label: 'Op\u00e9rations / Commercial', description: 'Op\u00e9rations, ventes, business development' },
      ]},
      { question: 'Quels d\u00e9fis souhaitez-vous relever ?', subtitle: 'Vous pouvez en choisir plusieurs', options: [
        { label: 'R\u00e9duire les co\u00fbts de messagerie' }, { label: 'Am\u00e9liorer la r\u00e9tention des abonn\u00e9s' },
        { label: 'Optimiser les campagnes CVM' }, { label: 'Automatiser les op\u00e9rations' },
        { label: 'Am\u00e9liorer la segmentation et la personnalisation' }, { label: 'Mon\u00e9tiser les services VAS' },
        { label: 'Augmenter la conversion d\'acquisition' },
      ]},
      { question: 'Connaissez-vous le SAT Push comme canal de communication ?', subtitle: 'Le SAT Push est un canal natif de la carte SIM', options: [
        { label: 'Oui, nous l\'utilisons d\u00e9j\u00e0' }, { label: 'Oui, je le connais mais nous ne l\'utilisons pas' }, { label: 'Je ne sais pas ce que c\'est' },
      ]},
      { question: 'Avec quels op\u00e9rateurs ou marques travaillez-vous ?', subtitle: 'Optionnel \u2014 nous aide \u00e0 personnaliser votre d\u00e9mo', options: [
        { label: 'Claro / Am\u00e9rica M\u00f3vil' }, { label: 'Telef\u00f3nica/Movistar' }, { label: 'Tigo / Millicom' },
        { label: 'Personal / Telecom' }, { label: 'Entel' }, { label: 'WOM' }, { label: 'Autre op\u00e9rateur' },
      ]},
    ],
    stepOf: '\u00c9tape',
    prev: 'Pr\u00e9c\u00e9dent',
    next: 'Suivant',
    seeResults: 'Voir les r\u00e9sultats',
    resultTitle: 'Votre solution recommand\u00e9e',
    resultSubtitle: 'Sur la base de vos r\u00e9ponses, voici les solutions les mieux adapt\u00e9es \u00e0 votre activit\u00e9.',
    back: 'Retour',
    restart: 'Recommencer',
  },
  pt: {
    questions: [
      { question: 'Qual \u00e9 o tipo da sua organiza\u00e7\u00e3o?', subtitle: 'Isso nos ajuda a personalizar sua experi\u00eancia', options: [
        { label: 'Operadora M\u00f3vel / Telco', description: 'MNO, MVNO ou empresa de telecomunica\u00e7\u00f5es' },
        { label: 'Agregador / Provedor VAS', description: 'Content provider, agregador de servi\u00e7os m\u00f3veis' },
        { label: 'TI / Tecnologia', description: 'Empresa de tecnologia ou software' },
        { label: 'Outro tipo de organiza\u00e7\u00e3o', description: 'Consultoria, ag\u00eancia ou outro' },
      ]},
      { question: 'Em qual pa\u00eds ou regi\u00e3o voc\u00ea opera?', subtitle: 'Selecione seu mercado principal', options: [
        { label: '🇦🇷 Argentina' }, { label: '🇨🇱 Chile' }, { label: '🇨🇴 Col\u00f4mbia' }, { label: '🇵🇪 Peru' },
        { label: '🇲🇽 M\u00e9xico' }, { label: '🇧🇷 Brasil' }, { label: '🇪🇸 Espanha' }, { label: '🇿🇦 \u00c1frica do Sul' },
        { label: '🌎 Am\u00e9rica Central' }, { label: '🇩🇴 Rep\u00fablica Dominicana' }, { label: '🌍 Outro pa\u00eds' },
      ]},
      { question: 'Qual \u00e9 o seu cargo na organiza\u00e7\u00e3o?', subtitle: 'Para recomendar o conte\u00fado mais relevante', options: [
        { label: 'C-Level / Dire\u00e7\u00e3o', description: 'CEO, CTO, COO, VP' },
        { label: 'Produto / Marketing', description: 'Product Manager, Marketing Manager, CVM' },
        { label: 'Tecnologia / Engenharia', description: 'IT Manager, Arquiteto, Desenvolvedor' },
        { label: 'Opera\u00e7\u00f5es / Comercial', description: 'Opera\u00e7\u00f5es, vendas, business development' },
      ]},
      { question: 'Quais desafios voc\u00ea quer resolver?', subtitle: 'Voc\u00ea pode escolher mais de um', options: [
        { label: 'Reduzir custos de mensageria' }, { label: 'Melhorar reten\u00e7\u00e3o de assinantes' },
        { label: 'Otimizar campanhas de CVM' }, { label: 'Automatizar a opera\u00e7\u00e3o' },
        { label: 'Melhorar segmenta\u00e7\u00e3o e personaliza\u00e7\u00e3o' }, { label: 'Monetizar servi\u00e7os VAS' },
        { label: 'Aumentar convers\u00e3o de aquisi\u00e7\u00e3o' },
      ]},
      { question: 'Voc\u00ea conhece o SAT Push como canal de comunica\u00e7\u00e3o?', subtitle: 'SAT Push \u00e9 um canal nativo do cart\u00e3o SIM', options: [
        { label: 'Sim, j\u00e1 usamos' }, { label: 'Sim, conhe\u00e7o mas n\u00e3o uso' }, { label: 'N\u00e3o sei o que \u00e9' },
      ]},
      { question: 'Com quais operadoras ou marcas voc\u00ea trabalha?', subtitle: 'Opcional \u2014 nos ajuda a personalizar sua demo', options: [
        { label: 'Claro / Am\u00e9rica M\u00f3vil' }, { label: 'Telef\u00f3nica/Movistar' }, { label: 'Tigo / Millicom' },
        { label: 'Personal / Telecom' }, { label: 'Entel' }, { label: 'WOM' }, { label: 'Outra operadora' },
      ]},
    ],
    stepOf: 'Passo',
    prev: 'Anterior',
    next: 'Pr\u00f3ximo',
    seeResults: 'Ver resultados',
    resultTitle: 'Sua solu\u00e7\u00e3o recomendada',
    resultSubtitle: 'Com base nas suas respostas, estas s\u00e3o as solu\u00e7\u00f5es que melhor se adaptam \u00e0 sua opera\u00e7\u00e3o.',
    back: 'Voltar',
    restart: 'Come\u00e7ar de novo',
  },
};

/* ─── Step icon config (locale-independent) ─── */
const stepIcons = [Building2, Globe, Users, Target, Smartphone, MessageSquare];
const stepOptionIds = [
  ['telco', 'aggregator', 'enterprise', 'other'],
  ['ar', 'cl', 'co', 'pe', 'mx', 'br', 'es', 'za', 'ca', 'do', 'other'],
  ['clevel', 'product', 'tech', 'ops'],
  ['messaging-cost', 'retention', 'campaigns', 'operations', 'segmentation', 'vas', 'conversion'],
  ['yes-use', 'yes-know', 'no'],
  ['claro', 'movistar', 'tigo', 'personal', 'entel', 'wom', 'other'],
];
const stepMultiSelect = [false, false, false, true, false, true];

function buildSteps(locale: string): Step[] {
  const t = stepTexts[locale] || stepTexts.es;
  return t.questions.map((q, i) => ({
    id: i,
    question: q.question,
    subtitle: q.subtitle,
    icon: stepIcons[i],
    multiSelect: stepMultiSelect[i] || undefined,
    options: q.options.map((opt, j) => ({
      id: stepOptionIds[i][j],
      label: opt.label,
      description: opt.description,
    })),
  }));
}

/* ─── Result Configuration ─── */
interface Recommendation {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: React.ElementType;
}

const recTexts: Record<string, {
  cvmTitle: string; cvmDesc: string; cvmCta: string;
  vasTitle: string; vasDesc: string; vasCta: string;
  entTitle: string; entDesc: string; entCta: string;
  fallbackTitle: string; fallbackDesc: string; fallbackCta: string;
}> = {
  es: {
    cvmTitle: 'DYNAMO Journeys \u2014 CVM / CORE',
    cvmDesc: 'Orquestaci\u00f3n omnicanal para campa\u00f1as de retenci\u00f3n, upselling y cross-selling. Reduc\u00ed costos de mensajer\u00eda hasta un 95% con SAT Push.',
    cvmCta: 'Ver soluci\u00f3n CVM',
    vasTitle: 'DYNAMO Journeys \u2014 VAS',
    vasDesc: 'Monetiz\u00e1 servicios de valor agregado: m\u00fasica, hor\u00f3scopos, pr\u00e9stamos y m\u00e1s. Journeys automatizados para adquisici\u00f3n y engagement.',
    vasCta: 'Ver soluci\u00f3n VAS',
    entTitle: 'DYNAMO para empresas de tecnolog\u00eda',
    entDesc: 'Descubr\u00ed c\u00f3mo nuestras APIs y plataforma se integran con tu stack tecnol\u00f3gico para campa\u00f1as masivas.',
    entCta: 'Contactar al equipo',
    fallbackTitle: 'Hablemos sobre tu caso',
    fallbackDesc: 'Bas\u00e1ndonos en tus respuestas, te recomendamos una conversaci\u00f3n directa con nuestro equipo para evaluar la mejor soluci\u00f3n.',
    fallbackCta: 'Agendar una demo',
  },
  en: {
    cvmTitle: 'DYNAMO Journeys \u2014 CVM / CORE',
    cvmDesc: 'Omnichannel orchestration for retention, upselling, and cross-selling campaigns. Reduce messaging costs by up to 95% with SAT Push.',
    cvmCta: 'View CVM solution',
    vasTitle: 'DYNAMO Journeys \u2014 VAS',
    vasDesc: 'Monetize value-added services: music, horoscopes, loans, and more. Automated journeys for acquisition and engagement.',
    vasCta: 'View VAS solution',
    entTitle: 'DYNAMO for technology companies',
    entDesc: 'Discover how our APIs and platform integrate with your tech stack for large-scale campaigns.',
    entCta: 'Contact the team',
    fallbackTitle: 'Let\'s talk about your case',
    fallbackDesc: 'Based on your answers, we recommend a direct conversation with our team to evaluate the best solution.',
    fallbackCta: 'Book a demo',
  },
  fr: {
    cvmTitle: 'DYNAMO Journeys \u2014 CVM / CORE',
    cvmDesc: 'Orchestration omnicanale pour les campagnes de r\u00e9tention, d\'upselling et de cross-selling. R\u00e9duisez les co\u00fbts de messagerie jusqu\'\u00e0 95 % avec SAT Push.',
    cvmCta: 'Voir la solution CVM',
    vasTitle: 'DYNAMO Journeys \u2014 VAS',
    vasDesc: 'Mon\u00e9tisez les services \u00e0 valeur ajout\u00e9e : musique, horoscopes, pr\u00eats et plus. Journeys automatis\u00e9s pour l\'acquisition et l\'engagement.',
    vasCta: 'Voir la solution VAS',
    entTitle: 'DYNAMO pour les entreprises technologiques',
    entDesc: 'D\u00e9couvrez comment nos APIs et notre plateforme s\'int\u00e8grent \u00e0 votre stack technologique pour des campagnes massives.',
    entCta: 'Contacter l\'\u00e9quipe',
    fallbackTitle: 'Parlons de votre cas',
    fallbackDesc: 'Sur la base de vos r\u00e9ponses, nous vous recommandons un \u00e9change direct avec notre \u00e9quipe pour \u00e9valuer la meilleure solution.',
    fallbackCta: 'R\u00e9server une d\u00e9mo',
  },
  pt: {
    cvmTitle: 'DYNAMO Journeys \u2014 CVM / CORE',
    cvmDesc: 'Orquestra\u00e7\u00e3o omnichannel para campanhas de reten\u00e7\u00e3o, upselling e cross-selling. Reduza custos de mensageria em at\u00e9 95% com SAT Push.',
    cvmCta: 'Ver solu\u00e7\u00e3o CVM',
    vasTitle: 'DYNAMO Journeys \u2014 VAS',
    vasDesc: 'Monetize servi\u00e7os de valor agregado: m\u00fasica, hor\u00f3scopos, empr\u00e9stimos e mais. Journeys automatizados para aquisi\u00e7\u00e3o e engajamento.',
    vasCta: 'Ver solu\u00e7\u00e3o VAS',
    entTitle: 'DYNAMO para empresas de tecnologia',
    entDesc: 'Descubra como nossas APIs e plataforma se integram ao seu stack tecnol\u00f3gico para campanhas em escala.',
    entCta: 'Contatar a equipe',
    fallbackTitle: 'Vamos falar sobre o seu caso',
    fallbackDesc: 'Com base nas suas respostas, recomendamos uma conversa direta com nossa equipe para avaliar a melhor solu\u00e7\u00e3o.',
    fallbackCta: 'Agendar uma demo',
  },
};

function getRecommendations(answers: Record<number, string | string[]>, locale: string): Recommendation[] {
  const orgType = answers[0] as string;
  const challenges = (answers[3] as string[]) || [];
  const rt = recTexts[locale] || recTexts.es;
  const results: Recommendation[] = [];

  if (orgType === 'telco' || orgType === 'aggregator') {
    if (challenges.includes('messaging-cost') || challenges.includes('campaigns') || challenges.includes('retention')) {
      results.push({
        title: rt.cvmTitle,
        description: rt.cvmDesc,
        cta: rt.cvmCta,
        href: '/cvm',
        icon: Target,
      });
    }
    if (challenges.includes('vas') || challenges.includes('conversion')) {
      results.push({
        title: rt.vasTitle,
        description: rt.vasDesc,
        cta: rt.vasCta,
        href: '/vas',
        icon: Sparkles,
      });
    }
  }

  if (orgType === 'enterprise' || orgType === 'other') {
    results.push({
      title: rt.entTitle,
      description: rt.entDesc,
      cta: rt.entCta,
      href: '/contacto',
      icon: Building2,
    });
  }

  if (results.length === 0) {
    results.push({
      title: rt.fallbackTitle,
      description: rt.fallbackDesc,
      cta: rt.fallbackCta,
      href: '/contacto',
      icon: MessageSquare,
    });
  }

  return results;
}

/* ─── Animation Variants ─── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

/* ─── Component ─── */
export default function QualifyJourney() {
  const locale = useLocale();
  const qt = stepTexts[locale] || stepTexts.es;
  const steps = buildSteps(locale);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [direction, setDirection] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const step = steps[currentStep];

  const handleSelect = useCallback(
    (optionId: string) => {
      if (step.multiSelect) {
        const current = (answers[currentStep] as string[]) || [];
        const updated = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        setAnswers((prev) => ({ ...prev, [currentStep]: updated }));
      } else {
        setAnswers((prev) => ({ ...prev, [currentStep]: optionId }));
        // Auto-advance for single select
        setTimeout(() => {
          if (currentStep < steps.length - 1) {
            setDirection(1);
            setCurrentStep((s) => s + 1);
          } else {
            setIsComplete(true);
          }
        }, 300);
      }
    },
    [currentStep, answers, step.multiSelect],
  );

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (isComplete) {
      setIsComplete(false);
      return;
    }
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep, isComplete]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setDirection(0);
    setIsComplete(false);
  }, []);

  const isOptionSelected = (optionId: string) => {
    const answer = answers[currentStep];
    if (Array.isArray(answer)) return answer.includes(optionId);
    return answer === optionId;
  };

  const hasAnswer = answers[currentStep] !== undefined &&
    (Array.isArray(answers[currentStep]) ? (answers[currentStep] as string[]).length > 0 : true);

  const recommendations = isComplete ? getRecommendations(answers, locale) : [];

  return (
    <section className="min-h-screen bg-deep pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* ─── Progress Bar ─── */}
        {!isComplete && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/50">
                {qt.stepOf} {currentStep + 1} / {steps.length}
              </span>
              <span className="text-sm text-white/50">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-lime to-electric rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}

        {/* ─── Question Card ─── */}
        <AnimatePresence mode="wait" custom={direction}>
          {!isComplete ? (
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12"
            >
              {/* Question header */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-lime" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {step.question}
                </h2>
              </div>
              {step.subtitle && (
                <p className="text-white/50 mb-8 ml-16">{step.subtitle}</p>
              )}

              {/* Options */}
              <div className="space-y-3 mt-8">
                {step.options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                      isOptionSelected(option.id)
                        ? 'bg-lime/10 border-lime/40 text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-white">{option.label}</span>
                        {option.description && (
                          <p className="text-sm text-white/40 mt-1">{option.description}</p>
                        )}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isOptionSelected(option.id)
                            ? 'border-lime bg-lime'
                            : 'border-white/20'
                        }`}
                      >
                        {isOptionSelected(option.id) && (
                          <CheckCircle2 className="w-4 h-4 text-deep" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handleBack}
                  className={`flex items-center gap-2 text-white/50 hover:text-white transition-colors ${
                    currentStep === 0 ? 'invisible' : ''
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {qt.prev}
                </button>

                {step.multiSelect && (
                  <button
                    onClick={handleNext}
                    disabled={!hasAnswer}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                      hasAnswer
                        ? 'bg-lime text-deep hover:shadow-[0_0_20px_rgba(205,255,0,0.3)]'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    {currentStep === steps.length - 1 ? qt.seeResults : qt.next}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            /* ─── Results ─── */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="w-8 h-8 text-lime" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {qt.resultTitle}
                </h2>
                <p className="text-white/50 max-w-lg mx-auto">
                  {qt.resultSubtitle}
                </p>
              </div>

              <div className="space-y-6">
                {recommendations.map((rec, idx) => (
                  <motion.a
                    key={idx}
                    href={rec.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.15 }}
                    className="block bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-lime/20 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
                        <rec.icon className="w-6 h-6 text-lime" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{rec.title}</h3>
                        <p className="text-white/60 mb-4">{rec.description}</p>
                        <span className="inline-flex items-center gap-2 text-lime font-semibold group-hover:gap-3 transition-all">
                          {rec.cta}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Reset */}
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {qt.back}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  {qt.restart}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
