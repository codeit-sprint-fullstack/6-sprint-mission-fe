import { Article, ArticleComment } from "@/types/article";
import axiosInstance from "./axiosInstance";

// 게시글 목록 조회
export const fetchArticles = async (): Promise<Article[]> => {
  const res = await axiosInstance.get("/articles");
  return res.data.data as Article[];
};

// 게시글 상세 조회
export const fetchArticleById = async (
  id: number | string
): Promise<Article> => {
  const res = await axiosInstance.get(`/articles/${id}`);
  return res.data as Article;
};

// 댓글 목록 조회
export const fetchCommentsByArticleId = async (
  articleId: number | string
): Promise<ArticleComment[]> => {
  const res = await axiosInstance.get(`/articles/${articleId}/comments`);
  return res.data.data || [];
};

// 댓글 등록 기능
export const postComment = async (
  articleId: number | string,
  content: string
): Promise<ArticleComment> => {
  const res = await axiosInstance.post(`/articles/${articleId}/comments`, {
    content,
  });
  return res.data as ArticleComment;
};

// 게시글 등록
export const postArticle = async (
  title: string,
  content: string
): Promise<Article> => {
  const res = await axiosInstance.post("/articles", {
    title,
    content,
  });
  return res.data as Article; // 등록된 게시글 객체 반환 (id 포함 예상)
};

// 게시글 수정 API
export const updateArticle = async (
  id: number | string,
  title: string,
  content: string
): Promise<Article> => {
  const res = await axiosInstance.patch(`/articles/${id}`, { title, content });
  return res.data as Article;
};

// 게시글 삭제 API
export const deleteArticle = async (id: number | string): Promise<void> => {
  await axiosInstance.delete(`/articles/${id}`);
};

// 댓글 수정 API
export const updateComment = async (
  commentId: number | string,
  content: string
): Promise<ArticleComment> => {
  const res = await axiosInstance.patch(`/comments/${commentId}`, { content });
  return res.data as ArticleComment;
};

// 댓글 삭제 API
export const deleteComment = async (
  commentId: number | string
): Promise<void> => {
  await axiosInstance.delete(`/comments/${commentId}`);
};
