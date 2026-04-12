"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { formatPrice } from "@/data/themes";
import { track } from "./Analytics";

interface Props {
  compact?: boolean;
  onClose?: () => void;
}

export function SearchBar({ compact = false, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q.trim()), 160);
    return () => clearTimeout(id);
  }, [q]);

  const results = debouncedQ.length >= 2
    ? products
        .filter((p) => p.title.toLowerCase().includes(debouncedQ.toLowerCase()))
        .slice(0, 6)
    : [];

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const query = q.trim();
    if (!query) return;
    track("search", { search_term: query });
    router.push(`/buscar?q=${encodeURIComponent(query)}`);
    setOpen(false);
    onClose?.();
  }

  return (
    <div className={`relative ${compact ? "w-full" : "w-full max-w-md"}`}>
      <form onSubmit={submit}>
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 180)}
            placeholder="Buscar tema o imprimible..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg border border-border-light text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                inputRef.current?.focus();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-tertiary hover:text-text-primary hover:bg-bg-white"
              aria-label="Limpiar"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {open && debouncedQ.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-white rounded-2xl shadow-2xl border border-border-light overflow-hidden z-[80] max-h-[70vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-5 text-center">
              <p className="text-sm text-text-secondary">Sin resultados para &ldquo;{debouncedQ}&rdquo;</p>
              <p className="text-xs text-text-tertiary mt-1">Probá con otro termino o escribinos por WhatsApp.</p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-border-light">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/producto/${p.slug}`}
                      onClick={() => {
                        setOpen(false);
                        onClose?.();
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-bg"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-bg">
                        <Image src={p.image} alt={p.title} fill sizes="48px" className="object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary line-clamp-1">{p.title}</p>
                        <p className="text-xs text-text-secondary">
                          {p.price ? formatPrice(p.price) : "—"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => submit()}
                className="w-full px-4 py-3 text-xs font-semibold text-primary hover:bg-primary-bg border-t border-border-light text-center"
              >
                Ver todos los resultados de &ldquo;{debouncedQ}&rdquo; →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
