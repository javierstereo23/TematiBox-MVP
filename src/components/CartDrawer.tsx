"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/data/themes";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <>
      <div onClick={closeCart} className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-hidden="true" />
      <aside className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-bg-white z-[101] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`} aria-label="Carrito de compras">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light">
          <div>
            <h2 className="text-lg font-bold text-text-primary">Tu carrito</h2>
            <p className="text-xs text-text-secondary">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
          </div>
          <button onClick={closeCart} className="p-2 rounded-full hover:bg-primary-bg transition-colors" aria-label="Cerrar">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-10 text-center">
              <span className="text-5xl mb-4 block">🛒</span>
              <p className="text-text-primary font-semibold mb-2">Tu carrito esta vacio</p>
              <p className="text-sm text-text-secondary mb-6">Agrega combos y arma el cumple perfecto.</p>
              <Link href="/temas" onClick={closeCart} className="btn-primary">Explorar temas</Link>
            </div>
          ) : (
            <ul className="divide-y divide-border-light">
              {items.map((item) => (
                <li key={item.comboId} className="p-4 flex gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-text-secondary truncate">{item.themeName}</p>
                        <h3 className="text-sm font-semibold text-text-primary truncate">{item.comboName}</h3>
                      </div>
                      <button onClick={() => removeItem(item.comboId)} className="p-1 text-text-tertiary hover:text-red-500 transition-colors flex-shrink-0" aria-label="Eliminar">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.comboId, item.quantity - 1)} className="px-2 py-1 hover:bg-primary-bg rounded-l-lg text-text-secondary">-</button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.comboId, item.quantity + 1)} className="px-2 py-1 hover:bg-primary-bg rounded-r-lg text-text-secondary">+</button>
                      </div>
                      <p className="text-sm font-bold text-text-primary">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border-light p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Subtotal</span>
              <span className="text-xl font-bold text-text-primary">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-text-tertiary">Envio calculado en el checkout.</p>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">Ir al checkout</Link>
            <button onClick={closeCart} className="btn-secondary w-full">Seguir comprando</button>
          </div>
        )}
      </aside>
    </>
  );
}
