import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import RevealOnScroll from '@/components/RevealOnScroll';
import { routing } from '@/i18n/routing';
import { getAlternates } from '@/lib/seo';
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
  getAllBlogSlugs,
} from '@/data/blog-posts';

/* ─── i18n texts ─── */
const texts = {
  es: {
    postNotFound: 'Post no encontrado | DYNAMO',
    backToBlog: 'Volver al blog',
    wantToKnowMore: '¿Quieres saber más?',
    ctaDescription:
      'Agenda una demo personalizada y descubre cómo DYNAMO puede transformar la comunicación con tus clientes.',
    bookDemo: 'Agendar una demo',
    relatedArticles: 'Artículos relacionados',
    readArticle: 'Leer artículo',
  },
  en: {
    postNotFound: 'Post not found | DYNAMO',
    backToBlog: 'Back to blog',
    wantToKnowMore: 'Want to know more?',
    ctaDescription:
      'Book a personalized demo and discover how DYNAMO can transform the way you communicate with your customers.',
    bookDemo: 'Book a demo',
    relatedArticles: 'Related articles',
    readArticle: 'Read article',
  },
  fr: {
    postNotFound: 'Article introuvable | DYNAMO',
    backToBlog: 'Retour au blog',
    wantToKnowMore: 'Vous voulez en savoir plus\u00a0?',
    ctaDescription:
      'Réservez une démo personnalisée et découvrez comment DYNAMO peut transformer la communication avec vos clients.',
    bookDemo: 'Réserver une démo',
    relatedArticles: 'Articles connexes',
    readArticle: "Lire l'article",
  },
  pt: {
    postNotFound: 'Post não encontrado | DYNAMO',
    backToBlog: 'Voltar ao blog',
    wantToKnowMore: 'Quer saber mais?',
    ctaDescription:
      'Agende uma demo personalizada e descubra como a DYNAMO pode transformar a comunicação com seus clientes.',
    bookDemo: 'Agendar uma demo',
    relatedArticles: 'Artigos relacionados',
    readArticle: 'Ler artigo',
  },
} as const;

type SupportedLocale = keyof typeof texts;

function t(locale: string) {
  return texts[(locale as SupportedLocale)] || texts.es;
}

/* ─── Static Params ─── */
export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: t(locale).postNotFound };
  return {
    title: `${post.title} | DYNAMO Blog`,
    description: post.excerpt,
    alternates: getAlternates('/blog/' + slug),
  };
}

/* ─── Category color helper ─── */
function categoryColors(category: string) {
  const colors: Record<string, string> = {
    Omnichannel: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    'SAT Push': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    'AI & Data': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    Industry: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Product: 'text-lime bg-lime/10 border-lime/20',
    Security: 'text-red-400 bg-red-500/10 border-red-500/20',
    Channels: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    VAS: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };
  return colors[category] || 'text-white/60 bg-white/5 border-white/10';
}

const dateLocaleMap: Record<string, string> = {
  es: 'es-AR',
  en: 'en-US',
  fr: 'fr-FR',
  pt: 'pt-BR',
};

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(dateLocaleMap[locale] || 'es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/* ─── Page ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug, 3);
  const paragraphs = post.content.split('\n\n').filter(Boolean);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `https://dynamo.tech${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'DYNAMO',
      url: 'https://dynamo.tech',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DYNAMO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dynamo.tech/images/dynamo-logo.svg',
      },
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <RevealOnScroll>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t(locale).backToBlog}
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span
                className={`inline-block px-2.5 py-0.5 text-xs font-medium border rounded-full ${categoryColors(
                  post.category
                )}`}
              >
                {post.category}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date, locale)}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>

            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">{post.author}</p>
                <p className="text-xs text-white/40">dynamo.tech</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-4 mb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <RevealOnScroll>
            <article className="prose-custom">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-white/70 text-base leading-[1.85] mb-6 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </article>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-deep p-8 lg:p-10 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,42,206,0.15),transparent_70%)]" />
              <div className="relative">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                  {t(locale).wantToKnowMore}
                </h2>
                <p className="text-white/60 max-w-md mx-auto mb-6 text-sm">
                  {t(locale).ctaDescription}
                </p>
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t(locale).bookDemo}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 lg:py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <RevealOnScroll>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-10">
                {t(locale).relatedArticles}
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <RevealOnScroll key={rp.slug}>
                  <Link
                    href={`/${locale}/blog/${rp.slug}`}
                    className="group block h-full"
                  >
                    <article className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden h-full flex flex-col hover:border-purple-500/30 transition-colors">
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={rp.image}
                          alt={rp.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-medium border rounded-full ${categoryColors(
                              rp.category
                            )}`}
                          >
                            {rp.category}
                          </span>
                          <span className="text-[10px] text-white/30">
                            {formatDate(rp.date, locale)}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-white text-sm mb-2 group-hover:text-purple-300 transition-colors leading-snug">
                          {rp.title}
                        </h3>
                        <p className="text-xs text-white/60 leading-relaxed line-clamp-2 flex-1">
                          {rp.excerpt}
                        </p>
                        <div className="mt-3 pt-3 border-t border-white/[0.06]">
                          <span className="text-xs text-purple-400 group-hover:text-purple-300 flex items-center gap-1 transition-colors">
                            {t(locale).readArticle}
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
