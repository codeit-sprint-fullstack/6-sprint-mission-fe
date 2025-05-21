import { defaultFetch, tokenFetch, cookieFetch } from "./fetchClient";

export const authService = {
  // 회원가입 (비회원 → public API 이므로 defaultFetch 사용)
  register: async ({ email, nickname, password, passwordConfirmation }) => {
    return await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });
  },

  // 로그인 (쿠키에 토큰 설정되므로 cookieFetch 사용)
  login: async ({ email, password }) => {
    return await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // 토큰 갱신 (tokenFetch를 사용하여 Authorization 헤더에 토큰을 담아 요청)
  refreshToken: async () => {
    return await tokenFetch("/auth/refresh-token", {
      method: "POST",
    });
  },

  // 로그아웃 (쿠키를 제거하므로 cookieFetch와 DELETE 메서드 사용)
  logout: async () => {
    return await cookieFetch("/auth/signOut", {
      // API 엔드포인트는 실제와 다를 수 있습니다.
      method: "DELETE",
    });
  },
};
