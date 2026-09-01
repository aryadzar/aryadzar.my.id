import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> }
) {
  try {
    const { id } = await params;

    const data = await prisma.comment.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    const comment = {
      id: data.id,
      content: data.content,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
      author: {
        sub: data.authorSub,
        name: data.authorName,
        email: data.authorEmail || undefined,
        preferred_username: data.authorUsername || undefined,
      },
      parentId: data.parentId,
      postId: data.postId,
      postType: data.postType,
    };

    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error("Error fetching comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comment" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    if (existingComment.authorSub !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You can only edit your own comments" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Comment content is required" },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Comment is too long" },
        { status: 400 }
      );
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: {
        content: content.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      comment: {
        id: updated.id,
        content: updated.content,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
        author: {
          sub: updated.authorSub,
          name: updated.authorName,
          email: updated.authorEmail || undefined,
          preferred_username: updated.authorUsername || undefined,
        },
        parentId: updated.parentId,
        postId: updated.postId,
      },
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    if (existingComment.authorSub !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You can only delete your own comments" },
        { status: 403 }
      );
    }

    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
