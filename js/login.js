// 비밀번호 보였다가 안 보였다가 하게 설정

document.addEventListener("DOMContentLoaded", () => {
  const passwordType = document.querySelector('.password');
  const passwordCheckType = document.querySelector('.password-check');

  const toggleButton = document.querySelector('.hide-pw');
  const toggleButtonCheck = document.querySelector('.hide-pw-check');

  toggleButton.addEventListener('click', () => {
    if (passwordType.type === "password") {
      passwordType.type = "text";
      toggleButton.style.backgroundImage = "url('images/eye-open.png')";
    } else {
      passwordType.type = "password";
      toggleButton.style.backgroundImage = "url('images/eye-close.png')";
    }
  });

  toggleButtonCheck.addEventListener('click', () => {
    if (passwordCheckType.type === "password") {
      passwordCheckType.type = "text";
      toggleButtonCheck.style.backgroundImage = "url('../images/eye-open.png')";
    } else {
      passwordCheckType.type = "password";
      toggleButtonCheck.style.backgroundImage = "url('../images/eye-close.png')";
    }
  });
});

// 이메일 등 유효성 확인

const checkError = document.getElementById('error')
const emailForm = document.getElementById('email')
const passwordForm = document.getElementById('password')
const form = document.getElementsByClassName('input-form')

