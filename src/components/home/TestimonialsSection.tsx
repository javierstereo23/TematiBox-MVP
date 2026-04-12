'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    quote:
      'Dynamo ha sido aliado de WOM desde su llegada a Colombia y de manera conjunta se ha trabajado, logrando resultados consistentes en áreas como experiencia y rentabilización.',
    name: 'Tomás Velázquez',
    role: 'Gerente CVM',
    company: 'WOM Colombia',
    photo: '/images/testimonials/tomas-velazquez.svg',
  },
  {
    quote:
      'Dynamo es un excelente aliado para cualquier compañía. Su capacidad de respuesta, siempre dispuestos a ayudar, a buscar soluciones, su perspectiva de innovación y su indiscutible conocimiento de las herramientas tecnológicas los hacen el partner perfecto.',
    name: 'Julián Tamayo Arias',
    role: 'Product Manager, Prepaid Segment',
    company: 'Tigo',
    photo: '/images/testimonials/julian-tamayo.png',
  },
  {
    quote:
      'Dynamo ofrece un excelente servicio, especialmente en atención y soporte al cliente, que destaca por su alta calidad. Siempre están ahí para respaldarte y ofrecer soluciones rápidas ante cualquier imprevisto.',
    name: 'Rosanna Ferreira Casado',
    role: 'Lealtad de Clientes y Servicio de Valor Agregado Marketing B2C',
    company: 'Altice',
    photo: '/images/testimonials/rosanna-ferreira.jpg',
  },
];

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-purple-300 mb-4">
            <span className="w-6 h-[1.5px] bg-purple-400 rounded-full" />
            {t('tag')}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-8 flex flex-col hover:border-purple-500/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              {/* Quote mark */}
              <span className="absolute top-6 right-6 text-5xl font-serif text-purple-500/10 leading-none select-none">
                &ldquo;
              </span>

              <p className="text-base sm:text-sm text-white/75 leading-relaxed flex-1 mb-8 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                {/* Real photo */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[15px] sm:text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-[13px] sm:text-xs text-white/60 leading-snug">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-purple-300/60 font-medium mt-0.5">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
