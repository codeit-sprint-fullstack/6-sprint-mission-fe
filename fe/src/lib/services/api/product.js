import { instance, safeExecute } from "./common";

export const getProductLists = async (
  page = 1,
  pageSize = 5,
  orderBy = "createdAt",
  keyword = ""
) => {
  const params = new URLSearchParams({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  return safeExecute(async () => {
    return await instance
      .get(`/products?${params.toString()}`)
      .then((res) => res.data);
  });
};

export const getProductById = async (productId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/products/${productId}`);
    return res.data;
  });
};

export const createProduct = async (bodyData) => {
  return safeExecute(async () => {
    const res = await instance.post(`/products`, bodyData);
    return res.data;
  });
};

export const updateProduct = async (productId, bodyData) => {
  return safeExecute(async () => {
    const res = await instance.patch(`/products/${productId}`, bodyData);
    return res.data;
  });
};

export const deleteProduct = async (productId) => {
  return safeExecute(async () => {
    const res = await instance.delete(`/products/${productId}`);
    return res.data;
  });
};

// 댓글


export const getProductCommentLists = async (productId) =>{
  return safeExecute(async () => {
    return await instance.get(`/products/${productId}/comments`).then((res) => res.data);
  });
};

export const getProductCommentById = async (productId,commentId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/products/${productId}/comments/${commentId}`);
    return res.data;
  });
};

export const createProductComment = async (productId, bodyData) => {
  return safeExecute(async () => {
    const res = await instance.post(`/products/${productId}/comments`, bodyData);
    return res.data;
  });
};

export const updateProductComment = async (productId,commentId, bodyData) => {
  return safeExecute(async () => {
    const res = await instance.patch(`/products/${productId}/comments/${commentId}`, bodyData);
    return res.data;
  });
};

export const deleteProductComment = async (productId,commentId) => {
  return safeExecute(async () => {
    const res = await instance.delete(`/products/${productId}/comments/${commentId}`);
    return res.data;
  });
};