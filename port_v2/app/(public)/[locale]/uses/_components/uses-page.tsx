"use client";

import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { createDataAttribute, stegaClean } from "next-sanity";
import { STUDIO_SANITY_URL } from "@/constants/studio-constant";
import Image from "next/image";
import { fallbackUses, normalizeUsesCategory, USES_CATEGORY_ORDER } from "@/constants/uses-data";
import type { UsesItem } from "@/types/usesType";
import type { Workspace } from "@/types/workspaceType";

interface UsesPageProps {
  usesData: UsesItem[];
  workspace: Workspace | null;
  locale: string;
}

/** What one row needs, whether it came from Sanity or from the built-in fallback list. */
interface Row {
  key: string;
  name: string;
  description?: string;
  specs?: string;
  link?: string;
  iconUrl?: string;
  svgPath?: string;
  color?: string;
  image?: { url: string; alt: string; lqip?: string; dataSanity?: string };
}

export default function UsesPage({ usesData, workspace, locale }: UsesPageProps) {
  const t = useTranslations("usesPage");
  const prefersReducedMotion = useReducedMotion();
  const rise = prefersReducedMotion ? 0 : 24;

  // Sanity first; the built-in list only fills in while the dataset has no Uses yet.
  const source: (Row & { category: string })[] =
    usesData.length > 0
      ? usesData.map((item) => ({
          key: item._id,
          name: item.name,
          description: item.description,
          specs: item.specs,
          link: item.link,
          iconUrl: item.iconUrl,
          category: stegaClean(item.category),
          image: item.imageUrl
            ? {
                url: stegaClean(item.imageUrl),
                alt: stegaClean(item.imageAlt || item.name),
                lqip: item.imageLqip,
                dataSanity: createDataAttribute({ baseUrl: STUDIO_SANITY_URL, id: item._id, type: "uses", path: "image" }).toString(),
              }
            : undefined,
        }))
      : fallbackUses.map((item) => ({
          key: item.name,
          name: item.name,
          description: item.description[locale as "en" | "id" | "de"] ?? item.description.en,
          link: item.link,
          svgPath: item.svgPath,
          color: item.color,
          category: item.category,
        }));

  const sections = USES_CATEGORY_ORDER.map((category) => ({
    category,
    rows: source.filter((row) => normalizeUsesCategory(row.category) === category),
  })).filter((section) => section.rows.length > 0);

  return (
    <main className="min-h-[60vh]">
      <header className="mx-auto max-w-4xl px-4 pt-28 pb-4 md:px-6 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("title")}</h1>
          <p className="mt-3 max-w-2xl text-lg text-pretty text-muted-foreground">{t("description")}</p>
        </motion.div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-20 md:px-6">
        {workspace ? (
          <motion.figure
            className="mt-6 md:mt-8"
            initial={{ opacity: 0, y: rise }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-lg"
              data-sanity={createDataAttribute({ baseUrl: STUDIO_SANITY_URL, id: workspace._id, type: "workspace", path: "image" }).toString()}
              style={{ aspectRatio: Math.min(Math.max(workspace.width / workspace.height, 1.2), 2) }}
            >
              <Image
                src={stegaClean(workspace.url)}
                alt={stegaClean(workspace.alt || workspace.caption || t("title"))}
                fill
                priority
                sizes="(min-width: 896px) 896px, 100vw"
                placeholder={workspace.lqip ? "blur" : "empty"}
                blurDataURL={workspace.lqip ? stegaClean(workspace.lqip) : undefined}
                className="object-cover"
              />
            </div>
            {workspace.caption ? (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">{workspace.caption}</figcaption>
            ) : null}
          </motion.figure>
        ) : null}

        <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
          {sections.map(({ category, rows }) => (
            <motion.section
              key={category}
              aria-labelledby={`uses-${category}`}
              initial={{ opacity: 0, y: rise }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 id={`uses-${category}`} className="text-2xl font-bold tracking-tight md:text-3xl">
                {t(category)}
              </h2>

              <ul className="mt-4 divide-y divide-border/70 border-t border-border/70">
                {rows.map((row) => {
                  const link = stegaClean(row.link);
                  const icon = stegaClean(row.iconUrl);
                  const svgPath = row.svgPath;
                  return (
                    <li
                      key={row.key}
                      className={
                        row.image
                          ? "grid items-start gap-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] md:gap-8"
                          : "py-8"
                      }
                    >
                      {row.image ? (
                        <div
                          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm md:order-last md:aspect-[4/3]"
                          data-sanity={row.image.dataSanity}
                        >
                          <Image
                            src={row.image.url}
                            alt={row.image.alt}
                            fill
                            sizes="(min-width: 768px) 272px, 100vw"
                            placeholder={row.image.lqip ? "blur" : "empty"}
                            blurDataURL={row.image.lqip ? stegaClean(row.image.lqip) : undefined}
                            className="object-cover"
                          />
                        </div>
                      ) : null}

                      <div className="min-w-0">
                        <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                          {icon ? (
                            // eslint-disable-next-line @next/next/no-img-element -- Sanity icons can be SVG, which next/image refuses
                            <img src={icon} alt="" aria-hidden="true" className="size-5 shrink-0 object-contain" />
                          ) : svgPath ? (
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0" fill={row.color ?? "currentColor"}>
                              <path d={svgPath} />
                            </svg>
                          ) : null}
                          {row.name}
                        </h3>
                        {row.specs ? (
                          <p className="mt-1 font-mono text-[13px] leading-snug text-muted-foreground">{row.specs}</p>
                        ) : null}
                        {row.description ? (
                          <p className="mt-3 max-w-[60ch] leading-relaxed text-pretty text-muted-foreground">
                            {row.description}
                          </p>
                        ) : null}
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                          >
                            {t("visitSite")}
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                            <span className="sr-only">— {row.name}</span>
                          </a>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
}
