import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata = { title: "Buscar" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q || "").trim().toLowerCase();
  const results = q.length >= 2 ? products.filter((p) => p.title.toLowerCase().includes(q)) : [];

  return (
    <section className="py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <span className="text-text-primary">Buscar</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
          {q ? `Resultados para "${sp.q}"` : "Buscar productos"}
        </h1>
        {q && (
          <p className="text-text-secondary mb-8">
            {results.length} {results.length === 1 ? "resultado" : "resultados"}
          </p>
        )}

        {!q && (
          <p className="text-text-secondary">Escribi en la barra de busqueda el nombre del tema o imprimible que necesitas.</p>
        )}

        {q && results.length === 0 && (
          <div className="py-16 text-center bg-bg-white rounded-3xl border border-border-light">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-text-primary font-semibold mb-2">Sin resultados para &ldquo;{sp.q}&rdquo;</p>
            <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
              Probá con otra palabra, o escribinos por WhatsApp y armamos el tema a medida.
            </p>
            <Link href="/imprimibles" className="btn-primary">Ver todos los imprimibles</Link>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
