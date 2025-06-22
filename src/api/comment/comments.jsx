import { defaultFetch, tokenFetch } from "../fetchClient";

//상품 댓글 조회 (비회원 가능)
export const getProductComent = async (id, { params }) => {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return await defaultFetch(`/products/${id}/comments${query}`, {
    cache: "no-store",
  });
};

//게시글 댓글 조회 (비회원 가능)
export const getArticleComent = async (id, { params }) => {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return await defaultFetch(`/articles/${id}/comments${query}`, {
    cache: "no-store",
  });
};

//상품 댓글 작성 (회원 전용)
export const postProductComent = async (id, { content }) => {
  return await tokenFetch(`/products/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

//게시글 댓글 작성 (회원 전용)
export const postArticleComent = async (id, { content }) => {
  return await tokenFetch(`/articles/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

//댓글 수정 (회원 전용)
export const updateComments = async (id, { content }) => {
  return await tokenFetch(`/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
};

//댓글 삭제 (회원 전용)
export const deleteComments = async (id) => {
  return await tokenFetch(`/comments/${id}`, {
    method: "DELETE",
  });
};
