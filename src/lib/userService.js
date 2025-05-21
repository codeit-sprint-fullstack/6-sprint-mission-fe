import { tokenFetch } from "./fetchClient";

export const userService = {
  getMe: () => {
    return tokenFetch("/users/me", {
      method: "GET",
    });
  },
};
