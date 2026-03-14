// components/blog/AvailableLanguagesBanner.tsx
"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { TranslationDoc } from "@/types/blogDetailTypes";

const LANGUAGE_NAMES: Record<string, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  de: "Deutsch",
};

interface AvailableLanguagesBannerProps {
  translations: TranslationDoc[];
  currentLocale: string;
  route: "blog" | "projects";
}

export function AvailableLanguagesBanner({
  translations,
  currentLocale,
  route,
}: AvailableLanguagesBannerProps) {
  const t = useTranslations(route === "blog" ? "blogDetail" : "projectDetail");

  const otherTranslations = translations.filter(
    (tr) => tr.language !== currentLocale,
  );

  if (otherTranslations.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 mb-6 text-sm border rounded-xl border-primary/20 bg-primary/5">
      <Globe className="w-4 h-4 text-primary shrink-0" />
      <span className="text-muted-foreground">{t("availableIn")}</span>
      <div className="flex flex-wrap gap-2">
        {otherTranslations.map((tr) => (
          <Link
            key={tr.language}
            href={`/${tr.language}/${route}/${tr.slug.current}`}
            className="font-medium text-primary hover:underline"
          >
            {LANGUAGE_NAMES[tr.language] ?? tr.language.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
