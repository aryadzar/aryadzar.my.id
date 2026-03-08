import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/[lang]/comments
 * Get all comments (optional filtering) - Using Sanity Live for real-time updates
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  try {
    const { lang } = await params;
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const parentId = searchParams.get("parentId"); // For getting replies

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 },
      );
    }

    let query = `
      *[_type == "comment" && !isDeleted`;

    // Filter by post
    query += ` && relatedPost._ref == $postId`;

    // Only filter by parent if specifically requesting replies for a parent
    // When fetching comments for a post, get ALL comments (both top-level and replies)
    if (parentId) {
      query += ` && parentId._ref == $parentId`;
    }

    query += `] | order(createdAt desc) {
      _id,
      content,
      createdAt,
      updatedAt,
      "author": {
        sub,
        name,
        email,
        preferred_username
      },
      "parentId": parentId._ref,
      "postId": relatedPost._ref,
      "postType": relatedPost._type
    }`;

    const queryParams: any = { lang, postId };
    if (parentId) queryParams.parentId = parentId;

    // Use sanityFetch for live content
    const { data } = await sanityFetch({
      query,
      params: queryParams,
    });

    return NextResponse.json({
      success: true,
      comments: data || [],
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/[lang]/comments
 * Create a new comment
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  try {
    await params; // Consume params to avoid unused variable warning

    // Verify session with Auth.js
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { content, postId, parentId } = body;

    // Validation
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Comment content is required" },
        { status: 400 },
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Comment is too long (max 5000 characters)" },
        { status: 400 },
      );
    }

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 },
      );
    }

    // Verify post exists
    const postQuery = `*[_id == $postId && _type in ["blog", "project"]][0]{ _id, _type }`;
    const post = await client.fetch(postQuery, { postId });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }

    // If parentId is provided, verify parent comment exists
    if (parentId) {
      const parentComment = await client.fetch(
        `*[_id == $parentId && _type == "comment"][0]{ _id }`,
        { parentId },
      );

      if (!parentComment) {
        return NextResponse.json(
          { success: false, error: "Parent comment not found" },
          { status: 404 },
        );
      }
    }

    // Create comment document with proper typing
    const comment: any = {
      _type: "comment",
      relatedPost: {
        _type: "reference",
        _ref: postId,
      },
      author: {
        sub: session.user.id,
        name: session.user.name || session.user.email?.split("@")[0] || "Anonymous",
        email: session.user.email,
        preferred_username: session.user.name || session.user.email?.split("@")[0] || "Anonymous",
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
    };

    // Debug log
    console.log("Creating comment with author:", comment.author);

    // Add parentId if it's a reply
    if (parentId) {
      comment.parentId = {
        _type: "reference",
        _ref: parentId,
      };
    }

    const result = await client.create(comment);

    return NextResponse.json({
      success: true,
      comment: {
        _id: result._id,
        content: result.content,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        author: result.author,
        parentId: (result as any).parentId?._ref || null,
        postId: postId,
      },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
