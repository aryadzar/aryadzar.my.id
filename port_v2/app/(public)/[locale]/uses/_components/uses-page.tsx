"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { stegaClean } from "next-sanity";
import { UsesItem } from "@/types/usesType";
import { USES_CATEGORY_ORDER } from "@/constants/uses-data";
import { ExternalLink } from "lucide-react";

interface UsesPageProps {
  usesData: UsesItem[];
  locale: string;
}

export default function UsesPage({ usesData, locale }: UsesPageProps) {
  const t = useTranslations("usesPage");
  const prefersReducedMotion = useReducedMotion();
  const items = usesData || [];

  const grouped = USES_CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: t(cat),
    items: items.filter((i) => stegaClean(i.category) === cat),
  })).filter((g) => g.items.length > 0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  } as const;

  const sectionVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  } as const;

  const itemVariant = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -16 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
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

      {/* Uses Sections */}
      <section className="max-w-5xl px-4 py-10 mx-auto md:px-6 md:py-14">
        <div className="space-y-16">
          {grouped.map((group, gi) => (
            <motion.div
              key={group.key}
              variants={sectionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/80 border border-border/50">
                  <svg
                    className="w-5 h-5 text-foreground/70"
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
                <h2 className="text-xl font-semibold tracking-tight">
                  {group.label}
                </h2>
              </div>
              {/* Items */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-4 md:grid-cols-2"
              >
                {group.items.map((item, idx) => {
                  const cleanColor = stegaClean((item as any).color) ?? "#888888";
                  const cleanIconUrl = stegaClean(item.iconUrl);
                  const cleanSvgPath = stegaClean((item as any).svgPath);
                  const cleanLink = stegaClean(item.link);

                  return (
                    <motion.div
                      key={(item as any)._id ?? `${group.key}-${idx}`}
                      variants={itemVariant}
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className="group relative flex gap-4 p-5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
                    >
                      {/* Glow on hover */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        style={{
                          background: `radial-gradient(circle at 20% 50%, ${cleanColor}06 0%, transparent 60%)`,
                        }}
                      />

                      {/* Icon */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${cleanColor}12, ${cleanColor}22)`,
                          border: `1px solid ${cleanColor}20`,
                        }}
                      >
                        {cleanIconUrl ? (
                          <img
                            src={cleanIconUrl}
                            alt={item.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : cleanSvgPath ? (
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill={cleanColor}
                          >
                            <path d={cleanSvgPath} />
                          </svg>
                        ) : (
                          <div
                            className="w-6 h-6 rounded-md"
                            style={{ backgroundColor: cleanColor }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                            {item.name}
                          </h3>
                          {cleanLink && (
                            <a
                              href={cleanLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                              aria-label={`${t("visitSite")} - ${item.name}`}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Color accent */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-8 rounded-full transition-all duration-300"
                        style={{ backgroundColor: cleanColor }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Separator (not after last group) */}
              {gi < grouped.length - 1 && (
                <div className="mt-16 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "editor":
      return (
        <>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </>
      );
    case "terminal":
      return (
        <>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </>
      );
    case "devops":
      return (
        <>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </>
      );
    case "design":
      return (
        <>
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </>
      );
    case "browser":
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </>
      );
    case "hardware":
      return (
        <>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </>
      );
    default:
      return <circle cx="12" cy="12" r="10" />;
  }
}
