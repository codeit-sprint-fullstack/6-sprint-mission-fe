import { tokenFetch } from "./fetchClient";

// FormData 전용 fetch 함수 (Content-Type 헤더 없음)
const formDataFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    // 쿠키 전송을 위한 설정
    credentials: "include",
    // 서버 컴포넌트에서도 매번 재검증
    cache: "no-store",
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
  } catch (e) {
    return { status: response.status, ok: response.ok };
  }
};

export const userService = {
  // 사용자 정보 요청
  getMe: () => tokenFetch("/users/me"),

  // 사용자 정보 업데이트 (multipart/form-data)
  updateMe: (formData) =>
    formDataFetch("/users/me", {
      method: "PATCH",
      body: formData,
    }),

  // 비밀번호 변경
  updatePassword: (password) =>
    tokenFetch("/users/me/password", {
      method: "PATCH",
      body: password,
    }),

  // 내 상품 조회
  getMyProducts: (page, pageSize, keyword) => tokenFetch("/users/me/products"),

  // 찜한 상품 조회
  getMyfavorites: (page, pageSize, keyword) =>
    tokenFetch(`/users/me/favorites`),
};
