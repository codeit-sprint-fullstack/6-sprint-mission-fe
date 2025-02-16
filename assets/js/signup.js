const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// handling password visibility 
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

//check email and password validity 
function isValidEmail(email) {
  const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPassword(password) {
  return password.length >= 8;
}

const emailField= document.querySelector("#email");
const emailError = emailField.nextElementSibling;
const passwordField = document.querySelector("#password");
const passwordPrimaryContainer = document.querySelector(".auth__form-password-primary");
const passwordError = passwordPrimaryContainer.nextElementSibling; 
const submitButton = document.querySelector(".auth__button");
const form = document.querySelector(".auth__form");

// check form validity
function isValidForm() {
  const userEmail = emailField.value.trim();
  const userPassword = passwordField.value.trim();
  return userEmail && userPassword && !emailError.textContent && !passwordError.textContent;
}

// check form validity and update button status
function updateButtonState() {
  submitButton.disabled = !isValidForm();
}

// for each input add eventListener triggered by each user input
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", updateButtonState);
});

// handling emailField 
emailField.addEventListener("focusout", () => {
  const userEmail = emailField.value.trim();
  if (!userEmail) {
    emailError.textContent = "이메일을 입력해주세요.";
  } else if (!isValidEmail(userEmail)) {
      emailError.textContent = "잘못된 이메일 형식입니다."
  } else {
      emailError.textContent = "";
    };
    emailError.classList.toggle("auth__error--active", !!emailError.textContent);
    emailField.classList.toggle("auth__form-input--error", !!emailError.textContent);
    updateButtonState();
  });

// handling password input
passwordField.addEventListener("focusout", () => {
  const userPassword = passwordField.value.trim();
  if (!userPassword) {
    passwordError.textContent = "비밀번호를 입력해주세요.";
  } else if (!isValidPassword(userPassword)) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
  } else {
    passwordError.textContent = "";
  }
  passwordError.classList.toggle("auth__error--active", !!passwordError.textContent);
  passwordPrimaryContainer.classList.toggle("auth__form-password-primary--error", !!passwordError.textContent);
  updateButtonState();
});

// form submission handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userEmail = emailField.value.trim();
  const userPassword = passwordField.value.trim();
  const user = USER_DATA.find(user => user.email === userEmail);
  
  if (!user) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  
  if (user.password !== userPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  window.location.href = "/items.html";
});

// reset email and password field error message after new input detected
emailField.addEventListener("input", () => {
  emailError.textContent = "";
  emailError.classList.remove("auth__error--active");
  emailField.classList.remove("auth__form-input--error");
  updateButtonState();
});

passwordField.addEventListener("input", () => {
  passwordError.textContent = "";
  passwordError.classList.remove("auth__error--active");
  passwordPrimaryContainer.classList.remove("auth__form-password-primary--error");
  updateButtonState();
});

updateButtonState();