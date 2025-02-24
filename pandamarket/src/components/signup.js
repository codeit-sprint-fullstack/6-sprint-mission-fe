document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");
  const passwordCheckInput = document.getElementById("passwordcheck");
  const signupButton = document.querySelector(".signup_btn button");
  const emailError = document.getElementById("email-error");
  const nameError = document.getElementById("name-error");
  const passwordError = document.getElementById("password-error");
  const passwordCheckError = document.getElementById("passwordcheck-error");

  const USER_DATA = [
    { email: "codeit1@codeit.com", password: "codeit101!" },
    { email: "codeit2@codeit.com", password: "codeit202!" },
    { email: "codeit3@codeit.com", password: "codeit303!" },
    { email: "codeit4@codeit.com", password: "codeit404!" },
    { email: "codeit5@codeit.com", password: "codeit505!" },
    { email: "codeit6@codeit.com", password: "codeit606!" },
  ];

  // 이메일 유효성 검사
  const validateEmail = () => {
    const email = emailInput.value.trim();
    if (!email) {
      showError(emailInput, emailError, "이메일을 입력해주세요.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(emailInput, emailError, "잘못된 이메일 형식입니다.");
      return false;
    }
    hideError(emailInput, emailError);
    return true;
  };

  // 닉네임 유효성 검사
  const validateName = () => {
    const name = nameInput.value.trim();
    if (!name) {
      showError(nameInput, nameError, "닉네임을 입력해주세요.");
      return false;
    }
    hideError(nameInput, nameError);
    return true;
  };

  // 비밀번호 유효성 검사
  const validatePassword = () => {
    const password = passwordInput.value.trim();
    if (!password) {
      showError(passwordInput, passwordError, "비밀번호를 입력해주세요.");
      return false;
    }
    if (password.length < 8) {
      showError(
        passwordInput,
        passwordError,
        "비밀번호를 8자 이상 입력해주세요."
      );
      return false;
    }
    hideError(passwordInput, passwordError);
    return true;
  };

  // 비밀번호 확인 검사
  const validatePasswordCheck = () => {
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();
    if (password !== passwordCheck) {
      showError(
        passwordCheckInput,
        passwordCheckError,
        "비밀번호가 일치하지 않습니다."
      );
      return false;
    }
    hideError(passwordCheckInput, passwordCheckError);
    return true;
  };

  // 에러 메시지 표시
  const showError = (input, errorElement, message) => {
    input.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.color = "red";
  };

  // 에러 메시지 숨기기
  const hideError = (input, errorElement) => {
    input.classList.remove("error");
    errorElement.textContent = "";
  };

  // 회원가입 버튼 활성화/비활성화
  const updateSignupButtonState = () => {
    const isEmailValid = validateEmail();
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();
    const isPasswordCheckValid = validatePasswordCheck();
    signupButton.disabled = !(
      isEmailValid &&
      isNameValid &&
      isPasswordValid &&
      isPasswordCheckValid
    );
    signupButton.style.backgroundColor = signupButton.disabled
      ? "#9ca3af"
      : "#3692ff";
  };

  // 입력 이벤트 처리
  emailInput.addEventListener("focusout", updateSignupButtonState);
  nameInput.addEventListener("focusout", updateSignupButtonState);
  passwordInput.addEventListener("focusout", updateSignupButtonState);
  passwordCheckInput.addEventListener("focusout", updateSignupButtonState);

  // 회원가입 버튼 클릭 시 처리
  signupButton.addEventListener("click", () => {
    const isEmailValid = validateEmail();
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();
    const isPasswordCheckValid = validatePasswordCheck();

    if (
      isEmailValid &&
      isNameValid &&
      isPasswordValid &&
      isPasswordCheckValid
    ) {
      // 이메일 중복 체크
      const userExists = USER_DATA.some(
        (user) => user.email === emailInput.value.trim()
      );

      if (userExists) {
        alert("사용 중인 이메일입니다.");
      } else {
        // 회원가입 성공 시
        alert("회원가입이 완료되었습니다!");
        window.location.href = "/login.html"; // 로그인 페이지로 이동
      }
    }
  });

  // 비밀번호 보이기/숨기기
  const togglePassword = document.getElementById("togglePassword");
  const togglePasswordCheck = document.getElementById("togglePasswordCheck");

  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.src =
      type === "password"
        ? "../img/eyeclose_icon.png"
        : "../img/eyeopen_icon.png";
  });

  togglePasswordCheck.addEventListener("click", () => {
    const type = passwordCheckInput.type === "password" ? "text" : "password";
    passwordCheckInput.type = type;
    togglePasswordCheck.src =
      type === "password"
        ? "../img/eyeclose_icon.png"
        : "../img/eyeopen_icon.png";
  });
});
