import { instance, safeExecute } from "../common";

// getArticleList() : GET 메서드를 사용해 주세요.
// page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
export const getArticleList = (page = 1, pageSize = 10, keyword = "") => {
  const params = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  return safeExecute(() => {
    return instance
      .get(`/articles?${params.toString()}`)
      .then((res) => res.data);
  });
};

// getArticle() : GET 메서드를 사용해 주세요.
export const getArticle = (articleId) => {
  return safeExecute(() => {
    return instance.get(`/articles/${articleId}`).then((res) => res.data);
  });
};

// createArticle() : POST 메서드를 사용해 주세요.
// request body에 title, content, image 를 포함해 주세요.
export const createArticle = (bodyData) => {
  return safeExecute(() => {
    return instance.post(`/articles`, bodyData).then((res) => res.data);
  });
};

// patchArticle() : PATCH 메서드를 사용해 주세요.
export const patchArticle = (articleId, bodyData) => {
  return safeExecute(() => {
    return instance
      .patch(`/articles/${articleId}`, bodyData)
      .then((res) => res.data);
  });
};

// deleteArticle() : DELETE 메서드를 사용해 주세요.
export const deleteArticle = (articleId) => {
  return safeExecute(() => {
    return instance.delete(`/articles/${articleId}`).then((res) => res.data);
  });
};
