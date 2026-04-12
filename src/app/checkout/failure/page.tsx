import Link from "next/link";
import { waLink } from "@/lib/config";

export const metadata = { title: "Pago no completado | Tematibox" };

export default function CheckoutFailure() {
  return (
    <section className="py-24 px-6 min-h-[70vh]">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">El pago no se completo</h1>
        <p className="text-text-secondary text-lg mb-8">
          No te preocupes, no se hizo ningun cargo. Podes intentar de nuevo o escribirnos por WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/imprimibles" className="btn-primary">Volver a imprimibles</Link>
          <a
            href={waLink("Hola! Tuve un problema con el pago, me ayudan?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
