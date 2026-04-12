"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { digitalCategories, formatPrice } from "@/data/themes";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function DigitalShowcase() {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-amber-50/40 to-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12 md:mb-14">
            <p className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-3">
              Empezá por aquí
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary text-balance">
              Elegí tu categoría y{" "}
              <span className="font-display italic font-normal text-gradient-primary">armá tu pedido.</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mt-4">
              11 categorías de imprimibles personalizables. Tocá la que necesitás y elegí el tema favorito de tu hijo.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {digitalCategories.map((cat) => (
            <StaggerItem key={cat.id}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="h-full">
                <Link
                  href={`/imprimibles/${cat.id}`}
                  className="group relative block h-full rounded-3xl overflow-hidden bg-bg-white border border-border-light flex flex-col"
                >
                  <div className="relative h-40 bg-[#FAF6EE] flex items-center justify-center overflow-hidden">
                    <Image
                      src={cat.iconImage}
                      alt={cat.name}
                      width={160}
                      height={160}
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    {cat.badge && (
                      <span className="absolute top-3 right-3 bg-white text-text-primary text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        {cat.badge.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-text-primary">{formatPrice(cat.price)}</span>
                      <span className="text-xs font-semibold text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                        Ver <span>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
