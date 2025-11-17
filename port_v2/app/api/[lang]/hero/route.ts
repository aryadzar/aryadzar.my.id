import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;

  const data =
    await client.fetch(`*[_type == "hero" && language == "${lang}"][0]{
    title,
    subtitle,
    "videoUrl" : video.asset->url,
    "cvUrl" : cvFile.asset->url
    }`);

  return NextResponse.json(data);
}
