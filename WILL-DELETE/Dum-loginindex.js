const emailInput = document.getElementById("input-email");
const passwordInput = document.getElementById("input-password");
const emailError = document.getElementById("email-error-message");
const passwordError = document.getElementById("password-error-message");
const loginButton = document.getElementById("login-button");
const eyecon = document.getElementById("eye-con");

// 이메일 유효성 검증 함수.
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}
// 비밀번호 유효성 검증 함수.
// 최소 8자 이상, 대소문자, 숫자, 특수문자 포함 체크
function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
}

// 이메일 focus in/out
function emailFocusIn() {
  if (!emailInput.value.trim()) {
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.classList.add("error-box");
    emailInput.classList.add("error-input");
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailError.classList.add("error-box");
    emailInput.classList.add("error-input");
  } else {
    emailInput.classList.remove("error-input");
    emailInput.classList.remove("error-box");
    emailError.textContent = "";
    emailInput.classList.add("input-email");
  }
}

// 비밀번호 focus in/out
function passwordFocusIn() {
  if (!passwordInput.value.trim()) {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordError.classList.add("error-box");
    passwordInput.classList.add("error-input");
  } else if (passwordInput.value.trim().length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordError.classList.add("error-box");
    passwordInput.classList.add("error-input");
  } else {
    passwordInput.classList.remove("error-input");
    passwordInput.classList.remove("error-box");
    passwordError.textContent = "";
  }
}

emailInput.addEventListener("focusout", emailFocusIn);
passwordInput.addEventListener("focusout", passwordFocusIn);

//스프린트 미션에 있는 USER_DATA
const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];
//USER_DATA와 이메일 대조
function findUserByEmail(email) {
  return USER_DATA.some((user) => user.email === email);
}
//USER_DATA와 비밀번호 대조
function findUserByPasswords(password) {
  return USER_DATA.some((user) => user.password === password);
}

//USER_DATA 검증
function successLogin(event) {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (findUserByEmail(email)) {
    if (findUserByPasswords(password)) {
      loginButton.disabled = false;
      window.location.href = "../items"; // "/items" 페이지로 이동
    } else {
      loginButton.disabled = false;
      alert("비밀번호가 일치하지 않습니다.");
    }
  } else {
    //로그인 버튼 비활성화
    alert("가입되어 있지 않은 이메일입니다. ");
    loginButton.disabled = true;
  }
}
//USER_DATA로 로그인 버튼 이벤트
loginButton.addEventListener("click", successLogin);

//input 재입력 이벤트
function reInput(event) {
  loginButton.disabled = false;
}
emailInput.addEventListener("change", reInput);
passwordInput.addEventListener("change", reInput);

//(눈모양아이콘) 비밀번호 보이기
function show() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
eyecon.addEventListener("click", show);
