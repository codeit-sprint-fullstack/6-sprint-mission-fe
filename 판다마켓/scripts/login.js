import { showModal, USER_DATA } from "./common.js";

// 로그인 버튼 활성화용 객체.
let loginSubmitObject = { email: false, password: false };

// 로그인 페이지 로그인 버튼 활성화 함수
const submitLoginButton = document.getElementById("loginButton");

const checkPassValidate = () => {
  const loginSubmitArray = Object.values(loginSubmitObject);
  const isAllTrue = (currentValue) => currentValue === true;

  if (loginSubmitArray.every(isAllTrue)) {
    submitLoginButton.disabled = false;
    submitLoginButton.classList.remove("deactivateloginSignupButton");
    submitLoginButton.classList.add("activateloginSignupButton");
  } else {
    submitLoginButton.disabled = true;
    submitLoginButton.classList.remove("activateloginSignupButton");
    submitLoginButton.classList.add("deactivateloginSignupButton");
  }
};

// 로그인 페이지 로그인 버튼 클릭 제출 함수.
const submitLoginForm = document.getElementById("inputBoxForm");

submitLoginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let checkUserEmail = USER_DATA.find((user) => user.email === email);
  let checkUserPassWord = USER_DATA.find(
    (user) => user.email === email && user.password === password
  );

  if (checkUserPassWord) {
    showModal("로그인 성공!");
    window.location.href = "/items.html";
  } else if (!checkUserEmail) {
    showModal("존재하지 않는 유저입니다.");
  } else {
    showModal("비밀번호가 일치하지 않습니다.");
  }
});

// 로그인 페이지 이메일 입력 유효성 검사
// 이메일 형식이 맞지 않는경우 빨강테두리 + 에러메시지 변경.
const validateEmailInput = document.getElementById("email");

validateEmailInput.addEventListener("blur", function () {
  const inputValue = validateEmailInput.value.trim();
  const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  let emailErrorMessage = document.getElementById("emailErrorMessage");

  if (inputValue == "") {
    validateEmailInput.classList.remove("inputSuccess");
    validateEmailInput.classList.add("inputError");
    emailErrorMessage.innerHTML =
      "<p class='error-text'>이메일을 입력해주세요.</p>";
    loginSubmitObject.email = false;
    checkPassValidate();
  } else if (emailPattern.test(inputValue) === false) {
    validateEmailInput.classList.remove("inputSuccess");
    validateEmailInput.classList.add("inputError");
    emailErrorMessage.innerHTML =
      "<p class='error-text'>잘못된 이메일 형식입니다.</p>";
    loginSubmitObject.email = false;
    checkPassValidate();
  } else {
    validateEmailInput.classList.remove("inputError");
    validateEmailInput.classList.add("inputSuccess");
    emailErrorMessage.innerHTML = "<p><p>";
    loginSubmitObject.email = true;
    checkPassValidate();
  }
});

// 로그인 페이지 비밀번호 입력 유효성 검사
// 비밀번호 형식이 맞지 않는경우 빨강테두리 + 에러메시지 변경.
const validatePasswordInput = document.getElementById("password");

validatePasswordInput.addEventListener("blur", function () {
  const passwordInputValue = validatePasswordInput.value.trim();
  const passwordErrorMessage = document.getElementById("passwordErrorMessage");

  if (passwordInputValue == "") {
    validatePasswordInput.classList.remove("inputSuccess");
    validatePasswordInput.classList.add("inputError");
    passwordErrorMessage.innerHTML =
      "<p class='error-text'>비밀번호를 입력해주세요.</p>";
    loginSubmitObject.password = false;
    checkPassValidate();
  } else if (passwordInputValue.length !== validatePasswordInput.value.length) {
    validatePasswordInput.classList.remove("inputSuccess");
    validatePasswordInput.classList.add("inputError");
    passwordErrorMessage.innerHTML =
      "<p class='error-text'>비밀번호에 공백을 사용할 수 없습니다.</p>";
    loginSubmitObject.password = false;
    checkPassValidate();
  } else if (passwordInputValue.length < 8) {
    validatePasswordInput.classList.remove("inputSuccess");
    validatePasswordInput.classList.add("inputError");
    passwordErrorMessage.innerHTML =
      "<p class='error-text'>비밀번호를 8자 이상 입력해주세요.</p>";
    loginSubmitObject.password = false;
    checkPassValidate();
  } else {
    validatePasswordInput.classList.remove("inputError");
    validatePasswordInput.classList.add("inputSuccess");
    passwordErrorMessage.innerHTML = "<p><p>";
    loginSubmitObject.password = true;
    checkPassValidate();
  }
});
