"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  DigitalCategoryMeta,
  DigitalProduct,
  Personalization,
  ThemeData,
} from "@/data/themes";
import { formatPrice, getDiscount } from "@/data/themes";
import { useCart } from "@/components/CartProvider";
import { getTemplate } from "./templates";

interface Props {
  category: DigitalCategoryMeta;
  theme: ThemeData;
  product: DigitalProduct;
}

const emptyPersonalization: Partial<Personalization> = {
  name: "",
  age: "",
  eventDate: "",
  eventTime: "",
  venue: "",
  address: "",
};

export function PersonalizerProduct({ category, theme, product }: Props) {
  const [personalization, setPersonalization] = useState<Partial<Personalization>>(emptyPersonalization);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const Template = getTemplate(category.id);
  const discount = getDiscount(product.price, product.originalPrice);

  const isValid = (personalization.name?.trim().length ?? 0) > 0 && personalization.age !== "" && personalization.age !== undefined;

  function update<K extends keyof Personalization>(key: K, value: string) {
    setPersonalization((prev) => ({ ...prev, [key]: key === "age" ? (value === "" ? "" : Number(value)) : value }));
  }

  function handleAdd() {
    if (!isValid) return;
    const pers: Personalization = {
      name: personalization.name!.trim(),
      age: Number(personalization.age),
      eventDate: personalization.eventDate?.trim() || undefined,
      eventTime: personalization.eventTime?.trim() || undefined,
      venue: personalization.venue?.trim() || undefined,
      address: personalization.address?.trim() || undefined,
    };
    addItem({
      itemId: `digital-${product.id}-${pers.name.toLowerCase().replace(/\s+/g, "-")}`,
      kind: "digital",
      themeSlug: theme.slug,
      themeName: theme.name,
      name: category.name,
      subtype: category.id,
      price: product.price,
      emoji: category.emoji,
      gradient: category.gradient,
      image: theme.image,
      personalization: pers,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* preview */}
      <div className="lg:sticky lg:top-24">
        <div className="relative rounded-3xl overflow-hidden bg-bg-white shadow-xl border border-border-light">
          <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 text-xs font-bold text-text-primary shadow">
            Preview en vivo
          </div>
          <div className="p-4 md:p-6">
            <Template palette={theme.palette} personalization={personalization} themeName={theme.name} themeEmoji={theme.emoji} />
          </div>
        </div>
        <p className="text-xs text-text-tertiary text-center mt-3">
          Asi se va a ver tu producto final. La resolucion de descarga es 4K.
        </p>
      </div>

      {/* form */}
      <div>
        <div className="mb-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${category.gradient} text-white text-xs font-bold mb-4`}>
            <span>{category.emoji}</span>
            <span>{category.shortName.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            {category.name} <span className="text-gradient-primary">{theme.name}</span>
          </h1>
          <p className="text-text-secondary text-lg">{category.longDescription}</p>
        </div>

        <div className="bg-bg-white rounded-2xl border border-border-light p-6 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-1">Personaliza tu {category.shortName.toLowerCase()}</h2>
          <p className="text-sm text-text-secondary mb-5">Mira como cambia el preview a medida que completas.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-text-primary mb-1.5">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalization.name || ""}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={24}
                  placeholder="Martina"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">
                  Edad <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={personalization.age === undefined ? "" : personalization.age}
                  onChange={(e) => update("age", e.target.value)}
                  placeholder="5"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>

            {category.requiresEvent && (
              <div className="pt-4 border-t border-border-light">
                <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3">
                  Datos del evento (opcional)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Fecha</label>
                    <input
                      type="date"
                      value={personalization.eventDate || ""}
                      onChange={(e) => update("eventDate", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Hora</label>
                    <input
                      type="time"
                      value={personalization.eventTime || ""}
                      onChange={(e) => update("eventTime", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Lugar o salon</label>
                    <input
                      type="text"
                      value={personalization.venue || ""}
                      onChange={(e) => update("venue", e.target.value)}
                      maxLength={60}
                      placeholder="Salon Kids World"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Direccion</label>
                    <input
                      type="text"
                      value={personalization.address || ""}
                      onChange={(e) => update("address", e.target.value)}
                      maxLength={80}
                      placeholder="Av. Siempre Viva 742, CABA"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-bg-white rounded-2xl border border-border-light p-6 mb-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-sm text-text-tertiary line-through">{formatPrice(product.originalPrice)}</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-text-primary">{formatPrice(product.price)}</span>
                <span className="badge-discount">-{discount}%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-tertiary">Descarga</p>
              <p className="text-sm font-bold text-accent-green">Al instante</p>
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!isValid || added}
            className={`btn-primary w-full !py-4 !text-base transition-all ${
              added ? "!bg-accent-green" : ""
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {added ? "Agregado al carrito" : isValid ? "Agregar al carrito" : "Completa nombre y edad"}
          </button>
          <p className="text-xs text-text-tertiary text-center mt-3">
            Pagas una vez. Descargas todas las veces que necesites.
          </p>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl p-6">
          <p className="text-sm font-semibold text-text-primary mb-3">Otras opciones para {theme.name}</p>
          <div className="flex flex-wrap gap-2">
            <Link href={`/temas/${theme.slug}`} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-border-light hover:border-primary hover:text-primary transition-colors">
              Ver combos fisicos
            </Link>
            <Link href={`/imprimibles/${category.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-border-light hover:border-primary hover:text-primary transition-colors">
              Mas {category.shortName.toLowerCase()}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
