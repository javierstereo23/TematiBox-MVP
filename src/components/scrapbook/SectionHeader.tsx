import type { ReactNode } from "react";
import { WashiTape } from "./WashiTape";
import { HandCircle, HandStar } from "./HandDrawn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  circleWord?: string;
  description?: string;
  align?: "left" | "center";
  tapeColor?: "pink" | "mustard" | "sage" | "blue" | "cream";
  circleColor?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  circleWord,
  description,
  align = "left",
  tapeColor = "pink",
  circleColor = "#E54CA2",
  className = "",
}: Props) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`relative flex flex-col ${alignCls} ${className}`}>
      {/* Eyebrow: washi tape + handwritten */}
      <div className="relative flex items-center gap-3 mb-5">
        <WashiTape color={tapeColor} rotate={-6} width={46} height={18} />
        <p className="font-hand text-xl md:text-2xl text-primary/80 -rotate-[0.5deg]">
          {eyebrow}
        </p>
        <HandStar className="w-5 h-5 opacity-70" color="#E0B252" />
      </div>

      {/* Title — Fraunces display, medium weight for legibility */}
      <h2 className="font-display text-[34px] sm:text-[44px] md:text-[58px] font-medium text-text-primary leading-[0.96] tracking-[-0.028em] text-balance max-w-4xl">
        {circleWord ? (
          renderWithCircle(title, circleWord, circleColor)
        ) : (
          title
        )}
      </h2>

      {description && (
        <p className="text-text-primary/70 text-base md:text-lg leading-[1.7] max-w-2xl mt-5">
          {description}
        </p>
      )}
    </div>
  );
}

function renderWithCircle(title: ReactNode, word: string, color: string): ReactNode {
  if (typeof title !== "string") return title;
  const idx = title.toLowerCase().indexOf(word.toLowerCase());
  if (idx < 0) return title;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + word.length);
  const after = title.slice(idx + word.length);
  return (
    <>
      {before}
      <span className="relative inline-block">
        <span className="italic font-normal" style={{ color }}>
          {match}
        </span>
        <HandCircle
          className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)]"
          color={color}
        />
      </span>
      {after}
    </>
  );
}
