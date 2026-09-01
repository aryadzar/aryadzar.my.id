"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "@/lib/api/comments";
import { useAuth } from "@/contexts/AuthProvider";
import { useLocale } from "next-intl";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    sub: string;
    name: string;
    email?: string;
    preferred_username?: string;
  };
  parentId?: string | null;
  postId: string;
  replies?: Comment[];
}

export function useComments(postId: string) {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const locale = useLocale();

  // Fetch comments
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentsApi.getComments(postId, locale),
    enabled: !!postId,
  });

  // Create comment mutation (Normal CRUD)
  const createCommentMutation = useMutation({
    mutationFn: async ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: string;
    }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return commentsApi.createComment(content, postId, token, locale, parentId);
    },
    onSuccess: () => {
      // Langsung fetch ulang data terbaru setelah berhasil create
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  // Update comment mutation (Normal CRUD)
  const updateCommentMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return commentsApi.updateComment(id, content, token, locale);
    },
    onSuccess: () => {
      // Langsung fetch ulang data terbaru setelah berhasil update
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  // Delete comment mutation (Normal CRUD)
  const deleteCommentMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return commentsApi.deleteComment(id, token, locale);
    },
    onSuccess: () => {
      // Langsung fetch ulang data terbaru setelah berhasil delete
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  // Organize comments into threads
  const comments: Comment[] = commentsData?.comments || [];
  const topLevelComments = comments.filter((c: Comment) => !c.parentId);

  // Group replies by parent
  const repliesByParent = comments.reduce(
    (acc: Record<string, Comment[]>, comment: Comment) => {
      if (comment.parentId) {
        if (!acc[comment.parentId]) {
          acc[comment.parentId] = [];
        }
        acc[comment.parentId].push(comment);
      }
      return acc;
    },
    {} as Record<string, Comment[]>
  );

  // Attach replies to their parent comments
  const commentsWithReplies = topLevelComments.map((comment: Comment) => ({
    ...comment,
    replies: repliesByParent[comment.id] || [],
  }));

  return {
    comments: commentsWithReplies,
    rawComments: comments,
    isLoadingComments,
    commentsError,
    refetchComments,
    createComment: createCommentMutation.mutateAsync,
    updateComment: updateCommentMutation.mutateAsync,
    deleteComment: deleteCommentMutation.mutateAsync,
    isCreatingComment: createCommentMutation.isPending,
    isUpdatingComment: updateCommentMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,
  };
}
