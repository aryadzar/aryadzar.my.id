import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Ambil parameter "limit" dari URL
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");

  // Convert ke number, default ke 6 jika tidak ada
  const limit = limitParam ? parseInt(limitParam, 10) : 6;

  // Jika limit invalid (NaN), fallback ke 6
  const safeLimit = Number.isFinite(limit) ? limit : 6;

  const query = `
    *[_type == "certification"] | order(date desc)[0...$limit]{
      title,
      issuer,
      "date": date,
      "id": certId,
      "href": certificateFile.asset->url,
      "logoSrc": logo.asset->url,
      "logoAlt": logoAlt
    }
  `;

  const data = await client.fetch(query, { limit: safeLimit });

  return NextResponse.json(data);
}
