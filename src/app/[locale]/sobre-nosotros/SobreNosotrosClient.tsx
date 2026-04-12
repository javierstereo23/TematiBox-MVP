"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Rocket,
  Users,
  MessageCircle,
  Heart,
  TrendingUp,
  Lightbulb,
  Target,
  Smile,
  ArrowRight,
  MapPin,
  Briefcase,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "+",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-lime tabular-nums"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {prefix}
          {value}
          {suffix}
        </motion.span>
      ) : (
        <span className="invisible">
          {prefix}
          {value}
          {suffix}
        </span>
      )}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline milestone component                                       */
/* ------------------------------------------------------------------ */
function TimelineMilestone({
  year,
  title,
  description,
  index,
  isLast,
}: {
  year: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content card */}
      <motion.div
        className={`flex-1 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
        initial={{
          opacity: 0,
          x: isEven ? -50 : 50,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isEven ? -50 : 50 }
        }
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className={`inline-block rounded-xl border bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-white/[0.05] ${
            isLast
              ? "border-lime/30 shadow-[0_0_20px_rgba(205,255,0,0.08)]"
              : "border-white/10"
          }`}
        >
          <h3 className="font-heading text-lg font-bold text-white mb-1.5">
            {title}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">{description}</p>
        </div>
      </motion.div>

      {/* Center dot + year */}
      <motion.div
        className="hidden md:flex flex-col items-center z-10 shrink-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-sm border-2 ${
            isLast
              ? "bg-lime/20 border-lime text-lime shadow-[0_0_24px_rgba(205,255,0,0.3)]"
              : "bg-purple-500/20 border-purple-500/50 text-purple-300"
          }`}
        >
          {year}
        </div>
      </motion.div>

      {/* Mobile year badge */}
      <motion.div
        className={`md:hidden flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-xs border-2 ${
          isLast
            ? "bg-lime/20 border-lime text-lime"
            : "bg-purple-500/20 border-purple-500/50 text-purple-300"
        }`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {year}
      </motion.div>

      {/* Spacer for the other side */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main client component                                              */
/* ------------------------------------------------------------------ */
export default function SobreNosotrosClient({ locale }: { locale: string }) {
  const t = useTranslations("about");
  const contactHref = `/${locale}/contacto`;
  const careersHref = `/${locale}/careers`;

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  const milestones = [
    { year: "2013", titleKey: "timeline2013Title", descKey: "timeline2013Desc" },
    { year: "2015", titleKey: "timeline2015Title", descKey: "timeline2015Desc" },
    { year: "2017", titleKey: "timeline2017Title", descKey: "timeline2017Desc" },
    { year: "2019", titleKey: "timeline2019Title", descKey: "timeline2019Desc" },
    { year: "2022", titleKey: "timeline2022Title", descKey: "timeline2022Desc" },
    { year: "2024", titleKey: "timeline2024Title", descKey: "timeline2024Desc" },
    { year: "2025", titleKey: "timeline2025Title", descKey: "timeline2025Desc" },
  ];

  const values = [
    { icon: Rocket, titleKey: "value1Title", descKey: "value1Desc" },
    { icon: Users, titleKey: "value2Title", descKey: "value2Desc" },
    { icon: MessageCircle, titleKey: "value3Title", descKey: "value3Desc" },
    { icon: Heart, titleKey: "value4Title", descKey: "value4Desc" },
    { icon: TrendingUp, titleKey: "value5Title", descKey: "value5Desc" },
    { icon: Lightbulb, titleKey: "value6Title", descKey: "value6Desc" },
    { icon: Target, titleKey: "value7Title", descKey: "value7Desc" },
    { icon: Smile, titleKey: "value8Title", descKey: "value8Desc" },
  ];

  const leaders = [
    {
      nameKey: "leader1Name",
      roleKey: "leader1Role",
      descKey: "leader1Desc",
      initials: "JB",
      photo: "/images/team/javier-badaracco.jpg",
      gradient: "from-purple-500 to-purple-700",
      glow: "group-hover:shadow-purple-500/30",
    },
    {
      nameKey: "leader2Name",
      roleKey: "leader2Role",
      descKey: "leader2Desc",
      initials: "AB",
      photo: "/images/team/andres-boffa.jpg",
      gradient: "from-blue-500 to-blue-700",
      glow: "group-hover:shadow-blue-500/30",
    },
    {
      nameKey: "leader3Name",
      roleKey: "leader3Role",
      descKey: "leader3Desc",
      initials: "MG",
      photo: "/images/team/marife-gayo.jpg",
      gradient: "from-pink-500 to-rose-700",
      glow: "group-hover:shadow-pink-500/30",
    },
    {
      nameKey: "leader4Name",
      roleKey: "leader4Role",
      descKey: "leader4Desc",
      initials: "JB",
      photo: "/images/team/juan-bernal.jpg",
      gradient: "from-teal-500 to-teal-700",
      glow: "group-hover:shadow-teal-500/30",
    },
    {
      nameKey: "leader5Name",
      roleKey: "leader5Role",
      descKey: "leader5Desc",
      initials: "CS",
      photo: "/images/team/carolina-sequeira.jpg",
      gradient: "from-fuchsia-500 to-pink-700",
      glow: "group-hover:shadow-fuchsia-500/30",
    },
  ];

  const team = [
    {
      nameKey: "team1Name",
      roleKey: "team1Role",
      initials: "SS",
      photo: "/images/team/segundo-salvadores.jpg",
      gradient: "from-green-500 to-green-600",
    },
    {
      nameKey: "team2Name",
      roleKey: "team2Role",
      initials: "AF",
      photo: "/images/team/agustina-falcone.jpg",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      nameKey: "team3Name",
      roleKey: "team3Role",
      initials: "AS",
      photo: "/images/team/alex-sequeira.jpg",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      nameKey: "team4Name",
      roleKey: "team4Role",
      initials: "NS",
      photo: "/images/team/nelson-seade.jpg",
      gradient: "from-indigo-500 to-violet-600",
    },
    {
      nameKey: "team5Name",
      roleKey: "team5Role",
      initials: "EG",
      photo: "/images/team/ezequiel-guardia.jpg",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      nameKey: "team6Name",
      roleKey: "team6Role",
      initials: "BZ",
      photo: "/images/team/belen-seolla.jpg",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      nameKey: "team7Name",
      roleKey: "team7Role",
      initials: "LO",
      photo: "/images/team/lautaro-ogando.jpg",
      gradient: "from-rose-500 to-red-600",
    },
  ];

  const regions = [
    {
      nameKey: "regionLatam",
      countries: [
        "Argentina",
        "Chile",
        "Peru",
        "Bolivia",
        "Colombia",
        "Brasil",
        "Uruguay",
        "Centroamerica",
        "Rep. Dominicana",
      ],
    },
    {
      nameKey: "regionAfrica",
      countries: ["Ghana", "Costa de Marfil", "Rep. del Congo", "Sudafrica"],
    },
    {
      nameKey: "regionEurope",
      countries: ["Espana", "Grecia"],
    },
  ];

  const stats = [
    { value: 100, suffix: "", label: t("statClients") },
    { value: 500, suffix: "M", label: t("statUsers") },
    { value: 15, suffix: "", label: t("statCountries") },
    { value: 12, suffix: "", label: t("statYears") },
    { value: 30, suffix: "", label: t("statProfessionals") },
    { value: 9, suffix: "", label: t("statNps") },
  ];

  return (
    <div className="min-h-screen">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative py-28 lg:py-40 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/about-global.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.12]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-deep/80 to-deep" />
        {/* Decorative radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                {t("heroTag")}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                {t("heroTitle1")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-lime">
                  {t("heroTitle2")}
                </span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl font-body">
                {t("heroSubtitle")}
              </p>
            </div>
          </RevealOnScroll>

          {/* Stats bar */}
          <RevealOnScroll delay={0.3}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl">
              {[
                { val: "+100", label: t("heroStat1") },
                { val: "+500M", label: t("heroStat2") },
                { val: "+15", label: t("heroStat3") },
                { val: "+12", label: t("heroStat4") },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-lime">
                    {stat.val}
                  </div>
                  <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ORIGIN STORY                                                */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealOnScroll>
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-purple-300 border border-purple-500/30 rounded-full mb-6">
                  {t("originTag")}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                  {t("originTitle")}
                </h2>
                <div className="space-y-5 text-white/60 leading-relaxed text-base md:text-lg font-body">
                  <p>{t("originP1")}</p>
                  <p>{t("originP2")}</p>
                  <p>{t("originP3")}</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2} direction="right">
              <div className="space-y-4">
                <div className="relative rounded-2xl border border-white/10 overflow-hidden aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/QnuDNSFQUss"
                    title="DYNAMO — Conoce nuestra oficina"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-lime shrink-0" />
                  <span>{t("originLocation")}</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TIMELINE                                                    */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/[0.04] blur-[100px]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <RevealOnScroll>
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-purple-300 border border-purple-500/30 rounded-full mb-6">
                {t("timelineTag")}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t("timelineTitle")}
              </h2>
            </div>
          </RevealOnScroll>

          {/* Timeline container */}
          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Vertical line - desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <div className="absolute inset-0 bg-white/[0.06]" />
              <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 to-lime origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            {/* Vertical line - mobile */}
            <div className="md:hidden absolute left-7 top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-white/[0.06]" />
              <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 to-lime origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-12 md:space-y-16">
              {milestones.map((m, idx) => (
                <TimelineMilestone
                  key={m.year}
                  year={m.year}
                  title={t(m.titleKey)}
                  description={t(m.descKey)}
                  index={idx}
                  isLast={idx === milestones.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  VALUES                                                      */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-32 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-purple-300 border border-purple-500/30 rounded-full mb-6">
                {t("valuesTag")}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t("valuesTitle")}
              </h2>
              <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-3xl mx-auto italic">
                &ldquo;{t("valuesQuote")}&rdquo;
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <RevealOnScroll key={val.titleKey} delay={idx * 0.08}>
                <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-7 h-full transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/[0.05]">
                  <div className="w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 transition-colors group-hover:bg-purple-500/20">
                    <val.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">
                    {t(val.titleKey)}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed font-body">
                    {t(val.descKey)}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LEADERSHIP                                                  */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-32 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-purple-300 border border-purple-500/30 rounded-full mb-6">
                {t("leadershipTag")}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t("leadershipTitle")}
              </h2>
            </div>
          </RevealOnScroll>

          {/* Leadership row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto mb-20">
            {leaders.map((leader, idx) => (
              <RevealOnScroll key={leader.nameKey} delay={idx * 0.1}>
                <div className="group text-center">
                  <div className="relative mx-auto mb-5 w-28 h-28">
                    <div
                      className={`absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500 bg-gradient-to-br ${leader.gradient} ${leader.glow} group-hover:opacity-40`}
                    />
                    <div
                      className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${leader.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 overflow-hidden`}
                    >
                      {/* Photo or initials fallback */}
                      <Image
                        src={leader.photo}
                        alt={leader.initials}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                      />
                      <span className="hidden font-heading text-2xl font-bold text-white absolute inset-0 flex items-center justify-center">
                        {leader.initials}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-white text-lg">
                    {t(leader.nameKey)}
                  </h3>
                  <p className="text-sm text-lime/80 mt-1 font-medium">
                    {t(leader.roleKey)}
                  </p>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed font-body">
                    {t(leader.descKey)}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Team row */}
          <RevealOnScroll>
            <div className="text-center mb-10">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white/80">
                {t("teamTitle")}
              </h3>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <RevealOnScroll key={member.nameKey} delay={idx * 0.08}>
                <div className="group text-center">
                  <div className="relative mx-auto mb-4 w-20 h-20">
                    <div
                      className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 overflow-hidden`}
                    >
                      <Image
                        src={member.photo}
                        alt={member.initials}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                      />
                      <span className="hidden font-heading text-lg font-bold text-white absolute inset-0 flex items-center justify-center">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-heading font-semibold text-white text-sm">
                    {t(member.nameKey)}
                  </h4>
                  <p className="text-xs text-white/60 mt-1">
                    {t(member.roleKey)}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GLOBAL PRESENCE                                             */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/about-global.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.06]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/95 to-deep" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">
                <MapPin className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                {t("presenceTag")}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t("presenceTitle")}
              </h2>
            </div>
          </RevealOnScroll>

          {/* Stylized map: abstract dot grid */}
          <RevealOnScroll delay={0.1}>
            <div className="mb-16 flex justify-center">
              <div className="relative w-full max-w-3xl h-48 md:h-64 rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
                {/* Abstract representation using positioned dots for continents */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* LATAM cluster */}
                  <div className="absolute left-[22%] top-[45%]">
                    <div className="w-2.5 h-2.5 rounded-full bg-lime/60 animate-pulse" />
                    <div className="absolute -top-3 -left-2 w-2 h-2 rounded-full bg-purple-400/40" />
                    <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-purple-400/30" />
                    <div className="absolute top-5 -left-1 w-2 h-2 rounded-full bg-lime/30" />
                    <div className="absolute -top-1 left-5 w-1.5 h-1.5 rounded-full bg-purple-400/40" />
                    <div className="absolute top-3 -left-4 w-1.5 h-1.5 rounded-full bg-lime/25" />
                    <div className="absolute -top-5 left-2 w-1.5 h-1.5 rounded-full bg-purple-300/30" />
                    <div className="absolute top-6 left-4 w-1.5 h-1.5 rounded-full bg-lime/20" />
                    <div className="absolute top-1 left-8 w-1.5 h-1.5 rounded-full bg-purple-400/25" />
                  </div>
                  {/* Africa cluster */}
                  <div className="absolute left-[55%] top-[40%]">
                    <div className="w-2 h-2 rounded-full bg-lime/50 animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="absolute top-3 left-2 w-1.5 h-1.5 rounded-full bg-purple-400/40" />
                    <div className="absolute -top-2 left-3 w-1.5 h-1.5 rounded-full bg-lime/30" />
                    <div className="absolute top-5 -left-1 w-1.5 h-1.5 rounded-full bg-purple-300/30" />
                  </div>
                  {/* Europe cluster */}
                  <div className="absolute left-[52%] top-[25%]">
                    <div className="w-2 h-2 rounded-full bg-lime/50 animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute top-1 left-3 w-1.5 h-1.5 rounded-full bg-purple-400/30" />
                  </div>
                  {/* Connecting lines (subtle) */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="24"
                      y1="47"
                      x2="55"
                      y2="42"
                      stroke="url(#grad1)"
                      strokeWidth="0.15"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1="55"
                      y1="42"
                      x2="53"
                      y2="27"
                      stroke="url(#grad1)"
                      strokeWidth="0.15"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1="24"
                      y1="47"
                      x2="53"
                      y2="27"
                      stroke="url(#grad1)"
                      strokeWidth="0.1"
                      strokeDasharray="2 2"
                    />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B2ACE" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#CDFF00" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                {/* Labels */}
                <div className="absolute left-[12%] bottom-[20%] text-[10px] text-purple-300/60 font-heading font-medium">
                  LATAM
                </div>
                <div className="absolute left-[50%] bottom-[25%] text-[10px] text-purple-300/60 font-heading font-medium">
                  AFRICA
                </div>
                <div className="absolute left-[48%] top-[12%] text-[10px] text-purple-300/60 font-heading font-medium">
                  EUROPA
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Region cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((region, idx) => (
              <RevealOnScroll key={region.nameKey} delay={idx * 0.12}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 h-full hover:border-purple-500/20 transition-colors">
                  <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime" />
                    {t(region.nameKey)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.map((country) => (
                      <span
                        key={country}
                        className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/50"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NUMBERS                                                     */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-32 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-16">
              {t("numbersTitle")}
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <RevealOnScroll key={stat.label} delay={idx * 0.08}>
                <div className="text-center">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                  <p className="text-sm text-white/60 mt-2 font-body">
                    {stat.label}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative rounded-2xl border border-white/10 overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-deep to-deep" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,42,206,0.2),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(205,255,0,0.05),transparent_60%)]" />

              <div className="relative p-10 md:p-16 lg:p-20 text-center">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {t("ctaTitle")}
                </h2>
                <p className="text-white/45 max-w-xl mx-auto mb-10 text-lg font-body">
                  {t("ctaSubtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={contactHref}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5 text-sm"
                  >
                    {t("ctaDemo")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={careersHref}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-200 text-sm"
                  >
                    <Briefcase className="w-4 h-4" />
                    {t("ctaCareers")}
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
