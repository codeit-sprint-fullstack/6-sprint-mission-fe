export function isRequired(value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    return { isValid: false, message: "필수 입력 항목입니다." };
  }
  return { isValid: true };
}

export function validateEmail(email) {
  if (!email) {
    return { isValid: false, message: "이메일을 입력해주세요." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, message: "잘못된 이메일 형식입니다." };
  }
  return { isValid: true };
}
export function validateNickname(nickname) {
  if (!nickname || nickname.trim().length < 2) {
    return { isValid: false, message: "닉네임은 최소 2자 이상이어야 합니다." };
  }
  return { isValid: true };
}

export function validatePassword(password) {
  if (!password || password.trim().length < 8) {
    return { isValid: false, message: "비밀번호를 8자 이상 입력해주세요." };
  }
  return { isValid: true };
}

export function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
  }
  return { isValid: true };
}
