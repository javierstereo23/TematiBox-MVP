import Image from "next/image";
import type { DigitalCategoryMeta } from "@/data/themes";

interface Props {
  category: DigitalCategoryMeta;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function CategoryIcon({ category, size = 64, className = "", priority = false }: Props) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl bg-[#FAF6EE] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={category.iconImage}
        alt={category.name}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
