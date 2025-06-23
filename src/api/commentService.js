import { defaultFetch, tokenFetch } from "./fetchClient";

/**
 * 댓글 관련 API 서비스
 */

// TODO : 추후 코드잇 코드를 사용하지 않으면 리펙터링 필요
export const commentService = {
  getComments: async (type, commentId, limit = 10, cursor = 0) => {
    try {
      let queryParams = `limit=${limit}`;
      if (cursor) {
        queryParams += `&cursor=${cursor}`;
      }

      return await defaultFetch(
        `/${type}/${commentId}/comments?${queryParams}`,
      );
    } catch (error) {
      console.error("댓글 목록 조회 오류:", error);
      throw error; // 에러 전파
    }
  },

  createComment: async (type, commentId, content) => {
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

  updateComment: async (commentId, content) => {
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

  deleteComment: async (commentId) => {
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
