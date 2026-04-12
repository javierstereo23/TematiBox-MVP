'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const posts = [
  {
    title: 'Orquestación omnicanal: cómo las Telcos líderes están multiplicando sus conversiones en 2026',
    excerpt:
      'Las operadoras que adoptan estrategias de orquestación omnicanal están logrando tasas de conversión hasta 3x superiores a las campañas de canal único.',
    category: 'Omnichannel',
    date: '28 Mar 2026',
    image: '/images/generated/journeys-hero.png',
    href: '/blog/orquestacion-omnicanal-telcos-conversiones-2026',  /* slug stays unaccented */
  },
  {
    title: '5 KPIs críticos para medir el rendimiento de tus campañas multicanal',
    excerpt:
      'Sin métricas claras, las campañas multicanal son un ejercicio de fe. Descubre los 5 KPIs que las Telcos más sofisticadas usan para medir y escalar.',
    category: 'AI & Data',
    date: '15 Mar 2026',
    image: '/images/generated/journeys-analytics.png',
    href: '/blog/5-kpis-criticos-campanas-multicanal',
  },
  {
    title: 'Customer Journey Mapping para Telcos: de la teoría a la automatización',
    excerpt:
      'Las Telcos que realmente transforman su relación con los suscriptores automatizan cada etapa del ciclo de vida con triggers inteligentes.',
    category: 'Omnichannel',
    date: '20 Feb 2026',
    image: '/images/generated/journeys-flow-builder.png',
    href: '/blog/customer-journey-mapping-telcos-automatizacion',  /* slug stays unaccented */
  },
];

export default function BlogPreview() {
  const t = useTranslations('blogPreview');
  const locale = useLocale();
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-purple-300 mb-4">
              <span className="w-6 h-[1.5px] bg-purple-400 rounded-full" />
              {t('tag')}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t('title')}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={`/${locale}/blog`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors group"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Link href={`/${locale}${post.href}`} className="group block">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/[0.04]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-purple-500/20 text-purple-200 backdrop-blur-sm border border-purple-500/20">
                    {post.category}
                  </span>
                </div>
                <span className="text-xs text-white/30 font-medium">{post.date}</span>
                <h3 className="font-heading text-lg font-bold text-white mt-2 mb-2 tracking-tight group-hover:text-purple-200 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
