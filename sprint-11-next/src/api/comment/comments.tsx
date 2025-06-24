import { defaultFetch, tokenFetch } from "../fetchClient";

export interface QueryParams {
  [key: string]: string | number | boolean;
}

export interface CommentForm {
  content: string;
}

// 상품 댓글 조회 (비회원 가능)
export const getProductComent = async (
  id: string | number,
  { params }: { params?: QueryParams }
): Promise<any> => {
  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return await defaultFetch(`/products/${id}/comments${query}`, {
    cache: "no-store",
  });
};

// 게시글 댓글 조회 (비회원 가능)
export const getArticleComent = async (
  id: string | number,
  { params }: { params?: QueryParams }
): Promise<any> => {
  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return await defaultFetch(`/articles/${id}/comments${query}`, {
    cache: "no-store",
  });
};

// 상품 댓글 작성 (회원 전용)
export const postProductComent = async (
  id: string | number,
  { content }: CommentForm
): Promise<any> => {
  return await tokenFetch(`/products/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

// 게시글 댓글 작성 (회원 전용)
export const postArticleComent = async (
  id: string | number,
  { content }: CommentForm
): Promise<any> => {
  return await tokenFetch(`/articles/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

// 댓글 수정 (회원 전용)
export const updateComments = async (
  id: string | number,
  { content }: CommentForm
): Promise<any> => {
  return await tokenFetch(`/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
};

// 댓글 삭제 (회원 전용)
export const deleteComments = async (id: string | number): Promise<any> => {
  return await tokenFetch(`/comments/${id}`, {
    method: "DELETE",
  });
};
