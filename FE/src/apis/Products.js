import { instance, safeExecute } from "./Common";

export const getProductsList = async (
  page = 1,
  pageSize = 5,
  orderBy = "recent",
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
      .then((res) => res.data.list);
  });
};

export const getProduct = async (productId) => {
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

export const patchProduct = async (productId, bodyData) => {
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
