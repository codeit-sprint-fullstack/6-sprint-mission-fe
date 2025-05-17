//회원가입 API (서버로 접근 해서 프론트랑 연동하기)
const API_URL = "http://localhost:4000";

export async function createUser({ email, nickName, password }) {
  try {
    const response = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        nickName,
        password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "유저 생성 실패");
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
