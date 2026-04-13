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
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar, HandArrow } from "@/components/scrapbook/HandDrawn";
import { CREAM_BLUR } from "@/lib/images/placeholder";
import { LivePreview } from "@/components/personalizer/LivePreview";
import { cleanTitle } from "@/lib/seo/product";

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

    // Pull stored exit-intent coupon if present
    let couponCode: string | undefined;
    try {
      const raw = localStorage.getItem("tematibox.coupon");
      if (raw) {
        const parsed = JSON.parse(raw) as { code?: string };
        if (parsed?.code) couponCode = parsed.code;
      }
    } catch {
      /* noop */
    }

    try {
      const res = await fetch("/api/checkout/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          couponCode,
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

  const displayName = pers.name?.trim() || "su nombre";
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
            {/* Big polaroid frame */}
            <WashiTape
              color="pink"
              rotate={-10}
              width={140}
              height={26}
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
            />
            <div className="polaroid relative" style={{ transform: "rotate(-1deg)" }}>
              <div className="relative overflow-hidden bg-[#EFE9DC] rounded-[2px] aspect-square">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  placeholder="blur"
                  blurDataURL={CREAM_BLUR}
                  className="object-contain p-4 md:p-8"
                  priority
                />

                {/* Floating meta top-left */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF3A8] text-text-primary"
                    style={{ transform: "rotate(-3deg)", boxShadow: "0 3px 8px rgba(0,0,0,0.15)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <span className="font-hand text-base">disponible ahora</span>
                  </span>
                </div>

                {/* Discount badge top-right */}
                {discount !== null && discount > 0 && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="inline-flex items-center justify-center w-14 h-14 bg-accent-pink text-white font-bold text-sm"
                      style={{
                        transform: "rotate(8deg)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        borderRadius: "50%",
                      }}
                    >
                      -{discount}%
                    </span>
                  </div>
                )}
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-lg text-text-primary/80">
                hecho a mano por el equipo
              </p>
            </div>

            {/* Caption below image */}
            <div className="mt-6 flex items-center justify-between text-xs text-text-secondary">
              <p className="flex items-center gap-2 font-hand text-base text-primary/75">
                <HandStar className="w-4 h-4" color="#E0B252" />
                diseñado a pedido
              </p>
              {product.mlPermalink && (
                <a
                  href={product.mlPermalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-hand text-base text-primary/75 hover:text-primary underline decoration-dotted underline-offset-4"
                >
                  ver también en ML ↗
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

          {/* Title — Fraunces display, cleaned */}
          <h1 className="font-display text-3xl md:text-[44px] font-medium text-text-primary mb-2 leading-[1.05] tracking-[-0.02em]">
            {cleanTitle(product.title)}
          </h1>
          <p className="font-hand text-xl text-primary/75 -rotate-[0.5deg] mb-5">
            con el nombre del chico o la chica
          </p>

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
                  <span className="font-hand text-lg text-text-secondary">
                    lo compraron {product.sold} familias
                  </span>
                </>
              )}
            </div>
          )}

          {/* Live preview rendering the name over the product */}
          <LivePreview
            product={product}
            name={pers.name || ""}
            age={pers.age ?? ""}
            eventDate={pers.eventDate || null}
            venue={pers.venue || null}
            categoryShortName={category?.shortName}
          />

          {/* Personalization form — paper card */}
          <div
            className="bg-[#FFFDF8] border border-text-primary/15 p-6 md:p-7 mb-5 relative"
            style={{ boxShadow: "0 6px 20px -8px rgba(42,45,37,0.14)" }}
          >
            <WashiTape
              color="mustard"
              rotate={-8}
              width={80}
              height={22}
              className="absolute -top-3 left-6 z-10"
            />
            <div className="mb-5">
              <p className="font-hand text-xl text-primary/75 -rotate-[0.5deg] mb-1">
                01 · personalizalo
              </p>
              <h2 className="font-display text-2xl font-normal text-text-primary leading-tight">
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
                  <p className="font-hand text-sm text-text-secondary mt-1.5 -rotate-[0.3deg]">
                    como va a aparecer en el diseño
                  </p>
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
                  <p className="font-hand text-sm text-text-secondary mt-1.5 -rotate-[0.3deg]">
                    para elegir tono y colores
                  </p>
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
          <div
            className="bg-[#FFFDF8] border border-text-primary/15 p-6 md:p-7 mb-5 relative"
            style={{ boxShadow: "0 6px 20px -8px rgba(42,45,37,0.14)" }}
          >
            <WashiTape
              color="pink"
              rotate={6}
              width={80}
              height={22}
              className="absolute -top-3 right-6 z-10"
            />
            <div className="mb-5">
              <p className="font-hand text-xl text-primary/75 -rotate-[0.5deg] mb-1">
                02 · pagá
              </p>
              <div className="flex items-end justify-between">
                <div>
                  {product.originalPrice && (
                    <span className="font-hand text-base text-text-tertiary line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl md:text-5xl font-normal text-text-primary">
                      {product.price ? formatPrice(product.price) : "—"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-hand text-lg text-accent-green leading-tight">
                    en tu email
                  </p>
                  <p className="font-hand text-base text-text-primary/80">
                    en 30 segundos
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={!isValid || paying}
              className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-text-primary text-[#FBF6EA] font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-[4px] hover:translate-x-[-2px] hover:translate-y-[-2px] disabled:hover:translate-x-0 disabled:hover:translate-y-0 mb-4"
              style={{ boxShadow: isValid && !paying ? "6px 6px 0 0 #E54CA2" : "3px 3px 0 0 rgba(42,45,37,0.2)" }}
            >
              {paying ? (
                "Redirigiendo a Mercado Pago..."
              ) : isValid ? (
                <>
                  Comprar con Mercado Pago
                  <HandArrow className="w-5 h-3 opacity-80" color="currentColor" />
                </>
              ) : (
                "Completá nombre y edad"
              )}
            </button>
            <button
              onClick={handleAddCart}
              disabled={!isValid}
              className="w-full px-6 py-3 bg-[#FBF6EA] text-text-primary border border-text-primary/20 hover:border-primary hover:text-primary font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-[4px]"
            >
              Agregar al carrito
            </button>

            <p className="font-hand text-base text-text-secondary text-center mt-4 -rotate-[0.5deg]">
              pagás una vez · descargás las veces que necesites
            </p>
          </div>

          {/* Trust signals — post-it */}
          <div
            className="p-6 mb-5 relative"
            style={{
              background: "#D9E8D3",
              transform: "rotate(-0.5deg)",
              boxShadow: "0 8px 22px -8px rgba(42,45,37,0.22)",
            }}
          >
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <HandStar className="w-5 h-5 shrink-0 mt-0.5" color="#6B7257" />
                <div>
                  <p className="font-display text-lg font-normal text-text-primary leading-tight">
                    Llega en menos de 30 segundos
                  </p>
                  <p className="font-hand text-base text-text-primary/75 -rotate-[0.3deg]">
                    a tu email, sin esperar envío físico
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HandStar className="w-5 h-5 shrink-0 mt-0.5" color="#E0B252" />
                <div>
                  <p className="font-display text-lg font-normal text-text-primary leading-tight">
                    Personalizado a mano
                  </p>
                  <p className="font-hand text-base text-text-primary/75 -rotate-[0.3deg]">
                    el nombre y los datos los integra nuestro equipo
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HandStar className="w-5 h-5 shrink-0 mt-0.5" color="#E54CA2" />
                <div>
                  <p className="font-display text-lg font-normal text-text-primary leading-tight">
                    Reimprimís las veces que quieras
                  </p>
                  <p className="font-hand text-base text-text-primary/75 -rotate-[0.3deg]">
                    el archivo queda tuyo · imprenta u hogareña
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div
            className="flex items-center gap-3 px-5 py-4 bg-[#FFFDF8] border border-text-primary/15 rounded-[4px]"
            style={{ boxShadow: "0 4px 12px -4px rgba(42,45,37,0.1)" }}
          >
            <div className="shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg font-normal text-text-primary leading-tight">
                ¿Dudas antes de comprar?
              </p>
              <p className="font-hand text-base text-text-secondary">
                te responde Daniela en minutos
              </p>
            </div>
            <a
              href={waLink(`Hola! Tengo una consulta sobre ${product.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-[4px] transition-colors"
            >
              Chatear
            </a>
          </div>
        </motion.div>
      </div>

      {/* RELATED — polaroid cross-sell */}
      {related.length > 0 && (
        <section className="mt-24 md:mt-32 pt-16 border-t border-text-primary/10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-hand text-2xl text-primary/75 -rotate-[0.5deg] mb-2">
                combinalo con
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-text-primary leading-[1.05] max-w-xl">
                {theme ? (
                  <>
                    Más de <span className="italic font-normal text-gradient-primary">{theme.name}</span>
                  </>
                ) : (
                  <>
                    Te <span className="italic font-normal text-gradient-primary">también</span> va a gustar
                  </>
                )}
              </h2>
            </div>
            {theme && (
              <Link
                href={`/temas/${theme.slug}`}
                className="hidden md:inline-flex items-center gap-1.5 font-hand text-xl text-primary hover:text-primary-dark"
              >
                ver todo {theme.name} →
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-8">
            {related.slice(0, 8).map((r, i) => {
              const tilt = [-1.4, 0.8, -0.6, 1.2][i % 4];
              const tape = (["pink", "mustard", "sage", "blue"] as const)[i % 4];
              return (
                <div
                  key={r.id}
                  style={{ transform: `rotate(${tilt}deg)` }}
                  className="relative transition-transform duration-300 hover:!rotate-0 hover:-translate-y-2"
                >
                  <WashiTape
                    color={tape}
                    rotate={tilt > 0 ? -18 : 18}
                    width={56}
                    height={18}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
                  />
                  <Link href={`/producto/${r.slug}`} className="group block polaroid">
                    <div className="relative aspect-square overflow-hidden bg-[#EFE9DC] rounded-[2px]">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        placeholder="blur"
                        blurDataURL={CREAM_BLUR}
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-3 pb-1 px-1">
                      <p className="font-hand text-lg text-text-primary line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {r.title.replace(/imprimible/gi, "").replace(/^\s*-\s*/, "").trim()}
                      </p>
                      {r.price && (
                        <p className="font-display text-lg font-normal text-text-primary mt-1 leading-none">
                          {formatPrice(r.price)}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
