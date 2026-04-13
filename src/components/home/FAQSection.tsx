"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/scrapbook/SectionHeader";
import { waLink } from "@/lib/config";

const FAQS = [
  {
    q: "¿Cuánto tarda en llegar el archivo?",
    a: "Al instante. Apenas se confirma el pago te llega un email con los archivos en PDF y PNG listos para descargar. Si es personalizado con datos especiales, en menos de 24hs.",
  },
  {
    q: "¿Puedo imprimir los archivos en cualquier impresora?",
    a: "Sí. Los imprimibles están optimizados para impresoras hogareñas y comerciales. Formato A4 estándar, listos para imprimir y recortar.",
  },
  {
    q: "¿Puedo cambiar el nombre o los datos después de pagar?",
    a: "Sí, hasta 24hs después de la compra sin costo. Escribinos por WhatsApp y te reenviamos los archivos con los datos corregidos.",
  },
  {
    q: "¿Hacen imprimibles con temas fuera del catálogo?",
    a: "Sí. Escribinos por WhatsApp contándonos el tema que necesitás y te armamos una propuesta en menos de 24hs.",
  },
  {
    q: "¿Los cliparts son para uso comercial?",
    a: "Sí. Podés usarlos para sublimar, imprimir en remeras, tazas o bolsos para vender. Incluye licencia de uso comercial sin límite de productos.",
  },
  {
    q: "¿Cómo pago?",
    a: "Aceptamos Mercado Pago (tarjeta, débito, dinero en cuenta) con opción de hasta 12 cuotas. También transferencia bancaria con descuento adicional.",
  },
  {
    q: "¿Cuántas veces puedo imprimir cada imprimible?",
    a: "Las veces que necesites. Pagás una vez y los archivos quedan tuyos. Podés reimprimir si se arruinan, hacer copias para la familia, etc.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-ruled opacity-60" />

      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="preguntas frecuentes"
            title="Lo que siempre nos preguntan."
            circleWord="siempre"
            circleColor="#E0B252"
            tapeColor="blue"
            align="center"
            className="mx-auto mb-14"
          />
        </Reveal>

        <Reveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-[#FFFDF8] border border-text-primary/15 overflow-hidden"
                style={{ boxShadow: "0 4px 14px -6px rgba(42,45,37,0.12)" }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                >
                  <span className="font-display text-base md:text-lg text-text-primary flex-1 leading-snug">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-primary text-2xl font-light border border-primary/30"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-text-secondary leading-relaxed text-sm md:text-base border-t border-text-primary/10 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 text-center">
            <p className="font-hand text-2xl text-text-secondary mb-4">
              ¿no encontraste tu pregunta?
            </p>
            <a
              href={waLink("Hola! Tengo una pregunta sobre Tematibox")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ boxShadow: "5px 5px 0 0 #10B981" }}
            >
              <svg className="w-4 h-4 text-accent-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Escribinos por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
