import axiosInstance from "./axiosInstance";

export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  author?: string;
  imgUrl?: string;
  heartCount?: number;
}

// 게시글 목록 조회
export const fetchArticles = async (): Promise<Article[]> => {
  const res = await axiosInstance.get("/api/articles");
  return res.data.data;
}; 