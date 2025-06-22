import { defaultFetch, setAccessToken } from "./fetchClient";

export const authService = {
  login: async (email, password) => {
    const data = await defaultFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!data.accessToken) {
      throw new Error("로그인 응답에 accessToken이 없습니다.");
    }

    // 전역 accessToken 설정
    setAccessToken(data.accessToken);

    return {
      user: {
        id: data.id,
        email: data.email,
        nickName: data.nickName,
      },
    };
  },

  register: async (nickName, email, password) => {
    return await defaultFetch("/users", {
      method: "POST",
      body: JSON.stringify({ email, nickName, password }),
    });
  },

  logout: () => {
    // 추후 구현 예정
  },
};
