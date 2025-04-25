import React from "react";
import { tokenFetch } from "./fetchClient";

export const authService = {
  login: (email, password) => {
    return tokenFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: (email, nickname, password) => {
    tokenFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password }),
    });
  },

  //엔드 포인트???
  //  logout: () => tokenFetch("/")
};
