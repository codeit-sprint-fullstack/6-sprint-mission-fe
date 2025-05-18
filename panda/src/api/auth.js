import apiRequest from "./apiRequest";

export async function postSignUp({ email, nickname, password }) {
  return apiRequest("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
      email,
      nickname,
      password,
    }),
  });
}

export async function postSignIn({ email, password }) {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response;
}
