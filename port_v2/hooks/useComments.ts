"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "@/lib/api/comments";
import { useAuth } from "@/contexts/AuthProvider";
import { useLocale } from "next-intl";

interface Comment {
  _id: string;
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
  const { token, user } = useAuth();
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
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache stale data
  });

  // Create comment mutation
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
    onMutate: async (newComment) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(["comments", postId]);

      // Optimistically update to the new value
      const optimisticComment: Comment = {
        _id: `temp-${Date.now()}`,
        content: newComment.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          sub: user?.sub || "",
          name: user?.name || "Anonymous",
          email: user?.email,
          preferred_username: user?.email?.split("@")[0] || user?.name,
        },
        parentId: newComment.parentId || null,
        postId: postId,
      };

      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;

        const updatedComments = [...(old.comments || []), optimisticComment];

        return {
          ...old,
          comments: updatedComments,
        };
      });

      // Return context with previous comments
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      // Rollback to previous value on error
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
    },
    onSettled: () => {
      // Refetch to ensure server state
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  // Update comment mutation
  const updateCommentMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return commentsApi.updateComment(id, content, token, locale);
    },
    onMutate: async ({ id, content }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(["comments", postId]);

      // Optimistically update the comment
      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;

        const updatedComments = old.comments.map((c: Comment) =>
          c._id === id
            ? { ...c, content, updatedAt: new Date().toISOString() }
            : c
        );

        return {
          ...old,
          comments: updatedComments,
        };
      });

      return { previousComments };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
    },
    onSettled: () => {
      // Refetch to ensure server state
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return commentsApi.deleteComment(id, token, locale);
    },
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      // Snapshot previous value
      const previousComments = queryClient.getQueryData(["comments", postId]);

      // Optimistically remove the comment
      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;

        const updatedComments = old.comments.filter((c: Comment) => c._id !== id);

        return {
          ...old,
          comments: updatedComments,
        };
      });

      return { previousComments };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
    },
    onSettled: () => {
      // Refetch to ensure server state
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
    {},
  );

  // Attach replies to their parent comments
  const commentsWithReplies = topLevelComments.map((comment: Comment) => ({
    ...comment,
    replies: repliesByParent[comment._id] || [],
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
