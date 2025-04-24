import { defaultFetch, tokenFetch } from "@/api/fetchClient";

export const authService = {
  // 로그인
  signIn: async (email, password) => {
    const result = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (result.accessToken) {
      localStorage.setItem("acessToken", result.accessToken);
    }

    return result;
  },

  // 회원가입
  signUp: (email, nickname, password, passwordConfirmation) => {
    const result = defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    if (result.accessToken) {
      localStorage.setItem("acessToken", result.accessToken);
    }

    return result;
  },

  // 로그아웃
  logout: () => tokenFetch("/auth/logout", { method: "DELETE" }),
};
