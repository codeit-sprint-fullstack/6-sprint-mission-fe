import { tokenFetch } from "./fetchClient";

export const userService = {
  getMe: () => {
    //디버깅
    console.log("getMe 실행됨");

    return tokenFetch("/users/me", {
      method: "GET",
    });
  },
};
