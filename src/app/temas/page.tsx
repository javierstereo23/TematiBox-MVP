import { themes } from "@/data/themes";
import { ThemesGrid } from "@/components/ThemesGrid";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar, HandCircle } from "@/components/scrapbook/HandDrawn";

export const metadata = {
  title: "Explorar Temas | Tematibox",
  description: "Explora todos los temas disponibles.",
};

export default function TemasPage() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 px-6">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-50" />
      <div className="absolute inset-0 -z-10 paper-texture opacity-50 mix-blend-multiply" />

      <WashiTape
        color="pink"
        rotate={-12}
        width={180}
        height={30}
        className="absolute -top-1 left-[6%] z-20"
      />
      <WashiTape
        color="mustard"
        rotate={8}
        width={150}
        height={28}
        className="absolute -top-2 right-[10%] z-20"
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <HandStar className="w-6 h-6" color="#E0B252" />
            <p className="font-hand text-2xl md:text-3xl text-primary/80 -rotate-1">
              universo de temas
            </p>
            <HandStar className="w-5 h-5" color="#E54CA2" />
          </div>
          <h1 className="font-display text-[48px] md:text-[72px] font-light text-text-primary leading-[0.95] tracking-[-0.03em] mb-5 text-balance">
            Lo que le{" "}
            <span className="relative inline-block">
              <span className="italic font-normal" style={{ color: "#E54CA2" }}>
                hace brillar
              </span>
              <HandCircle
                className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)]"
                color="#E54CA2"
              />
            </span>{" "}
            los ojos.
          </h1>
          <p className="font-hand text-2xl text-primary/75 -rotate-[0.5deg] mb-4">
            23 temas listos, + lo que te armes a medida
          </p>
          <p className="text-text-primary/70 text-base md:text-lg leading-[1.65] max-w-2xl">
            Elegí el tema que le gusta al chico o la chica y armamos el combo perfecto: invitación,
            etiquetas, souvenirs. Todo con su nombre, listo en minutos.
          </p>
        </div>
        <ThemesGrid themes={themes} />
      </div>
    </section>
  );
}
