import axiosInstance from "./axiosInstance";

// 게시글 목록 조회
export const fetchArticles = async () => {
  const res = await axiosInstance.get("/articles");
  return res.data.data; // 실제 게시글 목록만 리턴
};
