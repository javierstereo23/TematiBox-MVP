"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar, HandArrow } from "@/components/scrapbook/HandDrawn";
import { track, identifyUser } from "@/components/Analytics";

const STORAGE_KEY_DISMISSED = "tematibox.exit_intent_dismissed_at";
const STORAGE_KEY_COUPON = "tematibox.coupon";
const COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function shouldShow(): boolean {
  try {
    const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);
    if (!dismissedAt) return true;
    const elapsed = Date.now() - parseInt(dismissedAt, 10);
    return elapsed > COOLDOWN_MS;
  } catch {
    return true;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
  } catch {
    /* noop */
  }
}

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    markDismissed();
  }, []);

  // Exit-intent detection (desktop) + time-on-page fallback (mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldShow()) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Desktop: cursor leaves top edge
    document.addEventListener("mouseleave", onMouseLeave);

    // Mobile fallback: 25 seconds of scroll
    const mobileTimer = window.setTimeout(() => {
      if (window.matchMedia("(max-width: 768px)").matches) trigger();
    }, 25_000);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.clearTimeout(mobileTimer);
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Escribí un email válido");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/coupons/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "exit_intent" }),
      });
      const data = await res.json();
      if (!res.ok || !data.code) {
        setError(data.error || "No pudimos generar el cupón, probá de nuevo");
        setLoading(false);
        return;
      }
      setCode(data.code);
      try {
        localStorage.setItem(
          STORAGE_KEY_COUPON,
          JSON.stringify({ code: data.code, percent_off: data.percent_off, email: trimmed })
        );
      } catch {
        /* noop */
      }
      identifyUser(trimmed);
      track("coupon_claimed", { source: "exit_intent", percent_off: data.percent_off });
    } catch {
      setError("Error de conexión. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Scrapbook paper card */}
          <motion.div
            className="relative w-full max-w-lg"
            initial={{ y: 30, scale: 0.95, opacity: 0, rotate: -3 }}
            animate={{ y: 0, scale: 1, opacity: 1, rotate: -1.5 }}
            exit={{ y: 20, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner tapes */}
            <WashiTape
              color="pink"
              rotate={-14}
              width={140}
              height={26}
              className="absolute -top-3 left-6 z-10"
            />
            <WashiTape
              color="mustard"
              rotate={10}
              width={120}
              height={24}
              className="absolute -top-2 right-8 z-10"
            />

            <div
              className="relative bg-[#FFFDF8] p-8 md:p-10"
              style={{
                boxShadow:
                  "0 2px 4px rgba(42,45,37,0.06), 0 30px 60px -10px rgba(42,45,37,0.3)",
              }}
            >
              {/* Close button */}
              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-text-primary/50 hover:text-text-primary transition-colors text-xl font-light"
              >
                ×
              </button>

              {!code ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <HandStar className="w-6 h-6" color="#E0B252" />
                    <p className="font-hand text-2xl text-primary/85 -rotate-1">
                      ¡esperá un segundo!
                    </p>
                  </div>

                  <h2 className="font-display text-[34px] md:text-[42px] font-medium text-text-primary leading-[0.98] tracking-[-0.02em] mb-3">
                    Te regalamos{" "}
                    <span
                      className="relative inline-block italic font-normal"
                      style={{ color: "#E54CA2" }}
                    >
                      10% OFF
                      <svg
                        viewBox="0 0 240 120"
                        className="absolute -inset-x-4 -inset-y-2 w-[calc(100%+2rem)] h-[calc(100%+1rem)]"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M120 8 C 60 8, 12 32, 12 60 C 12 92, 68 112, 124 112 C 180 112, 228 94, 228 62 C 228 36, 188 14, 120 8 Z"
                          stroke="#E54CA2"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </span>{" "}
                    en tu primer pedido.
                  </h2>
                  <p className="font-hand text-xl text-primary/75 -rotate-[0.5deg] mb-6">
                    dejanos tu email y lo recibís ahora
                  </p>

                  <form onSubmit={onSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      autoFocus
                      disabled={loading}
                      className="w-full px-4 py-3.5 bg-[#FBF6EA] border border-text-primary/20 text-text-primary placeholder:text-text-tertiary text-base font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-[4px] transition-colors"
                    />

                    {error && (
                      <p className="font-hand text-base text-red-600 -rotate-[0.3deg]">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ boxShadow: "5px 5px 0 0 #E54CA2" }}
                    >
                      {loading ? "Generando tu cupón..." : "Mandame el 10% OFF"}
                      {!loading && (
                        <HandArrow className="w-5 h-3 opacity-80" color="currentColor" />
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-text-tertiary text-center mt-5 leading-relaxed">
                    Sin spam. Usamos tu email sólo para mandarte el cupón y novedades que sí te
                    importen.
                  </p>
                </>
              ) : (
                <div className="text-center py-2">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <HandStar className="w-6 h-6" color="#E0B252" />
                    <HandStar className="w-7 h-7" color="#E54CA2" />
                    <HandStar className="w-6 h-6" color="#6B7257" />
                  </div>

                  <h2 className="font-display text-[32px] md:text-[40px] font-medium text-text-primary leading-[0.98] tracking-[-0.02em] mb-2">
                    ¡Listo!
                  </h2>
                  <p className="font-hand text-xl text-primary/85 -rotate-[0.5deg] mb-6">
                    copialo y usalo en tu próximo pedido
                  </p>

                  <div
                    className="inline-block px-6 py-4 mb-6"
                    style={{
                      background: "#FFF3A8",
                      transform: "rotate(-1.5deg)",
                      boxShadow: "0 10px 22px -8px rgba(42,45,37,0.22)",
                    }}
                  >
                    <p className="font-hand text-base text-text-primary/70 mb-1">
                      tu cupón de 10% OFF
                    </p>
                    <p className="font-display text-3xl md:text-4xl font-medium text-text-primary tracking-wide">
                      {code}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={copyCode}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                      style={{ boxShadow: "5px 5px 0 0 #E54CA2" }}
                    >
                      {copied ? "¡copiado!" : "Copiar código"}
                    </button>
                    <button
                      onClick={close}
                      className="font-hand text-xl text-primary hover:text-primary-dark underline decoration-dotted underline-offset-4"
                    >
                      seguir comprando →
                    </button>
                  </div>

                  <p className="text-xs text-text-tertiary mt-6 leading-relaxed">
                    También te lo mandamos al email. Válido por 14 días.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
