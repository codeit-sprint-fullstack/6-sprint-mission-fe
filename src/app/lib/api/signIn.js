//로그인 API (서버로 접근 해서 프론트랑 연동하기)
//.http랑 유사한 역할 (HTTP 요청을 보내고 서버 응답을 받는 수단)
const API_URL = "http://localhost:4000";
export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.method || "로그인 실패");
    }
    const data = await response.json();
    return {
      success: true,
      accessToken: data.accessToken,
      user: data,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
