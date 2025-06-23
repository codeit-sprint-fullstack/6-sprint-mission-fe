const API_URL = "http://localhost:4000";

// 요청 파라미터 타입
interface CreateUserParams {
  email: string;
  nickName: string;
  password: string;
}

// 성공/실패 응답 타입
interface CreateUserSuccess {
  success: true;
}

interface CreateUserFailure {
  success: false;
  error: string;
}

type CreateUserResult = CreateUserSuccess | CreateUserFailure;

export async function createUser({
  email,
  nickName,
  password,
}: CreateUserParams): Promise<CreateUserResult> {
  try {
    const response = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, nickName, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "유저 생성 실패");
    }

    return { success: true };
  } catch (error: unknown) {
    // 에러 타입을 안전하게 처리
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "알 수 없는 오류 발생" };
    }
  }
}
