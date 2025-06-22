import { AuthResponse, SignInPayload, SignUpPayload } from "@/types/auth";
import axiosInstance from "./axiosInstance";

// 회원가입
export const signUp = async ({
  email,
  nickname,
  password,
}: SignUpPayload): Promise<void> => {
  await axiosInstance.post("/auth/signUp", {
    email,
    nickname,
    password,
  });
};

// 로그인
export const signIn = async ({
  email,
  password,
}: SignInPayload): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/signIn", {
    email,
    password,
  });
  return res.data;
};

// 로그아웃 (클라이언트 사이드)
export const signOut = (): void => {
  localStorage.removeItem("accessToken");
  // 필요시 서버에 로그아웃 요청 추가
  // return axiosInstance.post("/auth/signOut");
};

// 토큰 존재 여부 확인
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("accessToken");
};

// 현재 저장된 토큰 가져오기
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};
