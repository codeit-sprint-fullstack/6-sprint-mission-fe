import { defaultFetch, tokenFetch } from "@/lib/fetchClient";

export const authService = {
  // 회원가입
  signUp: async ({ email, nickname, password, passwordConfirmation }) =>
    defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    }),

  // 로그인
  signIn: async (email, password) => {
    const res = await tokenFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.accessToken) {
      localStorage.setItem("accessToken", res.accessToken);
    }

    return res;
  },
};
