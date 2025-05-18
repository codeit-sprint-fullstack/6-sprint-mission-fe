// 이메일 유효성 검증
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검증
export const isValidPassword = (password) => {
  const lengthOk = password.length >= 8;
  const patternOk = /^([a-zA-Z0-9!@#$%^&*]+)$/.test(password);
  return { lengthOk, patternOk };
};

// 상품명 유효성 검증
export const validateName = (value) => {
  if (value.length < 2 || value.length > 10) {
    return "2자 이상 10자 이내로 입력해주세요";
  }
  return "";
};

// 상품 소개 유효성 검증
export const validateDescription = (value) => {
  if (value.length < 10) {
    return "10자 이상 입력해주세요";
  }
  return "";
};

// 가격 유효성 검증
export const validatePrice = (value) => {
  if (!/^\d+$/.test(value)) {
    return "숫자로 입력해주세요";
  }
  return "";
};
