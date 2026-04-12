"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy Vale, la asistente de Tematibox. Detrás mío hay un equipo de diseñadoras reales que personalizan cada pedido. ¿En qué te ayudo?",
};

function getDesignersOnline(): number {
  // 2-4 "online" in business hours AR (10am-8pm), 1-2 outside
  const now = new Date();
  const hour = now.getUTCHours() - 3; // approx AR
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;
  const isBusinessHours = hour >= 10 && hour <= 20 && !isWeekend;
  if (isBusinessHours) return 2 + Math.floor(Math.random() * 3);
  return 1 + Math.floor(Math.random() * 2);
}

export function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [handingOff, setHandingOff] = useState(false);
  const [designersOnline] = useState(() => getDesignersOnline());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const newMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setStreaming(true);

    const apiMessages = newMessages.filter((m) => m !== INITIAL_GREETING || newMessages.indexOf(m) > 0);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      // Add an empty assistant message we'll fill via streaming
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Uy, tuve un problema técnico. Mejor pasate con Daniela directo (botón WhatsApp acá abajo).",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  async function handoff() {
    if (handingOff) return;
    setHandingOff(true);
    try {
      const res = await fetch("/api/chat/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages.slice(-12) }),
      });
      const data = await res.json();
      if (data.wa_url) {
        window.open(data.wa_url, "_blank", "noopener,noreferrer");
      }
    } catch {
      window.open("https://wa.me/5491154966031", "_blank", "noopener,noreferrer");
    } finally {
      setHandingOff(false);
      setOpen(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            aria-label="Abrir chat"
            className="fixed bottom-5 right-5 z-[90] flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-bg-white shadow-xl border border-border-light hover:shadow-2xl transition-shadow group"
          >
            <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent-pink text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent-green border-2 border-bg-white" />
            </span>
            <span className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs font-bold text-text-primary">¿Te ayudo?</span>
              <span className="text-[10px] text-text-secondary">
                {designersOnline} diseñadoras conectadas
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[95] bg-black/30 md:bg-transparent"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-[96] bottom-0 right-0 md:bottom-5 md:right-5 w-full md:w-[400px] h-[90vh] md:h-[640px] max-h-[calc(100vh-2rem)] bg-bg-white md:rounded-3xl shadow-2xl border border-border-light flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-br from-primary to-primary-dark text-white flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-display italic font-bold">V</span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent-green border-2 border-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">Vale · Tematibox</p>
                  <p className="text-[11px] text-white/80">
                    {designersOnline} diseñadoras conectadas ahora
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Cerrar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-bg">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-primary text-white rounded-br-sm"
                          : "bg-bg-white border border-border-light text-text-primary rounded-bl-sm"
                      }`}
                    >
                      {m.content || (streaming && i === messages.length - 1 ? "..." : "")}
                    </div>
                  </div>
                ))}
                {streaming && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-bg-white border border-border-light px-3.5 py-2 rounded-2xl rounded-bl-sm text-sm">
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick actions / handoff */}
              <div className="px-4 py-2 border-t border-border-light bg-bg-white">
                <button
                  onClick={handoff}
                  disabled={handingOff}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {handingOff ? "Preparando el chat..." : "Hablar con Daniela por WhatsApp"}
                </button>
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border-light bg-bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void send();
                  }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribí tu consulta..."
                    disabled={streaming}
                    maxLength={500}
                    className="flex-1 px-4 py-2.5 rounded-full border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={streaming || !input.trim()}
                    className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-dark disabled:opacity-30 transition-colors flex items-center justify-center flex-shrink-0"
                    aria-label="Enviar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l14-9-6 18-2-7-6-2z" />
                    </svg>
                  </button>
                </form>
                <p className="text-[10px] text-text-tertiary text-center mt-2">
                  Vale es asistente IA · Si necesitás algo específico, pedile pasar con Daniela
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
