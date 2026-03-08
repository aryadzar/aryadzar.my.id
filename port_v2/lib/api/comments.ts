import { toast } from "sonner";
import axios from "axios";

/**
 * API client for comments
 */
export const commentsApi = {
  /**
   * Get comments for a post
   */
  async getComments(postId: string, locale: string = "en", parentId?: string) {
    try {
      const params = new URLSearchParams();
      params.append("postId", postId);
      if (parentId) {
        params.append("parentId", parentId);
      }

      const response = await axios.get(
        `/api/${locale}/comments?${params.toString()}`
      );

      return response.data;
    } catch (error: any) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },

  /**
   * Create a new comment
   */
  async createComment(
    content: string,
    postId: string,
    token: string,
    locale: string = "en",
    parentId?: string
  ) {
    try {
      const response = await axios.post(`/api/${locale}/comments`, {
        content,
        postId,
        parentId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Comment posted successfully!");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Failed to post comment";
      toast.error(message);
      throw error;
    }
  },

  /**
   * Update a comment
   */
  async updateComment(
    id: string,
    content: string,
    token: string,
    locale: string = "en"
  ) {
    try {
      const response = await axios.patch(
        `/api/${locale}/comments/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Comment updated successfully!");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Failed to update comment";
      toast.error(message);
      throw error;
    }
  },

  /**
   * Delete a comment
   */
  async deleteComment(id: string, token: string, locale: string = "en") {
    try {
      const response = await axios.delete(`/api/${locale}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Comment deleted successfully!");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Failed to delete comment";
      toast.error(message);
      throw error;
    }
  },
};
