import Link from "next/link";
import Image from "next/image";
import type { ThemeData } from "@/data/themes";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { CREAM_BLUR } from "@/lib/images/placeholder";

interface ThemeCardProps {
  theme: ThemeData;
  index?: number;
}

const TILTS = [-1.4, 0.8, -0.6, 1.2, -0.4, 0.6, -1.0, 0.4, -0.8, 1.0, -0.6, 1.4];
const TAPES = ["pink", "mustard", "sage", "blue", "cream"] as const;

export function ThemeCard({ theme, index = 0 }: ThemeCardProps) {
  const tilt = TILTS[index % TILTS.length];
  const tape = TAPES[index % TAPES.length];

  return (
    <div
      style={{ transform: `rotate(${tilt}deg)` }}
      className="relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-2"
    >
      <WashiTape
        color={tape}
        rotate={tilt > 0 ? -18 : 18}
        width={70}
        height={20}
        className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
      />
      <Link href={`/temas/${theme.slug}`} className="group block polaroid">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE9DC] rounded-[2px]">
          <Image
            src={theme.image}
            alt={theme.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL={CREAM_BLUR}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-20 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
          {theme.trending && (
            <span
              className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1"
              style={{ transform: "rotate(5deg)", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
            >
              TENDENCIA
            </span>
          )}
          {!theme.trending && theme.popular && (
            <span
              className="absolute top-2 right-2 bg-accent-pink text-white text-[10px] font-bold px-2.5 py-1"
              style={{ transform: "rotate(5deg)", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
            >
              POPULAR
            </span>
          )}
          <span className="absolute top-3 left-3 text-3xl drop-shadow-lg">{theme.emoji}</span>
          <span
            className="absolute bottom-3 left-3 px-3 py-1 font-hand text-sm text-text-primary"
            style={{ background: "#FFF3A8", transform: "rotate(-2deg)", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
          >
            {theme.ageRange}
          </span>
        </div>
        <div className="pt-3 pb-1 px-1">
          <h3 className="font-display text-xl font-normal text-text-primary leading-tight group-hover:text-primary transition-colors">
            {theme.name}
          </h3>
          <p className="font-hand text-base text-primary/70 mt-1 -rotate-[0.5deg] line-clamp-1">
            {theme.description.split(".")[0]}
          </p>
        </div>
      </Link>
    </div>
  );
}
