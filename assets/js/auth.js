// Handling password visibility 
const passwordToggleBtn = document.querySelector(".auth__form-password-toggle");
if (passwordToggleBtn) {
  passwordToggleBtn.addEventListener("click", () => {
    const userInput = passwordToggleBtn.previousElementSibling;
    const toggleIcon = passwordToggleBtn.querySelector("img");
    if (userInput && userInput.classList.contains("auth__form-password-input")) {
      if (userInput.type === "password") {
        userInput.type = "text";
        toggleIcon.src = "assets/img/icons/eye-visible.svg";
        toggleIcon.alt = "비밀번호 숨기기 아이콘";
      } else {
        userInput.type = "password";
        toggleIcon.src = "assets/img/icons/eye-invisible.svg";
        toggleIcon.alt = "비밀번호 표시 아이콘";
      }
    }
  });
}

//check email validity 
function isValidEmail(email) {
  const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
// check password validity

function isValidPassword(password) {
  return password.length >= 8;
}

const emailField= document.querySelector("#email");
const emailError = emailField.nextElementSibling;
const passwordField = document.querySelector("#password");
const passwordContainer = document.querySelector(".auth__form-password-container");
const passwordError = passwordContainer.nextElementSibling; 

// Handling emailField 
emailField.addEventListener("focusout", () => {
  let userEmail = emailField.value.trim();
  if (!emailField.value) {
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.classList.add("auth__error--active");
    emailField.classList.add("auth__form-input--error");
  } else {
    if (isValidEmail(userEmail)) {
      emailError.textContent = "";
      emailError.classList.remove("auth__error-active");
      emailField.classList.remove("auth__form-input--error");
    } else {
      emailError.textContent = "잘못된 이메일 형식입니다.";
      emailError.classList.add("auth__error--active");
      emailField.classList.add("auth__form-input--error");
    };
  };
});

// Handling password input
// deal with passwordContainer or passwordField?
passwordField.addEventListener("focusout", () => {
  let userPassword = passwordField.value.trim();
  if (!userPassword) {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordError.classList.add("auth__error--active");
    passwordContainer.classList.add("auth__form-password-container--error");
  } else {
    if (isValidPassword(userPassword)) {
      passwordError.textContent = "";
      passwordError.classList.remove("auth__error--active");
      passwordContainer.classList.remove("auth__form-password-container--error");
    } else {
      passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
      passwordError.classList.add("auth__error--active");
      passwordContainer.classList.add("auth__form-password-container--error");
    };
  };
});
