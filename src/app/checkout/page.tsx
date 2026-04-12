"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/themes";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", direccion: "", ciudad: "", cp: "", notas: "" });

  const hasDigitalOnly = items.length > 0 && items.every((i) => i.kind === "digital");
  const shippingCost = hasDigitalOnly ? 0 : items.length > 0 ? 2500 : 0;
  const finalTotal = totalPrice + shippingCost;

  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setSubmitted(true); clearCart(); }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { setForm({ ...form, [e.target.name]: e.target.value }); }

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
          <p className="text-text-secondary text-lg mb-8">Te mandamos un email con todos los detalles.{hasDigitalOnly ? " Los archivos digitales ya estan disponibles." : " Tu combo sale en las proximas 24hs."}</p>
          <Link href="/temas" className="btn-primary">Seguir explorando</Link>
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
          <p className="text-text-secondary text-lg mb-8">Agrega combos y volve al checkout.</p>
          <Link href="/temas" className="btn-primary">Explorar temas</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-8">Finalizar compra</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-bg-white rounded-2xl p-6 border border-border-light">
              <h2 className="text-lg font-bold text-text-primary mb-4">Datos de contacto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Nombre completo</label>
                  <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Maria Gonzalez" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Telefono</label>
                  <input type="tel" name="telefono" required value={form.telefono} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>
            </div>
            {!hasDigitalOnly && (
              <div className="bg-bg-white rounded-2xl p-6 border border-border-light">
                <h2 className="text-lg font-bold text-text-primary mb-4">Direccion de envio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Direccion</label>
                    <input type="text" name="direccion" required value={form.direccion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Ciudad</label>
                    <input type="text" name="ciudad" required value={form.ciudad} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Codigo postal</label>
                    <input type="text" name="cp" required value={form.cp} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                </div>
              </div>
            )}
            <div className="bg-bg-white rounded-2xl p-6 border border-border-light">
              <h2 className="text-lg font-bold text-text-primary mb-4">Metodo de pago</h2>
              <div className="p-4 rounded-xl border-2 border-primary bg-primary-bg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center"><span className="text-xl">💳</span></div>
                <div>
                  <p className="font-semibold text-text-primary">Mercado Pago</p>
                  <p className="text-xs text-text-secondary">Tarjeta, debito o dinero en cuenta. Hasta 12 cuotas.</p>
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full !py-4 !text-base">Confirmar pedido . {formatPrice(finalTotal)}</button>
          </form>
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-bg-white rounded-2xl border border-border-light overflow-hidden">
              <div className="p-6 border-b border-border-light">
                <h2 className="text-lg font-bold text-text-primary">Tu pedido</h2>
              </div>
              <ul className="divide-y divide-border-light max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.itemId} className="p-4 flex gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary truncate">{item.themeName}</p>
                      <p className="text-sm font-semibold text-text-primary truncate">{item.name}</p>
                      {item.personalization?.name && (
                        <p className="text-xs text-primary truncate">Para {item.personalization.name}{item.personalization.age ? `, ${item.personalization.age} anos` : ""}</p>
                      )}
                      <p className="text-xs text-text-tertiary">Cant: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-text-primary whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="p-6 space-y-3 bg-bg">
                <div className="flex justify-between text-sm"><span className="text-text-secondary">Subtotal</span><span className="font-medium">{formatPrice(totalPrice)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-secondary">Envio</span><span className="font-medium">{shippingCost === 0 ? <span className="text-accent-green">Gratis</span> : formatPrice(shippingCost)}</span></div>
                <div className="pt-3 border-t border-border-light flex justify-between items-end"><span className="text-base font-semibold">Total</span><span className="text-xl font-bold text-text-primary">{formatPrice(finalTotal)}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
