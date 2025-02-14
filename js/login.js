// 비밀번호 보였다가 안 보였다가 하게 설정

const password = document.getElementById('password');
const passwordCheck = document.getElementById('password-check');
const toggleButton = document.querySelector('.hide-pw');
const toggleButtonCheck = document.querySelector('.hide-pw-check');

toggleButton.addEventListener('click', () => {
  if (password.type === "password") {
    password.type = "text";
    toggleButton.style.backgroundImage = "url('../images/eye-open.png')";
  } else {
    password.type = "password";
    toggleButton.style.backgroundImage = "url('../images/eye-close.png')";
  }
});

toggleButtonCheck.addEventListener('click', () => {
  if (passwordCheck.type === "password") {
    passwordCheck.type = "text";
    toggleButtonCheck.style.backgroundImage = "url('../images/eye-open.png')";
  } else {
    passwordCheck.type = "password";
    toggleButtonCheck.style.backgroundImage = "url('../images/eye-close.png')";
  }
});

/* 이메일 등의 유효성 확인 및 오류 메시지 출력

const emailForm = document.getElementById('email');
const nicknameForm = document.getElementById('nickname');
const passwordForm = document.getElementById('password');
const passwordCheckForm = document.getElementById('password-check');

const button = document.getElementById('large-submit-button');
const inputForm = document.getElementsByClassName('input-form');

const addDiv = document.createElement('div');

const validation = emailForm.value && nicknameForm.value && passwordForm.value && passwordCheckForm.value

emailForm.addEventListener('keyup', () => {
  if (emailForm.value = '') {
    addDiv.textContent = "잘못된 이메일 형식입니다."
    
  }
});

nicknameForm.addEventListener('keyup', checkForm);
passwordForm.addEventListener('keyup', checkForm);
passwordCheckForm.addEventListener('keyup', checkForm);

*/