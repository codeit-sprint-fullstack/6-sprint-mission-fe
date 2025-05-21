import axiosInstance from "./axiosInstance";

// 회원가입 요청
export const signup = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

// 로그인 요청
export const signin = async (data) => {
  const res = await axiosInstance.post("/auth/signin", data);
  return res.data;
};
