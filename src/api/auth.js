const API_BASE_URL = "https://panda-market-api.vercel.app";

// 환경 정보 로깅 (개발 중에만 표시)
if (process.env.NODE_ENV !== "production") {
  console.log("현재 환경:", process.env.NODE_ENV);
  console.log("API URL:", API_BASE_URL);
}

// 로그인
export async function signIn(form) {
  const { email, password } = form;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // ✅ 먼저 파싱

    if (!response.ok) {
      throw new Error(data.message || "로그인에 실패했습니다");
    }

    return data;
  } catch (error) {
    console.error("로그인 요청 중 에러:", error.message);
    throw error; // ✅ message가 포함된 Error 객체 전체를 throw
  }
}

// 회원가입
export async function signUp(form) {
  const { email, nickname, password, passwordConfirmation } = form;

  console.log(
    "email, nickName, password, passwordConfirmation",
    email,
    nickname,
    password,
    passwordConfirmation,
  );

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "회원가입에 실패했습니다");
    }

    localStorage.setItem("accessToken", data.accessToken);

    return data;
  } catch (error) {
    console.error("회원가입 요청 중 에러:", error.message);
    throw error;
  }
}

export async function getRefreshToken(params) {
  try {
  } catch (e) {}
}
