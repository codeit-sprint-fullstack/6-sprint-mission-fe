import { tokenDelete, tokenFetch } from "./fetchClient";

interface LoginResponse {
  token?: string;
  userId?: number;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

export const authService = {
  login: (email: string, password: string): Promise<LoginResponse> => {
    return tokenFetch<LoginResponse>("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
  },

  register: (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ): Promise<RegisterResponse> => {
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
