import { TUser } from "@/types";

export const userAPI = {
  login: (email: TUser["email"], password: TUser["password"]) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),
  register: (
    email: TUser["email"],
    nickname: TUser["nickname"],
    password: TUser["password"],
    image: TUser["image"]
  ) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nickname, password, image }),
    }),
  refresh: (refreshToken: string) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }),
  getMe: () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }),
  getFavorites: () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/favorites`),
};
