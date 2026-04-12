'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle, Loader2, User, Building2, Mail } from 'lucide-react';

const DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'];
const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

function getWeekDates(weekOffset: number): Date[] {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + weekOffset * 7);
  const dates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDateShort(d: Date): string {
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function formatDateLong(d: Date): string {
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  return `${days[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`;
}

function formatDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function DemoBooking() {
  const [weekOffset, setWeekOffset] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);

  const weekLabel = useMemo(() => {
    const first = weekDates[0];
    const last = weekDates[4];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    if (first.getMonth() === last.getMonth()) {
      return `${first.getDate()} - ${last.getDate()} ${months[first.getMonth()]} ${first.getFullYear()}`;
    }
    return `${first.getDate()} ${months[first.getMonth()]} - ${last.getDate()} ${months[last.getMonth()]} ${first.getFullYear()}`;
  }, [weekDates]);

  const handleSubmit = async () => {
    if (!selectedSlot) return;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name.trim()) {
      setError('Ingresa tu nombre');
      return;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Ingresa un email válido');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formatDateISO(selectedSlot.date),
          time: selectedSlot.time,
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Error al agendar. Intenta nuevamente.');
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
        <div className="px-6 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-12 h-12 text-lime mx-auto mb-4" />
          </motion.div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">Demo agendada</h3>
          <p className="text-white/60 text-sm mb-1">
            {selectedSlot && `${formatDateLong(selectedSlot.date)} a las ${selectedSlot.time}`}
          </p>
          <p className="text-white/60 text-xs">
            Recibirás una invitación de calendario con el link de la reunión.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-lime" />
          <div>
            <h3 className="font-heading text-base font-semibold text-white">Agenda tu demo</h3>
            <p className="text-xs text-white/60">Selecciona un horario de 15 minutos</p>
            <p className="text-[10px] text-white/30 mt-0.5">Horario de Buenos Aires (GMT-3)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
            disabled={weekOffset <= 0}
            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-white/50 min-w-[140px] text-center tabular-nums">{weekLabel}</span>
          <button
            onClick={() => setWeekOffset((w) => Math.min(w + 1, 4))}
            disabled={weekOffset >= 4}
            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Semana siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-5 gap-2 mb-3">
          {DAYS.map((day, i) => (
            <div key={day} className="text-center">
              <p className="text-xs font-medium text-white/40">{day}</p>
              <p className="text-xs text-white/25 tabular-nums">{formatDateShort(weekDates[i])}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2 max-h-[320px] overflow-y-auto pr-1">
          {SLOTS.map((time) =>
            weekDates.map((date, di) => {
              const isSelected =
                selectedSlot?.time === time &&
                selectedSlot?.date.toDateString() === date.toDateString();
              const isPast = date < new Date() && weekOffset === 0;
              const hash = (date.getDate() * 7 + di * 13 + parseInt(time) * 3) % 10;
              const isUnavailable = hash < 2;

              return (
                <button
                  key={`${time}-${di}`}
                  onClick={() => {
                    if (!isPast && !isUnavailable) {
                      setSelectedSlot({ date, time });
                      setError('');
                    }
                  }}
                  disabled={isPast || isUnavailable}
                  className={`py-2 px-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? 'bg-lime text-deep shadow-lg shadow-lime/20'
                        : isPast || isUnavailable
                        ? 'bg-white/[0.02] text-white/15 cursor-not-allowed'
                        : 'bg-white/[0.03] text-white/50 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  aria-label={`${time} ${formatDateLong(date)}`}
                >
                  {time}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Booking form — appears when slot is selected */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/[0.06]"
          >
            <div className="px-6 py-5 space-y-4">
              {/* Selected time summary */}
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-lime shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {formatDateLong(selectedSlot.date)} a las {selectedSlot.time}
                  </p>
                  <p className="text-xs text-white/60">Demo de 15 minutos — DYNAMO Journeys</p>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    placeholder="Tu nombre"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-lime/30 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="tu@empresa.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-lime/30 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Empresa / Operador (opcional)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-lime/30 transition-colors"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-lime text-deep font-semibold text-sm hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Agendando...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    Confirmar demo
                  </>
                )}
              </button>

              <p className="text-[10px] text-white/25 text-center">
                Recibirás una invitación de Google Calendar con link de Google Meet
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
