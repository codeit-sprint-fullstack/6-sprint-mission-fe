"use client";

import { Product } from "@/types/product";
import { defaultFetch, tokenFetch } from "./common/fetchClient";

export const productsService = {
  // 상품 생성
  createProduct: async (productData: FormData) => {
    const isFormData = productData instanceof FormData;

    try {
      const result = await tokenFetch("/products", {
        method: "POST",
        body: isFormData ? productData : JSON.stringify(productData),
        headers: isFormData
          ? undefined // 헤더 없이 전송해서 브라우저가 자동으로 설정하도록 함
          : { "Content-Type": "application/json" },
      });

      return result;
    } catch (err) {
      console.error("상품 생성 요청 실패:", err);
      throw err;
    }
  },

  getProducts: async (
    page: number,
    pageSize: number,
    orderBy: string,
    keyWord: string
  ) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const result = await tokenFetch(
        `/products?page=${page - 1}&pageSize=${pageSize}&orderBy=${orderBy}&keyWord=${keyWord}`
      );

      return result;
    } else {
      console.log("accessToken 없음");
      const result = await defaultFetch(
        `/products?page=${page - 1}&pageSize=${pageSize}&orderBy=${orderBy}&keyWord=${keyWord}`
      );

      return result;
    }
  },

  getDetailProduct: async (productId: Product["id"]) =>
    await tokenFetch(`/products/${productId}`),

  updateProduct: async (
    productId: Product["id"],
    editProductForm: FormData
  ) => {
    const isFormData = editProductForm instanceof FormData;

    try {
      const result = await tokenFetch(`/products/${productId}`, {
        method: "PATCH",
        body: isFormData ? editProductForm : JSON.stringify(editProductForm),
        headers: isFormData
          ? undefined // ✅ 또는 생략
          : { "Content-Type": "application/json" },
      });

      return result;
    } catch (err) {
      console.error("상품 수정 요청 실패:", err);
      throw err;
    }
  },

  deleteProduct: async (productId: Product["id"]) =>
    await tokenFetch(`/products/${productId}`, {
      method: "DELETE",
    }),

  likeProduct: async (productId: Product["id"]) =>
    await tokenFetch(`/products/${productId}/like`, {
      method: "POST",
    }),

  unLikeProduct: async (productId: Product["id"]) =>
    await tokenFetch(`/products/${productId}/like`, {
      method: "DELETE",
    }),
};
