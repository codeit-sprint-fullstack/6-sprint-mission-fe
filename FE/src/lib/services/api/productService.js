import { defaultFetch, tokenFetch } from "./fetchClient";

export const productService = {
  // 상품 목록 조회 (비회원 가능)
  getProducts: async (page = 1, pageSize = 5, orderBy = "recent", keyword = "") => {
    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy,
      keyword,
    }).toString();
    return await defaultFetch(`/products?${query}`);
  },

  // 상품 상세 조회 (비회원 가능)
  getProduct: async (id) => {
    return await defaultFetch(`/products/${id}`);
  },

  // 상품 등록 (회원 전용)
  createProduct: async ({ images, tags, price, description, name }) => {
    return await tokenFetch("/products", {
      method: "POST",
      body: JSON.stringify({ images, tags, price, description, name }),
    });
  },

  // 상품 수정 (회원 전용)
  updateProduct: async (id, { images, tags, price, description, name }) => {
    return await tokenFetch(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ images, tags, price, description, name }),
    });
  },

  // 상품 삭제 (회원 전용)
  deleteProduct: async (id) => {
    return await tokenFetch(`/products/${id}`, {
      method: "DELETE",
    });
  },

  // 상품 좋아요 (회원 전용)
  likeProduct: async (id) => {
    return await tokenFetch(`/products/${id}/favorite`, {
      method: "POST",
    });
  },

  // 좋아요 취소 (회원 전용)
  unlikeProduct: async (id) => {
    return await tokenFetch(`/products/${id}/favorite`, {
      method: "DELETE",
    });
  },

  // 상품 댓글 목록 조회 (비회원 가능)
  getProductComments: async (id, limit = 3, cusor = 0) => {
    const query = new URLSearchParams({
      limit: limit.toString(),
      cusor: cusor.toString(),
    }).toString();
    return await defaultFetch(`/products/${id}/comments?${query}`);
  },

  // 상품 댓글 작성 (회원 전용)
  createProductComment: async (id, { content }) => {
    return await tokenFetch(`/products/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },

  // 상품 댓글 수정 (회원 전용)
  updateProductComment: async (commentId, { content }) => {
    return await tokenFetch(`/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  },

  // 상품 댓글 삭제 (회원 전용)
  deleteProductComment: async (commentId) => {
    return await tokenFetch(`/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};
