import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook: expires every cached Sanity query as soon as a document is
 * published, updated or deleted, so the next visitor gets a freshly rendered
 * page. SanityLive already does this while someone has the site open; this
 * covers changes made while nobody is on it.
 *
 * Set up in sanity.io/manage → API → Webhooks:
 *   URL:        https://www.aryadzar.my.id/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Filter:     leave empty (or e.g. !(_id in path("drafts.**")))
 *   Projection: {_type}
 *   Secret:     the same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    // `true` waits a moment so the Content Lake has the change before pages re-fetch.
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // Every sanityFetch call is tagged "sanity" (next-sanity's default).
    revalidateTag("sanity", { expire: 0 });

    return NextResponse.json({ revalidated: true, type: body?._type ?? null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Could not revalidate" }, { status: 500 });
  }
}
