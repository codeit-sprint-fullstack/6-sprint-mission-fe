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

//이메일 등의 유효성 확인 및 오류 메시지 출력

const validation = () => {
  const form = document.getElementById('form');
  const input = form.querySelectorAll('input');

  if (form) {
    input.forEach((input) => {
      input.addEventListener('invalid', () => {
        form.classList.add('invalid-form');
      })
    })
  }
}