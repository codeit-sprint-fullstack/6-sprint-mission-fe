// USER_DATA
const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

// 이메일, 비밀번호 정규 표현식
const emailRegex =
  /^[0-9a-zA-Z]*@[0-9a-zA-Z][0-9a-zA-Z]*[.]?[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i;
const passwordRegex = /^[a-zA-Z0-9#?!@$%^&*-]{8,}$/;

// 이메일, 비밀번호 에러 메세지
const errMsg = {
  email: {
    empty: "이메일을 입력해주세요.",
    invalid: "잘못된 이메일 형식입니다.",
    success: "사용 가능한 이메일입니다.",
    fail: "사용 중인 이메일입니다.",
  },
  password: {
    empty: "비밀번호를 입력해주세요.",
    invalid: "비밀번호를 8자 이상 입력해주세요.",
    success: "비밀번호가 일치합니다.",
  },
  password2: {
    fail: "비밀번호가 일치하지 않습니다.",
  },
};

export { USER_DATA, emailRegex, passwordRegex, errMsg };
