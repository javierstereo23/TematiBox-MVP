import Link from "next/link";
import { themes } from "@/data/themes";
import { ThemeCard } from "@/components/ThemeCard";

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-bg via-bg to-bg" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl" />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-white border border-border-light shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-sm font-medium text-text-secondary">Envio gratis en CABA y GBA . Digital al instante</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-text-primary mb-6 leading-[1.08]">
          Su tema favorito,<br />
          <span className="text-gradient-primary">listo para festejar</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Combos tematicos para el cumple o regalo de tus hijos. De Stranger Things a Bluey, fisicos o digitales, todo en un solo lugar.
        </p>
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" placeholder="Que le gusta? Busca un tema..." className="w-full pl-12 pr-6 py-4 rounded-2xl bg-bg-white border border-border text-text-primary placeholder:text-text-tertiary text-base shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-text-tertiary mr-1">Populares:</span>
          {themes.filter((t) => t.popular).slice(0, 6).map((t) => (
            <Link key={t.slug} href={`/temas/${t.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-bg-white border border-border-light text-sm font-medium text-text-secondary hover:border-primary hover:text-primary hover:bg-primary-bg transition-all">
              <span>{t.emoji}</span>
              <span>{t.name}</span>
              {t.trending && <span className="text-[10px] font-bold text-accent-pink">Trending</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingBanner() {
  const trending = themes.filter((t) => t.trending);
  return (
    <section className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🔥</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">Tendencia ahora</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trending.map((t, i) => <ThemeCard key={t.slug} theme={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function FeaturedThemes() {
  const popular = themes.filter((t) => t.popular && !t.trending);
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">Temas clasicos que siempre funcionan</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Los mas elegidos por papas y mamas. Cada combo tiene todo lo necesario.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((theme, i) => <ThemeCard key={theme.slug} theme={theme} index={i} />)}
        </div>
        <div className="text-center mt-10">
          <Link href="/temas" className="btn-secondary">Ver todos los temas</Link>
        </div>
      </div>
    </section>
  );
}

function DigitalSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full mb-4">NUEVO . DIGITAL</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">Imprimibles al instante</h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">Lo necesitas para mañana? Descarga el kit digital y recibilo al toque por email. Libro para colorear, cotillon imprimible, banderines y toppers. Todo en PDF.</p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-sm text-text-secondary"><span className="text-green-500">✓</span> Descarga instantanea</li>
              <li className="flex items-center gap-2 text-sm text-text-secondary"><span className="text-green-500">✓</span> Imprimi las veces que quieras</li>
              <li className="flex items-center gap-2 text-sm text-text-secondary"><span className="text-green-500">✓</span> Hasta 60% mas barato</li>
            </ul>
            <Link href="/temas?tipo=digital" className="btn-primary">Ver imprimibles</Link>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {themes.slice(0, 4).map((t) => (
                <div key={t.slug} className={`aspect-square rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-lg`}>
                  <span className="text-5xl">{t.emoji}</span>
                </div>
              ))}
            </div>
            <div className="absolute -top-4 -right-4 bg-bg-white rounded-full px-4 py-2 shadow-lg border border-border-light">
              <span className="text-sm font-bold text-primary">Desde $3.500</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: "01", emoji: "🔍", title: "Elegi el tema", description: "Busca lo que le gusta a tu hijo." },
    { number: "02", emoji: "📦", title: "Arma tu combo", description: "Fiesta, Regalo, Completo o Digital. Vos elegis." },
    { number: "03", emoji: "🚀", title: "Recibilo en casa", description: "Digital al instante, fisico en 24hs." },
  ];
  return (
    <section id="como-funciona" className="py-20 px-6 bg-bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">Asi de facil</h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">En 3 pasos tenes todo resuelto.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-primary-bg flex items-center justify-center">
                <span className="text-4xl">{step.emoji}</span>
              </div>
              <div className="text-xs font-bold text-primary mb-2">PASO {step.number}</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-purple-900 p-10 md:p-16 text-center">
          <div className="relative">
            <span className="text-5xl mb-4 block">🎉</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Listo para armar el mejor cumple?</h2>
            <p className="text-lg text-white/80 max-w-lg mx-auto mb-8">Elegi un tema y sorprende a tu hijo.</p>
            <Link href="/temas" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-base rounded-2xl hover:bg-gray-50 transition-colors shadow-lg">Explorar temas</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrendingBanner />
      <FeaturedThemes />
      <DigitalSection />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
