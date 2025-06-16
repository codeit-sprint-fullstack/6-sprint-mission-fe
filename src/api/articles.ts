"use client";

import { Article } from "@/types/article";
import { defaultFetch, tokenFetch } from "./common/fetchClient";
import { Comment } from "@/types/comment";

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777";
// const API_BASE_URL = "http://localhost:7777";

// 환경 정보 로깅 (개발 중에만 표시)
if (process.env.NODE_ENV !== "production") {
  console.log("현재 환경:", process.env.NODE_ENV);
  console.log("API URL:", API_BASE_URL);
}

export const articlesService = {
  // 게시글 목록 조회
  getArticles: async ({
    offset = 0,
    limit = 10,
    search = "",
    sort = "latest",
  } = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append("offset", offset.toString());
    queryParams.append("limit", limit.toString());
    queryParams.append("sort", sort);
    if (search) queryParams.append("search", search);

    return await tokenFetch(`/articles?${queryParams.toString()}`);
  },

  // 특정 게시글 조회
  getArticle: async (articleId: Article["id"]) =>
    await tokenFetch(`/articles/${articleId}`),

  // 게시글 작성
  createArticle: async ({
    title,
    content,
    images,
  }: Pick<Article, "title" | "content" | "images">) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 이미지가 배열인 경우 여러 장 처리
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }
    // 단일 이미지인 경우
    else if (images && !Array.isArray(images)) {
      formData.append("images", images);
    }

    return await tokenFetch("/articles", {
      method: "POST",
      body: formData,
    });
  },

  // 게시글 수정
  updateArticle: async (
    articleId: Article["id"],
    { title, content, images }: Pick<Article, "title" | "content" | "images">
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 이미지가 배열인 경우 여러 장 처리
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }
    // 단일 이미지인 경우
    else if (images && !Array.isArray(images)) {
      formData.append("images", images);
    }

    return await tokenFetch(`/articles/${articleId}`, {
      method: "PATCH",
      body: formData,
    });
  },

  // 게시글 삭제
  deleteArticle: async (articleId: Article["id"]) =>
    await tokenFetch(`/articles/${articleId}`, {
      method: "DELETE",
    }),

  // 좋아요 추가
  createLiked: async (articleId: Article["id"]) =>
    await tokenFetch(`/articles/${articleId}/like`, {
      method: "POST",
    }),

  // 좋아요 취소
  deleteLiked: async (articleId: Article["id"]) =>
    await tokenFetch(`/articles/${articleId}/like`, {
      method: "DELETE",
    }),

  // 댓글 목록 조회
  getComments: async (articleId: Article["id"]) =>
    await defaultFetch(`/articles/${articleId}/comments`),

  // 댓글 작성
  createComment: async (
    articleId: Article["id"],
    content: Comment["content"]
  ) =>
    await tokenFetch(`/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify(content),
    }),

  // 댓글 수정
  updateComment: async (
    articleId: Article["id"],
    commentId: Comment["id"],
    content: Comment["content"]
  ) =>
    await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(content),
    }),

  // 댓글 삭제
  deleteComment: async (articleId: Article["id"], commentId: Comment["id"]) =>
    await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "DELETE",
    }),
};
