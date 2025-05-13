import { tokenDelete, tokenFetch } from "./fetchClient";

export const authService = {
  login: (email, password) => {
    return tokenFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
  },

  register: (email, nickname, password, passwordConfirmation) => {
    return tokenFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      credentials: "include",
    });
  },

  logout: () => {
    return tokenDelete("/auth/logout");
  },
};
