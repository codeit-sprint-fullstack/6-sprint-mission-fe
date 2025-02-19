document.addEventListener("DOMContentLoaded", function () {
  const USER_DATA = [
    { email: "codeit1@codeit.com", password: "codeit101!" },
    { email: "codeit2@codeit.com", password: "codeit202!" },
    { email: "codeit3@codeit.com", password: "codeit303!" },
    { email: "codeit4@codeit.com", password: "codeit404!" },
    { email: "codeit5@codeit.com", password: "codeit505!" },
    { email: "codeit6@codeit.com", password: "codeit606!" },
  ];

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordCheckInput=document.getElementById("passwordCheck");
  const loginBtn = document.querySelector("button");

  // 이메일 유효성 검사
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailValue) {
      showErrorMessage(emailInput, "이메일을 입력해주세요.");
    } else if (!emailRegex.test(emailValue)) {
      showErrorMessage(emailInput, "잘못된 이메일 형식입니다.");
    } else {
      removeErrorMessage(emailInput);
    }
  }

  // 비밀번호 유효성 검사
  function validatePassword() {
    const passwordValue = passwordInput.value.trim();

    if (!passwordValue) {
      showErrorMessage(passwordInput, "비밀번호를 입력해주세요.");
    } else if (passwordValue.length < 8) {
      showErrorMessage(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
    } else {
      removeErrorMessage(passwordInput);
    }
  }

  //비밀번호 확인 검증
  function passwordCheck(){
    const passwordValue=passwordInput.value.trim();
    const passwordCheckValue=passwordCheckInput.value.trim();
    if(passwordCheckValue!=passwordValue){
      showErrorMessage(passwordCheckInput,"비밀번호가 일치하지 않습니다.");
    }else{
      removeErrorMessage(passwordCheckInput);
    }
  }

  // 에러 메시지 표시
  function showErrorMessage(input, message) {
    input.classList.add("error");
    let errorMsg = input.nextElementSibling;
    if (!errorMsg||!errorMsg.classList.contains("error-message")) {
      errorMsg = document.createElement("p");
      errorMsg.classList.add("error-message");
      input.insertAdjacentElement("afterend", errorMsg);
    }
    errorMsg.textContent = message;
  }

  // 에러 메시지 제거
  function removeErrorMessage(input) {
    input.classList.remove("error");

    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("error-message")) {
      errorMsg.remove();
    }
  }

  // 로그인 버튼 활성화 상태 체크
  function toggleLoginButton() {
    if (
      !emailInput.value.trim() ||
      !passwordInput.value.trim() ||
      passwordInput.value.length < 8 ||
      !passwordCheckInput.value.trim() ||  // 비밀번호 확인 입력 여부 추가
      passwordInput.value !== passwordCheckInput.value ||  // 비밀번호 일치 여부 추가
      document.querySelectorAll(".error").length > 0
    ) {
      loginBtn.disabled = true;
    } else {
      loginBtn.disabled = false;
      const modal=document.getElementById('modal');
      if (modal) {
        modal.style.display = "block";  // 모달을 보이게 함
    }
  }

  // 로그인 버튼 클릭 시 로그인 검증
  function loginUser() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const user = USER_DATA.find((user) => user.email === email);

    if (!user || user.password !== password) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      window.location.href = "./items.html";
    }
  }
  // http://127.0.0.1:5500/6-sprint-mission-fe/login/login.html
// 로그인.html부분이빠진다
  //


  // 입력값 검증 이벤트 리스너
  emailInput.addEventListener("blur", () => {
    validateEmail();
    toggleLoginButton();
  });
  
  passwordInput.addEventListener("blur", () => {
    validatePassword();
    passwordCheck();  // 비밀번호 변경 시 비밀번호 확인도 다시 체크해야 함
    toggleLoginButton();
  });
  
  passwordCheckInput.addEventListener("blur", () => {

    passwordCheck();
    toggleLoginButton();
  });
  loginBtn.addEventListener("click", loginUser);
});
  
