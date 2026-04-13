"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar, HandArrow } from "@/components/scrapbook/HandDrawn";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-45" />
      <div className="absolute inset-0 -z-10 paper-texture opacity-45 mix-blend-multiply" />

      <WashiTape
        color="pink"
        rotate={-12}
        width={180}
        height={32}
        className="absolute -top-1 left-[8%] z-10"
      />
      <WashiTape
        color="mustard"
        rotate={10}
        width={150}
        height={28}
        className="absolute -top-2 right-[10%] z-10"
      />

      <Reveal>
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Polaroid photo */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div
              className="relative polaroid"
              style={{ transform: "rotate(-3deg)" }}
            >
              <WashiTape
                color="cream"
                rotate={-10}
                width={110}
                height={22}
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10"
              />
              <div className="relative aspect-[4/5] w-[260px] md:w-[300px] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                <Image
                  src="/images/home/birthday-aesthetic.png"
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-lg text-text-primary/80">
                tu próximo cumple
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="md:col-span-7 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
              <HandStar className="w-6 h-6" color="#E0B252" />
              <p className="font-hand text-2xl md:text-3xl text-primary/85 -rotate-1">
                tu próximo cumple empieza acá
              </p>
              <HandStar className="w-6 h-6" color="#E54CA2" />
            </div>

            <h2 className="font-display text-[42px] md:text-[66px] font-light leading-[0.94] tracking-[-0.03em] mb-5 text-balance text-text-primary">
              Personalizá el imprimible{" "}
              <span className="italic font-normal text-gradient-primary">perfecto para él.</span>
            </h2>

            <p className="text-lg md:text-xl text-text-primary/75 max-w-xl mb-10 leading-[1.6]">
              Elegí el tema, poné el nombre y descargás al instante. Imprimís las veces que
              necesites.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
              <Link
                href="/imprimibles"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                style={{ boxShadow: "6px 6px 0 0 #E54CA2" }}
              >
                Ver los 412 imprimibles
                <HandArrow className="w-5 h-3 opacity-80" color="currentColor" />
              </Link>
              <Link
                href="/imprimibles/invitaciones"
                className="font-hand text-2xl text-primary hover:text-primary-dark underline decoration-dotted underline-offset-4"
              >
                o empezá por invitaciones
              </Link>
            </div>

            <p className="mt-8 font-hand text-xl text-text-secondary -rotate-[0.5deg]">
              ★ 4.9 en Google · + de 2k familias · descarga al instante
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
