export const getEmailError = (email: string): string => {
  if (!email) return "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "올바른 이메일 형식을 입력해주세요.";
  }

  return "";
};

export const getPasswordError = (password: string): string => {
  if (!password) return "";

  if (password.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다.";
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLetter || !hasNumber || !hasSpecialChar) {
    return "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
  }

  return "";
};

export const getNicknameError = (nickname: string): string => {
  if (!nickname) return "";

  if (nickname.length < 2) {
    return "닉네임은 2자 이상이어야 합니다.";
  }

  if (nickname.length > 10) {
    return "닉네임은 10자 이하여야 합니다.";
  }

  return "";
};

export const getPasswordConfirmError = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword) return "";

  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return "";
};
