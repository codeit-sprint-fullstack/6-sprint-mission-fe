const emailInput = document.querySelector('#email');
const emailEmptyError = document.querySelector('#emailEmptyError');
const emailInvalidError = document.querySelector('#emailInvalidError');
const pwToggleBtns = document.querySelectorAll('.pw-toggle');
const loginBtn = document.querySelector('#loginBtn');
const signupBtn = document.querySelector('#signupBtn');

let isEmailValid = false;
let isNicknameValid = false;
let isPasswordValid = false;
let isPwCheckValid = false;

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 오류 메세지 노출 함수
function showError(input, errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.remove('hide');
  input.style.border = '1px solid red';
}

// 오류 메세지 숨김 함수
function hideError(input, errorElement) {
  errorElement.classList.add('hide');
  input.style.border = 'none';
}

// submit button 활성화 함수
function updateSubmitButtonState() {
  if (loginBtn) {
    if (isEmailValid && isPasswordValid) {
      loginBtn.removeAttribute('disabled');
    } else {
      loginBtn.setAttribute('disabled', true);
    }
  } else if (signupBtn) {
    if (isEmailValid && isPasswordValid && isNicknameValid && isPwCheckValid) {
      signupBtn.removeAttribute('disabled');
    } else (
      signupBtn.setAttribute('disabled', true)
    )
  }
}

// 이메일 유효성 검사 함수
function emailValid(email) {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return pattern.test(email);
}

// 이메일 유효성 검사
emailInput.addEventListener('blur', function () {
  const email = emailInput.value.trim();
  isEmailValid = false;
  hideError(emailInput, emailEmptyError);
  hideError(emailInput, emailInvalidError);

  if (!email) {
    showError(emailInput, emailEmptyError, '이메일을 입력해주세요.');
  } 
  else if (!emailValid(email)) {
    showError(emailInput, emailInvalidError, '잘못된 이메일 형식입니다.');
  }
  else {
    isEmailValid = true;
    hideError(emailInput, emailEmptyError);
    hideError(emailInput, emailInvalidError);
  }
  updateSubmitButtonState();
})

// 비밀번호 보기 토글
pwToggleBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const input = btn.previousElementSibling;
    const img = btn.querySelector('img');

    if (input.type === 'password') {
      input.type = 'text';
      img.src = 'images/icon/eye-visible.svg';
    } else {
      input.type = 'password';
      img.src = 'images/icon/eye-invisible.svg';
    }
  })
})

// 오류 메세지 모달
function modal(msg) {
  const modalBox = document.querySelector('.modal-box');
  const modalMsg = document.querySelector('.modal-msg');
  modalMsg.innerHTML = msg;
  modalBox.style.display = 'flex';
}

document.querySelector('.modal-btn').addEventListener('click', function() {
  document.querySelector('.modal-box').style.display = 'none';
})