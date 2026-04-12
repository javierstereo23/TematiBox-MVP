import { themes } from "@/data/themes";
import { ThemesGrid } from "@/components/ThemesGrid";

export const metadata = {
  title: "Explorar Temas | Tematibox",
  description: "Explora todos los temas disponibles.",
};

export default function TemasPage() {
  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display italic text-primary/70 text-sm">N.º 03</span>
            <span className="h-px w-10 bg-primary/30" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-text-secondary">
              Universo de Temas
            </span>
          </div>
          <h1 className="font-display text-[44px] md:text-[64px] font-light text-text-primary leading-[0.95] tracking-[-0.03em] mb-5 text-balance">
            Lo que le{" "}
            <span className="italic font-normal text-gradient-primary">hace brillar</span>{" "}
            los ojos.
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-[1.65]">
            Elegí el tema que le gusta a tu hija y armamos el combo perfecto: invitación, etiquetas,
            souvenirs. Todo con su nombre, listo en minutos.
          </p>
        </div>
        <ThemesGrid themes={themes} />
      </div>
    </section>
  );
}
