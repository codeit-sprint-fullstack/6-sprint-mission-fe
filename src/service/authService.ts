import { tokenFetch } from "./fetchClient";

export const authService = {
  getUser: () => tokenFetch("/auth/me"),

  signUp: (email: string, nickname: string, password: string) =>
    tokenFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password }),
    }),

  login: (email: string, password: string) =>
    tokenFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
