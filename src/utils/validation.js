// 이메일 형식 검증
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

// 이메일 에러 메시지 반환
export const getEmailError = (email) => {
  const trimmed = email.trim();

  if (!trimmed) return "이메일을 입력해주세요.";
  if (!isValidEmail(trimmed)) return "잘못된 이메일 형식입니다";
  return "";
};

// 비밀번호 에러 메시지 반환
export const getPasswordError = (password) => {
  const trimmed = password.trim();

  if (!trimmed) return "비밀번호를 입력해주세요.";
  if (trimmed.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
  return "";
};

// 비밀번호 확인 에러 (회원가입용)
export const getPasswordConfirmError = (password, confirmPassword) => {
  if (!confirmPassword.trim()) return "비밀번호 확인을 입력해주세요.";
  if (password.trim() !== confirmPassword.trim()) return "비밀번호가 일치하지 않습니다.";
  return "";
};

// 닉네임 에러
export const getNicknameError = (nickname) => {
  if (!nickname.trim()) return "닉네임을 입력해주세요.";
  return "";
};
