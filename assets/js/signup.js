const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// codeit1@codeit.com vcodeit101!
const emailField= document.querySelector("#email");
const emailError = emailField.nextElementSibling;
const nicknameField = document.querySelector("#nickname");
const nicknameError = nicknameField.nextElementSibling;
const passwordToggles = document.querySelectorAll(".auth__form-password-toggle");
const passwordField = document.querySelector("#password");
const passwordConfirmField = document.querySelector("#password-confirmation");
const passwordPrimaryContainer = document.querySelector(".auth__form-password-primary");
const passwordConfirmContainer = document.querySelector(".auth__form-password-confirm");
const passwordError = passwordPrimaryContainer.nextElementSibling; 
const passwordConfirmError = passwordConfirmContainer.nextElementSibling;
const submitButton = document.querySelector(".auth__button");
const form = document.querySelector(".auth__form");

// handling password visibility 
passwordToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const userInput = toggle.previousElementSibling;
    const toggleIcon = toggle.querySelector("img");
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
});

// input field validity
//check email and password validity 
function isValidEmail(email) {
  const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// check nickname validity
function isValidNickname(nickname) {
  return nickname.length >= 1;
}

function isValidPassword(password) {
  return password.length >= 8;
}

// check password confirm validity
function isValidPasswordConfirm(password) {
  const userPassword = passwordField.value.trim();
  const userPasswordConfirm = password;
  return userPasswordConfirm === userPassword;
}

// check form validity - update needed
function isValidForm() {
  const userEmail = emailField.value.trim();
  const userPassword = passwordField.value.trim();
  const userPasswordConfirm = passwordConfirmField.value.trim();
  const userNickname = nicknameField.value.trim();
  
  return userEmail && 
  userNickname && // add nickname
  userPassword && 
  userPasswordConfirm &&  // Add password confirmation check
  !emailError.textContent && 
  !nicknameError.textContent &&
  !passwordError.textContent && 
  !passwordConfirmError.textContent;  // Add confirmation error check
}

// check form validity and update button status
function updateButtonState() {
  submitButton.disabled = !isValidForm();
}

// for each input add eventListener triggered by each user input
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", updateButtonState);
});

// handling emailField - show error message
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

// handling nicknameField - show error message 
nicknameField.addEventListener("focusout", () => {
  const userNickname = nicknameField.value.trim();
  if (!isValidNickname(userNickname)) {
    nicknameError.textContent = "닉네임을 입력해주세요.";
  } else {
    nicknameError.textContent = "";
  }
  nicknameError.classList.toggle("auth__error--active", !!nicknameError.textContent);
  nicknameField.classList.toggle("auth__form-input--error", !!nicknameError.textContent);
});

// handling passwordField - show error message
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
// **handling passwordConfirmField - show error message
passwordConfirmField.addEventListener("focusout", () => {
  const userPasswordConfirm = passwordConfirmField.value.trim();
  if (!isValidPasswordConfirm(userPasswordConfirm)) {
    passwordConfirmError.textContent = "비밀번호가 일치하지 않습니다.";
  } else {
    passwordConfirmError.textContent = "";
  }
  passwordConfirmError.classList.toggle("auth__error--active", !!passwordConfirmError.textContent);
  passwordConfirmContainer.classList.toggle("auth__form-password-confirm--error", !!passwordConfirmError.textContent);
});

// reset input fields error messages
// reset email error
emailField.addEventListener("input", () => {
  emailError.textContent = "";
  emailError.classList.remove("auth__error--active");
  emailField.classList.remove("auth__form-input--error");
  updateButtonState();
});

// reset nickname error
nicknameField.addEventListener("input", () => {
  nicknameError.textContent = "";
  nicknameError.classList.remove("auth__error--active");
  nicknameField.classList.remove("auth__form-input--error");
  updateButtonState();
});
// reset pw error
passwordField.addEventListener("input", () => {
  passwordError.textContent = "";
  passwordError.classList.remove("auth__error--active");
  passwordPrimaryContainer.classList.remove("auth__form-password-primary--error");
  updateButtonState();
});

// reset password confirm field error 
passwordConfirmField.addEventListener("input", () => {
  passwordConfirmError.textContent = "";
  passwordConfirmError.classList.remove("auth__error--active");
  passwordConfirmContainer.classList.remove("auth__form-password-confirm--error");
  updateButtonState();
});

// modal elements
const modal = document.querySelector('#modal');
const modalMessage = modal.querySelector('.modal__message');
const modalButton = modal.querySelector('.modal__button');

// show modal with message
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = 'flex';
}

// hide modal
function hideModal() {
  modal.style.display = 'none';
}

// add click event to modal button
modalButton.addEventListener('click', () => {
  hideModal();
});

// close modal when clicking outside
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

// check email in db
function isEmailExists(email) {
  return USER_DATA.some(user => user.email === email);
}

// modal related functions 
function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.add('modal--visible');
}

function hideModal() {
  modal.classList.remove('modal--visible');
}

// Modal button click handler
modalButton.addEventListener('click', () => {
  hideModal();
});

function handleSignupSubmit(event) {
  event.preventDefault();
  const userEmail = emailField.value.trim();
  // Check if email already exists
  if (isEmailExists(userEmail)) {
    showModal('사용 중인 이메일입니다.');
    return;
  }

  // sign up successful, redirect to login page
  window.location.href = '/login.html';
}

// add form submit event listener
form.addEventListener('submit', handleSignupSubmit);

updateButtonState();