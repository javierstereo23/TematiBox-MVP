import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar, HandCircle } from "@/components/scrapbook/HandDrawn";

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
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-40" />

      <WashiTape
        color="pink"
        rotate={-10}
        width={160}
        height={26}
        className="absolute -top-1 left-[6%] z-20"
      />

      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 font-hand text-lg text-text-secondary mb-8">
          <Link href="/" className="hover:text-primary">inicio</Link>
          <span>·</span>
          <span className="text-text-primary">buscar</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <HandStar className="w-5 h-5" color="#E0B252" />
          <p className="font-hand text-xl md:text-2xl text-primary/80 -rotate-[0.5deg]">
            en el catálogo
          </p>
        </div>

        <h1 className="font-display text-[40px] md:text-[60px] font-light text-text-primary leading-[0.95] tracking-[-0.025em] mb-5 text-balance">
          {q ? (
            <>
              Resultados para{" "}
              <span className="relative inline-block">
                <span className="italic font-normal" style={{ color: "#E54CA2" }}>
                  &ldquo;{sp.q}&rdquo;
                </span>
                <HandCircle
                  className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)]"
                  color="#E54CA2"
                />
              </span>
            </>
          ) : (
            <>
              Buscá lo que{" "}
              <span className="italic font-normal text-gradient-primary">querés imprimir</span>
            </>
          )}
        </h1>

        {q && (
          <p className="font-hand text-2xl text-primary/75 -rotate-[0.5deg] mb-10">
            {results.length === 0
              ? "no hubo suerte esta vez"
              : `${results.length} ${results.length === 1 ? "resultado" : "resultados"} encontrados`}
          </p>
        )}

        {!q && (
          <p className="text-text-primary/70 text-base md:text-lg max-w-xl mb-10 leading-[1.65]">
            Escribí en la barra de arriba el nombre del tema o imprimible que necesitás.
          </p>
        )}

        {q && results.length === 0 && (
          <div
            className="polaroid max-w-md mx-auto text-center py-10"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="font-display text-2xl font-normal text-text-primary mb-3">
              Sin resultados para &ldquo;{sp.q}&rdquo;
            </p>
            <p className="font-hand text-lg text-primary/75 mb-6 px-6">
              probá con otra palabra, o escribinos por WhatsApp
            </p>
            <Link
              href="/imprimibles"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-primary text-[#FBF6EA] font-semibold rounded-[4px]"
              style={{ boxShadow: "4px 4px 0 0 #E54CA2" }}
            >
              Ver todos los imprimibles →
            </Link>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
