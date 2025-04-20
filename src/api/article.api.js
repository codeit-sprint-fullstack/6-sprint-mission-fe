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
