"use server";

import { Project, ProjectDetail } from "@/types/projectDetailType";
import { getBaseUrl } from "../getBaseUrl";
import { client } from "@/sanity/lib/client";

export async function getProjectSSR(
  slug: string,
  lang: string
): Promise<Project> {
  const query = `
      *[_type == "project" && slug.current == $slug && publishedAt <= now() && language == $lang ][0]{
        _id,
        title,
        slug,
        "thumbnail" : thumbnail.asset->url,
        shortDesc,
        description,
        categories[]->{_id, title, slug},
        liveUrl,
        repoUrl,
        publishedAt
      }
  `;

  return client.fetch(query, { slug, lang });
}
