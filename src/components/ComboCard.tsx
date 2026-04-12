"use client";

import { useState } from "react";
import type { Combo } from "@/data/themes";
import { formatPrice, getDiscount } from "@/data/themes";
import { useCart } from "./CartProvider";

interface ComboCardProps {
  combo: Combo;
  themeName: string;
  themeEmoji: string;
  themeGradient: string;
}

const typeLabels: Record<string, { label: string; color: string }> = {
  fiesta: { label: "Cotillon & Deco", color: "bg-amber-100 text-amber-800" },
  regalo: { label: "Regalos", color: "bg-blue-100 text-blue-800" },
  completo: { label: "Todo incluido", color: "bg-emerald-100 text-emerald-800" },
  digital: { label: "Digital . Imprimible", color: "bg-violet-100 text-violet-800" },
};

export function ComboCard({ combo, themeName, themeEmoji, themeGradient }: ComboCardProps) {
  const discount = getDiscount(combo.price, combo.originalPrice);
  const typeInfo = typeLabels[combo.type];
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ comboId: combo.id, themeSlug: combo.themeSlug, themeName, comboName: combo.name, comboType: combo.type, price: combo.price, emoji: themeEmoji, gradient: themeGradient });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-bg-white rounded-2xl border border-border-light overflow-hidden card-hover flex flex-col">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${typeInfo.color}`}>{typeInfo.label}</span>
            <h3 className="text-lg font-bold text-text-primary">{combo.name}</h3>
          </div>
          {combo.badge && <span className="badge-popular">{combo.badge}</span>}
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{combo.description}</p>
      </div>
      <div className="px-6 pb-4 flex-1">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Incluye</p>
        <ul className="space-y-2">
          {combo.items.map((item) => (
            <li key={item.name} className="flex items-center gap-2.5">
              <span className="text-base flex-shrink-0">{item.emoji}</span>
              <span className="text-sm text-text-secondary">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-4 border-t border-border-light bg-bg mt-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-sm text-text-tertiary line-through">{formatPrice(combo.originalPrice)}</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-text-primary">{formatPrice(combo.price)}</span>
              <span className="badge-discount">-{discount}%</span>
            </div>
          </div>
        </div>
        <button onClick={handleAdd} disabled={added} className={`btn-primary w-full transition-all ${added ? "!bg-accent-green" : ""}`}>
          {added ? "Agregado" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
