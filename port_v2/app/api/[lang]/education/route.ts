import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const { lang } = await params;

    const query = `
      *[_type == "education" && language == $lang] | order(date desc) {
        _id,
        degree,
        school,
        field,
        date,
        "logo": {
          "src": logo.asset->url,
          "alt": logo.alt
        }
      }
    `;

    const data = await client.fetch(query, { lang });

    return NextResponse.json({ education: data });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}
