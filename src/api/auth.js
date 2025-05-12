import {
  validateEmail,
  validatePassword,
  validateNickname,
  validateConfirmPassword,
} from "@/utils/validators";

const AUTH_API_BASE_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:3001";

export async function login({ email, password }) {
  const emailValidationResult = validateEmail(email);
  if (!emailValidationResult.isValid) {
    throw new Error(emailValidationResult.message);
  }

  const passwordValidationResult = validatePassword(password);
  if (!passwordValidationResult.isValid) {
    throw new Error(passwordValidationResult.message);
  }

  const requestData = { email, password };
  const requestBody = JSON.stringify(requestData);

  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error("Network error: 서버에 연결할 수 없습니다");
    }
    throw error;
  }
}
export async function signUp({ email, nickname, password, passwordConfirm }) {
  const emailValidationResult = validateEmail(email);
  if (!emailValidationResult.isValid) {
    throw new Error(emailValidationResult.message);
  }

  const nicknameValidationResult = validateNickname(nickname);
  if (!nicknameValidationResult.isValid) {
    throw new Error(nicknameValidationResult.message);
  }

  const passwordValidationResult = validatePassword(password);
  if (!passwordValidationResult.isValid) {
    throw new Error(passwordValidationResult.message);
  }

  const confirmPasswordValidationResult = validateConfirmPassword(
    password,
    passwordConfirm
  );
  if (!confirmPasswordValidationResult.isValid) {
    throw new Error(confirmPasswordValidationResult.message);
  }

  const requestData = {
    email,
    nickname,
    password,
    passwordConfirmation: passwordConfirm,
  };

  const requestBody = JSON.stringify(requestData);

  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        nickname,
        password,
        passwordConfirmation: passwordConfirm,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error("Network error: 서버에 연결할 수 없습니다");
    }
    throw error;
  }
}
