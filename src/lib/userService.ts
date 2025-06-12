import { tokenFetch } from "./fetchClient";

export interface UserType {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  // role?: string; // 필요시 추가
}

export const userService = {
  getMe: async (): Promise<UserType> => {
    return tokenFetch("/users/me", {
      method: "GET",
    });
  },
};
