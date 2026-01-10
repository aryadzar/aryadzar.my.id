"use server";

import { Blog } from "@/types/blogDetailTypes";
import { getBaseUrl } from "../getBaseUrl";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

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

  const { data } = await sanityFetch({
    query,
    params: { slug, lang },
  });

  return data;
}
