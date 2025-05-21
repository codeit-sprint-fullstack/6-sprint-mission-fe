const AUTH_API_BASE_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:3001";
export async function login({ email, password }) {
  const response = await fetch(`${AUTH_API_BASE_URL}/auth/signIn`, {
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
    throw new Error(errorData.message);
  }
  return response.json();
}

export async function signUp({ email, nickname, password, passwordConfirm }) {
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
}
