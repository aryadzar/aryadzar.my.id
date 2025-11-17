import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string; lang: string } }
) {
  try {
    const { slug, lang } = await params;
    const now = new Date().toISOString();

    const query = `
      *[_type == "blog" && slug.current == $slug && publishedAt <= $now && language == $lang ][0]{
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

    const blog = await client.fetch(query, { slug, now, lang });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Project not found or not published yet" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog,
      slug,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
