"use client";

import { motion } from "framer-motion";
import { CommentItem } from "./CommentItem";
import { Loader2, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

interface CommentListProps {
  comments: any[];
  onReply?: (content: string, parentId: string) => Promise<void>;
  onUpdate?: (id: string, content: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  isLoading?: boolean;
  isReplying?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function CommentList({
  comments,
  onReply,
  onUpdate,
  onDelete,
  isLoading = false,
  isReplying = false,
  isUpdating = false,
  isDeleting = false,
}: CommentListProps) {
  const t = useTranslations("comments");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {t("noCommentsTitle", { defaultValue: "No comments yet" })}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {t("noCommentsDescription", {
            defaultValue:
              "Be the first to share your thoughts about this post.",
          })}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onReply={onReply}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isReplying={isReplying}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
