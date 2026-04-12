import Link from "next/link";
import type { ThemeData } from "@/data/themes";

interface ThemeCardProps {
  theme: ThemeData;
  index?: number;
}

export function ThemeCard({ theme, index = 0 }: ThemeCardProps) {
  return (
    <Link href={`/temas/${theme.slug}`} className="group block card-hover rounded-2xl overflow-hidden bg-bg-white border border-border-light" style={{ animationDelay: `${index * 80}ms` }}>
      <div className={`relative h-44 bg-gradient-to-br ${theme.gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{theme.emoji}</span>
        {theme.trending && (<span className="absolute top-3 right-3 inline-block px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold">Tendencia</span>)}
        {!theme.trending && theme.popular && (<span className="absolute top-3 right-3 badge-popular">Popular</span>)}
        <span className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">{theme.ageRange}</span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">{theme.name}</h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{theme.description}</p>
        <div className="mt-3 flex items-center gap-1.5 text-primary text-sm font-medium"><span>Ver combos</span></div>
      </div>
    </Link>
  );
}
