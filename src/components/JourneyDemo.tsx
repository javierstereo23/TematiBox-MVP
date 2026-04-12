'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Brain,
  Send,
  Smartphone,
  MessageSquare,
  Hash,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  User,
  BarChart3,
  RefreshCw,
} from 'lucide-react';

/* ─── Types ─── */
interface StepConfig {
  id: number;
  label: string;
  icon: React.ElementType;
  color: string;
}

/* ─── Step definitions ─── */
const steps: StepConfig[] = [
  { id: 0, label: 'Trigger', icon: Zap, color: '#CDFF00' },
  { id: 1, label: 'Análisis', icon: Brain, color: '#8A7DE8' },
  { id: 2, label: 'Canal', icon: Send, color: '#25D366' },
  { id: 3, label: 'Mensaje', icon: Smartphone, color: '#3B2ACE' },
  { id: 4, label: 'Respuesta', icon: User, color: '#FF9800' },
  { id: 5, label: 'Siguiente', icon: RefreshCw, color: '#00D4AA' },
];

const triggers = [
  { id: 'plan-expired', label: 'Plan de datos vencido', emoji: '📱' },
  { id: 'recharge', label: 'Recarga detectada', emoji: '💰' },
  { id: 'churn-risk', label: 'Riesgo de churn', emoji: '⚠️' },
  { id: 'onboarding', label: 'Nuevo onboarding', emoji: '🎉' },
];

const triggerProfiles: Record<string, {
  cluster: string;
  affinity: number;
  preferredChannel: string;
  message: string;
  nextAction: string;
}> = {
  'plan-expired': {
    cluster: 'Heavy Data User',
    affinity: 87,
    preferredChannel: 'WhatsApp',
    message: 'Hola! Tu plan de datos ha vencido. Renova ahora con un 20% OFF en el plan de 10GB.',
    nextAction: 'Programar SMS recordatorio en 24hs',
  },
  'recharge': {
    cluster: 'Prepago Activo',
    affinity: 72,
    preferredChannel: 'SAT Push',
    message: '¡Recarga exitosa! Con $500 más accedés al plan Premium con datos ilimitados.',
    nextAction: 'Enviar oferta por WhatsApp en 48hs',
  },
  'churn-risk': {
    cluster: 'En riesgo - Inactivo 15d',
    affinity: 45,
    preferredChannel: 'SMS',
    message: '¡Te extrañamos! Activa tu línea hoy y recibís 5GB gratis por 7 días.',
    nextAction: 'Escalar a llamada de retención',
  },
  'onboarding': {
    cluster: 'Nuevo Suscriptor',
    affinity: 93,
    preferredChannel: 'WhatsApp',
    message: 'Bienvenido a la red! Configura tu cuenta y obtene 2GB de regalo.',
    nextAction: 'Enviar tutorial interactivo en 72hs',
  },
};

const channelWaterfall = [
  { name: 'SAT Push', icon: Smartphone, color: '#CDFF00' },
  { name: 'WhatsApp', icon: MessageSquare, color: '#25D366' },
  { name: 'SMS', icon: Hash, color: '#8B5CF6' },
];

type UserResponse = 'convert' | 'reject' | 'no-response' | null;

/* ─── Component ─── */
export default function JourneyDemo() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [userResponse, setUserResponse] = useState<UserResponse>(null);
  const [animatingAnalysis, setAnimatingAnalysis] = useState(false);
  const [animatingChannel, setAnimatingChannel] = useState(false);
  const [activeChannelIdx, setActiveChannelIdx] = useState(-1);

  const profile = selectedTrigger ? triggerProfiles[selectedTrigger] : null;

  const reset = useCallback(() => {
    setCurrentStep(-1);
    setSelectedTrigger(null);
    setUserResponse(null);
    setAnimatingAnalysis(false);
    setAnimatingChannel(false);
    setActiveChannelIdx(-1);
  }, []);

  const selectTrigger = useCallback((triggerId: string) => {
    setSelectedTrigger(triggerId);
    setCurrentStep(0);
    // Auto-advance to analysis after brief delay
    setTimeout(() => {
      setCurrentStep(1);
      setAnimatingAnalysis(true);
      setTimeout(() => {
        setAnimatingAnalysis(false);
        setCurrentStep(2);
        // Animate channel waterfall
        setAnimatingChannel(true);
        setActiveChannelIdx(0);
        setTimeout(() => setActiveChannelIdx(1), 600);
        setTimeout(() => setActiveChannelIdx(2), 1200);
        setTimeout(() => {
          setAnimatingChannel(false);
          setCurrentStep(3);
        }, 1800);
      }, 2000);
    }, 800);
  }, []);

  const selectResponse = useCallback((response: UserResponse) => {
    setUserResponse(response);
    setCurrentStep(5);
  }, []);

  const advance = useCallback(() => {
    if (currentStep === 3) {
      setCurrentStep(4);
    }
  }, [currentStep]);

  /* ─── Step node for the flow ─── */
  const StepNode = ({ step, index }: { step: StepConfig; index: number }) => {
    const isActive = currentStep === index;
    const isCompleted = currentStep > index;
    const isPending = currentStep < index;
    const Icon = step.icon;

    return (
      <div className="flex flex-col items-center relative">
        <motion.div
          animate={{
            scale: isActive ? 1.08 : 1,
            borderColor: isActive ? step.color : isCompleted ? '#8A7DE8' : 'rgba(255,255,255,0.08)',
          }}
          transition={{ duration: 0.3 }}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
            isPending ? 'bg-white/[0.02]' : 'bg-white/[0.04]'
          }`}
          style={isActive ? { boxShadow: `0 0 24px ${step.color}30` } : {}}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-purple-400" />
          ) : (
            <Icon
              className="w-6 h-6 transition-colors duration-300"
              style={{ color: isActive ? step.color : isPending ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)' }}
            />
          )}
          {isActive && (
            <motion.div
              layoutId="active-glow"
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: `0 0 20px ${step.color}20` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>
        <span
          className={`mt-2 text-[11px] sm:text-xs font-medium transition-colors duration-300 ${
            isActive ? 'text-white' : isCompleted ? 'text-purple-400' : 'text-white/25'
          }`}
        >
          {step.label}
        </span>
      </div>
    );
  };

  /* ─── Connector line ─── */
  const Connector = ({ index }: { index: number }) => {
    const filled = currentStep > index;
    const active = currentStep === index;
    return (
      <div className="flex-1 hidden sm:flex items-center px-1 min-w-[24px]">
        <motion.div
          className="h-[2px] w-full rounded-full"
          animate={{
            backgroundColor: filled
              ? '#8A7DE8'
              : active
              ? `${steps[index].color}80`
              : 'rgba(255,255,255,0.06)',
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  };

  return (
    <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative">
        {/* Step indicator bar */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          {steps.map((step, i) => (
            <div key={step.id} className="contents">
              <StepNode step={step} index={i} />
              {i < steps.length - 1 && <Connector index={i} />}
            </div>
          ))}
        </div>

        {/* Content area */}
        <div className="min-h-[280px] sm:min-h-[260px]">
          <AnimatePresence mode="wait">
            {/* INITIAL STATE: Pick a trigger */}
            {currentStep === -1 && (
              <motion.div
                key="pick-trigger"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h3 className="text-white font-heading font-semibold text-lg sm:text-xl mb-2">
                  Selecciona un trigger para iniciar
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  Elige un evento que dispara el journey automaticamente
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                  {triggers.map((t) => (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.02, borderColor: 'rgba(205,255,0,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectTrigger(t.id)}
                      className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-left hover:bg-white/[0.06] transition-colors group"
                    >
                      <span className="text-xl">{t.emoji}</span>
                      <span className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">
                        {t.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 0: Trigger fires */}
            {currentStep === 0 && (
              <motion.div
                key="trigger-fire"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: 1 }}
                  className="w-16 h-16 rounded-2xl bg-[#CDFF00]/10 border border-[#CDFF00]/30 flex items-center justify-center mb-4"
                >
                  <Zap className="w-8 h-8 text-[#CDFF00]" />
                </motion.div>
                <h3 className="text-white font-heading font-semibold text-lg">Trigger detectado</h3>
                <p className="text-[#CDFF00] text-sm font-medium mt-1">
                  {triggers.find((t) => t.id === selectedTrigger)?.label}
                </p>
              </motion.div>
            )}

            {/* STEP 1: Analysis */}
            {currentStep === 1 && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center"
              >
                <div className="w-full max-w-sm bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-heading font-semibold text-sm">Analizando perfil del suscriptor</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">Cluster AI</span>
                      <AnimatePresence>
                        {!animatingAnalysis ? (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-purple-300 text-xs font-semibold"
                          >
                            {profile?.cluster}
                          </motion.span>
                        ) : (
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-24 h-3 bg-purple-500/20 rounded"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">Afinidad</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: animatingAnalysis ? '60%' : `${profile?.affinity || 0}%` }}
                            transition={{ duration: 1.5 }}
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#CDFF00]"
                          />
                        </div>
                        {!animatingAnalysis && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#CDFF00] text-xs font-bold"
                          >
                            {profile?.affinity}%
                          </motion.span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">Canal preferido</span>
                      {!animatingAnalysis ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-green-400 text-xs font-semibold"
                        >
                          {profile?.preferredChannel}
                        </motion.span>
                      ) : (
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-16 h-3 bg-green-500/20 rounded"
                        />
                      )}
                    </div>
                  </div>
                  {animatingAnalysis && (
                    <motion.div
                      className="mt-4 flex items-center justify-center gap-2 text-white/30 text-xs"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <BarChart3 className="w-3 h-3" />
                      Procesando modelo predictivo...
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Channel selection waterfall */}
            {currentStep === 2 && (
              <motion.div
                key="channel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-white font-heading font-semibold text-sm mb-4">
                  Seleccion de canal (waterfall)
                </h3>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {channelWaterfall.map((ch, i) => {
                    const isSelected =
                      !animatingChannel && profile?.preferredChannel === ch.name;
                    const isChecking = animatingChannel && activeChannelIdx === i;
                    const isSkipped = animatingChannel && activeChannelIdx > i;
                    const Icon = ch.icon;

                    return (
                      <motion.div
                        key={ch.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isSelected
                            ? 'bg-green-500/10 border-green-500/30'
                            : isChecking
                            ? 'bg-white/[0.04] border-white/[0.15]'
                            : isSkipped
                            ? 'bg-white/[0.01] border-white/[0.04] opacity-40'
                            : 'bg-white/[0.02] border-white/[0.06]'
                        }`}
                      >
                        <Icon className="w-5 h-5" style={{ color: ch.color }} />
                        <span className="text-white/70 text-sm font-medium flex-1">{ch.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                        {isChecking && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <RefreshCw className="w-4 h-4 text-white/40" />
                          </motion.div>
                        )}
                        {isSkipped && (
                          <span className="text-[10px] text-white/30">evaluado</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                {!animatingChannel && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-xs mt-3 font-medium"
                  >
                    Canal seleccionado: {profile?.preferredChannel}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* STEP 3: Message sent - phone mockup */}
            {currentStep === 3 && (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center"
              >
                {/* Phone mockup */}
                <div className="w-64 sm:w-72 relative">
                  <div className="bg-[#0b0b1a] border border-white/[0.08] rounded-[2rem] p-1.5 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0b0b1a] rounded-b-2xl z-10" />
                    <div className="bg-[#111125] rounded-[1.6rem] overflow-hidden pt-8 pb-4 px-4">
                      {/* Chat header */}
                      <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06] mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-300">D</span>
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold">DYNAMO</p>
                          <p className="text-white/30 text-[10px]">via {profile?.preferredChannel}</p>
                        </div>
                      </div>
                      {/* Message bubble */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-purple-500/15 border border-purple-500/20 rounded-2xl rounded-tl-sm p-3 mb-2 max-w-[90%]"
                      >
                        <p className="text-white/80 text-xs leading-relaxed">{profile?.message}</p>
                        <p className="text-white/20 text-[9px] mt-1 text-right">Ahora</p>
                      </motion.div>
                      {/* Quick reply buttons */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-1.5 mt-2"
                      >
                        <div className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-[10px] text-purple-300 font-medium">
                          Ver oferta
                        </div>
                        <div className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-[10px] text-white/40">
                          No gracias
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={advance}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full text-sm text-purple-300 font-medium transition-colors"
                >
                  Siguiente
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            )}

            {/* STEP 4: User responds */}
            {currentStep === 4 && !userResponse && (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center text-center"
              >
                <h3 className="text-white font-heading font-semibold text-lg mb-2">
                  El suscriptor responde
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  Simula la respuesta del usuario
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectResponse('convert')}
                    className="flex items-center gap-2 px-5 py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Acepta la oferta
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectResponse('reject')}
                    className="flex items-center gap-2 px-5 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Rechaza
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectResponse('no-response')}
                    className="flex items-center gap-2 px-5 py-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Sin respuesta
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Next action */}
            {currentStep === 5 && (
              <motion.div
                key="next-action"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    userResponse === 'convert'
                      ? 'bg-green-500/10 border border-green-500/30'
                      : userResponse === 'reject'
                      ? 'bg-red-500/10 border border-red-500/30'
                      : 'bg-orange-500/10 border border-orange-500/30'
                  }`}
                >
                  {userResponse === 'convert' && <CheckCircle2 className="w-8 h-8 text-green-400" />}
                  {userResponse === 'reject' && <XCircle className="w-8 h-8 text-red-400" />}
                  {userResponse === 'no-response' && <Clock className="w-8 h-8 text-orange-400" />}
                </motion.div>

                <h3 className="text-white font-heading font-semibold text-lg mb-1">
                  {userResponse === 'convert' && 'Conversion exitosa'}
                  {userResponse === 'reject' && 'Oferta rechazada'}
                  {userResponse === 'no-response' && 'Sin respuesta detectada'}
                </h3>

                <div className="mt-4 bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 max-w-sm w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-[#00D4AA]" />
                    <span className="text-white/60 text-xs font-medium">Próxima acción automática</span>
                  </div>
                  <p className="text-white text-sm font-medium">
                    {userResponse === 'convert'
                      ? 'Registrar conversión. Enviar confirmación y encuesta NPS en 7 días.'
                      : userResponse === 'reject'
                      ? profile?.nextAction
                      : `Reintentar por canal alternativo en 24hs. ${profile?.nextAction}`}
                  </p>
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={reset}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-full text-sm text-white/60 font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reiniciar demo
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
