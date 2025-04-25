import { tokenFetch } from "./fetchClient";

export const userService = {
  // 내 정보 조회
  getMe: async () => {
    return await tokenFetch("/users/me");
  },

  // 내 정보 수정 (프로필 이미지 수정)
  updateMe: async ({ image }) => {
    return await tokenFetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ image }),
    });
  },

  // 비밀번호 변경
  updateMyPassword: async ({
    passwordConfirmation,
    password,
    currentPassword,
  }) => {
    return await tokenFetch("/users/me/password", {
      // 비밀번호 변경 API 엔드포인트가 다를 수 있습니다.
      method: "PATCH",
      body: JSON.stringify({ passwordConfirmation, password, currentPassword }),
    });
  },

  // 내 상품 조회 (페이징, 검색 등 쿼리 파라미터 지원)
  getMyProduct: async (params) => {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    return await tokenFetch(`/users/me/products${query}`);
  },

  // 내 최애(찜 목록) 조회 (페이징, 검색 등 쿼리 파라미터 지원)
  getMyFavorites: async (params) => {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    return await tokenFetch(`/users/me/favorites${query}`);
  },
};
