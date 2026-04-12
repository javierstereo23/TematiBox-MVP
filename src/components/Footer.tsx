import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-light bg-bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎁</span>
              <span className="text-lg font-bold tracking-tight">temati<span className="text-gradient-primary">box</span></span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">Combos tematicos para el cumple o regalo de tus hijos.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Explorar</h4>
            <ul className="space-y-2">
              <li><Link href="/temas" className="text-sm text-text-secondary hover:text-primary">Todos los temas</Link></li>
              <li><Link href="/temas?tipo=digital" className="text-sm text-text-secondary hover:text-primary">Imprimibles digitales</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Ayuda</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-text-secondary">Preguntas frecuentes</span></li>
              <li><span className="text-sm text-text-secondary">Contacto</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-text-secondary">Terminos y condiciones</span></li>
              <li><span className="text-sm text-text-secondary">Privacidad</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">(c) {new Date().getFullYear()} Tematibox. Todos los derechos reservados.</p>
          <p className="text-xs text-text-tertiary">Hecho en Buenos Aires</p>
        </div>
      </div>
    </footer>
  );
}
