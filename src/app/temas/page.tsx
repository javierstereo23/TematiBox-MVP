import { themes } from "@/data/themes";
import { ThemesGrid } from "@/components/ThemesGrid";

export const metadata = {
  title: "Explorar Temas | Tematibox",
  description: "Explora todos los temas disponibles.",
};

export default function TemasPage() {
  return (
    <section className="pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary mb-4">Explorar temas</h1>
          <p className="text-text-secondary text-lg max-w-2xl">Encontra el tema que le gusta a tu hijo y arma el combo perfecto.</p>
        </div>
        <ThemesGrid themes={themes} />
      </div>
    </section>
  );
}
