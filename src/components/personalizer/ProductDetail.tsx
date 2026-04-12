"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { RealProduct } from "@/data/products";
import type { ThemeData, DigitalCategoryMeta, Personalization } from "@/data/themes";
import { formatPrice, getDiscount } from "@/data/themes";
import { useCart } from "@/components/CartProvider";
import { waLink } from "@/lib/config";

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

  function update<K extends keyof Personalization>(key: K, value: string) {
    setPers((prev) => ({ ...prev, [key]: key === "age" ? (value === "" ? "" : Number(value)) : value }));
  }

  async function handleBuyNow() {
    if (!isValid || !product.price) return;
    setPaying(true);
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
      // fallback to ML permalink
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
    router.push("/checkout");
  }

  const gradient = category?.gradient || theme?.gradient || "from-primary to-accent-pink";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* image */}
      <div className="lg:sticky lg:top-24">
        <div className="relative rounded-3xl overflow-hidden bg-bg-white shadow-xl border border-border-light aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Imagen real del catalogo
          </span>
          {product.mlPermalink && (
            <a href={product.mlPermalink} target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">
              Ver en ML ↗
            </a>
          )}
        </div>
      </div>

      {/* form + buy */}
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {category && (
              <Link
                href={`/imprimibles/${category.id}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-bold hover:opacity-90`}
              >
                <span>{category.emoji}</span>
                <span>{category.shortName.toUpperCase()}</span>
              </Link>
            )}
            {theme && (
              <Link
                href={`/temas/${theme.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg border border-border-light text-xs font-semibold text-text-secondary hover:border-primary hover:text-primary"
              >
                <span>{theme.emoji}</span>
                <span>{theme.name}</span>
              </Link>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-text-primary mb-3 leading-tight">
            {product.title}
          </h1>
          {product.rating !== null && (
            <div className="flex items-center gap-2 mb-4 text-sm">
              <div className="flex text-amber-500">
                {"★".repeat(Math.round(product.rating))}
                <span className="text-border">{"★".repeat(5 - Math.round(product.rating))}</span>
              </div>
              <span className="text-text-secondary">({product.rating.toFixed(1)})</span>
              {product.sold !== null && <span className="text-text-tertiary">· {product.sold} vendidos</span>}
            </div>
          )}
        </div>

        <div className="bg-bg-white rounded-2xl border border-border-light p-6 mb-5">
          <div className="flex items-end justify-between mb-5">
            <div>
              {product.originalPrice && (
                <span className="text-sm text-text-tertiary line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-text-primary">
                  {product.price ? formatPrice(product.price) : "Consultar"}
                </span>
                {discount && discount > 0 && <span className="badge-discount">-{discount}%</span>}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-tertiary">Descarga</p>
              <p className="text-sm font-bold text-accent-green">Al instante</p>
            </div>
          </div>

          <h2 className="text-sm font-bold text-text-primary mb-3">Personalizalo (opcional)</h2>
          <div className="space-y-3 mb-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <input
                  type="text"
                  value={pers.name || ""}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={24}
                  placeholder="Nombre del chico/a"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={pers.age === undefined ? "" : pers.age}
                  onChange={(e) => update("age", e.target.value)}
                  placeholder="Edad"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            {category?.requiresEvent && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={pers.eventDate || ""}
                  onChange={(e) => update("eventDate", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <input
                  type="time"
                  value={pers.eventTime || ""}
                  onChange={(e) => update("eventTime", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleBuyNow}
            disabled={!isValid || paying}
            className="btn-primary w-full !py-4 !text-base !bg-sky-500 hover:!bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed mb-3"
          >
            {paying ? "Redirigiendo a Mercado Pago..." : "Comprar con Mercado Pago"}
            {!paying && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <button
            onClick={handleAddCart}
            disabled={!isValid}
            className="btn-secondary w-full !py-3 !text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Agregar al carrito
          </button>
          <p className="text-xs text-text-tertiary text-center mt-3">
            Pagas una vez. Descargas las veces que necesites.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-2xl flex-shrink-0">
            💬
          </div>
          <div className="flex-1">
            <p className="font-bold text-text-primary text-sm">Dudas antes de comprar?</p>
            <p className="text-xs text-text-secondary">Te respondemos en minutos</p>
          </div>
          <a
            href={waLink(`Hola! Tengo una consulta sobre ${product.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 !text-xs !bg-green-500 hover:!bg-green-600"
          >
            WhatsApp
          </a>
        </div>

        {related.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-text-primary mb-3">Tambien te puede interesar</h3>
            <div className="grid grid-cols-2 gap-3">
              {related.slice(0, 4).map((r) => (
                <Link
                  key={r.id}
                  href={`/producto/${r.slug}`}
                  className="group flex gap-3 p-3 rounded-xl bg-bg border border-border-light hover:border-primary/30 transition-all"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-bg-white">
                    <Image src={r.image} alt={r.title} fill sizes="64px" className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                      {r.title}
                    </p>
                    {r.price && (
                      <p className="text-xs font-bold text-text-secondary mt-1">{formatPrice(r.price)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
