import { UpdatePasswordPayload, User } from "@/types/user";
import axiosInstance from "./axiosInstance";
import { Product } from "@/types/product";

// 현재 로그인된 사용자 정보 조회
export const getMyUserInfo = async (): Promise<User> => {
  const res = await axiosInstance.get("/users/me");
  return res.data as User;
};

// 사용자 정보 수정
export const updateMyUserInfo = async (
  userData: Partial<User>
): Promise<User> => {
  const res = await axiosInstance.patch("/users/me", userData);
  return res.data as User;
};

// 사용자 비밀번호 변경
export const updateMyPassword = async (
  payload: UpdatePasswordPayload
): Promise<void> => {
  const res = await axiosInstance.patch("/users/me/password", payload);
  return res.data;
};

// 내가 등록한 상품 조회
export const getMyProducts = async (): Promise<Product[]> => {
  const res = await axiosInstance.get("/users/me/products");
  return res.data as Product[];
};

// 내가 찜한(좋아요한) 상품 조회
export const getMyFavorites = async (): Promise<Product[]> => {
  const res = await axiosInstance.get("/users/me/favorites");
  return res.data as Product[];
};
