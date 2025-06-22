import { defaultFetch, tokenFetch, cookieFetch } from "./fetchClient";

export interface RegisterParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  ok: boolean;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

export const authService = {
  register: async ({ email, nickname, password, passwordConfirmation }: RegisterParams): Promise<AuthResponse> => {
    return await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });
  },

  login: async ({ email, password }: LoginParams): Promise<AuthResponse> => {
    return await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  refreshToken: async (): Promise<AuthResponse> => {
    return await tokenFetch("/auth/refresh-token", {
      method: "POST",
    });
  },

  logout: async (): Promise<AuthResponse> => {
    return await cookieFetch("/auth/signOut", {
      method: "DELETE",
    });
  },
};
