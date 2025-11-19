"use server";

import { BlogDetail } from "@/types/blogDetailTypes";
import { getBaseUrl } from "../getBaseUrl";

export async function getBlogSSR(
  slug: string,
  lang: string
): Promise<BlogDetail> {
  const res = await fetch(`${getBaseUrl()}/api/${lang}/blog/${slug}`, {
    method: "GET",
    next: { revalidate: 60 }, // atau "no-store" jika mau selalu fresh
  });

  if (!res.ok) {
    console.error("SSR Fetch Error:", res.status, res.statusText);
    throw new Error(`Failed to fetch blog: ${res.status}`);
  }

  return res.json();
}
