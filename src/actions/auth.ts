"use server";

interface RegisterParams {
  email: string;
  nickName: string;
  password: string;
  ckPassword: string;
}

interface RegisterResponse {
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
}

export async function register({
  email,
  nickName,
  password,
  ckPassword,
}: RegisterParams): Promise<RegisterResponse> {
  const response = await fetch(
    "https://panda-market-api.vercel.app/auth/signUp",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        nickname: nickName,
        password: password,
        passwordConfirmation: ckPassword,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("회원가입 실패");
  }

  return response.json();
}
