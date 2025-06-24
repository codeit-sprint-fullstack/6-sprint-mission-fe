import { defaultFetch, tokenFetch } from "./fetchClient";

export interface Article {
  id: number;
  userId: string;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
  writer?: { nickname: string };
  likeCount?: number;
}

export interface ArticleComment {
  id: number;
  content: string;
  writer: { nickname: string };
  createdAt: string;
}

export interface ArticleListResponse {
  list: Article[];
  totalCount?: number;
}

export interface ArticleCommentListResponse {
  list: ArticleComment[];
  totalCount?: number;
}

export interface NewArticle {
  title: string;
  content: string;
  images: string[];
}

export interface EditArticle extends NewArticle {}

export const articleService = {
  // 게시글 목록 조회 (비회원 가능)
  getArticles: async (
    page = 1,
    pageSize = 5,
    orderBy = "recent",
    keyword = ""
  ): Promise<ArticleListResponse> => {
    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy,
      keyword,
    }).toString();
    return await defaultFetch(`/articles?${query}`);
  },

  // 게시글 상세 조회 (비회원 가능)
  getArticle: async (articleId: number | string): Promise<Article> => {
    return await defaultFetch(`/articles/${articleId}`);
  },

  // 게시글 작성 (회원 전용)
  createArticle: async (bodyData: NewArticle): Promise<{ id: number }> => {
    return await tokenFetch("/articles", {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
  },

  // 게시글 수정 (회원 전용)
  updateArticle: async (
    articleId: number | string,
    bodyData: EditArticle
  ): Promise<Article> => {
    return await tokenFetch(`/articles/${articleId}`, {
      method: "PATCH",
      body: JSON.stringify(bodyData),
    });
  },

  // 게시글 삭제 (회원 전용)
  deleteArticle: async (articleId: number | string): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/articles/${articleId}`, {
      method: "DELETE",
    });
  },

  // 게시글 좋아요 (회원 전용)
  likeArticle: async (articleId: number | string): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/articles/${articleId}/like`, {
      method: "POST",
    });
  },

  // 게시글 좋아요 취소 (회원 전용)
  unlikeArticle: async (articleId: number | string): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/articles/${articleId}/like`, {
      method: "DELETE",
    });
  },

  // 게시글 댓글 목록 조회 (비회원 가능)
  getArticleComments: async (
    articleId: number | string,
    params?: Record<string, string | number>
  ): Promise<ArticleCommentListResponse> => {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : "";
    return await defaultFetch(`/articles/${articleId}/comments${query}`);
  },

  // 게시글 댓글 작성 (회원 전용)
  createArticleComment: async (
    articleId: number | string,
    { content }: { content: string }
  ): Promise<ArticleComment> => {
    return await tokenFetch(`/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },

  // 게시글 댓글 수정 (회원 전용)
  updateArticleComment: async (
    articleId: number | string,
    commentId: number | string,
    { content }: { content: string }
  ): Promise<ArticleComment> => {
    return await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  },

  // 게시글 댓글 삭제 (회원 전용)
  deleteArticleComment: async (
    articleId: number | string,
    commentId: number | string
  ): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};