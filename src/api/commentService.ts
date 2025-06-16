/**
 * 댓글 관련 API 서비스
 */

import { Comment } from "@/types/comment";
import { defaultFetch, tokenFetch } from "./common/fetchClient";

export const commentService = {
  getComments: async (
    type: string,
    commentId: Comment["id"],
    limit: number,
    cursor: number | null
  ) => {
    try {
      let queryParams = `limit=${limit}`;
      if (cursor) {
        queryParams += `&cursor=${cursor}`;
      }

      return await defaultFetch(
        `/${type}/${commentId}/comments?${queryParams}`
      );
    } catch (error) {
      console.error("댓글 목록 조회 오류:", error);
      throw error; // 에러 전파
    }
  },

  createComment: async (
    type: string,
    commentId: Comment["id"],
    content: Comment["content"]
  ) => {
    try {
      return await tokenFetch(`/${type}/${commentId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      console.error("댓글 작성 오류:", error);
      throw error;
    }
  },

  updateComment: async (
    commentId: Comment["id"],
    content: Comment["content"]
  ) => {
    try {
      return await tokenFetch(`/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      throw error;
    }
  },

  deleteComment: async (commentId: Comment["id"]) => {
    try {
      return await tokenFetch(`/comments/${commentId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      throw error;
    }
  },
};
