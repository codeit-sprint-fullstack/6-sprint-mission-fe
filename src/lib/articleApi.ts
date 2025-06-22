import { Article, CreateArticleRequest } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`${API_BASE}/article`);
  return res.json();
};

export const getArticle = async (id: number): Promise<Article> => {
  const res = await fetch(`${API_BASE}/article/${id}`);
  return res.json();
};

export const createArticle = async (
  formData: CreateArticleRequest,
  token: string
): Promise<Article> => {
  const res = await fetch(`${API_BASE}/article`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const updateArticle = async (
  id: number,
  data: Partial<CreateArticleRequest>,
  token: string
): Promise<Article> => {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: "PUT",
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteArticle = async (
  id: number,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
};

export const likeArticle = async (id: number, token: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/article/${id}/like`, {
    method: "POST",
    headers: authHeader(token),
  });
  return res.json();
};

export const unlikeArticle = async (
  id: number,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE}/article/${id}/like`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
};

export const checkArticleLiked = async (
  id: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/article/${id}/like`, {
    method: "GET",
    headers: authHeader(token),
  });
  return res.json();
};
