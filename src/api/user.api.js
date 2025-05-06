import axiosInstance from "./axiosInstance";

// 현재 로그인된 사용자 정보 조회
export const getMyUserInfo = async () => {
  const res = await axiosInstance.get("/users/me");
  return res.data;
};

// 사용자 정보 수정
export const updateMyUserInfo = async (userData) => {
  const res = await axiosInstance.patch("/users/me", userData);
  return res.data;
};

// 사용자 비밀번호 변경
export const updateMyPassword = async ({ currentPassword, newPassword }) => {
  const res = await axiosInstance.patch("/users/me/password", {
    currentPassword,
    newPassword,
  });
  return res.data;
};

// 내가 등록한 상품 조회
export const getMyProducts = async () => {
  const res = await axiosInstance.get("/users/me/products");
  return res.data;
};

// 내가 찜한(좋아요한) 상품 조회
export const getMyFavorites = async () => {
  const res = await axiosInstance.get("/users/me/favorites");
  return res.data;
};
