"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/themes";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [paying, setPaying] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0 || paying) return;
    setPaying(true);

    // Use the first item for MP (multi-item MP would need backend loop)
    const first = items[0];
    try {
      const res = await fetch("/api/checkout/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: first.itemId,
          title: first.name,
          price: totalPrice,
          image: first.image,
          personalization: first.personalization,
        }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
        return;
      }
      alert("No pudimos iniciar el pago. Probá con WhatsApp.");
      setPaying(false);
    } catch {
      setPaying(false);
      alert("Hubo un error. Intentá de nuevo.");
    }
  }

  if (submitted) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-green/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">Pedido confirmado!</h1>
          <p className="text-text-secondary text-lg mb-8">
            Los archivos digitales ya están disponibles en tu email.
          </p>
          <Link href="/imprimibles" className="btn-primary">Seguir explorando</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-6xl mb-6 block">🛒</span>
          <h1 className="text-3xl font-extrabold text-text-primary mb-4">Tu carrito esta vacio</h1>
          <p className="text-text-secondary text-lg mb-8">Agrega imprimibles y volvé al checkout.</p>
          <Link href="/imprimibles" className="btn-primary">Ver imprimibles</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-2">Finalizar compra</h1>
        <p className="text-text-secondary mb-8">Solo imprimibles digitales · Descarga al instante por email.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-bg-white rounded-2xl p-6 border border-border-light">
              <h2 className="text-lg font-bold text-text-primary mb-4">Datos de contacto</h2>
              <p className="text-xs text-text-secondary mb-4">
                Ahí te mandamos los archivos después del pago.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Maria Gonzalez"
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="mamadeMía@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+54 9 11 ..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="bg-bg-white rounded-2xl p-6 border border-border-light">
              <h2 className="text-lg font-bold text-text-primary mb-4">Método de pago</h2>
              <div className="p-4 rounded-xl border-2 border-primary bg-primary-bg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Mercado Pago</p>
                  <p className="text-xs text-text-secondary">Tarjeta, débito o dinero en cuenta. Hasta 12 cuotas.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={paying}
              className="btn-primary w-full !py-4 !text-base !bg-sky-500 hover:!bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {paying ? "Redirigiendo a Mercado Pago..." : `Pagar ${formatPrice(totalPrice)}`}
            </button>
          </form>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-bg-white rounded-2xl border border-border-light overflow-hidden">
              <div className="p-6 border-b border-border-light">
                <h2 className="text-lg font-bold text-text-primary">Tu pedido</h2>
              </div>
              <ul className="divide-y divide-border-light max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.itemId} className="p-4 flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-bg">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl`}>
                          {item.emoji}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary truncate">{item.themeName}</p>
                      <p className="text-sm font-semibold text-text-primary line-clamp-2">{item.name}</p>
                      {item.personalization?.name && (
                        <p className="text-xs text-primary truncate">
                          Para {item.personalization.name}
                          {item.personalization.age ? `, ${item.personalization.age} años` : ""}
                        </p>
                      )}
                      <p className="text-xs text-text-tertiary">Cant: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-text-primary whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="p-6 space-y-3 bg-bg">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Envío</span>
                  <span className="text-accent-green font-medium">Sin envío · Digital</span>
                </div>
                <div className="pt-3 border-t border-border-light flex justify-between items-end">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-xl font-bold text-text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
