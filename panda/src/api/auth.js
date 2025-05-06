import apiRequest from "./apiRequest";

export async function postSignUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  return apiRequest("/Auth/SignUp", {
    method: "POST",
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
  });
}

export async function postSignIn({ email, password }) {
  const response = await apiRequest("/Auth/SignIn", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response;
}
