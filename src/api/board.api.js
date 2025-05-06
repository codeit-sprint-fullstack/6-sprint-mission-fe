import axiosInstance from "./axiosInstance";

// 게시글 목록 조회
export const fetchArticles = async () => {
  const res = await axiosInstance.get("/articles");
  return res.data.data;
};

// 게시글 상세 조회
export const fetchArticleById = async (id) => {
  const res = await axiosInstance.get(`/articles/${id}`);
  return res.data;
};

// 댓글 목록 조회
export const fetchCommentsByArticleId = async (articleId) => {
  const res = await axiosInstance.get(`/articles/${articleId}/comments`);
  return res.data.data || [];
};

// 댓글 등록 기능
export const postComment = async (articleId, content) => {
  const res = await axiosInstance.post(`/articles/${articleId}/comments`, {
    content,
  });
  return res.data;
};

// 게시글 등록
export const postArticle = async (title, content) => {
  const res = await axiosInstance.post("/articles", {
    title,
    content,
  });
  return res.data; // 등록된 게시글 객체 반환 (id 포함 예상)
};

// 게시글 수정 API
export const updateArticle = async (id, title, content) => {
  const res = await axiosInstance.patch(`/articles/${id}`, { title, content });
  return res.data;
};

// 게시글 삭제 API
export const deleteArticle = async (id) => {
  await axiosInstance.delete(`/articles/${id}`);
};

// 댓글 수정 API
export const updateComment = async (commentId, content) => {
  const res = await axiosInstance.patch(`/comments/${commentId}`, { content });
  return res.data;
};

// 댓글 삭제 API
export const deleteComment = async (commentId) => {
  await axiosInstance.delete(`/comments/${commentId}`);
};
