"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { RealProduct } from "@/data/products";
import { formatPrice, getDiscount, getThemeBySlug, getDigitalCategory } from "@/data/themes";

interface Props {
  product: RealProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const theme = product.primaryTheme ? getThemeBySlug(product.primaryTheme) : undefined;
  const category = getDigitalCategory(product.primaryCategory);
  const discount =
    product.price && product.originalPrice ? getDiscount(product.price, product.originalPrice) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/producto/${product.slug}`}
        className="group block rounded-2xl overflow-hidden bg-bg-white border border-border-light card-hover h-full flex flex-col"
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-bg to-primary-bg/40">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {category && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-text-primary pl-1 pr-2 py-0.5 rounded-full shadow">
              <span className="relative w-5 h-5 rounded-full overflow-hidden bg-[#FAF6EE]">
                <Image src={category.iconImage} alt="" fill sizes="20px" className="object-cover" />
              </span>
              <span>{category.shortName.toUpperCase()}</span>
            </span>
          )}
          {discount !== null && discount > 0 && (
            <span className="absolute top-3 right-3 inline-block bg-accent-green text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
              -{discount}%
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-text-primary line-clamp-2 mb-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.title}
          </h3>
          {theme && (
            <p className="text-xs text-text-tertiary flex items-center gap-1 mb-2">
              <span>{theme.emoji}</span>
              <span className="truncate">{theme.name}</span>
            </p>
          )}
          <div className="mt-auto flex items-end justify-between">
            <div>
              {product.originalPrice && (
                <span className="text-[11px] text-text-tertiary line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <p className="text-base font-extrabold text-text-primary">
                {product.price ? formatPrice(product.price) : "—"}
              </p>
            </div>
            <span className="text-primary text-xs font-semibold">Ver →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
