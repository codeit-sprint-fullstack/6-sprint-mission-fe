import { tokenFetch } from "../fetchClient";

// 내 정보 조회
export const getMe = async () => {
  return await tokenFetch("/users/me");
};

// 내 정보 수정
export const updateMe = async ({ image }) => {
  return await tokenFetch("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ image }),
  });
};

// 비밀번호 변경
export const updateMyPassword = async ({ passwordConfirmation, password, currentPassword }) => {
  return await tokenFetch("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ passwordConfirmation, password, currentPassword }),
  });
};

// 내 상품 조회
export const getMyProduct = async ({ params }) => {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return await tokenFetch(`/users/me/products${query}`);
};

// 내 최애(찜 목록) 조회
export const getMyFavorites = async ({ params }) => {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return await tokenFetch(`/users/me/favorites${query}`);
};
