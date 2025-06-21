import { defaultFetch, cookieFetch } from "@/lib/fetchClient";

type TauthService = {
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const authService : TauthService = {
  // 쿠키 인증을 사용하는 로그인
  login: (email, password) =>
    cookieFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // 회원가입
  register: (name, email, password) =>
    defaultFetch("/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  // 로그아웃
  logout: () => cookieFetch("/auth/logout", { method: "DELETE" }),
};
