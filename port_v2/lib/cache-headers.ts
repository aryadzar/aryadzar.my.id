import { draftMode } from "next/headers";

/**
 * Cache-Control for the public JSON routes used by the blog/project lists and
 * search. Vercel's CDN then answers repeated requests for the same URL without
 * invoking the function: fresh for a minute, then served stale for up to ten
 * minutes while one request refreshes it in the background.
 *
 * In draft mode (Presentation / preview) the response may contain drafts, so it
 * must never be stored by a shared cache.
 */
export async function apiCacheHeaders(): Promise<HeadersInit> {
  const { isEnabled } = await draftMode();
  return {
    "Cache-Control": isEnabled
      ? "private, no-store"
      : "public, s-maxage=60, stale-while-revalidate=600",
  };
}
