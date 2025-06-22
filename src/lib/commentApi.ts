import { Comment, CreateCommentRequest } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const getComments = async (articleId: number): Promise<Comment[]> => {
  const res = await fetch(`${API_BASE}/article/${articleId}/comment`);
  return res.json();
};

export const createComment = async (
  articleId: number,
  data: CreateCommentRequest,
  token: string
): Promise<Comment> => {
  const res = await fetch(`${API_BASE}/article/${articleId}/comment`, {
    method: "POST",
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateComment = async (
  commentId: number,
  data: CreateCommentRequest,
  token: string
): Promise<Comment> => {
  const res = await fetch(`${API_BASE}/comment/${commentId}`, {
    method: "PUT",
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteComment = async (
  commentId: number,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE}/comment/${commentId}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
};
