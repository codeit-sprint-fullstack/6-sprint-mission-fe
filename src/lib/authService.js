import { defaultFetch, cookieFetch } from "@/lib/fetchClient";

export const authService = {
  // 쿠키 인증을 사용하는 로그인
  login: async (email, password) => {
    const result = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // 로컬스토리지에 accessToken, refreshToken 저장
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    return result;
  },

  // 회원가입
  register: (nickname, email, password, passwordConfirmation) =>
    defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
    }),
  

  // 로그아웃
  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return Promise.resolve();
  },
};
