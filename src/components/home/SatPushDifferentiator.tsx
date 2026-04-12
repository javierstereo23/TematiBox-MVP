'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  LayoutGrid,
  Smartphone,
  MessageCircle,
  TrendingUp,
  Cpu,
  Cloud,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRef, useState, useEffect } from 'react';

/* ── i18n ────────────────────────────────────────────────────── */
const i18n = {
  es: {
    tag: 'Diferencial clave',
    title1: 'SAT Push: ',
    titleHighlight: 'el arma secreta',
    title2: ' del Operador',
    ctaSatPush: 'Conocer SAT Push en detalle',
    ctaUseCases: 'Casos de uso SAT Push',
    ctaOta: 'OTA Cloud & SIM Application',
    appletTitle: 'Applet propietario + OTA Cloud',
    appletDesc:
      'Compatibilizamos over-the-air toda la base legacy del Operador, sin necesidad de cambiar la SIM card (SIM swap). Compatible con todos los SIM vendors del mercado, incluyendo eSIMs. Todo bajo un framework de seguridad avanzado donde la información está encriptada en la nube del Operador.',
    appletTags: [
      'Instalación OTA sin SIM swap',
      'Compatible con todos los SIM vendors',
      'Soporte eSIM',
      'Encriptación end-to-end',
      'Cloud del Operador',
    ],
    satellites: [
      {
        title: 'Múltiples formatos',
        description:
          'Combine múltiples pantallas, con o sin menú de opciones. Solicite información al consumidor. Display, Menú y Get Input.',
      },
      {
        title: 'Compatibilidad y alcance',
        description:
          'Compatible con el 95% de los dispositivos móviles: básicos, feature phones y smartphones incluyendo tablets.',
      },
      {
        title: 'Interactividad real',
        description:
          'No solo para adquisición — este canal permite crear un verdadero diálogo con el consumidor. Promueva servicios core y VAS personalizados.',
      },
      {
        title: '10x más conversión',
        description:
          'SAT Push genera tasas de conversión de 2 a 10 veces más altas que SMS o email marketing. El canal más efectivo del mercado.',
      },
    ],
    // Phone mockup texts
    phoneOperator: 'OPERADOR MÓVIL',
    phoneDisplayMsg:
      'Su plan de datos está a punto de agotarse. Renuévelo ahora por $5 a la semana, plan 4GB con WhatsApp ilimitado. OK para activarlo!',
    phoneCancelBtn: 'Cancelar',
    phoneOkBtn: 'OK',
    phoneMenuTitle: 'Seleccione una opción:',
    phoneMenuOptions: [
      { label: 'Plan Básico 2GB', price: '$3/mes' },
      { label: 'Plan Plus 5GB', price: '$5/mes' },
      { label: 'Plan Ilimitado 10GB', price: '$10/mes' },
      { label: 'Plan Familiar 20GB', price: '$15/mes' },
    ],
    phoneInputTitle: '\u00bfCuál es tu interés?',
    phoneInputPlaceholder: 'Escriba su respuesta...',
    phoneInputCategories: ['Deportes', 'Música', 'Noticias', 'Gaming'],
    formatLabels: ['Display', 'Menú', 'Get Input'],
  },
  en: {
    tag: 'Key differentiator',
    title1: 'SAT Push: ',
    titleHighlight: 'the Operator\'s secret weapon',
    title2: '',
    ctaSatPush: 'Explore SAT Push in detail',
    ctaUseCases: 'SAT Push use cases',
    ctaOta: 'OTA Cloud & SIM Application',
    appletTitle: 'Proprietary Applet + OTA Cloud',
    appletDesc:
      'We make the Operator\'s entire legacy base compatible over-the-air, without the need for a SIM swap. Compatible with all SIM vendors on the market, including eSIMs. All under an advanced security framework where information is encrypted in the Operator\'s cloud.',
    appletTags: [
      'OTA installation without SIM swap',
      'Compatible with all SIM vendors',
      'eSIM support',
      'End-to-end encryption',
      'Operator Cloud',
    ],
    satellites: [
      {
        title: 'Multiple formats',
        description:
          'Combine multiple screens, with or without option menus. Request information from the consumer. Display, Menu, and Get Input.',
      },
      {
        title: 'Compatibility and reach',
        description:
          'Compatible with 95% of mobile devices: basic phones, feature phones, and smartphones including tablets.',
      },
      {
        title: 'Real interactivity',
        description:
          'Not just for acquisition — this channel enables a true dialogue with the consumer. Promote personalized core and VAS services.',
      },
      {
        title: '10x more conversion',
        description:
          'SAT Push generates conversion rates 2 to 10 times higher than SMS or email marketing. The most effective channel on the market.',
      },
    ],
    phoneOperator: 'MOBILE OPERATOR',
    phoneDisplayMsg:
      'Your data plan is about to run out. Renew now for $5/week, 4GB plan with unlimited WhatsApp. OK to activate!',
    phoneCancelBtn: 'Cancel',
    phoneOkBtn: 'OK',
    phoneMenuTitle: 'Select an option:',
    phoneMenuOptions: [
      { label: 'Basic Plan 2GB', price: '$3/mo' },
      { label: 'Plus Plan 5GB', price: '$5/mo' },
      { label: 'Unlimited Plan 10GB', price: '$10/mo' },
      { label: 'Family Plan 20GB', price: '$15/mo' },
    ],
    phoneInputTitle: 'What are you interested in?',
    phoneInputPlaceholder: 'Type your answer...',
    phoneInputCategories: ['Sports', 'Music', 'News', 'Gaming'],
    formatLabels: ['Display', 'Menu', 'Get Input'],
  },
  fr: {
    tag: 'Différenciateur clé',
    title1: 'SAT Push : ',
    titleHighlight: 'l\'arme secrète',
    title2: ' de l\'Opérateur',
    ctaSatPush: 'Découvrir SAT Push en détail',
    ctaUseCases: 'Cas d\'usage SAT Push',
    ctaOta: 'OTA Cloud & SIM Application',
    appletTitle: 'Applet propriétaire + OTA Cloud',
    appletDesc:
      'Nous rendons compatible over-the-air toute la base legacy de l\'Opérateur, sans besoin de changer la carte SIM (SIM swap). Compatible avec tous les SIM vendors du marché, y compris les eSIMs. Le tout sous un framework de sécurité avancé où les informations sont chiffrées dans le cloud de l\'Opérateur.',
    appletTags: [
      'Installation OTA sans SIM swap',
      'Compatible avec tous les SIM vendors',
      'Support eSIM',
      'Chiffrement end-to-end',
      'Cloud de l\'Opérateur',
    ],
    satellites: [
      {
        title: 'Formats multiples',
        description:
          'Combinez plusieurs écrans, avec ou sans menu d\'options. Demandez des informations au consommateur. Display, Menu et Get Input.',
      },
      {
        title: 'Compatibilité et portée',
        description:
          'Compatible avec 95% des appareils mobiles : basiques, feature phones et smartphones, y compris les tablettes.',
      },
      {
        title: 'Interactivité réelle',
        description:
          'Pas seulement pour l\'acquisition — ce canal permet de créer un véritable dialogue avec le consommateur. Promouvez des services core et VAS personnalisés.',
      },
      {
        title: '10x plus de conversion',
        description:
          'SAT Push génère des taux de conversion de 2 à 10 fois supérieurs au SMS ou à l\'email marketing. Le canal le plus efficace du marché.',
      },
    ],
    phoneOperator: 'OPÉRATEUR MOBILE',
    phoneDisplayMsg:
      'Votre forfait data est sur le point d\'être épuisé. Renouvelez maintenant pour 5\u00a0$/semaine, forfait 4Go avec WhatsApp illimité. OK pour activer\u00a0!',
    phoneCancelBtn: 'Annuler',
    phoneOkBtn: 'OK',
    phoneMenuTitle: 'Sélectionnez une option\u00a0:',
    phoneMenuOptions: [
      { label: 'Forfait Basique 2Go', price: '3\u00a0$/mois' },
      { label: 'Forfait Plus 5Go', price: '5\u00a0$/mois' },
      { label: 'Forfait Illimité 10Go', price: '10\u00a0$/mois' },
      { label: 'Forfait Famille 20Go', price: '15\u00a0$/mois' },
    ],
    phoneInputTitle: 'Quel est votre centre d\'intérêt\u00a0?',
    phoneInputPlaceholder: 'Écrivez votre réponse...',
    phoneInputCategories: ['Sport', 'Musique', 'Actualités', 'Gaming'],
    formatLabels: ['Display', 'Menu', 'Get Input'],
  },
  pt: {
    tag: 'Diferencial chave',
    title1: 'SAT Push: ',
    titleHighlight: 'a arma secreta',
    title2: ' do Operador',
    ctaSatPush: 'Conhecer SAT Push em detalhe',
    ctaUseCases: 'Casos de uso SAT Push',
    ctaOta: 'OTA Cloud & SIM Application',
    appletTitle: 'Applet proprietário + OTA Cloud',
    appletDesc:
      'Compatibilizamos over-the-air toda a base legacy do Operador, sem necessidade de trocar o SIM card (SIM swap). Compatível com todos os SIM vendors do mercado, incluindo eSIMs. Tudo sob um framework de segurança avançado onde a informação é criptografada na nuvem do Operador.',
    appletTags: [
      'Instalação OTA sem SIM swap',
      'Compatível com todos os SIM vendors',
      'Suporte eSIM',
      'Criptografia end-to-end',
      'Cloud do Operador',
    ],
    satellites: [
      {
        title: 'Múltiplos formatos',
        description:
          'Combine múltiplas telas, com ou sem menu de opções. Solicite informações do consumidor. Display, Menu e Get Input.',
      },
      {
        title: 'Compatibilidade e alcance',
        description:
          'Compatível com 95% dos dispositivos móveis: básicos, feature phones e smartphones incluindo tablets.',
      },
      {
        title: 'Interatividade real',
        description:
          'Não apenas para aquisição — este canal permite criar um verdadeiro diálogo com o consumidor. Promova serviços core e VAS personalizados.',
      },
      {
        title: '10x mais conversão',
        description:
          'SAT Push gera taxas de conversão de 2 a 10 vezes maiores que SMS ou email marketing. O canal mais efetivo do mercado.',
      },
    ],
    phoneOperator: 'OPERADORA MÓVEL',
    phoneDisplayMsg:
      'Seu plano de dados está prestes a acabar. Renove agora por $5/semana, plano 4GB com WhatsApp ilimitado. OK para ativar!',
    phoneCancelBtn: 'Cancelar',
    phoneOkBtn: 'OK',
    phoneMenuTitle: 'Selecione uma opção:',
    phoneMenuOptions: [
      { label: 'Plano Básico 2GB', price: 'R$3/mês' },
      { label: 'Plano Plus 5GB', price: 'R$5/mês' },
      { label: 'Plano Ilimitado 10GB', price: 'R$10/mês' },
      { label: 'Plano Família 20GB', price: 'R$15/mês' },
    ],
    phoneInputTitle: 'Qual é o seu interesse?',
    phoneInputPlaceholder: 'Digite sua resposta...',
    phoneInputCategories: ['Esportes', 'Música', 'Notícias', 'Gaming'],
    formatLabels: ['Display', 'Menu', 'Get Input'],
  },
};

type I18nLocale = (typeof i18n)['es'];

const satelliteIcons = [LayoutGrid, Smartphone, MessageCircle, TrendingUp];
const satellitePositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

/* -- Animated Phone Mockup with cycling formats -------------------------- */
function SatPushAnimatedPhone({ t }: { t: I18nLocale }) {
  const [activeFormat, setActiveFormat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFormat((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const satFormats = [
    {
      id: 'display',
      label: t.formatLabels[0],
      content: (
        <div className="rounded-2xl bg-[#2d2d30] shadow-2xl shadow-black/60 overflow-hidden border border-white/10">
          <div className="px-5 pt-5 pb-3 text-center">
            <div className="text-[13px] font-semibold text-white/90 mb-1">
              {t.phoneOperator}
            </div>
          </div>
          <div className="px-5 pb-4">
            <p className="text-[12px] text-white/70 leading-[1.5] text-center">
              {t.phoneDisplayMsg}
            </p>
          </div>
          <div className="border-t border-white/10 flex">
            <button className="flex-1 py-3 text-[13px] font-medium text-white/50 border-r border-white/10">
              {t.phoneCancelBtn}
            </button>
            <button className="flex-1 py-3 text-[13px] font-semibold text-lime">
              {t.phoneOkBtn}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'menu',
      label: t.formatLabels[1],
      content: (
        <div className="rounded-2xl bg-[#2d2d30] shadow-2xl shadow-black/60 overflow-hidden border border-white/10">
          <div className="px-5 pt-5 pb-3">
            <div className="text-[13px] font-semibold text-white/90 mb-3 text-center">
              {t.phoneMenuTitle}
            </div>
          </div>
          <div className="px-4 pb-4 space-y-2">
            {t.phoneMenuOptions.map((opt, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-lime/20 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] text-white/80 font-medium">{opt.label}</span>
                </div>
                <span className="text-[11px] text-lime font-semibold">{opt.price}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'getinput',
      label: t.formatLabels[2],
      content: (
        <div className="rounded-2xl bg-[#2d2d30] shadow-2xl shadow-black/60 overflow-hidden border border-white/10">
          <div className="px-5 pt-5 pb-3 text-center">
            <div className="text-[13px] font-semibold text-white/90 mb-1">
              {t.phoneInputTitle}
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="rounded-lg bg-white/[0.06] border border-white/10 px-3 py-2.5 mb-3">
              <span className="text-[12px] text-white/30 italic">{t.phoneInputPlaceholder}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {t.phoneInputCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-[10px] font-medium text-purple-300"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind phone */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[280px] h-[400px] rounded-[60px] bg-purple-500/15 blur-[80px]" />
        <div className="absolute w-[200px] h-[300px] rounded-[40px] bg-lime/10 blur-[60px] translate-y-8" />
      </div>

      {/* Phone frame */}
      <div className="relative w-[260px] sm:w-[280px] rounded-[36px] bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] p-[3px] shadow-2xl shadow-black/50">
        <div className="rounded-[34px] bg-[#111113] overflow-hidden">
          {/* Notch area */}
          <div className="relative h-7 flex items-center justify-center">
            <div className="w-[80px] h-[20px] bg-[#111113] rounded-b-2xl relative z-10">
              <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[#1a1a1e] border border-[#333]" />
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-1 text-[9px] text-white/60 font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[100, 80, 60, 40].map((h, i) => (
                  <div key={i} className="w-[3px] rounded-sm bg-white/60" style={{ height: `${h / 10}px` }} />
                ))}
              </div>
              <span className="text-[8px] ml-1">LTE</span>
              <div className="w-4 h-[8px] rounded-[2px] border border-white/40 relative ml-1">
                <div className="absolute inset-[1px] right-[2px] rounded-[1px] bg-lime/80" />
              </div>
            </div>
          </div>

          {/* Screen area */}
          <div className="relative h-[380px] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]">
            {/* Dimmed app grid behind */}
            <div className="grid grid-cols-4 gap-3 p-5 pt-6 opacity-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-xl"
                    style={{
                      background: [
                        'linear-gradient(135deg, #4CAF50, #2E7D32)',
                        'linear-gradient(135deg, #2196F3, #1565C0)',
                        'linear-gradient(135deg, #FF9800, #E65100)',
                        'linear-gradient(135deg, #9C27B0, #6A1B9A)',
                        'linear-gradient(135deg, #F44336, #C62828)',
                        'linear-gradient(135deg, #00BCD4, #00838F)',
                        'linear-gradient(135deg, #FF5722, #BF360C)',
                        'linear-gradient(135deg, #3F51B5, #283593)',
                        'linear-gradient(135deg, #607D8B, #37474F)',
                        'linear-gradient(135deg, #795548, #4E342E)',
                        'linear-gradient(135deg, #009688, #00695C)',
                        'linear-gradient(135deg, #CDDC39, #9E9D24)',
                      ][i],
                    }}
                  />
                  <div className="w-7 h-1 rounded bg-white/20" />
                </div>
              ))}
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Cycling SAT Push dialog */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={satFormats[activeFormat].id}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {satFormats[activeFormat].content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Home indicator */}
          <div className="h-7 flex items-center justify-center">
            <div className="w-24 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Format indicators below phone */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {satFormats.map((fmt, i) => (
          <button
            key={fmt.id}
            onClick={() => setActiveFormat(i)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-300 ${
              activeFormat === i
                ? 'bg-lime/15 border border-lime/30 text-lime'
                : 'bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/60'
            }`}
          >
            {fmt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -- Satellite capability card ------------------------------------------- */
function SatelliteCard({
  title,
  description,
  iconIndex,
  index,
  isInView,
}: {
  title: string;
  description: string;
  iconIndex: number;
  index: number;
  isInView: boolean;
}) {
  const Icon = satelliteIcons[iconIndex];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center flex-shrink-0 group-hover:bg-lime/15 transition-colors">
          <Icon className="w-4 h-4 text-lime" />
        </div>
        <div>
          <h4 className="text-base sm:text-sm font-bold text-white mb-1">{title}</h4>
          <p className="text-base sm:text-[13px] text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   Main Section Component
   ================================================================ */
export default function SatPushDifferentiator() {
  const locale = useLocale();
  const t = i18n[locale as keyof typeof i18n] || i18n.es;
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const isMetricsInView = useInView(metricsRef, { once: true, margin: '-40px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(205,255,0,0.04) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-lime"
              style={{
                left: `${10 + (i * 37) % 80}%`,
                top: `${5 + (i * 53) % 90}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-lime/10 border border-lime/20 text-xs font-semibold text-lime mb-5 tracking-wide">
            {t.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] max-w-3xl mx-auto">
            <span className="text-white">{t.title1}</span>
            <span className="bg-gradient-to-r from-lime to-lime-dark bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
            <span className="text-white">{t.title2}</span>
          </h2>
        </motion.div>

        {/* Main layout: satellites around phone */}
        <div className="relative mb-20">
          {/* Desktop: 3-column grid with phone in center */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center">
            {/* Left column: top-left + bottom-left */}
            <div className="space-y-12">
              <SatelliteCard title={t.satellites[0].title} description={t.satellites[0].description} iconIndex={0} index={0} isInView={isInView} />
              <SatelliteCard title={t.satellites[2].title} description={t.satellites[2].description} iconIndex={2} index={2} isInView={isInView} />
            </div>

            {/* Center: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center py-8 pb-16"
            >
              <SatPushAnimatedPhone t={t} />
            </motion.div>

            {/* Right column: top-right + bottom-right */}
            <div className="space-y-12">
              <SatelliteCard title={t.satellites[1].title} description={t.satellites[1].description} iconIndex={1} index={1} isInView={isInView} />
              <SatelliteCard title={t.satellites[3].title} description={t.satellites[3].description} iconIndex={3} index={3} isInView={isInView} />
            </div>
          </div>

          {/* Mobile: phone on top, capabilities below */}
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center py-8 pb-16 mb-10"
            >
              <SatPushAnimatedPhone t={t} />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {t.satellites.map((sat, i) => (
                <SatelliteCard key={sat.title} title={sat.title} description={sat.description} iconIndex={i} index={i} isInView={isInView} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA to SAT Push page */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center my-12"
        >
          <Link
            href={`/${locale}/sat-push`}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-lime text-deep font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_32px_rgba(205,255,0,0.3)] hover:-translate-y-0.5"
          >
            {t.ctaSatPush}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* OTA Cloud + Applet Section — with 3D SIM animation */}
        <motion.div
          ref={metricsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-2xl border border-lime/10 bg-gradient-to-br from-lime/[0.04] to-purple-500/[0.02] p-8 lg:p-10 mb-12 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-center">
            {/* Left: text content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-purple-400" />
                </div>
                <div className="w-9 h-9 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-lime" />
                </div>
                <h3 className="text-lg font-bold text-white ml-1">{t.appletTitle}</h3>
              </div>

              <p className="text-white/60 leading-relaxed mb-6">
                {t.appletDesc}
              </p>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {t.appletTags.map((tag) => (
                  <span key={tag} className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-6">
                <Link href={`/${locale}/sat-push`} className="inline-flex items-center gap-2 text-sm font-semibold text-lime hover:text-lime/80 transition-colors group">
                  {t.ctaUseCases} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href={`/${locale}/ota-sim`} className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white/70 transition-colors">
                  {t.ctaOta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: 3D SIM Card + OTA Cloud animation */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-[280px] h-[300px]">
                {/* Cloud icon at top */}
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-lime/10 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                    <Cloud className="w-8 h-8 text-purple-300" />
                  </div>
                  <div className="text-[9px] text-white/40 text-center mt-1.5 font-semibold tracking-wider uppercase">OTA Cloud</div>
                </motion.div>

                {/* Animated download beam from cloud to SIM */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 280 300">
                  <defs>
                    <linearGradient id="ota-beam" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#CDFF00" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {/* Beam line */}
                  <motion.line
                    x1="140" y1="80" x2="140" y2="170"
                    stroke="url(#ota-beam)" strokeWidth="2" strokeDasharray="6 4"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Traveling data packet */}
                  <motion.circle
                    cx="140" r="3" fill="#CDFF00"
                    filter="drop-shadow(0 0 6px #CDFF00)"
                    animate={{ cy: [80, 170], opacity: [1, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn', repeatDelay: 0.5 }}
                  />
                  {/* Second packet staggered */}
                  <motion.circle
                    cx="140" r="2.5" fill="#7C3AED"
                    filter="drop-shadow(0 0 4px #7C3AED)"
                    animate={{ cy: [80, 170], opacity: [1, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn', delay: 0.8, repeatDelay: 0.5 }}
                  />
                </svg>

                {/* SIM Card - 3D perspective */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
                  animate={{ rotateY: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ perspective: '600px' }}
                >
                  <div
                    className="relative w-[140px] h-[100px] rounded-xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, #1a1060 0%, #0c0a2a 40%, #050510 100%)',
                      border: '1px solid rgba(139,92,246,0.3)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
                      transform: 'rotateX(10deg)',
                    }}
                  >
                    {/* SIM chip */}
                    <div className="absolute top-4 left-4 w-[44px] h-[34px] rounded-md overflow-hidden">
                      <div className="w-full h-full" style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 30%, #D4AF37 50%, #B8960C 70%, #D4AF37 100%)',
                        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)',
                      }}>
                        {/* Chip circuit lines */}
                        <div className="absolute inset-0">
                          <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-black/20" />
                          <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-black/20" />
                          <div className="absolute top-[20%] left-[25%] right-[25%] h-[1px] bg-black/15" />
                          <div className="absolute top-[60%] left-[25%] right-[25%] h-[1px] bg-black/15" />
                          <div className="absolute top-[80%] left-[15%] right-[15%] h-[1px] bg-black/10" />
                        </div>
                      </div>
                    </div>

                    {/* ad-engine label with DYNAMO logo */}
                    <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5">
                      {/* Mini DYNAMO logo mark */}
                      <svg width="12" height="12" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="44" stroke="rgba(205,255,0,0.7)" strokeWidth="6" fill="none" />
                        <path d="M38 10C18 22 8 40 12 58c4 18 18 30 36 35" stroke="rgba(205,255,0,0.7)" strokeWidth="6" strokeLinecap="round" fill="none" />
                      </svg>
                      <span className="text-[8px] font-bold text-lime/70 tracking-wider uppercase">ad-engine</span>
                    </div>

                    {/* Subtle glow when packet arrives */}
                    <motion.div
                      className="absolute inset-0 bg-lime/5 rounded-xl"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                  </div>

                  {/* SIM label */}
                  <div className="text-center mt-2">
                    <span className="text-[10px] text-white/40 font-medium">SIM Card + Applet</span>
                  </div>
                </motion.div>

                {/* Ambient glow behind SIM */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
