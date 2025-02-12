// 유저 데이터
const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

// 로그인 버튼 활성화용 객체.
let loginSubmitObject = { email: false, password: false };

// 로그인 페이지 로그인 버튼 활성화 함수
const submitLoginButton = document.getElementById("loginButton");

function checkPassValidate() {
  const loginSubmitArray = Object.values(loginSubmitObject);
  const isAllTrue = (currentValue) => currentValue === true;

  if (loginSubmitArray.every(isAllTrue)) {
    submitLoginButton.disabled = false;
    submitLoginButton.style.backgroundColor = "rgba(54, 146, 255, 1)";
  }
}

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
    alert("로그인 성공!");
    window.location.href = "../html/items.html";
  } else if (!checkUserEmail) {
    alert("존재하지 않는 유저입니다.");
  } else {
    alert("비밀번호가 일치하지 않습니다.");
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
    validateEmailInput.style.outline = "2px solid rgba(247, 71, 71, 1)";
    emailErrorMessage.innerHTML =
      "<p style='color: red; padding: 10px 20px;'>이메일을 입력해주세요.</p>";
    loginSubmitObject.email = false;
    checkPassValidate();
  } else if (emailPattern.test(inputValue) === false) {
    validateEmailInput.style.outline = "2px solid rgba(247, 71, 71, 1)";
    emailErrorMessage.innerHTML =
      "<p style='color: red; padding: 0 20px;'>잘못된 이메일 형식입니다.</p>";
    loginSubmitObject.email = false;
    checkPassValidate();
  } else {
    validateEmailInput.style.outline = "2px solid rgba(54, 146, 255, 1)";
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
    validatePasswordInput.style.outline = "2px solid rgba(247, 71, 71, 1)";
    passwordErrorMessage.innerHTML =
      "<p style='color: red; padding: 10px 20px;'>비밀번호를 입력해주세요.</p>";
    loginSubmitObject.password = false;
    checkPassValidate();
  } else if (passwordInputValue.length !== validatePasswordInput.value.length) {
    validatePasswordInput.style.outline = "2px solid rgba(247, 71, 71, 1)";
    passwordErrorMessage.innerHTML =
      "<p style='color: red; padding: 10px 20px;'>비밀번호에 공백을 사용할 수 없습니다.</p>";
    loginSubmitObject.password = false;
    checkPassValidate();
  } else if (passwordInputValue.length < 8) {
    validatePasswordInput.style.outline = "2px solid rgba(247, 71, 71, 1)";
    passwordErrorMessage.innerHTML =
      "<p style='color: red; padding: 10px 20px;'>비밀번호를 8자 이상 입력해주세요.</p>";
    loginSubmitObject.password = false;
    checkPassValidate();
  } else {
    validatePasswordInput.style.outline = "2px solid rgba(54, 146, 255, 1)";
    passwordErrorMessage.innerHTML = "<p><p>";
    loginSubmitObject.password = true;
    checkPassValidate();
  }
});

// 비밀번호 보기 기능.
const togglePassword = () => {
  let passwordInput = document.getElementById("password");
  let togglePasswordIcon = document.getElementById("togglePasswordIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordIcon.src = "../imgs/ic_open_eye.png";
  } else {
    passwordInput.type = "password";
    togglePasswordIcon.src = "../imgs/ic_close_eye.png";
  }
};
