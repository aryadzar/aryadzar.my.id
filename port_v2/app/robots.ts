import { getBaseUrl } from "@/lib/getBaseUrl";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio",        // Sanity Studio — tidak perlu diindex
          "/api/",          // API routes internal
          "/preview",       // Draft mode preview
          "/_next/",        // Next.js internals
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
