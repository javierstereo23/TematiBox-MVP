import type { Metadata } from "next";
import { getAlternates } from '@/lib/seo';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import RevealOnScroll from "@/components/RevealOnScroll";
import { blogPosts } from "@/data/blog-posts";
import BlogClient from "./BlogClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: getAlternates('/blog'),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const categories = [t("catAll"), "Omnichannel", "SAT Push", "AI & Data", "Channels", "Security", "Industry", "VAS", "Product"];

  return (
    <div className="min-h-screen">
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-purple-300 mb-6">
                <span className="w-6 h-[1.5px] bg-purple-400 rounded-full" />
                {t("badge")}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">{t("heroTitle1")}{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime">{t("heroTitle2")}</span></h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">{t("heroDesc")}</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <BlogClient
        locale={locale}
        posts={blogPosts}
        categories={categories}
        allLabel={t("catAll")}
        readArticleLabel={t("readArticle")}
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-deep p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,42,206,0.15),transparent_70%)]" />
              <div className="relative">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
                <p className="text-white/60 max-w-xl mx-auto mb-8">{t("ctaDesc")}</p>
                <Link href={`/${locale}/contacto`} className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5">{t("ctaButton")}<ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
