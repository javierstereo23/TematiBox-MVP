import Link from "next/link";
import Script from "next/script";
import { products, type RealProduct } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar, HandArrow } from "@/components/scrapbook/HandDrawn";
import { formatPrice } from "@/data/themes";

export const metadata = { title: "Pedido confirmado" };

// Pick 4 good upsells based on what was just purchased (via external_reference = productId)
function pickUpsells(justBoughtId?: string): RealProduct[] {
  const source = justBoughtId ? products.find((p) => p.id === justBoughtId) : null;
  const skip = new Set<string>();
  if (source) skip.add(source.id);

  // 1st: same theme, different category
  const byTheme = source?.primaryTheme
    ? products.filter(
        (p) =>
          p.primaryTheme === source.primaryTheme &&
          p.primaryCategory !== source.primaryCategory &&
          !skip.has(p.id)
      )
    : [];

  // 2nd: same category, different theme
  const byCategory = source
    ? products.filter(
        (p) =>
          p.primaryCategory === source.primaryCategory &&
          p.primaryTheme !== source.primaryTheme &&
          !skip.has(p.id)
      )
    : [];

  // 3rd: popular fallbacks
  const fallback = products.filter(
    (p) => p.image && p.price && p.themes.length > 0 && !skip.has(p.id)
  );

  const picks: RealProduct[] = [];
  const add = (p: RealProduct) => {
    if (!skip.has(p.id)) {
      picks.push(p);
      skip.add(p.id);
    }
  };

  byTheme.slice(0, 2).forEach(add);
  byCategory.slice(0, 2).forEach(add);
  // Fill remaining slots
  for (const p of fallback) {
    if (picks.length >= 4) break;
    add(p);
  }

  return picks.slice(0, 4);
}

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{
    payment_id?: string;
    status?: string;
    external_reference?: string;
  }>;
}) {
  const sp = await searchParams;
  const isPending = sp.status === "pending";
  const upsells = pickUpsells(sp.external_reference);
  const justBought = sp.external_reference
    ? products.find((p) => p.id === sp.external_reference)
    : null;

  return (
    <>
      {/* Confirmation hero — scrapbook paper */}
      <section className="relative py-20 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
        <div className="absolute inset-0 -z-10 paper-grid opacity-45" />
        <div className="absolute inset-0 -z-10 paper-texture opacity-50 mix-blend-multiply" />

        <WashiTape
          color="pink"
          rotate={-12}
          width={180}
          height={28}
          className="absolute -top-1 left-[8%] z-10"
        />
        <WashiTape
          color="mustard"
          rotate={10}
          width={150}
          height={26}
          className="absolute -top-2 right-[10%] z-10"
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full"
            style={{
              background: isPending ? "#FFF3A8" : "#D9E8D3",
              boxShadow: "0 10px 24px -10px rgba(42,45,37,0.2)",
            }}
          >
            {isPending ? (
              <svg
                className="w-10 h-10 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-10 h-10 text-accent-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <HandStar className="w-6 h-6" color="#E0B252" />
            <p className="font-hand text-2xl md:text-3xl text-primary/85 -rotate-1">
              {isPending ? "casi casi" : "¡gracias por confiar!"}
            </p>
            <HandStar className="w-6 h-6" color="#E54CA2" />
          </div>

          <h1 className="font-display text-[36px] md:text-[52px] font-medium text-text-primary leading-[0.98] tracking-[-0.025em] mb-4">
            {isPending ? (
              "Tu pago está en proceso."
            ) : (
              <>
                Listo, tu pedido está{" "}
                <span className="italic font-normal text-gradient-primary">confirmado.</span>
              </>
            )}
          </h1>
          <p className="text-lg text-text-primary/75 mb-2 leading-[1.6]">
            {isPending
              ? "Te avisamos por email apenas Mercado Pago lo acredite."
              : "Te mandamos un email con los archivos digitales para descargar."}
          </p>
          <p className="font-hand text-lg text-text-secondary -rotate-[0.5deg]">
            si es personalizado con tu nombre, lo recibís en menos de 24hs
          </p>

          {sp.payment_id && (
            <p className="text-xs text-text-tertiary mt-6">
              Ref. pago: <span className="font-mono">{sp.payment_id}</span>
            </p>
          )}

          {justBought && (
            <div
              className="inline-block mt-8 px-5 py-3"
              style={{
                background: "#FFFDF8",
                border: "1px solid rgba(42,45,37,0.12)",
                transform: "rotate(-1deg)",
                boxShadow: "0 8px 20px -8px rgba(42,45,37,0.15)",
              }}
            >
              <p className="font-hand text-base text-text-secondary mb-0.5">tu pedido</p>
              <p className="font-display text-lg font-medium text-text-primary">
                {justBought.title.replace(/imprimible/gi, "").trim()}
              </p>
              {justBought.price && (
                <p className="font-hand text-sm text-primary/75 mt-0.5">
                  {formatPrice(justBought.price)}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Upsell — 4 polaroid products */}
      {upsells.length > 0 && (
        <section className="relative py-16 md:py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-white" />
          <div className="absolute inset-0 -z-10 paper-grid opacity-25" />

          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-10 md:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <HandStar className="w-5 h-5" color="#E0B252" />
                <p className="font-hand text-xl md:text-2xl text-primary/80 -rotate-[0.5deg]">
                  ya que estás acá...
                </p>
              </div>
              <h2 className="font-display text-[30px] md:text-[44px] font-medium text-text-primary leading-[0.98] tracking-[-0.025em] text-balance">
                {justBought ? (
                  <>
                    Combinalo con{" "}
                    <span className="italic font-normal text-gradient-primary">más de lo mismo.</span>
                  </>
                ) : (
                  <>
                    Lo que más están{" "}
                    <span className="italic font-normal text-gradient-primary">pidiendo ahora.</span>
                  </>
                )}
              </h2>
              <p className="text-text-primary/70 text-base md:text-lg mt-3 leading-[1.65]">
                {justBought
                  ? `Imprimibles que suman al de ${justBought.primaryTheme || "este"} — con 10% OFF si los agregás hoy.`
                  : "Imprimibles que otras familias se llevan a la par."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-8 mb-14">
              {upsells.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-5">
                <HandArrow
                  className="w-8 h-5 -rotate-12 hidden sm:block"
                  color="#6B7257"
                  style={{ opacity: 0.55 }}
                />
                <p className="font-hand text-xl text-primary/75">
                  o seguí explorando todo el catálogo
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/imprimibles"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  style={{ boxShadow: "5px 5px 0 0 #E54CA2" }}
                >
                  Ver los 412 imprimibles →
                </Link>
                <Link
                  href="/"
                  className="font-hand text-xl text-primary hover:text-primary-dark underline decoration-dotted underline-offset-4"
                >
                  volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Analytics purchase event */}
      {!isPending && sp.payment_id && (
        <Script id="track-purchase" strategy="afterInteractive">
          {`if (window.gtag) window.gtag('event', 'purchase', { transaction_id: ${JSON.stringify(sp.payment_id)}, currency: 'ARS' });
if (window.fbq) window.fbq('track', 'Purchase', { currency: 'ARS' });`}
        </Script>
      )}
    </>
  );
}
