import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const { lang } = await params;
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const parentId = searchParams.get("parentId");

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Build the query
    const whereClause: any = { postId };

    if (parentId) {
      whereClause.parentId = parentId;
    }

    const commentsData = await prisma.comment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    // Map Prisma models to the frontend Comment interface
    const comments = commentsData.map(c => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
      author: {
        sub: c.authorSub,
        name: c.authorName,
        email: c.authorEmail || undefined,
        preferred_username: c.authorUsername || undefined,
      },
      parentId: c.parentId,
      postId: c.postId,
      postType: c.postType,
    }));

    return NextResponse.json(
      {
        success: true,
        comments,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    await params; // Consume params

    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content, postId, parentId } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Comment content is required" },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Comment is too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 }
      );
    }

    // We can't verify the post exists easily from Prisma since posts are in Sanity
    // We could either ignore it or query Sanity just for verification, but ignoring
    // it is fine as long as `postId` is provided. For safety, let's just trust it.

    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        return NextResponse.json(
          { success: false, error: "Parent comment not found" },
          { status: 404 }
        );
      }
    }

    const authorName = session.user.name || session.user.email?.split("@")[0] || "Anonymous";
    const authorEmail = session.user.email || null;
    const authorUsername = session.user.name || session.user.email?.split("@")[0] || null;

    const result = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorSub: session.user.id || "",
        authorName,
        authorEmail,
        authorUsername,
        postId,
        parentId: parentId || null,
      },
    });

    return NextResponse.json({
      success: true,
      comment: {
        id: result.id,
        content: result.content,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
        author: {
          sub: result.authorSub,
          name: result.authorName,
          email: result.authorEmail || undefined,
          preferred_username: result.authorUsername || undefined,
        },
        parentId: result.parentId,
        postId: result.postId,
      },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
