"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2, MessageSquare, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useTranslations } from "next-intl";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  placeholder?: string;
  submitLabel?: string;
  isLoading?: boolean;
  initialValue?: string;
  isReply?: boolean;
}

export function CommentForm({
  onSubmit,
  onCancel,
  placeholder,
  submitLabel,
  isLoading = false,
  initialValue = "",
  isReply = false,
}: CommentFormProps) {
  const [content, setContent] = useState(initialValue);
  const { user } = useAuth();
  const t = useTranslations("comments");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || isLoading) return;

    await onSubmit(content.trim());
    setContent("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isReply ? 10 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 border-border">
        <AuthGuard>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </div>

            {/* Textarea */}
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                placeholder ||
                t("writeComment", { defaultValue: "Write a comment..." })
              }
              className="min-h-[100px] resize-none"
              maxLength={5000}
            />

            {/* Character Count */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{content.length}/5000</span>
              {content.length > 4500 && (
                <span className="text-orange-500">
                  {t("approachingLimit", { defaultValue: "Approaching limit" })}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-1" />
                  {t("cancel", { defaultValue: "Cancel" })}
                </Button>
              )}
              <Button
                type="submit"
                size="sm"
                disabled={!content.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("posting", { defaultValue: "Posting..." })}
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {submitLabel || t("post", { defaultValue: "Post Comment" })}
                  </>
                )}
              </Button>
            </div>
          </form>
        </AuthGuard>
      </Card>
    </motion.div>
  );
}
