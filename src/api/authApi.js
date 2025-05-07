const base_URL = "https://panda-market-api.vercel.app";

export const register = async (
  email,
  nickname,
  password,
  passwordConfirmation
) => {
  try {
    const res = await fetch(`${base_URL}/auth/signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "force-cache",
      body: JSON.stringify({
        email,
        nickname,
        password,
        passwordConfirmation,
      }),
    });

    if (!res.ok) {
      throw new Error("회원가입 실패했습니다");
    }

    const result = await res.json();

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const signIn = async (email, password) => {
  try {
    const res = await fetch(`${base_URL}/auth/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("로그인 실패했습니다");
    }

    const result = await res.json();

    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
