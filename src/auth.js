document.addEventListener("DOMContentLoaded", () => {
  // 각 필드의 유효성 검사 상태를 저장하는 전역 변수
  let isEmailValid = false;
  let isNicknameValid = false;
  let isPasswordValid = false;
  let isPasswordConfirmationValid = false;

  // ID를 통해 타겟 DOM 요소에 접근
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const nicknameInput = document.getElementById("nickname");
  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById(
    "passwordConfirmation"
  );
  const submitButton = document.querySelector(
    '.auth-container form button[type="submit"]'
  );

  function showError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "block";
    input.style.border = "1px solid #f74747";
  }

  // 상태 초기화 함수 (오류 메시지를 숨기고 입력 필드의 테두리를 기본 상태로 리셋)
  function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.style.border = "none";
  }

  // 비밀번호 표시 상태 온오프(toggle) 버튼 동작
  function togglePasswordVisibility(event) {
    // 이벤트가 발생한 버튼을 기준으로 타겟 요소를 찾음
    const button = event.currentTarget;
    const inputField = button.parentElement.querySelector("input");
    const toggleIcon = button.querySelector(".password-toggle-icon");

    // input의 type을 'password'으로 설정하면 입력값이 마스킹된 상태(비밀번호 숨김 상태)로 렌더링되고, 'text'로 설정하면 일반 문자로 출력됩니다.
    const isPasswordVisible = inputField.type === "text";

    inputField.type = isPasswordVisible ? "password" : "text";

    // 토글 버튼 아이콘의 이미지 파일과 alt도 비밀번호 표시 상태와 함께 변경해 주세요.
    toggleIcon.src = isPasswordVisible
      ? "images/icons/eye-invisible.svg"
      : "images/icons/eye-visible.svg";
    toggleIcon.alt = isPasswordVisible
      ? "비밀번호 표시 상태 아이콘"
      : "비밀번호 숨김 상태 아이콘";

    button.setAttribute(
      "aria-label",
      isPasswordVisible ? "비밀번호 보기" : "비밀번호 숨기기"
    );
  }

  function validateEmailString(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  // 이메일 필드의 유효성 검사 (입력 여부 및 형식)
  function checkEmailValidity() {
    const emailValue = emailInput.value.trim();

    isEmailValid = false;
    hideError(emailInput, "emailEmptyError");
    hideError(emailInput, "emailInvalidError");

    if (!emailValue) {
      showError(emailInput, "emailEmptyError");
    } else if (!validateEmailString(emailValue)) {
      showError(emailInput, "emailInvalidError");
    } else {
      isEmailValid = true;
      hideError(emailInput, "emailEmptyError");
      hideError(emailInput, "emailInvalidError");
    }
    // 어느 순서로 input을 입력할지 모르니 매번 submit button 활성화해야 하는지 체크하는 것이 안전해요. (추후에 React state을 사용하면 해결되는 문제!)
    updateSubmitButtonState();
  }

  // 닉네임 필드의 유효성 검사
  function checkNicknameValidity() {
    const nicknameValue = nicknameInput.value.trim();
    isNicknameValid = false;
    hideError(nicknameInput, "nicknameEmptyError");

    if (!nicknameValue) {
      showError(nicknameInput, "nicknameEmptyError");
    } else {
      isNicknameValid = true;
      hideError(emailInput, "nicknameEmptyError");
    }
    updateSubmitButtonState();
  }

  // 비밀번호 필드의 유효성 검사
  function checkPasswordValidity() {
    const passwordValue = passwordInput.value.trim();
    isPasswordValid = false;

    hideError(passwordInput, "passwordEmptyError");
    hideError(passwordInput, "passwordInvalidError");

    if (!passwordValue) {
      showError(passwordInput, "passwordEmptyError");
    } else if (passwordValue.length < 8) {
      showError(passwordInput, "passwordInvalidError");
    } else {
      isPasswordValid = true;
      hideError(passwordInput, "passwordEmptyError");
      hideError(passwordInput, "passwordInvalidError");
    }
    updateSubmitButtonState();

    // 비밀번호 입력 전에 비밀번호 확인 필드 입력을 먼저 시도하는 경우를 대비해 검증 로직 강화
    if (signupForm) {
      checkPasswordConfirmationValidity();
    }
  }

  // 비밀번호 확인 필드의 유효성 검사
  function checkPasswordConfirmationValidity() {
    const passwordConfirmationValue = passwordConfirmationInput.value.trim();
    isPasswordConfirmationValid = false;

    hideError(passwordConfirmationInput, "passwordConfirmationError");
    hideError(passwordConfirmationInput, "passwordConfirmationInitError");

    if (!isPasswordValid) {
      showError(passwordConfirmationInput, "passwordConfirmationInitError");
    } else if (
      !passwordConfirmationValue ||
      passwordConfirmationValue !== passwordInput.value.trim()
    ) {
      showError(passwordConfirmationInput, "passwordConfirmationError");
    } else {
      isPasswordConfirmationValid = true;
      hideError(passwordConfirmationInput, "passwordConfirmationError");
      hideError(passwordConfirmationInput, "passwordConfirmationInitError");
    }
    updateSubmitButtonState();
  }

  function updateSubmitButtonState() {
    // form submit button의 활성화 여부를 관장하기 위한 변수
    let isFormValid = isEmailValid && isPasswordValid;

    if (signupForm) {
      isFormValid =
        isFormValid && isNicknameValid && isPasswordConfirmationValid;
    }

    // isFormValid의 boolean 값에 따라 선택된 제출 버튼의 disabled 속성을 변경
    submitButton.disabled = !isFormValid;
  }

  // 입력 필드에 이벤트 리스너 추가
  // - 회원가입 및 로그인 form에서는 사용자가 입력한 데이터의 유효성을 즉각적으로 검증하고 피드백을 제공하기 위해서 focusout, input, change 등의 input event를 많이 사용해요.
  if (emailInput) {
    // - 입력 필드 선택 후 focus out 했을 때 각 필드에 해당하는 유효성 검증 함수를 호출
    emailInput.addEventListener("focusout", checkEmailValidity);
  }
  if (nicknameInput) {
    nicknameInput.addEventListener("focusout", checkNicknameValidity);
  }
  if (passwordInput) {
    // 로그인에서는 비밀번호 필드가 마지막 항목이므로 입력 후 바로 제출 버튼을 활성화해주려면 focusout보다 input이 더 적절할 것 같아요.
    passwordInput.addEventListener("input", checkPasswordValidity);
  }
  if (passwordConfirmationInput) {
    // 비밀번호 확인 필드 입력 시 정상적인 비밀번호 입력값이 있는지, 그리고 두 값이 일치하는지 여부를 실시간으로 확인하고 오류 메세지를 표시하기 위해 focusout이 아닌 input을 추천
    passwordConfirmationInput.addEventListener(
      "input",
      checkPasswordConfirmationValidity
    );
  }

  // 페이지 로드 시 제출 버튼의 비활성화 상태를 설정
  updateSubmitButtonState();
  const toggleButtons = document.querySelectorAll(".password-toggle-button"); // 'password-toggle-button' 클래스를 가진 모든 요소들의 배열
  toggleButtons.forEach((button) => {
    button.addEventListener("click", togglePasswordVisibility);
  });

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value.trim();

      const user = USER_DATA.find((user) => user.email === emailValue);
      if (!user || user.password !== passwordValue) {
        showModal(errors.passwordMismatch, "/signup.html");
      } else {
        window.location.href = "/items.html";
      }
    });
  }
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value.trim();

      const userExists = USER_DATA.some((user) => user.email === emailValue);
      if (userExists) {
        showModal(errors.emailExists, "/login.html");
      } else {
        USER_DATA.push({ email: emailValue, password: passwordValue });
        window.location.href = "/login.html";
      }
    });
  }
});
