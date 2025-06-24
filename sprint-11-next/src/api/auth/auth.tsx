import { defaultFetch, tokenFetch } from "../fetchClient";

export interface RegisterForm {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

// 회원가입 (비회원 → public API)
export const register = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: RegisterForm): Promise<any> => {
  return await defaultFetch("/auth/signUp", {
    method: "POST",
    body: JSON.stringify({
      email,
      nickname,
      password,
      passwordConfirmation,
    }),
  });
};

// 로그인 (쿠키에 토큰 설정됨)
export const login = async ({ email, password }: LoginForm): Promise<any> => {
  const baseURL = "http://localhost:5000";
  const response = await fetch(`${baseURL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return await response.json();
};

// 토큰 갱신
export const refreshToken = async (): Promise<any> => {
  return await tokenFetch("/auth/refresh-token", {
    method: "POST",
  });
};
