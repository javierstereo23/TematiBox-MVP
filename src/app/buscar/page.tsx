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
    <section className="py-14 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <span className="text-text-primary">Buscar</span>
        </nav>

        <div className="flex items-center gap-4 mb-5">
          <span className="font-display italic text-primary/70 text-sm">Búsqueda</span>
          <span className="h-px w-10 bg-primary/30" />
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-text-secondary">
            En el catálogo
          </span>
        </div>

        <h1 className="font-display text-[38px] md:text-[56px] font-light text-text-primary leading-[0.98] tracking-[-0.025em] mb-4 text-balance">
          {q ? (
            <>
              Resultados para{" "}
              <span className="italic font-normal text-gradient-primary">&ldquo;{sp.q}&rdquo;</span>
            </>
          ) : (
            <>
              Buscá lo que{" "}
              <span className="italic font-normal text-gradient-primary">querés imprimir</span>
            </>
          )}
        </h1>
        {q && (
          <p className="text-text-secondary mb-10">
            {results.length} {results.length === 1 ? "resultado encontrado" : "resultados encontrados"}
          </p>
        )}

        {!q && (
          <p className="text-text-secondary text-base md:text-lg max-w-xl mb-10">
            Escribí en la barra de arriba el nombre del tema o imprimible que necesitás.
          </p>
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
