import { tokenFetch } from "./fetchClient";

export const authService = {
  getUser: () => tokenFetch("/users/me"),

  signUp: (email, nickname, password, passwordConfirmation) =>
    tokenFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    }),

  login: (email, password) =>
    tokenFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
