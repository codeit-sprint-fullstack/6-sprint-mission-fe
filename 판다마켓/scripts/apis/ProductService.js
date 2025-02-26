//import axios from "axios";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm";

import { instance } from "../common";

// 에러 처리
const handleError = (func) => {
  try {
    return func();
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log("requset failed");
    }
  }
};

// getProductList() : GET 메서드를 사용해 주세요.
// page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
export const getProductList = async () => {
  return handleError(async () => {
    const res = await instance.get(`/products`);
    return res.data;
  });
};

// getProduct() : GET 메서드를 사용해 주세요.
export const getProduct = async (productId) => {
  return handleError(async () => {
    const res = await instance.get(`/products/${productId}`);
    return res.data;
  });
};

// createProduct() : POST 메서드를 사용해 주세요.
// request body에 name, description, price, tags, images 를 포함해 주세요.
export const createProduct = async (bodyData) => {
  return handleError(async () => {
    const res = await instance.post(`/products`, bodyData);
    return res.data;
  });
};

// patchProduct() : PATCH 메서드를 사용해 주세요.
export const patchProduct = async (productId, bodyData) => {
  return handleError(async () => {
    const res = await instance.patch(`/products/${productId}`, bodyData);
    return res.data;
  });
};

// deleteProduct() : DELETE 메서드를 사용해 주세요.
export const deleteProduct = async (productId) => {
  return handleError(async () => {
    const res = await instance.delete(`/products/${productId}`);
    return res.data;
  });
};
