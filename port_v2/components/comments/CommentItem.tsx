"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MessageSquare, MoreVertical, Trash2, Edit2, Reply, Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { CommentForm } from "./CommentForm";
import { useTranslations } from "next-intl";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
  comment: any;
  onReply?: (content: string, parentId: string) => Promise<void>;
  onUpdate?: (id: string, content: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  isDeleting?: boolean;
  isUpdating?: boolean;
  isReplying?: boolean;
  level?: number;
}

export function CommentItem({
  comment,
  onReply,
  onUpdate,
  onDelete,
  isDeleting = false,
  isUpdating = false,
  isReplying = false,
  level = 0,
}: CommentItemProps) {
  const { user, isAuthenticated, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const t = useTranslations("comments");

  const isOwner = user?.sub === comment.author.sub;
  const canReply = level < 3; // Max 3 levels of nesting

  const handleUpdate = async (content: string) => {
    if (onUpdate) {
      await onUpdate(comment._id, content);
      setIsEditing(false);
    }
  };

  const handleReply = async (content: string) => {
    if (onReply) {
      await onReply(content, comment._id);
      setShowReplyForm(false);
    }
  };

  const handleReplyButtonClick = () => {
    if (!isAuthenticated) {
      // If not logged in, trigger login
      login();
    } else {
      // Otherwise, toggle reply form
      setShowReplyForm(!showReplyForm);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(comment._id);
      setShowDeleteDialog(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  // Get display name from author object
  const getAuthorName = () => {
    if (!comment.author) return "Anonymous";

    // Try to get name from various possible fields
    return (
      comment.author.name ||
      comment.author.preferred_username ||
      comment.author.email?.split("@")[0] ||
      "Anonymous"
    );
  };

  const authorName = getAuthorName();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${level > 0 ? "ml-8 mt-4" : "mt-4"}`}
    >
      <Card className="p-4 border-border bg-card/50 backdrop-blur-sm">
        {/* Comment Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{authorName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
                {comment.updatedAt !== comment.createdAt && (
                  <span className="ml-2">
                    ({t("edited", { defaultValue: "edited" })})
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Actions Dropdown */}
          <div className="flex items-center gap-2">
            {canReply && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReplyButtonClick}
                disabled={isReplying}
              >
                {!isAuthenticated ? (
                  <>
                    <LogIn className="w-4 h-4 mr-1" />
                    {t("loginToReply", { defaultValue: "Login to Reply" })}
                  </>
                ) : (
                  <>
                    <Reply className="w-4 h-4 mr-1" />
                    {t("reply", { defaultValue: "Reply" })}
                  </>
                )}
              </Button>
            )}

            {isOwner && !isEditing && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    {t("edit", { defaultValue: "Edit" })}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t("delete", { defaultValue: "Delete" })}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Comment Content */}
        {!isEditing && (
          <div className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </div>
        )}

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-3">
            <CommentForm
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              initialValue={comment.content}
              submitLabel={t("update", { defaultValue: "Update Comment" })}
              isLoading={isUpdating}
            />
          </div>
        )}
      </Card>

      {/* Reply Form */}
      {showReplyForm && isAuthenticated && (
        <div className="mt-3">
          <CommentForm
            onSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
            placeholder={t("replyPlaceholder", {
              defaultValue: "Write a reply...",
            })}
            submitLabel={t("postReply", { defaultValue: "Post Reply" })}
            isLoading={isReplying}
            isReply
          />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("deleteConfirmTitle", {
                defaultValue: "Delete this comment?",
              })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteConfirmDescription", {
                defaultValue:
                  "This action cannot be undone. This will permanently delete your comment.",
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {t("cancel", { defaultValue: "Cancel" })}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("deleting", { defaultValue: "Deleting..." })}
                </>
              ) : (
                t("delete", { defaultValue: "Delete" })
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply: any) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              onReply={onReply}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              isReplying={isReplying}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
