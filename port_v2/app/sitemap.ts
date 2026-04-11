import { client } from "@/sanity/lib/client";
import { I18N_LOCALE } from "@/constants/i18n-config";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { MetadataRoute } from "next";

// ─── Static page paths (locale-prefixed) ────────────────────────────────────
const STATIC_PATHS = ["", "/about", "/blog", "/projects"];

// ─── Sanity queries for slugs only ──────────────────────────────────────────
const BLOG_SLUGS_QUERY = `
  *[_type == "blog" && publishedAt <= now() && language == $lang] {
    "slug": slug.current,
    publishedAt
  }
`;

const PROJECT_SLUGS_QUERY = `
  *[_type == "project" && publishedAt <= now() && language == $lang] {
    "slug": slug.current,
    publishedAt
  }
`;

const CATEGORY_SLUGS_QUERY = `
  *[_type == "category" && language == $lang] {
    "slug": slug.current,
    _updatedAt
  }
`;

interface SanitySlugItem {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
}

async function fetchSlugsForLocale(
  query: string,
  lang: string
): Promise<SanitySlugItem[]> {
  try {
    return await client.fetch<SanitySlugItem[]>(query, { lang });
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const entries: MetadataRoute.Sitemap = [];

  // ── 1. Static Pages ──────────────────────────────────────────────────────
  for (const path of STATIC_PATHS) {
    entries.push({
      url: `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          I18N_LOCALE.map((locale) => [
            locale,
            `${baseUrl}/${locale}${path}`,
          ])
        ),
      },
    });
  }

  // ── 2. Blog Posts (per locale) ───────────────────────────────────────────
  for (const locale of I18N_LOCALE) {
    const blogs = await fetchSlugsForLocale(BLOG_SLUGS_QUERY, locale);
    for (const blog of blogs) {
      if (!blog.slug) continue;
      entries.push({
        url: `${baseUrl}/${locale}/blog/${blog.slug}`,
        lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // ── 3. Projects (per locale) ─────────────────────────────────────────────
  for (const locale of I18N_LOCALE) {
    const projects = await fetchSlugsForLocale(PROJECT_SLUGS_QUERY, locale);
    for (const project of projects) {
      if (!project.slug) continue;
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: project.publishedAt
          ? new Date(project.publishedAt)
          : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // ── 4. Category Pages (per locale) ──────────────────────────────────────
  for (const locale of I18N_LOCALE) {
    const categories = await fetchSlugsForLocale(CATEGORY_SLUGS_QUERY, locale);
    for (const cat of categories) {
      if (!cat.slug) continue;
      entries.push({
        url: `${baseUrl}/${locale}/category/${cat.slug}`,
        lastModified: cat._updatedAt ? new Date(cat._updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
