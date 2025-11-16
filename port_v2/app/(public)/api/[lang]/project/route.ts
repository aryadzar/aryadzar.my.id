import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { lang: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const { lang } = await params;

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const start = (page - 1) * limit;

    const now = new Date().toISOString();

    // GROQ Query with filter & pagination
    const query = `
      *[_type == "project" && publishedAt <= $now && language == $lang]
      | order(publishedAt desc)
      [${start}...${start + limit}] {
        _id,
        title,
        slug,
        "thumbnail" : thumbnail.asset->url,
        shortDesc,
        categories[]->{_id, title, slug},
        publishedAt
      }
    `;

    const countQuery = `
      count(*[_type == "project" && publishedAt <= $now && language == $lang])
    `;

    const [projects, total] = await Promise.all([
      client.fetch(query, { now, lang }),
      client.fetch(countQuery, { now, lang }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      totalPages,
      projects,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
