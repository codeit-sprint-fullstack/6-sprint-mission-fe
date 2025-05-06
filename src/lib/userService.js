import { cookieFetch } from "@/lib/fetchClient";

export const userService = {
  // 내 정보 조회
  getMe: () => cookieFetch("/users/me"),

  // 내 정보 수정 (ex. 이름 변경 등)
  updateMe: (data) =>
    cookieFetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // 비밀번호 수정
  updatePassword: (currentPassword, newPassword) =>
    cookieFetch("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // 내가 등록한 상품 목록
  getMyProducts: () => cookieFetch("/users/me/products"),

  // 내가 좋아요 누른 상품 목록
  getFavorites: () => cookieFetch("/users/me/favorites"),
};
