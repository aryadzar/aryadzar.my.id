"use server";

import { Blog } from "@/types/blogDetailTypes";
import { getBaseUrl } from "../getBaseUrl";
import { client } from "@/sanity/lib/client";

export async function getBlogSSR(slug: string, lang: string): Promise<Blog> {
  const query = `
      *[_type == "blog" && slug.current == $slug && publishedAt <= now() && language == $lang ][0]{
        _id,
        title,
        slug,
        "thumbnail" : coverImage.asset->url,
        excerpt,
        content,
        categories[]->{_id, title, slug},
        publishedAt
}
  `;

  return client.fetch(query, { slug, lang });
}
