import { USER_DATA } from "./userData.js";
import { validateEmail, validatePassword, validateConfirmPassword, handleValidation, addValidationEvents, activateButton, togglePassword } from "./formValidation.js";

const emailForm = document.querySelector("#email");
const nameForm = document.querySelector("#userName");
const pwForm = document.querySelector("#password");
const checkPwForm = document.querySelector("#checkPW");
const signupButton = document.querySelector('button[type="submit"]');

const emailError = document.querySelector("#email-error");
const pwError = document.querySelector("#PW-error");
const pwValidateError = document.querySelector("#PW-validate-error");

// Apply validation events
addValidationEvents(emailForm, validateEmail, emailError);
addValidationEvents(pwForm, validatePassword, pwError);
addValidationEvents(checkPwForm, () => validateConfirmPassword(pwForm.value, checkPwForm.value), pwValidateError);

// Enable signup button when fields are filled
function validateForm() {
  const isValid = emailForm.value && validateEmail(emailForm.value) === "" &&
                  nameForm.value &&
                  pwForm.value && validatePassword(pwForm.value) === "" &&
                  checkPwForm.value && validateConfirmPassword(pwForm.value, checkPwForm.value) === "";
  
  activateButton(signupButton, isValid);
}

emailForm.addEventListener("keyup", validateForm);
nameForm.addEventListener("keyup", validateForm);
pwForm.addEventListener("keyup", validateForm);
checkPwForm.addEventListener("keyup", validateForm);

// Toggle Password Visibility
document.querySelector(".toggle-password")?.addEventListener("click", (event) => {
  togglePassword("password", event);
});

// Signup Button Click Event
signupButton.addEventListener("click", (event) => {
  event.preventDefault();

  const email = emailForm.value.trim();
  const name = nameForm.value.trim();
  const password = pwForm.value.trim();

  const existingUser = USER_DATA.find((user) => user.email === email);
  if (existingUser) {
    alert("사용 중인 이메일입니다.");
    return;
  }

  USER_DATA.push({ email, name, password });
  alert("회원가입이 완료되었습니다!");
  window.location.href = "./login.html";
});
