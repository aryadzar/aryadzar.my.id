import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: Request, { params }: any) {
  const { lang } = await params;
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 6);
  const q = (searchParams.get("q") || "").toLowerCase();

  const start = (page - 1) * limit;

  // GROQ SEARCH FILTER
  const searchFilter = q
    ? `&& (
        lower(title) match "*${q}*" ||
        lower(shortDesc) match "*${q}*" ||
        categories[]->title match "*${q}*"
      )`
    : "";

  const query = `
    {
      "projects": *[
        _type == "project" &&
        language == "${lang}" &&
        publishedAt <= now()
        ${searchFilter}
      ] | order(publishedAt desc) [${start}...${start + limit}] {
        _id,
        title,
        slug,
        "thumbnail" : thumbnail.asset->url,
        shortDesc,
        categories[]->{_id, title, slug},
        publishedAt
      },

      "total": count(*[
        _type == "project" &&
        language == "${lang}" &&
        publishedAt <= now()
        ${searchFilter}
      ])
    }
  `;

  const { projects, total } = await client.fetch(query);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return NextResponse.json({
    success: true,
    page,
    limit,
    total,
    totalPages,
    projects,
  });
}
