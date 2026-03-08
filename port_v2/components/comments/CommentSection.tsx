"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Loader2, LogIn, LogOut, User } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useComments } from "@/hooks/useComments";
import { useAuth } from "@/contexts/AuthProvider";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github } from "lucide-react";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading: isLoadingAuth,
  } = useAuth();
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  const {
    comments,
    isLoadingComments,
    createComment,
    updateComment,
    deleteComment,
    isCreatingComment,
    isUpdatingComment,
    isDeletingComment,
  } = useComments(postId);

  const t = useTranslations("comments");

  const handleNewComment = async (content: string) => {
    await createComment({ content });
    setShowNewCommentForm(false);
  };

  const handleReply = async (content: string, parentId: string) => {
    await createComment({ content, parentId });
  };

  const handleUpdate = async (id: string, content: string) => {
    await updateComment({ id, content });
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id);
  };

  // Show loading state while checking auth
  if (isLoadingAuth) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-16"
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-16"
      id="comment"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-8 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {t("title", { defaultValue: "Comments" })}
            </h2>
            <p className="text-sm text-muted-foreground">
              {comments.length}{" "}
              {t("count", {
                defaultValue: "comment",
                count: comments.length,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Login Prompt - Show when not authenticated */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="w-5 h-5 text-primary" />
                {t("loginRequired.title", { defaultValue: "Login to Comment" })}
              </CardTitle>
              <CardDescription>
                {t("loginRequired.description", {
                  defaultValue:
                    "You need to login to leave a comment on this post.",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => login("google")}
                  className="w-full gap-2 sm:w-auto"
                  size="lg"
                  variant="default"
                  disabled={isLoadingAuth}
                >
                  <Chrome className="w-5 h-5" />
                  {t("loginRequired.googleButton", {
                    defaultValue: "Continue with Google",
                  })}
                </Button>
                <Button
                  onClick={() => login("github")}
                  className="w-full gap-2 sm:w-auto"
                  size="lg"
                  variant="outline"
                  disabled={isLoadingAuth}
                >
                  <Github className="w-5 h-5" />
                  {t("loginRequired.githubButton", {
                    defaultValue: "Continue with Github",
                  })}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* User Info Card - Show when authenticated */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("loggedInAs", {
                        defaultValue: "Logged in as {email}",
                        email: user?.email as string,
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t("logout", { defaultValue: "Logout" })}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* New Comment Form - Only show when authenticated */}
      {isAuthenticated && !showNewCommentForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <CommentForm
            onSubmit={handleNewComment}
            onCancel={() => setShowNewCommentForm(false)}
            placeholder={t("writeComment", {
              defaultValue: "Write a comment...",
            })}
            submitLabel={t("post", { defaultValue: "Post Comment" })}
            isLoading={isCreatingComment}
          />
        </motion.div>
      )}

      {/* Comments List - Always show comments, blur when not authenticated */}
      <div
        className={`${!isAuthenticated ? "blur-sm select-none pointer-events-none" : ""} transition-all duration-300`}
      >
        <CommentList
          comments={comments}
          onReply={handleReply}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoading={isLoadingComments}
          isReplying={isCreatingComment}
          isUpdating={isUpdatingComment}
          isDeleting={isDeletingComment}
        />
      </div>
    </motion.div>
  );
}
