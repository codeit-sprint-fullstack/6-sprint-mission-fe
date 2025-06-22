import { defaultFetch, tokenFetch } from "../fetchClient";

export interface QueryParams {
  [key: string]: string | number | boolean;
}

export interface ArticleForm {
  image: string;
  title: string;
  content: string;
}

// 게시글 목록 조회 (비회원 가능)
export const fetchArticles = async (params?: QueryParams): Promise<any> => {
  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return await defaultFetch(`/articles${query}`);
};

// 게시글 상세 조회 (비회원 가능)
export const fetchArticle = async (id: string | number): Promise<any> => {
  return await defaultFetch(`/articles/${id}`, { cache: "no-store" });
};

// 게시글 작성 (회원 전용)
export const createArticle = async ({
  image,
  title,
  content,
}: ArticleForm): Promise<any> => {
  return await tokenFetch("/articles", {
    method: "POST",
    body: JSON.stringify({ image, title, content }),
  });
};

// 게시글 수정 (회원 전용)
export const updateArticle = async (
  id: string | number,
  { image, title, content }: ArticleForm
): Promise<any> => {
  return await tokenFetch(`/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ image, title, content }),
  });
};

// 게시글 삭제 (회원 전용)
export const deleteArticle = async (id: string | number): Promise<any> => {
  return await tokenFetch(`/articles/${id}`, {
    method: "DELETE",
  });
};

// 게시글 좋아요/좋아요 취소 (회원 전용)
export const toggleArticleLike = async (id: string | number): Promise<any> => {
  return await tokenFetch(`/articles/${id}/like`, { method: "POST" });
};
