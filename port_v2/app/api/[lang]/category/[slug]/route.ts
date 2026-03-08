import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/live";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ lang: string; slug: string }> },
) {
  const { lang, slug } = await params;
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 6);
  const start = (page - 1) * limit;

  const query = `
    {
      "category": *[_type == "category" && slug.current == "${slug}"][0]{
        _id,
        title,
        slug,
        description
      },

      "blogs": *[
        _type == "blog" &&
        language == "${lang}" &&
        publishedAt <= now() &&
        "${slug}" in categories[]->slug.current
      ] | order(publishedAt desc) [${start}...${start + limit}] {
        _id,
        title,
        slug,
        "thumbnail" : coverImage.asset->url,
        excerpt,
        categories[]->{_id, title, slug},
        publishedAt
      },

      "projects": *[
        _type == "project" &&
        language == "${lang}" &&
        publishedAt <= now() &&
        "${slug}" in categories[]->slug.current
      ] | order(publishedAt desc) [${start}...${start + limit}] {
        _id,
        title,
        slug,
        "thumbnail" : thumbnail.asset->url,
        shortDesc,
        categories[]->{_id, title, slug},
        publishedAt
      },

      "totalBlogs": count(*[
        _type == "blog" &&
        language == "${lang}" &&
        publishedAt <= now() &&
        "${slug}" in categories[]->slug.current
      ]),

      "totalProjects": count(*[
        _type == "project" &&
        language == "${lang}" &&
        publishedAt <= now() &&
        "${slug}" in categories[]->slug.current
      ])
    }
  `;

  const { data } = await sanityFetch({ query });

  const { category, blogs, projects, totalBlogs, totalProjects } = data;
  const totalPages = Math.max(
    1,
    Math.ceil((totalBlogs + totalProjects) / limit),
  );

  return NextResponse.json({
    success: true,
    page,
    limit,
    totalBlogs,
    totalProjects,
    totalPages,
    category,
    blogs,
    projects,
  });
}
