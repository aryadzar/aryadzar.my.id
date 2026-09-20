"use client";

import { ImageOff } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useFormatter, useTranslations } from "next-intl";
import { createDataAttribute, stegaClean } from "next-sanity";
import { STUDIO_SANITY_URL } from "@/constants/studio-constant";
import { LayoutGrid, type LayoutGridCard } from "@/components/ui/layout-grid";
import type { Photo } from "@/types/photoType";

// Photos uploaded without Sanity's size metadata fall back to a 4:3 frame.
const FALLBACK_SIZE = { width: 1200, height: 900 };

export default function PhotosPage({ photos }: { photos: Photo[] }) {
  const t = useTranslations("photosPage");
  const format = useFormatter();
  const prefersReducedMotion = useReducedMotion();

  const day = (iso: string) =>
    format.dateTime(new Date(stegaClean(iso) + "T00:00:00Z"), {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });

  const cards: LayoutGridCard[] = photos.map((p) => {
    const caption = p.caption;
    return {
      id: p._id,
      thumbnail: stegaClean(p.url),
      width: p.width || FALLBACK_SIZE.width,
      height: p.height || FALLBACK_SIZE.height,
      alt: stegaClean(p.alt || p.caption),
      // Lets Presentation's overlay open this photo's image field in Studio.
      dataSanity: createDataAttribute({ baseUrl: STUDIO_SANITY_URL, id: p._id, type: "photo", path: "image" }).toString(),
      blurDataURL: p.lqip ? stegaClean(p.lqip) : undefined,
      caption: (
        <>
          <time dateTime={stegaClean(p.date)} className="block font-mono text-[11px] leading-none tracking-wide text-muted-foreground uppercase">
            {day(p.date)}
          </time>
          <span className="mt-1.5 block text-sm leading-snug text-pretty text-foreground/90">{caption}</span>
        </>
      ),
      content: (
        <>
          <p className="text-lg leading-snug font-semibold text-balance md:text-xl">{caption}</p>
          <p className="mt-1 font-mono text-xs tracking-wide text-white/75 uppercase">
            {day(p.date)}
            {p.location ? ` · ${p.location}` : ""}
          </p>
        </>
      ),
    };
  });

  return (
    <main className="min-h-[60vh]">
      <header className="mx-auto max-w-6xl px-4 pt-28 pb-4 md:px-6 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("title")}</h1>
          <p className="mt-3 max-w-2xl text-lg text-pretty text-muted-foreground">{t("description")}</p>
        </motion.div>
      </header>

      <section aria-label={t("title")} className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        {cards.length > 0 ? (
          <LayoutGrid
            cards={cards}
            labels={{ close: t("close"), previous: t("previous"), next: t("next") }}
          />
        ) : (
          <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center text-muted-foreground">
            <ImageOff className="size-8" aria-hidden="true" />
            <p>{t("empty")}</p>
          </div>
        )}
      </section>
    </main>
  );
}
