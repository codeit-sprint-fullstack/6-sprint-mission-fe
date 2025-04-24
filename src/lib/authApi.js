export const authApi = {
  // 로그인
  login: async (email, password) => {
    const res = await fetch("/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("로그인 실패");
    }

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);

    return data;
  },

  // 회원가입
  signup: async (email, nickname, password, passwordConfirmation) => {
    const res = await fetch("/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("회원가입 실패");
    }

    return await res.json();
  },

  // 토큰 갱신
  getRefreshToken: async (refreshToken) => {
    const res = await fetch("/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("refreshToken 갱신 실패");
    }

    return await res.json();
  },
};
