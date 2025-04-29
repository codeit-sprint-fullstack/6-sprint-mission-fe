// lib/productService.js
import {
  defaultPandaFetch,
  cookiePandaFetch,
  formDataPandaFetch,
} from "@/lib/fetchClient";

export const productPandaService = {
  createProduct: (productData) =>
    cookiePandaFetch("/products", {
      method: "POST",

      body: productData,
    }),

  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return cookiePandaFetch(`/products?${query}`);
  },

  getProduct: (productId) => cookiePandaFetch(`/products/${productId}`),

  updateProduct: (productId, productData) =>
    cookiePandaFetch(`/products/${productId}`, {
      method: "PATCH",
      body: productData,
    }),

  deleteProduct: (productId) =>
    cookiePandaFetch(`/products/${productId}`, {
      method: "DELETE",
    }),

  addFavorite: (productId) =>
    cookiePandaFetch(`/products/${productId}/favorite`, {
      method: "POST",
    }),

  removeFavorite: (productId) =>
    cookiePandaFetch(`/products/${productId}/favorite`, {
      method: "DELETE",
    }),
};
