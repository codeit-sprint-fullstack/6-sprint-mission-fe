import { User } from "@/types/user";
import { tokenFetch } from "./common/fetchClient";

// FormData 전용 fetch 함수 (Content-Type 헤더 없음)
const formDataFetch = async (url: string, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    // 쿠키 전송을 위한 설정
    credentials: "include" as const,
    // 서버 컴포넌트에서도 매번 재검증
    cache: "no-store" as const,
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: response.status, ok: response.ok };
  }
};

export const userService = {
  // 사용자 정보 요청
  getMe: () => tokenFetch("/user/me"),

  // 사용자 정보 업데이트 (multipart/form-data)
  updateMe: (formData: User) =>
    formDataFetch("/user/me", {
      method: "PATCH",
      body: formData,
    }),

  // 비밀번호 변경
  updatePassword: (password: string) =>
    tokenFetch("/user/me/password", {
      method: "PATCH",
      body: password,
    }),
};
