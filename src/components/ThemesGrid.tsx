"use client";

import { useState } from "react";
import { categories, type ThemeData } from "@/data/themes";
import { ThemeCard } from "./ThemeCard";

interface ThemesGridProps {
  themes: ThemeData[];
}

export function ThemesGrid({ themes }: ThemesGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered =
    activeCategory === "all" ? themes : themes.filter((t) => t.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {categories.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] text-sm font-semibold transition-all ${
                active
                  ? "bg-text-primary text-[#FBF6EA]"
                  : "bg-[#FFFDF8] border border-text-primary/15 text-text-primary hover:border-primary hover:text-primary"
              }`}
              style={active ? { boxShadow: "3px 3px 0 0 #E54CA2" } : undefined}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {filtered.map((theme, i) => (
          <ThemeCard key={theme.slug} theme={theme} index={i} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-hand text-2xl text-text-secondary">
            no encontramos temas en esta categoría todavía.
          </p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-4 font-hand text-xl text-primary hover:underline"
          >
            ver todos los temas →
          </button>
        </div>
      )}
    </>
  );
}
