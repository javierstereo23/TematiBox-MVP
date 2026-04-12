import type { Metadata } from "next";
import { getAlternates } from '@/lib/seo';
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Quote, TrendingUp, Shield, Target, BarChart3, Zap, Rocket } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import CaseLeadButton from "./CaseLeadButton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cases");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates('/casos-de-exito'),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
  };
}

/* ── Case study data with real metrics ──────────────────────── */
const caseStudies = [
  {
    id: "claro",
    company: "Operador Tier 1 — LATAM",
    country: "Latin America",
    heroMetric: "22%",
    heroMetricLabel: "conversión",
    icon: Target,
    color: "from-red-500/20 to-red-900/10",
    borderColor: "border-red-500/30",
    accentColor: "text-red-400",
    metrics: [
      { value: "24MM", key: "claroMetric1" },
      { value: "98%", key: "claroMetric2" },
      { value: "22%", key: "claroMetric3" },
    ],
  },
  {
    id: "movistar",
    company: "Operador líder — Chile",
    country: "Chile",
    heroMetric: "4%",
    heroMetricLabel: "CTR con AI",
    icon: Zap,
    color: "from-blue-500/20 to-blue-900/10",
    borderColor: "border-blue-500/30",
    accentColor: "text-blue-400",
    metrics: [
      { value: "4%", key: "movistarMetric1" },
      { value: "+67%", key: "movistarMetric2" },
      { value: "AI", key: "movistarMetric3" },
    ],
  },
  {
    id: "tigo",
    company: "Operador regional — Colombia",
    country: "Colombia",
    heroMetric: "98%",
    heroMetricLabel: "fraud-free",
    icon: Shield,
    color: "from-sky-500/20 to-sky-900/10",
    borderColor: "border-sky-500/30",
    accentColor: "text-sky-400",
    metrics: [
      { value: "+45MM", key: "tigoMetric1" },
      { value: "98%", key: "tigoMetric2" },
      { value: "+12%", key: "tigoMetric3" },
    ],
  },
  {
    id: "altice",
    company: "Operador multinacional — Caribe",
    country: "Rep. Dominicana",
    heroMetric: "7.8%",
    heroMetricLabel: "conversion rate",
    icon: BarChart3,
    color: "from-amber-500/20 to-amber-900/10",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-400",
    metrics: [
      { value: "7.8%", key: "alticeMetric1" },
      { value: "CPA", key: "alticeMetric2" },
      { value: "CTR", key: "alticeMetric3" },
    ],
  },
  {
    id: "mtn",
    company: "Operador — África Occidental",
    country: "Costa de Marfil",
    heroMetric: "2x",
    heroMetricLabel: "CTR",
    icon: TrendingUp,
    color: "from-yellow-500/20 to-yellow-900/10",
    borderColor: "border-yellow-500/30",
    accentColor: "text-yellow-400",
    metrics: [
      { value: "8.3%", key: "mtnMetric1" },
      { value: "97%", key: "mtnMetric2" },
      { value: "6MM", key: "mtnMetric3" },
    ],
  },
  {
    id: "cellc",
    company: "Operador — Sudáfrica",
    country: "South Africa",
    heroMetric: "€2M+",
    heroMetricLabel: "revenue anual",
    icon: Rocket,
    color: "from-amber-500/20 to-amber-900/10",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-400",
    metrics: [
      { value: "6M+", key: "cellcMetric1" },
      { value: "80%", key: "cellcMetric2" },
      { value: "€2M+", key: "cellcMetric3" },
      { value: "4", key: "cellcMetric4" },
    ],
  },
];

export default async function CasosDeExitoPage() {
  const t = await getTranslations("cases");

  const testimonials = [
    { quote: t("testimonial1"), name: "Director CVM", role: t("testimonial1Role"), company: "Claro" },
    { quote: t("testimonial2"), name: "Head of Digital", role: t("testimonial2Role"), company: "Tigo Colombia" },
    { quote: t("testimonial3"), name: "VP Digital Services", role: t("testimonial3Role"), company: "Altice" },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/8 rounded-full blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">
                {t("badge")}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t("heroTitle1")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime">
                  {t("heroTitle2")}
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                {t("heroDesc")}
              </p>
            </div>
          </RevealOnScroll>

          {/* Hero metric highlights */}
          <RevealOnScroll delay={0.2}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {caseStudies.map((c) => (
                <div key={c.id} className="text-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-lime">{c.heroMetric}</div>
                  <div className="text-xs text-white/60 mt-1">{c.company}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          {caseStudies.map((study, idx) => {
            const Icon = study.icon;
            return (
              <RevealOnScroll key={study.id} delay={0.05}>
                <div
                  className={`rounded-2xl border ${study.borderColor} bg-gradient-to-br ${study.color} to-transparent overflow-hidden`}
                >
                  <div className="p-8 lg:p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${study.accentColor}`} />
                        </div>
                        <div>
                          <h3 className="font-heading text-2xl font-bold text-white">{study.company}</h3>
                          <p className="text-sm text-white/60">{study.country}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="font-heading text-4xl font-bold text-lime">{study.heroMetric}</div>
                        <div className="text-xs text-white/60 uppercase tracking-wider">{study.heroMetricLabel}</div>
                      </div>
                    </div>

                    {/* Challenge / Solution / Results */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          {t("challengeLabel")}
                        </h4>
                        <p className="text-sm text-white/60 leading-relaxed">{t(`${study.id}Challenge`)}</p>
                      </div>

                      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {t("solutionLabel")}
                        </h4>
                        <p className="text-sm text-white/60 leading-relaxed">{t(`${study.id}Solution`)}</p>
                      </div>

                      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                          {t("resultsLabel")}
                        </h4>
                        <div className="space-y-3">
                          {study.metrics.map((m) => (
                            <div key={m.key} className="flex items-center gap-3">
                              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-lime/10 text-lime text-sm font-bold font-heading min-w-[56px] text-center">
                                {m.value}
                              </span>
                              <span className="text-xs text-white/60">{t(m.key)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Gate button */}
                    <div className="mt-6 pt-6 border-t border-white/[0.06]">
                      <CaseLeadButton caseId={study.id} caseName={study.company} />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 lg:py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-16">
              {t("testimonialsTitle")}
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <RevealOnScroll key={testimonial.name} delay={idx * 0.1}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-purple-500/40 mb-4 shrink-0" />
                  <p className="text-sm text-white/60 leading-relaxed flex-1 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <p className="font-heading font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-white/40">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-deep p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,42,206,0.15),transparent_70%)]" />
              <div className="relative">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  {t("ctaTitle")}
                </h2>
                <p className="text-white/60 max-w-xl mx-auto mb-8">{t("ctaDesc")}</p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t("ctaButton")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
