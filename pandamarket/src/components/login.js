document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

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

  // 로그인 버튼 활성화/비활성화
  const updateLoginButtonState = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    loginButton.disabled = !(isEmailValid && isPasswordValid);
    loginButton.style.backgroundColor = loginButton.disabled
      ? "#9ca3af"
      : "#3692ff";
  };

  // 이메일, 비밀번호 입력 시 유효성 검사
  emailInput.addEventListener("focusout", updateLoginButtonState);
  passwordInput.addEventListener("focusout", updateLoginButtonState);

  // 로그인 버튼 클릭 시
  loginButton.addEventListener("click", () => {
    // 로그인 로직 추가 (USER_DATA 체크)
    const userData = [
      { email: "codeit1@codeit.com", password: "codeit101!" },
      { email: "codeit2@codeit.com", password: "codeit202!" },
      { email: "codeit3@codeit.com", password: "codeit303!" },
      { email: "codeit4@codeit.com", password: "codeit404!" },
      { email: "codeit5@codeit.com", password: "codeit505!" },
      { email: "codeit6@codeit.com", password: "codeit606!" },
    ];

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // 이메일이 존재하는지 확인
    const user = userData.find((user) => user.email === email);

    if (!user) {
      alert("이메일을 찾을 수 없습니다.");
    } else if (user.password !== password) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      window.location.href = "/items.html"; // 로그인 성공 시 페이지 이동
    }
  });

  // 비밀번호 표시/숨기기 토글
  const togglePasswordIcon = document.getElementById("togglePassword");
  togglePasswordIcon.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text"; // 비밀번호 보이게
      togglePasswordIcon.src = "../img/eyeopen_icon.png"; // 아이콘을 눈 뜬 상태로 변경
    } else {
      passwordInput.type = "password"; // 비밀번호 숨기기
      togglePasswordIcon.src = "../img/eyeclose_icon.png"; // 아이콘을 눈 감은 상태로 변경
    }
  });
});
