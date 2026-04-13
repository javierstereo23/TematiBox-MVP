import Link from "next/link";
import { WashiTape } from "@/components/scrapbook/WashiTape";

export function Footer() {
  return (
    <footer className="relative border-t border-text-primary/10 bg-[#FBF6EA] overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-40 mix-blend-multiply pointer-events-none" />

      <WashiTape
        color="pink"
        rotate={-8}
        width={160}
        height={24}
        className="absolute -top-1 left-[10%] z-10"
      />
      <WashiTape
        color="mustard"
        rotate={6}
        width={130}
        height={22}
        className="absolute -top-2 right-[12%] z-10"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎁</span>
              <span className="font-display text-2xl font-normal leading-none">
                temati<span className="italic text-gradient-primary">box</span>
              </span>
            </Link>
            <p className="font-hand text-xl text-primary/80 -rotate-[0.5deg] mb-2">
              hecho a mano · con el nombre del chico
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Imprimibles personalizados para el cumple, el cole y los regalos.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-normal text-text-primary mb-4">Explorar</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/temas" className="font-hand text-lg text-text-secondary hover:text-primary">
                  todos los temas
                </Link>
              </li>
              <li>
                <Link
                  href="/imprimibles"
                  className="font-hand text-lg text-text-secondary hover:text-primary"
                >
                  imprimibles digitales
                </Link>
              </li>
              <li>
                <Link
                  href="/buscar"
                  className="font-hand text-lg text-text-secondary hover:text-primary"
                >
                  buscar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-normal text-text-primary mb-4">Ayuda</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="font-hand text-lg text-text-secondary">preguntas frecuentes</span>
              </li>
              <li>
                <span className="font-hand text-lg text-text-secondary">contacto</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-normal text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="font-hand text-lg text-text-secondary">términos y condiciones</span>
              </li>
              <li>
                <span className="font-hand text-lg text-text-secondary">privacidad</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-text-primary/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Tematibox. Todos los derechos reservados.
          </p>
          <p className="font-hand text-base text-primary/70 -rotate-[0.5deg]">
            hecho en Buenos Aires ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
