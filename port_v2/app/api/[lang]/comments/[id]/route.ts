import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/[lang]/comments/[id]
 * Get a single comment by ID - Using Sanity Live for real-time updates
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> },
) {
  try {
    const { id } = await params;

    const query = `
      *[_id == $id && _type == "comment" && !isDeleted][0]{
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
      }
    `;

    // Use sanityFetch for live content
    const { data } = await sanityFetch({
      query,
      params: { id },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      comment: data,
    });
  } catch (error) {
    console.error("Error fetching comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comment" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/[lang]/comments/[id]
 * Update a comment (only own comments)
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> },
) {
  try {
    const { id } = await params;

    // Verify session with Auth.js
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Fetch the comment first to verify ownership
    const comment = await client.fetch(
      `*[_id == $id && _type == "comment"][0]{ _id, author }`,
      { id },
    );

    if (!comment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 },
      );
    }

    // Verify user owns this comment
    if (comment.author.sub !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You can only edit your own comments",
        },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { content } = body;

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

    // Update comment
    const updatedComment = await client
      .patch(id)
      .set({
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      })
      .commit();

    return NextResponse.json({
      success: true,
      comment: {
        _id: updatedComment._id,
        content: updatedComment.content,
        updatedAt: updatedComment.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update comment" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/[lang]/comments/[id]
 * Delete a comment (soft delete, only own comments)
 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> },
) {
  try {
    const { id } = await params;

    // Verify session with Auth.js
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Fetch the comment first to verify ownership
    const comment = await client.fetch(
      `*[_id == $id && _type == "comment"][0]{ _id, author }`,
      { id },
    );

    if (!comment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 },
      );
    }

    // Verify user owns this comment
    if (comment.author.sub !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You can only delete your own comments",
        },
        { status: 403 },
      );
    }

    // Soft delete the comment
    await client.patch(id).set({ isDeleted: true }).commit();

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
