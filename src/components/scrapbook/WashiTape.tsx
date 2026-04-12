import type { CSSProperties } from "react";

type Color = "pink" | "mustard" | "sage" | "blue" | "cream";

const COLORS: Record<Color, string> = {
  pink: "rgba(229, 161, 189, 0.82)",
  mustard: "rgba(224, 178, 82, 0.78)",
  sage: "rgba(155, 171, 140, 0.80)",
  blue: "rgba(138, 168, 200, 0.78)",
  cream: "rgba(245, 232, 206, 0.90)",
};

const STRIPES = `repeating-linear-gradient(
  45deg,
  rgba(255,255,255,0.10) 0 6px,
  rgba(0,0,0,0.04) 6px 12px
)`;

type Props = {
  color?: Color;
  rotate?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

export function WashiTape({
  color = "pink",
  rotate = -4,
  width = 120,
  height = 28,
  className = "",
  style,
}: Props) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: COLORS[color],
        backgroundImage: STRIPES,
        boxShadow: "0 3px 8px -2px rgba(42,45,37,0.18)",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
