import { instance, safeExecute } from "./common";

export const getArticleLists = async (
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
      .get(`/articles?${params.toString()}`)
      .then((res) => res.data);
  });
};

export const getArticleById = async (articleId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/articles/${articleId}`);
    return res.data;
  });
};

export const createArticle = async (bodyData) => {
  return safeExecute(async () => {
    const res = await instance.post(`/articles`, bodyData);
    return res.data;
  });
};

export const updateArticle = async (articleId, bodyData) => {
  return safeExecute(async () => {
    const res = await instance.patch(`/articles/${articleId}`, bodyData);
    return res.data;
  });
};

export const deleteArticleById = async (articleId) => {
  return safeExecute(async () => {
    const res = await instance.delete(`/articles/${articleId}`);
    return res.data;
  });
};

// 댓글

export const getArticleCommentListsById = async (articleId) =>{
  return safeExecute(async () => {
    return await instance.get(`/articles/${articleId}/comments`).then((res) => res.data);
  });
};

export const getArticleCommentById = async (articleId,commentId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/articles/${articleId}/comments/${commentId}`);
    return res.data;
  });
};

export const createArticleComment = async (articleId, bodyData) => {
  return safeExecute(async () => {
    const res = await instance.post(`/articles/${articleId}/comments`, bodyData);
    return res.data;
  });
};

export const updateArticleComment = async (articleId,commentId, bodyData) => {
  return safeExecute(async () => {
    const res = await instance.patch(`/articles/${articleId}/comments/${commentId}`, bodyData);
    return res.data;
  });
};

export const deleteArticleCommentById = async (articleId,commentId) => {
  return safeExecute(async () => {
    const res = await instance.delete(`/articles/${articleId}/comments/${commentId}`);
    return res.data;
  });
};