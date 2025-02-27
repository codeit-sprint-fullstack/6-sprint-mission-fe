import { instance, safeExecute } from "../common";

// getProductList() : GET 메서드를 사용해 주세요.
// page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
export const getProductList = (page = 1, pageSize = 10, keyword = "") => {
  const params = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  return safeExecute(() => {
    return instance
      .get(`/products?${params.toString()}`)
      .then((res) => res.data);
  });
};

// getProduct() : GET 메서드를 사용해 주세요.
export const getProduct = async (productId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/products/${productId}`);
    return res.data;
  });
};

// createProduct() : POST 메서드를 사용해 주세요.
// request body에 name, description, price, tags, images 를 포함해 주세요.
export const createProduct = async (bodyData) => {
  return safeExecute(async () => {
    const res = await instance.post(`/products`, bodyData);
    return res.data;
  });
};

// patchProduct() : PATCH 메서드를 사용해 주세요.
export const patchProduct = async (productId, bodyData) => {
  return safeExecute(async () => {
    const res = await instance.patch(`/products/${productId}`, bodyData);
    return res.data;
  });
};

// deleteProduct() : DELETE 메서드를 사용해 주세요.
export const deleteProduct = async (productId) => {
  return safeExecute(async () => {
    const res = await instance.delete(`/products/${productId}`);
    return res.data;
  });
};
