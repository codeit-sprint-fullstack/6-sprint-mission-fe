// 이메일 유효성 검증
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

//비밀번호 유효성 검정 (숫자와 특수문자 합쳐서 4자 이상)
export const isValidPassword = (password: string): boolean => {
  // 숫자와 특수문자 찾기
  const matches = password.match(/[0-9!@#$%^&*(),.?":{}|<>]/g);
  return !!matches && matches.length >= 4;
};
