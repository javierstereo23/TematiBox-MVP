import Link from "next/link";
import Image from "next/image";
import type { ThemeData } from "@/data/themes";

interface ThemeCardProps {
  theme: ThemeData;
  index?: number;
}

export function ThemeCard({ theme, index = 0 }: ThemeCardProps) {
  return (
    <Link
      href={`/temas/${theme.slug}`}
      className="group block card-hover rounded-2xl overflow-hidden bg-bg-white border border-border-light"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={theme.image}
          alt={theme.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-20 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
        {theme.trending && (
          <span className="absolute top-3 right-3 inline-block px-3 py-1 rounded-full bg-red-500/95 text-white text-xs font-bold shadow-lg">
            Tendencia
          </span>
        )}
        {!theme.trending && theme.popular && (
          <span className="absolute top-3 right-3 badge-popular shadow-lg">Popular</span>
        )}
        <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{theme.emoji}</span>
        <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {theme.ageRange}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
          {theme.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{theme.description}</p>
        <div className="mt-3 flex items-center gap-1.5 text-primary text-sm font-medium">
          <span>Ver combos</span>
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
