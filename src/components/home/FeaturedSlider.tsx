"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { products, type RealProduct } from "@/data/products";
import { getThemeBySlug, getDigitalCategory } from "@/data/themes";

// Curated: best product per category + flagship themes. Avoids repetition.
const CURATED_SLUGS = [
  "imprimible-guerreras-k-pop-etiquetas-fideos-ramen-soda-pop-97539043084",
  "kit-127-disenos-argentina-hd-png-sublimar-transp-sim-patrios-95987882638",
  "imprimible-topper-torta-tralalero-tralala-italian-brainrot-105249016005",
  "imprimible-stranger-things-para-colorear-eleven-vecna-will-100185575415",
  "invitacion-cumpleanos-hello-kitty-digital-imprimible-circulo-94816527500",
  "kit-pack-99-disenos-bts-world-tour-2026-arirang-hd-png-k-pop-106809423168",
  "imprimible-saja-boys-etiquetas-fideos-ramen-jinu-romance-bab-104323939366",
  "super-kit-imprimible-99-noches-en-el-bosque-roblox-banderin-109554304489",
  "imprimible-messi-para-colorear-argentina-campeon-mundial-109867798915",
  "imprimible-toppers-torta-99-noches-en-el-bosque-roblox-super-107319016998",
];

function pickFeatured(): RealProduct[] {
  const matched = CURATED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is RealProduct => !!p
  );
  if (matched.length >= 10) return matched.slice(0, 10);

  // Fallback: one product per distinct category, then fill with popular themes
  const seenCats = new Set<string>();
  const picked: RealProduct[] = [];
  for (const p of products) {
    if (p.primaryTheme && !seenCats.has(p.primaryCategory)) {
      picked.push(p);
      seenCats.add(p.primaryCategory);
      if (picked.length >= 10) break;
    }
  }
  return picked.slice(0, 10);
}

export function FeaturedSlider() {
  const featured = useMemo(pickFeatured, []);
  // Duplicate for seamless loop
  const loop = useMemo(() => [...featured, ...featured], [featured]);

  if (featured.length === 0) return null;

  return (
    <div className="relative w-full h-[480px] md:h-[540px] lg:h-[620px] overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-bg via-bg/80 to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-bg via-bg/80 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loop.map((p, i) => {
          const theme = p.primaryTheme ? getThemeBySlug(p.primaryTheme) : undefined;
          const category = getDigitalCategory(p.primaryCategory);
          return (
            <Link
              key={`${p.id}-${i}`}
              href={`/producto/${p.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-bg-white border border-border-light shadow-sm hover:shadow-xl transition-all flex-shrink-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF6EE]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {/* subtle gradient to make text pop */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Category badge top-left */}
                {category && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-text-primary pl-1 pr-2 py-0.5 rounded-full shadow">
                    <span className="relative w-4 h-4 rounded-full overflow-hidden bg-[#FAF6EE]">
                      <Image src={category.iconImage} alt="" fill sizes="16px" className="object-cover" />
                    </span>
                    <span className="truncate max-w-[80px]">{category.shortName.toUpperCase()}</span>
                  </span>
                )}

                {/* Bottom text overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                  {theme && (
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/85 drop-shadow">
                      {theme.name}
                    </p>
                  )}
                  <p className="text-xs font-semibold line-clamp-2 drop-shadow leading-tight mt-0.5">
                    {p.title}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
