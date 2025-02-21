//import axios from "axios";
//import axios from "./node_modules/axios/dist/esm/axios.min.js";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm";

// 인스턴스
const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/",
});

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

// getArticleList() : GET 메서드를 사용해 주세요.
// page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
export const getArticleList = async () => {
  return handleError(async () => {
    const res = await instance.get(`/articles`);
    return res.data;
  });
};

// getArticle() : GET 메서드를 사용해 주세요.
export const getArticle = async (articleId) => {
  return handleError(async () => {
    const res = await instance.get(`/articles/${articleId}`);
    return res.data;
  });
};

// createArticle() : POST 메서드를 사용해 주세요.
// request body에 title, content, image 를 포함해 주세요.
export const createArticle = async (bodyData) => {
  return handleError(async () => {
    const res = await instance.post(`/articles`, bodyData);
    return res.data;
  });
};

// patchArticle() : PATCH 메서드를 사용해 주세요.
export const patchArticle = async (articleId, bodyData) => {
  return handleError(async () => {
    const res = await instance.patch(`/articles/${articleId}`, bodyData);
    return res.data;
  });
};

// deleteArticle() : DELETE 메서드를 사용해 주세요.
export const deleteArticle = async (articleId) => {
  return handleError(async () => {
    const res = await instance.delete(`/articles/${articleId}`);
    return res.data;
  });
};
