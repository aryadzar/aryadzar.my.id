import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { lang: string } }
) {
  const { lang } = await params;

  const data =
    await client.fetch(`*[_type == "about" && language == "${lang}"][0]{
        name,
        jobTitle,
        description,
        "imageUrl": profileImage.asset->url,
        "cvUrl": cvFile.asset->url,
        "certificateUrl": certificateFile.asset->url

    }`);

  return NextResponse.json(data);
}
