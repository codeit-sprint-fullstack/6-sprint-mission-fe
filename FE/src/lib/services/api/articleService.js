import { defaultFetch, tokenFetch } from "./fetchClient";

export const articleService = {
  // 게시글 목록 조회 (비회원 가능)
  getArticles: async (page = 1, pageSize = 5, orderBy = "createdAt", keyword = "") => {
    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy,
      keyword,
    }).toString();
    return await defaultFetch(`/articles?${query}`);
  },

  // 게시글 상세 조회 (비회원 가능)
  getArticle: async (articleId) => {
    return await defaultFetch(`/articles/${articleId}`);
  },

  // 게시글 작성 (회원 전용)
  createArticle: async (bodyData) => {
    return await tokenFetch("/articles", {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
  },

  // 게시글 수정 (회원 전용)
  updateArticle: async (articleId, bodyData) => {
    return await tokenFetch(`/articles/${articleId}`, {
      method: "PATCH",
      body: JSON.stringify(bodyData),
    });
  },

  // 게시글 삭제 (회원 전용)
  deleteArticle: async (articleId) => {
    return await tokenFetch(`/articles/${articleId}`, {
      method: "DELETE",
    });
  },

  // 게시글 좋아요 (회원 전용)
  likeArticle: async (articleId) => {
    return await tokenFetch(`/articles/${articleId}/like`, {
      method: "POST",
    });
  },

  // 게시글 좋아요 취소 (회원 전용)
  unlikeArticle: async (articleId) => {
    return await tokenFetch(`/articles/${articleId}/like`, {
      method: "DELETE",
    });
  },

  // 게시글 댓글 목록 조회 (비회원 가능)
  getArticleComments: async (articleId, params) => {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    return await defaultFetch(`/articles/${articleId}/comments${query}`);
  },

  // 게시글 댓글 작성 (회원 전용)
  createArticleComment: async (articleId, { content }) => {
    return await tokenFetch(`/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },

  // 게시글 댓글 수정 (회원 전용)
  updateArticleComment: async (articleId, commentId, { content }) => {
    return await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  },

  // 게시글 댓글 삭제 (회원 전용)
  deleteArticleComment: async (articleId, commentId) => {
    return await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};