'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/* ── Inline SVG wordmark logos for each telco client ──────── */
function ClaroLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="16" cy="20" r="5" fill="currentColor" />
      <text x="38" y="27" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" fill="currentColor">claro</text>
    </svg>
  );
}

function TigoLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="30" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="28" fill="currentColor">tigo</text>
      <rect x="80" y="6" width="8" height="8" rx="4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function TelefonicaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="20" r="4" fill="currentColor" />
      <text x="32" y="27" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="18" fill="currentColor">Telefónica</text>
    </svg>
  );
}

function MTNLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="30" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="30" letterSpacing="2" fill="currentColor">MTN</text>
    </svg>
  );
}

function WOMLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="30" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" letterSpacing="3" fill="currentColor">WOM</text>
    </svg>
  );
}

function AlticeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="28" fontFamily="Arial, sans-serif" fontWeight="300" fontSize="24" letterSpacing="4" fill="currentColor">altice</text>
    </svg>
  );
}

function CellCLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" fill="currentColor">Cell C</text>
    </svg>
  );
}

function EntelLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" fill="currentColor">entel</text>
      <circle cx="96" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const logoComponents = [
  { name: 'Claro', Logo: ClaroLogo },
  { name: 'Tigo', Logo: TigoLogo },
  { name: 'Telefónica', Logo: TelefonicaLogo },
  { name: 'MTN', Logo: MTNLogo },
  { name: 'WOM', Logo: WOMLogo },
  { name: 'Altice', Logo: AlticeLogo },
  { name: 'Cell C', Logo: CellCLogo },
  { name: 'Entel', Logo: EntelLogo },
];

export default function LogoBar() {
  const t = useTranslations('logoBar');
  /* Triple the array for seamless infinite loop */
  const tripled = [...logoComponents, ...logoComponents, ...logoComponents];

  return (
    <section className="relative border-t border-white/[0.06] py-14 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6 lg:px-8 mb-10"
      >
        <p className="text-center text-sm font-medium uppercase tracking-wider text-white/65">
          {t('label')}
        </p>
      </motion.div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-deep via-deep/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-deep via-deep/80 to-transparent z-10" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {tripled.map(({ name, Logo }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 mx-6 sm:mx-12 flex items-center justify-center group"
            >
              <Logo
                className="h-[40px] w-auto text-white/20 transition-all duration-500 group-hover:text-white/70 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
