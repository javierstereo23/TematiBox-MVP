"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-light">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-3 md:gap-6">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-2xl">🎁</span>
          <span className="text-xl font-bold tracking-tight text-text-primary hidden sm:inline">
            temati<span className="text-gradient-primary">box</span>
          </span>
        </Link>

        {/* Desktop search bar in the middle */}
        <div className="hidden md:block flex-1 max-w-md">
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/temas" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors whitespace-nowrap">Temas</Link>
          <Link href="/imprimibles" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors whitespace-nowrap">Imprimibles</Link>
        </div>

        <div className="flex items-center gap-1 md:gap-2 ml-auto md:ml-0">
          {/* Mobile search icon */}
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="md:hidden p-2.5 rounded-full hover:bg-primary-bg transition-colors"
            aria-label="Buscar"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <button onClick={openCart} className="relative p-2.5 rounded-full hover:bg-primary-bg transition-colors" aria-label="Abrir carrito">
            <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {totalItems > 0 && (<span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">{totalItems > 9 ? "9+" : totalItems}</span>)}
          </button>

          <Link href="/imprimibles" className="hidden lg:inline-flex btn-primary !py-2.5 !px-4 !text-xs whitespace-nowrap">
            Ver imprimibles
          </Link>

          <button className="md:hidden p-2 rounded-lg hover:bg-primary-bg transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />)}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search panel */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-bg-white border-t border-border-light px-4 py-3">
          <SearchBar compact onClose={() => setMobileSearchOpen(false)} />
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-white border-t border-border-light px-6 py-4 space-y-3">
          <Link href="/temas" className="block py-2 text-sm font-medium text-text-secondary hover:text-primary" onClick={() => setMobileOpen(false)}>Explorar temas</Link>
          <Link href="/imprimibles" className="block py-2 text-sm font-medium text-text-secondary hover:text-primary" onClick={() => setMobileOpen(false)}>Imprimibles</Link>
          <Link href="/imprimibles" className="btn-primary w-full !text-sm mt-2" onClick={() => setMobileOpen(false)}>Ver imprimibles</Link>
        </div>
      )}
    </nav>
  );
}
