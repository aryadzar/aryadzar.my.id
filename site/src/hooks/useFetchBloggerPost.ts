import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { extractIdFromSlug } from "@/utils/slug-helper";
import langFallback from "@/utils/i18n/langFallback.json";

// kamu bisa gabungkan helper di sini
import preprocessHtmlWithZoomWrapper from "@/utils/imageHelperBlog";
import {
  addIdsToHeadings,
  enhanceLinks,
  extractHeadingsFromHtml,
} from "@/utils/header-helper";

export function useFetchBloggerPost(
  slug: string | undefined,
  lang: string,
  requiredLabel?: string
) {
  const [post, setPost] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [fallbackMsg, setFallbackMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const id = extractIdFromSlug(slug);

    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`, {
          params: { key: import.meta.env.VITE_API_BLOG_KEY },
        });

        const labels = res.data.labels ?? [];
        const defaultLang = langFallback.default;

        if (requiredLabel && !labels.includes(requiredLabel)) {
          setNotFound(true);
          return;
        }
        if (labels.includes(lang)) {
          setFallbackMsg(null);
        }
        // ✅ Kasus 2: tidak ada label lang, tapi ada label default
        else if (labels.includes(defaultLang)) {
          setFallbackMsg(
            langFallback.fallbacks[lang] || "Fallback ke bahasa default."
          );
        } else {
          setFallbackMsg(
            langFallback.fallbacks[lang] ||
              `Konten tidak tersedia dalam ${lang}, ditampilkan ${labels[0]}.`
          );
        }

        let content = preprocessHtmlWithZoomWrapper(res.data.content);
        content = addIdsToHeadings(content);
        const toc = extractHeadingsFromHtml(content);

        setPost({ ...res.data, content: enhanceLinks(content) });
        setHeadings(toc);
      } catch (err) {
        console.error("Post not found:", err);
        setNotFound(true);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, notFound, headings, fallbackMsg };
}
