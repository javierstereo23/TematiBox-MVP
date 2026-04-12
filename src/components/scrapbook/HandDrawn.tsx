import type { CSSProperties } from "react";

export function HandCircle({
  className = "",
  color = "#E54CA2",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 240 120"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M120 8 C 60 8, 12 32, 12 60 C 12 92, 68 112, 124 112 C 180 112, 228 94, 228 62 C 228 36, 188 14, 120 8 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0 0"
        fill="none"
      />
      <path
        d="M124 110 C 70 110, 20 90, 16 62"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
    </svg>
  );
}

export function HandArrow({
  className = "",
  color = "#6B7257",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 140 80"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 70 C 30 40, 60 10, 112 18"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M102 8 L 120 20 L 104 32"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function HandStar({
  className = "",
  color = "#E0B252",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="none" aria-hidden="true">
      <path
        d="M20 4 L24 15 L36 16 L27 24 L30 36 L20 29 L10 36 L13 24 L4 16 L16 15 Z"
        fill={color}
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandScribble({
  className = "",
  color = "#2E5BB8",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 40" className={className} style={style} fill="none" aria-hidden="true">
      <path
        d="M4 30 Q 14 8, 26 22 T 50 24 T 74 18 T 96 26"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
