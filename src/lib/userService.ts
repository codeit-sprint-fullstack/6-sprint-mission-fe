import { cookieFetch } from "@/lib/fetchClient";

// FormData 전용 fetch 함수 (Content-Type 헤더 없음)
const formDataFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions: RequestInit = {
    // 쿠키 전송을 위한 설정
    credentials: "include",
    // 서버 컴포넌트에서도 매번 재검증
    cache: "no-store",
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (e) {
    return { status: response.status, ok: response.ok };
  }
};

export const userService = {
  // 사용자 정보 요청
  getMe: () => cookieFetch("/users/me"),

  // 사용자 링크 요청
  getMyLinks: () => cookieFetch("/users/me/links"),

  // 사용자 정보 업데이트 (multipart/form-data)
  updateMe: (formData: FormData) =>
    formDataFetch("/users/me", {
      method: "PATCH",
      body: formData,
    }),

  // 링크 삭제
  deleteLink: (linkId: string) =>
    cookieFetch(`/users/me/links/${linkId}`, {
      method: "DELETE",
    }),
};
