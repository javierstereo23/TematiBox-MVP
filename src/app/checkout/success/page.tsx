import Link from "next/link";

export const metadata = { title: "Pedido confirmado | Tematibox" };

export default function CheckoutSuccess() {
  return (
    <section className="py-24 px-6 min-h-[70vh]">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-green/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">Listo, tu pedido esta confirmado!</h1>
        <p className="text-text-secondary text-lg mb-3">
          Te mandamos un email con los archivos digitales para descargar.
        </p>
        <p className="text-text-secondary text-sm mb-8">
          Si es un imprimible personalizado, lo recibis en menos de 24hs con tu nombre y datos integrados.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/imprimibles" className="btn-primary">Seguir explorando</Link>
          <Link href="/" className="btn-secondary">Volver al inicio</Link>
        </div>
      </div>
    </section>
  );
}
