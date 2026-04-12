import Link from "next/link";
import Script from "next/script";

export const metadata = { title: "Pedido confirmado" };

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ payment_id?: string; status?: string; external_reference?: string }>;
}) {
  const sp = await searchParams;
  const isPending = sp.status === "pending";

  return (
    <section className="py-24 px-6 min-h-[70vh]">
      <div className="max-w-xl mx-auto text-center">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isPending ? "bg-amber-50" : "bg-accent-green/10"}`}>
          {isPending ? (
            <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
          {isPending ? "Tu pago esta en proceso" : "Listo, tu pedido esta confirmado!"}
        </h1>
        <p className="text-text-secondary text-lg mb-3">
          {isPending
            ? "Te avisamos por email apenas Mercado Pago lo acredite."
            : "Te mandamos un email con los archivos digitales para descargar."}
        </p>
        <p className="text-text-secondary text-sm mb-8">
          Si es un imprimible personalizado, lo recibis en menos de 24hs con tu nombre y datos integrados.
        </p>
        {sp.payment_id && (
          <p className="text-xs text-text-tertiary mb-8">
            Ref. pago: <span className="font-mono">{sp.payment_id}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/imprimibles" className="btn-primary">Seguir explorando</Link>
          <Link href="/" className="btn-secondary">Volver al inicio</Link>
        </div>
      </div>

      {/* Analytics purchase event */}
      {!isPending && sp.payment_id && (
        <Script id="track-purchase" strategy="afterInteractive">
          {`if (window.gtag) window.gtag('event', 'purchase', { transaction_id: ${JSON.stringify(sp.payment_id)}, currency: 'ARS' });
if (window.fbq) window.fbq('track', 'Purchase', { currency: 'ARS' });`}
        </Script>
      )}
    </section>
  );
}
