import { tokenFetch } from "./fetchClient";

export const authService = {
  getUser: () => tokenFetch("/auth/me"),

  // TODO: 좋아요 fetch 필요 없으면 삭제
  // getUserLikes: () => tokenFetch("/users/me/favorites"),

  signUp: (email, nickname, password) =>
    tokenFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password }),
    }),

  login: (email, password) =>
    tokenFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
