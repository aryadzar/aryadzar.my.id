"use client";

import { Skill } from "@/types/skillType";
import {
  fallbackSkills,
  CATEGORY_ORDER,
  type FallbackSkill,
} from "@/constants/skills-data";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { stegaClean } from "next-sanity";

interface SkillsPageProps {
  skillsData: Skill[];
  locale: string;
}

export default function SkillsPage({ skillsData, locale }: SkillsPageProps) {
  const t = useTranslations("skillsPage");
  const prefersReducedMotion = useReducedMotion();
  const items = skillsData || [];

  const grouped = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: t(cat),
    items: items.filter((i) => stegaClean(i.category) === cat),
  })).filter((g) => g.items.length > 0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  } as const;

  const cardVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  } as const;

  const itemVariant = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  } as const;

  return (
    <main className="min-h-[60vh]">
      {/* Header */}
      <header className="max-w-5xl px-4 pt-28 pb-4 mx-auto md:px-6 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-lg text-pretty text-muted-foreground max-w-2xl">
            {t("description")}
          </p>
        </motion.div>
      </header>

      {/* Category Grid */}
      <section className="max-w-5xl px-4 py-10 mx-auto md:px-6 md:py-14">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:gap-10"
        >
          {grouped.map((group, gi) => (
            <motion.div key={group.key} variants={cardVariant}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${getCategoryColor(group.key)}15, ${getCategoryColor(group.key)}30)`,
                    border: `1px solid ${getCategoryColor(group.key)}25`,
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: getCategoryColor(group.key) }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {getCategoryIcon(group.key)}
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {group.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {group.items.length}{" "}
                    {group.items.length === 1 ? "technology" : "technologies"}
                  </p>
                </div>
              </div>

              {/* Tech Items Grid */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {group.items.map((item, idx) => {
                  const cleanColor = stegaClean(item.color);
                  const cleanIconUrl = stegaClean(item.iconUrl);
                  const cleanSvgPath = stegaClean((item as any).svgPath);

                  return (
                    <motion.div
                      key={item._id ?? `${group.key}-${idx}`}
                      variants={itemVariant}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="group relative flex flex-col items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 cursor-default"
                    >
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        style={{
                          background: `radial-gradient(circle at center, ${cleanColor}08 0%, transparent 70%)`,
                        }}
                      />

                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${cleanColor}12, ${cleanColor}22)`,
                          border: `1px solid ${cleanColor}20`,
                        }}
                      >
                        {cleanIconUrl ? (
                          <img src={cleanIconUrl} alt={item.name} className="w-6 h-6 object-contain" />
                        ) : cleanSvgPath ? (
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill={cleanColor}>
                            <path d={cleanSvgPath} />
                          </svg>
                        ) : (
                          <div className="w-6 h-6 rounded-md" style={{ backgroundColor: cleanColor }} />
                        )}
                      </div>

                      {/* biarkan ber-stega agar overlay edit aktif */}
                      <span className="text-sm font-medium text-center leading-tight text-foreground/90 group-hover:text-foreground transition-colors">
                        {item.name}
                      </span>

                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-8 rounded-full transition-all duration-300"
                        style={{ backgroundColor: cleanColor }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    frontend: "#61DAFB",
    backend: "#FF2D20",
    database: "#4169E1",
    tools: "#F05032",
  };
  return colors[category] ?? "#888888";
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "frontend":
      return (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </>
      );
    case "backend":
      return (
        <>
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </>
      );
    case "tools":
      return (
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      );
    default:
      return <circle cx="12" cy="12" r="10" />;
  }
}
