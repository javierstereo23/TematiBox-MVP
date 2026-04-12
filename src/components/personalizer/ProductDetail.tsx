"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { RealProduct } from "@/data/products";
import type { ThemeData, DigitalCategoryMeta, Personalization } from "@/data/themes";
import { formatPrice, getDiscount } from "@/data/themes";
import { useCart } from "@/components/CartProvider";
import { waLink } from "@/lib/config";
import { track } from "@/components/Analytics";

interface Props {
  product: RealProduct;
  theme?: ThemeData;
  category?: DigitalCategoryMeta;
  related?: RealProduct[];
}

const emptyPersonalization: Partial<Personalization> = {
  name: "",
  age: "",
  eventDate: "",
  eventTime: "",
  venue: "",
  address: "",
};

export function ProductDetail({ product, theme, category, related = [] }: Props) {
  const router = useRouter();
  const [pers, setPers] = useState<Partial<Personalization>>(emptyPersonalization);
  const [paying, setPaying] = useState(false);
  const { addItem } = useCart();

  const discount = useMemo(() => {
    if (!product.price || !product.originalPrice) return null;
    return getDiscount(product.price, product.originalPrice);
  }, [product]);

  const isValid = (pers.name?.trim().length ?? 0) > 0 && pers.age !== "" && pers.age !== undefined;

  useEffect(() => {
    track("view_item", {
      currency: "ARS",
      value: product.price || 0,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          item_category: product.primaryCategory,
          item_brand: product.primaryTheme || "general",
          price: product.price || 0,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  function update<K extends keyof Personalization>(key: K, value: string) {
    setPers((prev) => ({ ...prev, [key]: key === "age" ? (value === "" ? "" : Number(value)) : value }));
  }

  async function handleBuyNow() {
    if (!isValid || !product.price) return;
    setPaying(true);
    track("begin_checkout", {
      currency: "ARS",
      value: product.price,
      items: [{ item_id: product.id, item_name: product.title, item_category: product.primaryCategory, price: product.price }],
    });
    try {
      const res = await fetch("/api/checkout/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          personalization: {
            name: pers.name!.trim(),
            age: Number(pers.age),
            eventDate: pers.eventDate?.trim() || null,
            eventTime: pers.eventTime?.trim() || null,
            venue: pers.venue?.trim() || null,
            address: pers.address?.trim() || null,
          },
        }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
        return;
      }
      if (data.mlFallback && product.mlPermalink) {
        window.location.href = product.mlPermalink;
        return;
      }
      alert("No pudimos iniciar el pago. Probá con WhatsApp.");
      setPaying(false);
    } catch (e) {
      console.error(e);
      setPaying(false);
      if (product.mlPermalink) window.location.href = product.mlPermalink;
    }
  }

  function handleAddCart() {
    if (!isValid || !product.price) return;
    const personalization: Personalization = {
      name: pers.name!.trim(),
      age: Number(pers.age),
      eventDate: pers.eventDate?.trim() || undefined,
      eventTime: pers.eventTime?.trim() || undefined,
      venue: pers.venue?.trim() || undefined,
      address: pers.address?.trim() || undefined,
    };
    addItem({
      itemId: `digital-${product.id}-${personalization.name.toLowerCase().replace(/\s+/g, "-")}`,
      kind: "digital",
      themeSlug: product.primaryTheme || "general",
      themeName: theme?.name || "Imprimible",
      name: product.title,
      subtype: product.primaryCategory,
      price: product.price,
      emoji: category?.emoji || theme?.emoji || "📄",
      gradient: category?.gradient || theme?.gradient || "from-primary to-accent-pink",
      image: product.image,
      personalization,
    });
    track("add_to_cart", {
      currency: "ARS",
      value: product.price,
      items: [{ item_id: product.id, item_name: product.title, item_category: product.primaryCategory, price: product.price }],
    });
    router.push("/checkout");
  }

  const displayName = pers.name?.trim() || "Tu hijo";
  const displayAge = pers.age !== "" && pers.age !== undefined ? pers.age : "—";
  const showPreview = (pers.name?.trim().length ?? 0) > 0;

  return (
    <>
      {/* EDITORIAL HEADER — Product hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* LEFT — image with editorial treatment */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Editorial frame */}
            <div className="relative rounded-[32px] overflow-hidden bg-[#FAF6EE] shadow-[0_40px_80px_-30px_rgba(42,45,37,0.22)] border border-border-light aspect-square">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain p-4 md:p-8"
                priority
              />

              {/* Floating meta top-left */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full pl-1 pr-3 py-1 shadow-sm border border-border-light">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-[10px] font-bold text-text-primary tracking-widest uppercase">
                    Disponible ahora
                  </span>
                </span>
              </div>

              {/* Discount badge top-right */}
              {discount !== null && discount > 0 && (
                <div className="absolute top-5 right-5">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold text-sm shadow-lg rotate-[8deg]">
                    -{discount}%
                  </span>
                </div>
              )}
            </div>

            {/* Caption below image */}
            <div className="mt-4 flex items-center justify-between text-xs text-text-secondary">
              <p className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Hecho a mano por el equipo</span>
              </p>
              {product.mlPermalink && (
                <a
                  href={product.mlPermalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic hover:text-primary underline-offset-4 hover:underline"
                >
                  Ver también en ML ↗
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — editorial panel with form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 lg:sticky lg:top-24"
        >
          {/* Pills: theme + category */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {category && (
              <Link
                href={`/imprimibles/${category.id}`}
                className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-bg-white border border-border-light text-[11px] font-bold tracking-wide text-text-primary hover:border-primary hover:text-primary transition-colors"
              >
                <span className="relative w-6 h-6 rounded-full overflow-hidden bg-[#FAF6EE]">
                  <Image src={category.iconImage} alt="" fill sizes="24px" className="object-cover" />
                </span>
                <span>{category.shortName.toUpperCase()}</span>
              </Link>
            )}
            {theme && (
              <Link
                href={`/temas/${theme.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide hover:bg-primary/15 transition-colors"
              >
                {theme.name}
              </Link>
            )}
          </div>

          {/* Title — editorial Fraunces */}
          <h1 className="font-display text-3xl md:text-[44px] font-semibold text-text-primary mb-4 leading-[1.05] tracking-tight">
            {product.title}
          </h1>

          {/* Rating + sold */}
          {product.rating !== null && (
            <div className="flex items-center gap-3 mb-6 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-amber-500 tracking-tight">
                  {"★".repeat(Math.round(product.rating))}
                  <span className="text-border">{"★".repeat(5 - Math.round(product.rating))}</span>
                </span>
                <span className="font-semibold text-text-primary ml-1">{product.rating.toFixed(1)}</span>
              </div>
              {product.sold !== null && (
                <>
                  <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                  <span className="text-text-secondary">{product.sold} mamás lo compraron</span>
                </>
              )}
            </div>
          )}

          {/* Live preview when personalized */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-primary-bg to-[#F0ECE3] border border-primary/15"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">
                Tu diseño va a decir
              </p>
              <p className="font-display text-2xl md:text-3xl text-text-primary leading-tight">
                <span className="italic font-normal">{displayName}</span>
                {displayAge !== "—" && (
                  <span className="text-text-secondary">, {displayAge} años</span>
                )}
              </p>
              {pers.eventDate && (
                <p className="text-sm text-text-secondary mt-2 italic">
                  {new Date(pers.eventDate + "T12:00:00").toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
                  {pers.eventTime && ` · ${pers.eventTime}`}
                  {pers.venue && ` · ${pers.venue}`}
                </p>
              )}
            </motion.div>
          )}

          {/* Personalization form — editorial */}
          <div className="bg-bg-white rounded-3xl border border-border-light p-6 md:p-7 mb-5 shadow-sm">
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">
                01 · Personalizalo
              </p>
              <h2 className="font-display text-xl text-text-primary leading-tight">
                Hacelo <span className="italic font-normal text-primary">único</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-text-primary mb-1.5 uppercase tracking-wide">
                    Nombre <span className="text-accent-pink">*</span>
                  </label>
                  <input
                    type="text"
                    value={pers.name || ""}
                    onChange={(e) => update("name", e.target.value)}
                    maxLength={24}
                    placeholder="Martina"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-text-primary mb-1.5 uppercase tracking-wide">
                    Edad <span className="text-accent-pink">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={pers.age === undefined ? "" : pers.age}
                    onChange={(e) => update("age", e.target.value)}
                    placeholder="5"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-bg-white transition-colors"
                  />
                </div>
              </div>
              {category?.requiresEvent && (
                <div className="pt-4 border-t border-border-light">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-3">
                    Datos del evento — opcional
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={pers.eventDate || ""}
                      onChange={(e) => update("eventDate", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-bg-white transition-colors"
                    />
                    <input
                      type="time"
                      value={pers.eventTime || ""}
                      onChange={(e) => update("eventTime", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-bg-white transition-colors"
                    />
                    <input
                      type="text"
                      value={pers.venue || ""}
                      onChange={(e) => update("venue", e.target.value)}
                      maxLength={60}
                      placeholder="Salón Kids World"
                      className="col-span-2 w-full px-4 py-3 rounded-xl border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-bg-white transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="bg-bg-white rounded-3xl border border-border-light p-6 md:p-7 mb-5 shadow-sm">
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">
                02 · Pagá
              </p>
              <div className="flex items-end justify-between">
                <div>
                  {product.originalPrice && (
                    <span className="text-sm text-text-tertiary line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl md:text-5xl font-semibold text-text-primary">
                      {product.price ? formatPrice(product.price) : "—"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent-green">En tu email</p>
                  <p className="text-sm font-semibold text-text-primary">En 30 segundos</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={!isValid || paying}
              className="group w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:bg-text-tertiary/30 disabled:cursor-not-allowed text-white font-bold text-base transition-all disabled:opacity-60 mb-3"
            >
              {paying ? (
                "Redirigiendo a Mercado Pago..."
              ) : isValid ? (
                <>
                  Comprar ahora con Mercado Pago
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                "Completá nombre y edad"
              )}
            </button>
            <button
              onClick={handleAddCart}
              disabled={!isValid}
              className="w-full px-6 py-3 rounded-2xl bg-bg text-text-primary border border-border hover:border-primary hover:text-primary font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar al carrito
            </button>

            <p className="text-[11px] text-text-tertiary text-center mt-4 leading-relaxed">
              Pagás una vez. Descargás las veces que necesites.
            </p>
          </div>

          {/* Trust signals — editorial row */}
          <div className="bg-gradient-to-br from-primary-bg to-[#F0ECE3] rounded-3xl p-6 mb-5">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-text-primary">Llega en menos de 30 segundos</p>
                  <p className="text-xs text-text-secondary leading-relaxed">A tu email apenas se confirma el pago. No esperás envío físico.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-text-primary">Personalizado a mano</p>
                  <p className="text-xs text-text-secondary leading-relaxed">Nuestras diseñadoras integran el nombre y datos al diseño.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-text-primary">Imprimís las veces que necesites</p>
                  <p className="text-xs text-text-secondary leading-relaxed">El archivo queda tuyo. Impresora hogareña o imprenta.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-bg-white border border-border-light">
            <div className="shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary">¿Dudas antes de comprar?</p>
              <p className="text-xs text-text-secondary">Te responde Daniela en minutos</p>
            </div>
            <a
              href={waLink(`Hola! Tengo una consulta sobre ${product.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-colors"
            >
              Chatear
            </a>
          </div>
        </motion.div>
      </div>

      {/* RELATED — editorial cross-sell */}
      {related.length > 0 && (
        <section className="mt-24 md:mt-32 pt-16 border-t border-border-light">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3">
                Combinalo con
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight max-w-xl">
                {theme ? (
                  <>
                    Más de <span className="italic font-normal">{theme.name}</span>
                  </>
                ) : (
                  <>
                    Te <span className="italic font-normal">también</span> va a gustar
                  </>
                )}
              </h2>
            </div>
            {theme && (
              <Link
                href={`/temas/${theme.slug}`}
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark group"
              >
                Ver todo {theme.name}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {related.slice(0, 8).map((r) => (
              <Link
                key={r.id}
                href={`/producto/${r.slug}`}
                className="group block rounded-2xl overflow-hidden bg-bg-white border border-border-light hover:border-primary/30 hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square bg-[#FAF6EE] overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-colors min-h-[40px] leading-tight">
                    {r.title}
                  </p>
                  {r.price && (
                    <p className="text-sm font-bold text-text-primary mt-2">{formatPrice(r.price)}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
