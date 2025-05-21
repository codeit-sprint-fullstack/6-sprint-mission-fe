import { defaultFetch, tokenFetch } from "../fetchClient";

// 게시글 목록 조회 (비회원 가능)
export const fetchArticles = async (params) => {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return await defaultFetch(`/articles${query}`);
};

// 게시글 상세 조회 (비회원 가능)
export const fetchArticle = async (id) => {
  return await defaultFetch(`/articles/${id}`, { cache: "no-store" });
};

// 게시글 작성 (회원 전용)
export const createArticle = async ({ image, title, content }) => {
  return await tokenFetch("/articles", {
    method: "POST",
    body: JSON.stringify({ image, title, content }),
  });
};

// 게시글 수정 (회원 전용)
export const updateArticle = async (id, { image, title, content }) => {
  return await tokenFetch(`/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ image, title, content }),
  });
};

// 게시글 삭제 (회원 전용)
export const deleteArticle = async (id) => {
  return await tokenFetch(`/articles/${id}`, {
    method: "DELETE",
  });
};

// 게시글 좋아요/좋아요 취소 (회원 전용)
export const toggleArticleLike = async (id) => {
  return await tokenFetch(`/articles/${id}/like`, { method: "POST" });
};
