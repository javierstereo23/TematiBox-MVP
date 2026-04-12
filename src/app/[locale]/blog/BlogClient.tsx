'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogPost } from '@/data/blog-posts';

function CategoryTag({ category }: { category: string }) {
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
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-medium border rounded-full ${
        colors[category] || 'text-white/60 bg-white/5 border-white/10'
      }`}
    >
      {category}
    </span>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface BlogClientProps {
  locale: string;
  posts: BlogPost[];
  categories: string[];
  allLabel: string;
  readArticleLabel: string;
}

export default function BlogClient({
  locale,
  posts,
  categories,
  allLabel,
  readArticleLabel,
}: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);

  const filteredPosts =
    activeCategory === allLabel
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Category filter */}
      <section className="py-8 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredPost.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/${locale}/blog/${featuredPost.slug}`}
                  className="group block"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-64 lg:h-auto min-h-[300px]">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center bg-white/[0.02]">
                        <div className="flex items-center gap-3 mb-4">
                          <CategoryTag category={featuredPost.category} />
                          <span className="text-xs text-white/50 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">
                            {formatDate(featuredPost.date)}
                          </span>
                          <span className="text-sm text-purple-400 group-hover:text-purple-300 flex items-center gap-1 transition-colors">
                            {readArticleLabel}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Grid posts */}
      {gridPosts.length > 0 && (
        <section className="py-8 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {gridPosts.map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="group block h-full"
                    >
                      <article className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden h-full flex flex-col hover:border-purple-500/30 transition-colors">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <CategoryTag category={post.category} />
                            <span className="text-xs text-white/50 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-heading font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-sm text-white/60 leading-relaxed flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs text-white/50">
                              {formatDate(post.date)}
                            </span>
                            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-white/50 text-lg">
              No hay artículos en esta categoría todavía.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
