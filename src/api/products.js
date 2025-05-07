"use client";

import { defaultFetch, tokenFetch } from "./fetchClient";

export const productsSevice = {
  // create는 현재 다른 서버에 연결중
  createProduct: async () => await defaultFetch(`/products/${productId}`),

  getProducts: async (page, pageSize, orderBy, keyWord) =>
    await defaultFetch(
      `/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyWord=${keyWord}`,
    ),

  getDetailProdut: async (productId) =>
    await tokenFetch(`/products/${productId}`),

  // 에러는 안남 근데 수정이 안됨 왜 그런지 모르겠음 서버쪽 문제?

  updateProduct: async (productId, editProductForm) =>
    await tokenFetch(`/products/${productId}`, {
      method: "PATCH",
      editProductForm,
    }),

  deleteProduct: async (productId) =>
    await tokenFetch(`/products/${productId}`, {
      method: "DELETE",
    }),

  likeProduct: async (productId) =>
    await tokenFetch(`/products/${productId}/favorite`, {
      method: "POST",
    }),

  unLikeProduct: async (productId) =>
    await tokenFetch(`/products/${productId}/favorite`, {
      method: "DELETE",
    }),
};
