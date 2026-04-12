import type { ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  caption?: string;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

export function PolaroidFrame({ children, caption, rotate = -2, className = "", style }: Props) {
  return (
    <div
      className={`polaroid relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <div className="relative overflow-hidden rounded-[2px] bg-[#EFE9DC]">{children}</div>
      {caption && (
        <p className="absolute left-0 right-0 bottom-3 text-center font-hand text-lg text-text-primary/85">
          {caption}
        </p>
      )}
    </div>
  );
}
