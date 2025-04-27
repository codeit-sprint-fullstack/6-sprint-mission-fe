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
    await defaultFetch(`/products/${productId}`),

  updateProduct: async (productId, editProductForm) =>
    await defaultFetch(`/products/${productId}`, {
      method: "PATCH",
      editProductForm,
    }),

  deleteProduct: async (productId) =>
    await defaultFetch(`/products/${productId}`, {
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
