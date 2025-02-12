//  user database
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// handling aut__form-password-toggle for password input visibility 
document.querySelectorAll(".auth__form-password-toggle").forEach((btn) => {
btn.addEventListener("click", ()=>{
  const userInput = btn.previousElementSibling;
  if (userInput && userInput.classList.contains("auth__form-password-input")) {
    userInput.type = userInput.type === "password"? "text" : "password";
  }
});
});

let form = document.querySelector('.auth__form');
let emailField = document.querySelector('#email');
let passwordField = document.querySelector('#password');
let emailError = document.querySelector('#emailError');
let passwordError = document.querySelector('#passwordError');


//email validity function
function isValidEmail(email) {
  const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// if email input focus is out, check emailField value for error
emailField.addEventListener('focusout', function() {
  // get the user email from the field
  let userEmail = emailField.value;
  if (userEmail === '') {
    emailError.textContent = '이메일을 입력해주세요.';
    emailError.classList.add('auth__error--active');
    emailField.classList.add('auth__form-input--error');
  } else if (!isValidEmail(emailField)) {
    emailError.textContent = '잘못된 이메일 형식입니다.';
    emailError.classList.add('auth__error-active');
    emailField.classList.add('auth__form-input--error');
  } else {
    emailError.classList.remove('auth__error-active');
    emailField.classList.remove('auth__form-input--error');
  }
});
//need to check email validity again when focuse is back in?