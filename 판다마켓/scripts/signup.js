import { showModal, USER_DATA } from "./common.js";

// 회원가입 버튼 활성화용 객체.
let signupSubmitObject = {
  email: false,
  password: false,
  confirmPassword: false,
};

// 회원가입 페이지 회원가입 버튼 활성화 함수
const submitSignupButton = document.getElementById("signUpButton");

const checkPassValidate = () => {
  const signupSubmitArray = Object.values(signupSubmitObject);
  const isAllTrue = (currentValue) => currentValue === true;

  if (signupSubmitArray.every(isAllTrue)) {
    submitSignupButton.disabled = false;
    submitSignupButton.classList.remove("deactivateloginSignupButton");
    submitSignupButton.classList.add("activateloginSignupButton");
  } else {
    submitSignupButton.disabled = true;
    submitSignupButton.classList.remove("activateloginSignupButton");
    submitSignupButton.classList.add("deactivateloginSignupButton");
  }
};

// 유저 존재 확인 함수.
const isUserExists = (email) => {
  return USER_DATA.some((user) => user.email === email);
};

// 회원가입 페이지 로그인 버튼 클릭 제출 함수.
const submitSignupForm = document.getElementById("inputBoxForm");

submitSignupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  if (isUserExists(email)) {
    showModal("이미 존재하는 사용자입니다.");
  } else {
    showModal("회원가입 성공!");
    window.location.href = "/login.html";
  }
});

// 회원가입 페이지 이메일 입력 유효성 검사
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
    signupSubmitObject.email = false;
    checkPassValidate();
  } else if (emailPattern.test(inputValue) === false) {
    validateEmailInput.classList.remove("inputSuccess");
    validateEmailInput.classList.add("inputError");
    emailErrorMessage.innerHTML =
      "<p class='error-text'>잘못된 이메일 형식입니다.</p>";
    signupSubmitObject.email = false;
    checkPassValidate();
  } else {
    validateEmailInput.classList.remove("inputError");
    validateEmailInput.classList.add("inputSuccess");
    emailErrorMessage.innerHTML = "<p><p>";
    signupSubmitObject.email = true;
    checkPassValidate();
  }
});

// 회원가입 페이지 비밀번호 입력 유효성 검사
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
    signupSubmitObject.password = false;
    checkPassValidate();
  } else if (passwordInputValue.length !== validatePasswordInput.value.length) {
    validatePasswordInput.classList.remove("inputSuccess");
    validatePasswordInput.classList.add("inputError");
    passwordErrorMessage.innerHTML =
      "<p class='error-text'>비밀번호에 공백을 사용할 수 없습니다.</p>";
    signupSubmitObject.password = false;
    checkPassValidate();
  } else if (passwordInputValue.length < 8) {
    validatePasswordInput.classList.remove("inputSuccess");
    validatePasswordInput.classList.add("inputError");
    passwordErrorMessage.innerHTML =
      "<p class='error-text'>비밀번호를 8자 이상 입력해주세요.</p>";
    signupSubmitObject.password = false;
    checkPassValidate();
  } else {
    validatePasswordInput.classList.remove("inputError");
    validatePasswordInput.classList.add("inputSuccess");
    passwordErrorMessage.innerHTML = "<p><p>";
    signupSubmitObject.password = true;
    checkPassValidate();
  }
});

// 회원가입 페이지 비밀번호 확인 입력 유효성 검사
// 비밀번호와 일치하지 않으면 빨강테두리 + 에러메시지 변경.
const validateconfirmPasswordInput = document.getElementById("confirmPassword");

validateconfirmPasswordInput.addEventListener("blur", function () {
  const confirmPasswordInputValue = validateconfirmPasswordInput.value.trim();
  const passwordInputValue = validatePasswordInput.value.trim();
  const confirmPasswordErrorMessage = document.getElementById(
    "confirmPasswordErrorMessage"
  );

  if (passwordInputValue !== confirmPasswordInputValue) {
    validateconfirmPasswordInput.classList.remove("inputSuccess");
    validateconfirmPasswordInput.classList.add("inputError");
    confirmPasswordErrorMessage.innerHTML =
      "<p class='error-text'>비밀번호가 일치하지 않습니다.</p>";
    signupSubmitObject.confirmPassword = false;
    checkPassValidate();
  } else {
    validateconfirmPasswordInput.classList.remove("inputError");
    validateconfirmPasswordInput.classList.add("inputSuccess");
    confirmPasswordErrorMessage.innerHTML = "<p><p>";
    signupSubmitObject.confirmPassword = true;
    checkPassValidate();
  }
});

// 비밀번호 확인 보기 기능.
const toggleConfirmPassword = () => {
  let confirmPasswordInput = document.getElementById("confirmPassword");
  let toggleConfirmPasswordIcon = document.getElementById(
    "toggleConfirmPasswordIcon"
  );

  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    toggleConfirmPasswordIcon.src = "./imgs/ic_open_eye.png";
  } else {
    confirmPasswordInput.type = "password";
    toggleConfirmPasswordIcon.src = "./imgs/ic_close_eye.png";
  }
};

window.toggleConfirmPassword = toggleConfirmPassword;
