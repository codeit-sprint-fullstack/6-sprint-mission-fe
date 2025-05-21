import { tokenFetch } from "./fetchClient";

export const authService = {
  getUser: () => tokenFetch("/auth/me"),

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
