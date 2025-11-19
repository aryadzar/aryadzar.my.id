"use server";

import { ProjectDetail } from "@/types/projectDetailType";
import { getBaseUrl } from "../getBaseUrl";

export async function getProjectSSR(
  slug: string,
  lang: string
): Promise<ProjectDetail> {
  const res = await fetch(`${getBaseUrl()}/api/${lang}/project/${slug}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("SSR Fetch Error:", res.status, res.statusText);
    throw new Error(`Failed to fetch project: ${res.status}`);
  }

  return res.json();
}
