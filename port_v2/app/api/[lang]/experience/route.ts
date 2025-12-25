import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const { lang } = await params;

    const query = `
      *[_type == "experience" && language == $lang] | order(duration desc) {
        _id,
        title,
        company,
        duration,
        description,
        skills[]->{
          _id,
          title
        },
        "logo": {
          "src": logo.asset->url,
          "alt": logo.alt
        }
      }
    `;

    const data = await client.fetch(query, { lang });

    return NextResponse.json({ experience: data });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}
