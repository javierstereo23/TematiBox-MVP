"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { RealProduct } from "@/data/products";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { CREAM_BLUR } from "@/lib/images/placeholder";

type Props = {
  product: RealProduct;
  name: string;
  age: number | string;
  eventDate?: string | null;
  venue?: string | null;
  categoryShortName?: string;
};

// Very light-weight preview: shows the product image as a polaroid and
// overlays a simulated "nameplate" on top, so the user sees what their
// personalization will roughly look like before paying.

export function LivePreview({ product, name, age, eventDate, venue, categoryShortName }: Props) {
  const cleanName = name.trim();
  const visible = cleanName.length > 0;
  const hasEvent = Boolean(eventDate);
  const formattedDate = hasEvent
    ? new Date(eventDate! + "T12:00:00").toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : null;

  return (
    <div className="relative my-6">
      {/* Section label */}
      <div className="flex items-center gap-2 mb-3 pl-1">
        <span className="inline-block w-2 h-2 rounded-full bg-accent-green animate-pulse" />
        <p className="font-hand text-lg text-primary/85 -rotate-[0.3deg]">
          vista previa en vivo
        </p>
      </div>

      <div
        className="relative polaroid"
        style={{ transform: "rotate(-1.2deg)" }}
      >
        <WashiTape
          color="mustard"
          rotate={-10}
          width={110}
          height={22}
          className="absolute -top-2 left-1/2 -translate-x-1/2 z-10"
        />

        <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            placeholder="blur"
            blurDataURL={CREAM_BLUR}
            className="object-contain p-6 opacity-90"
          />

          {/* Soft cream veil so the name plate reads */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/15 to-transparent" />

          {/* Nameplate overlay */}
          <AnimatePresence mode="wait">
            {visible ? (
              <motion.div
                key="plate"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 px-5 pb-5"
              >
                <p className="font-hand text-sm text-primary/75 mb-1">
                  el diseño va a decir
                </p>
                <p className="font-display text-3xl sm:text-4xl md:text-[44px] font-medium italic text-text-primary leading-[0.95] tracking-[-0.02em]">
                  {cleanName}
                  {age !== "" && age !== undefined && (
                    <span className="not-italic font-normal text-text-primary/75">
                      {" "}
                      · {age} años
                    </span>
                  )}
                </p>
                {(formattedDate || venue) && (
                  <p className="font-hand text-base text-text-primary/75 mt-2 -rotate-[0.3deg]">
                    {formattedDate}
                    {formattedDate && venue ? " · " : ""}
                    {venue}
                  </p>
                )}
                {categoryShortName && (
                  <p className="text-[10px] uppercase tracking-widest text-text-secondary mt-3">
                    simulación · el diseño final queda más prolijo
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 bottom-0 px-5 pb-5 text-center"
              >
                <p className="font-hand text-xl text-primary/55 -rotate-[0.3deg]">
                  escribí el nombre para verlo acá ↓
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-sm text-text-primary/65">
          cómo va a quedar
        </p>
      </div>
    </div>
  );
}
