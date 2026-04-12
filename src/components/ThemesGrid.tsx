"use client";

import { useState } from "react";
import { categories, type ThemeData } from "@/data/themes";
import { ThemeCard } from "./ThemeCard";

interface ThemesGridProps {
  themes: ThemeData[];
}

export function ThemesGrid({ themes }: ThemesGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? themes : themes.filter((t) => t.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? "bg-primary text-white shadow-md" : "bg-bg-white border border-border-light text-text-secondary hover:border-primary hover:text-primary"}`}>
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((theme, i) => <ThemeCard key={theme.slug} theme={theme} index={i} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg">No encontramos temas en esta categoria todavia.</p>
          <button onClick={() => setActiveCategory("all")} className="mt-4 text-primary font-medium hover:underline">Ver todos los temas</button>
        </div>
      )}
    </>
  );
}
