"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { RealProduct } from "@/data/products";
import { formatPrice, getDiscount, getThemeBySlug, getDigitalCategory } from "@/data/themes";
import { WashiTape } from "@/components/scrapbook/WashiTape";

// Deterministic tilt based on slug so layout is stable across renders
function tiltFromSlug(slug: string): number {
  let sum = 0;
  for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i);
  const tilts = [-2.2, -1.4, -0.8, 0.6, 1.2, 2.0];
  return tilts[sum % tilts.length];
}

const TAPE_COLORS = ["pink", "mustard", "sage", "blue", "cream"] as const;
function tapeFromSlug(slug: string) {
  let sum = 0;
  for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i) * 7;
  return TAPE_COLORS[sum % TAPE_COLORS.length];
}

interface Props {
  product: RealProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const theme = product.primaryTheme ? getThemeBySlug(product.primaryTheme) : undefined;
  const category = getDigitalCategory(product.primaryCategory);
  const discount =
    product.price && product.originalPrice ? getDiscount(product.price, product.originalPrice) : null;

  const tilt = tiltFromSlug(product.slug);
  const tape = tapeFromSlug(product.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotate: 0, transition: { duration: 0.3 } }}
      style={{ rotate: tilt }}
      className="relative"
    >
      {/* Washi tape piece at top corner */}
      <WashiTape
        color={tape}
        rotate={tilt > 0 ? -22 : 22}
        width={56}
        height={18}
        className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
      />

      <Link href={`/producto/${product.slug}`} className="group block polaroid relative">
        <div className="relative aspect-square overflow-hidden bg-[#EFE9DC] rounded-[2px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {category && (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-[#FFFDF8]/95 text-[10px] font-bold text-text-primary pl-1 pr-2 py-0.5 rounded-full shadow">
              <span className="relative w-5 h-5 rounded-full overflow-hidden bg-[#FAF6EE]">
                <Image src={category.iconImage} alt="" fill sizes="20px" className="object-cover" />
              </span>
              <span>{category.shortName.toUpperCase()}</span>
            </span>
          )}
          {discount !== null && discount > 0 && (
            <span
              className="absolute top-2 right-2 bg-accent-pink text-white text-[11px] font-bold px-2 py-1"
              style={{ transform: "rotate(6deg)", boxShadow: "0 2px 6px rgba(42,45,37,0.18)" }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Polaroid caption area — handwritten */}
        <div className="pt-3 pb-1 px-1">
          <h3 className="font-hand text-lg text-text-primary line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.title.replace(/imprimible/gi, "").replace(/^\s*-\s*/, "").trim()}
          </h3>
          <div className="mt-2 flex items-end justify-between">
            <div>
              {product.originalPrice && (
                <span className="text-[11px] text-text-tertiary line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <p className="font-display text-xl font-normal text-text-primary leading-none">
                {product.price ? formatPrice(product.price) : "—"}
              </p>
            </div>
            {theme && (
              <span className="font-hand text-sm text-primary/75 truncate max-w-[60%] text-right">
                {theme.name.toLowerCase()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
