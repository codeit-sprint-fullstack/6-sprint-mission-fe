export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

export function validateEmail(email) {
  if (email.trim() === "") {
    return { valid: false, message: "이메일을 입력해주세요." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { valid: false, message: "잘못된 이메일 형식입니다." };
  }
  return { valid: true, message: "" };
}

export function validatePwd(pwd) {
  if (pwd.trim() === "") {
    return { valid: false, message: "비밀번호를 입력해주세요." };
  }
  if (pwd.length < 8) {
    return { valid: false, message: "비밀번호를 8자 이상 입력해주세요." };
  }
  return { valid: true, message: "" };
}

export function validateLogin(email, password) {
  const user = USER_DATA.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return { valid: false, message: "비밀번호가 일치하지 않습니다." };
  }
  return { valid: true, message: "" };
}
