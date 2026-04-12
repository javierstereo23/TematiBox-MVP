import type { Metadata } from "next";
import { getAlternates } from '@/lib/seo';
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Shield, Lock, Eye, Server, Globe, CheckCircle, ArrowRight, FileCheck, ShieldCheck, KeyRound } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("security");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates('/seguridad'),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
  };
}

export default async function SeguridadPage() {
  const t = await getTranslations("security");

  const securityFeatures = [
    { icon: Lock, title: t("feat1Title"), description: t("feat1Desc") },
    { icon: KeyRound, title: t("feat2Title"), description: t("feat2Desc") },
    { icon: Eye, title: t("feat3Title"), description: t("feat3Desc") },
    { icon: Shield, title: t("feat4Title"), description: t("feat4Desc") },
    { icon: Server, title: t("feat5Title"), description: t("feat5Desc") },
    { icon: FileCheck, title: t("feat6Title"), description: t("feat6Desc") },
  ];

  const complianceRegions = [
    { region: t("regionLatam"), items: ["LGPD (Brasil)", "Ley 25.326 (Argentina)", "Ley 19.628 (Chile)", "Ley 1581 (Colombia)", "Ley 29733 (Peru)"] },
    { region: t("regionEurope"), items: ["GDPR (EU)", "LOPDGDD (Espana)", "Ley 4624/2019 (Grecia)"] },
    { region: t("regionAfrica"), items: ["POPIA (Sudafrica)", "Data Protection Act (Ghana)", "Data Protection Law (Cote d'Ivoire)"] },
  ];

  const certifications = [
    { name: "ISO 27001", description: t("certISO") },
    { name: "SOC 2 Type II", description: t("certSOC") },
    { name: "PCI DSS", description: t("certPCI") },
    { name: "GSMA SAS", description: t("certGSMA") },
  ];

  const uptimeStats = [
    { value: "99.95%", label: t("uptimeSLA") },
    { value: "< 100ms", label: t("uptimeLatency") },
    { value: "24/7", label: t("uptimeMonitoring") },
    { value: "RPO 0", label: t("uptimeRPO") },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0"><Image src="/images/generated/security-shield.png" alt="Cybersecurity lock interface on dark background" fill sizes="100vw" className="object-cover opacity-[0.1]" priority /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">{t("badge")}</span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t("heroTitle1")}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime">{t("heroTitle2")}</span>
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">{t("heroDesc")}</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-4">{t("featuresTitle")}</h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">{t("featuresDesc")}</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.08}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-purple-500/30 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4"><feature.icon className="w-5 h-5 text-purple-400" /></div>
                  <h3 className="font-heading font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-y border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {uptimeStats.map((stat, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="text-center">
                  <div className="font-heading text-3xl md:text-4xl font-bold text-lime mb-2">{stat.value}</div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-4">{t("complianceTitle")}</h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">{t("complianceDesc")}</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complianceRegions.map((r, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 h-full">
                  <div className="flex items-center gap-2 mb-5"><Globe className="w-5 h-5 text-purple-400" /><h3 className="font-heading font-semibold text-white">{r.region}</h3></div>
                  <ul className="space-y-3">
                    {r.items.map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-white/60"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />{item}</li>))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll><h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-16">{t("certsTitle")}</h2></RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center hover:border-purple-500/30 transition-colors h-full">
                  <ShieldCheck className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-white text-lg mb-1">{cert.name}</h3>
                  <p className="text-sm text-white/60">{cert.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-deep p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,42,206,0.15),transparent_70%)]" />
              <div className="relative">
                <Shield className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
                <p className="text-white/60 max-w-xl mx-auto mb-8">{t("ctaDesc")}</p>
                <Link href="/contacto" className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5">
                  {t("ctaButton")}<ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
