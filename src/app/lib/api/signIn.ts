const API_URL = "http://localhost:4000";

// 요청 파라미터 타입
interface LoginParams {
  email: string;
  password: string;
}

// 응답 데이터에 포함되는 유저 타입 (API 반환 형식에 맞게 수정 가능)
interface User {
  id: string;
  nickName: string;
  // 필요한 필드 추가 가능 (email, role 등)
}

// 성공/실패 타입
interface LoginSuccess {
  success: true;
  accessToken: string;
  user: User;
}

interface LoginFailure {
  success: false;
  error: string;
}

type LoginResult = LoginSuccess | LoginFailure;

export async function loginUser({
  email,
  password,
}: LoginParams): Promise<LoginResult> {
  try {
    const response = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "로그인 실패");
    }

    const data: User & { accessToken: string } = await response.json();

    return {
      success: true,
      accessToken: data.accessToken,
      user: {
        id: data.id,
        nickName: data.nickName,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "알 수 없는 오류 발생" };
    }
  }
}
