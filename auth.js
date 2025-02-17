const emailInput = document.querySelector('.email');
const emailMsg = document.querySelector('.email-msg');
const emailError = document.querySelector('.email-error');

const pwInput = document.querySelector('.password');
const pwMsg = document.querySelector('.pw-msg');
const pwError = document.querySelector('.pw-error');
const pwCheckInput = document.querySelector('.pw-check');
const pwCheckError = document.querySelector('.pw-check-error');

const pwToggleBtns = document.querySelectorAll('.pw-toggle');
const loginBtn = document.querySelector('#loginBtn');
const signupBtn = document.querySelector('#signupBtn');
const submitBtns = [loginBtn, signupBtn].filter(btn => btn !== null);

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];


// 이메일 유효성 검사
function emailValid(email) {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return pattern.test(email);
}

emailInput.addEventListener('blur', function () {
  const email = emailInput.value.trim();
  if (email === '') {
    emailMsg.classList.remove('hide');
    emailError.classList.add('hide');
    emailInput.style.border = '1px solid red';
  } 
  else if (!emailValid(email)) {
    emailMsg.classList.add('hide');
    emailError.classList.remove('hide');
    emailInput.style.border = '1px solid red';
  }
  else {
    emailMsg.classList.add('hide');
    emailError.classList.add('hide');
    emailInput.style.border = 'none';
    submitBtns.forEach(btn => btn.removeAttribute('disabled'));
  }
})


// 비밀번호 유효성 검사
function passwordValid() {
  const pw = pwInput.value.trim();
  const pwCheck = pwCheckInput ? pwCheckInput.value.trim() : '';

  // 로그인, 회원가입 페이지 공통
  if (pw === '') {
    pwMsg.classList.remove('hide');
    pwError.classList.add('hide');
    pwInput.style.border = '1px solid red';
  } else if (pw.length < 8) {
    pwMsg.classList.add('hide');
    pwError.classList.remove('hide');
    pwInput.style.border = '1px solid red';
  } else {
    pwMsg.classList.add('hide');
    pwError.classList.add('hide');
    pwInput.style.border = 'none';
    submitBtns.forEach(btn => btn.removeAttribute('disabled'));
  }
  
  // 회원가입 페이지
  if (pwCheckInput) {
    if (pwCheck !== '' && pw !== pwCheck) {
      pwCheckError.classList.remove('hide');
      pwCheckInput.style.border = '1px solid red';
    } else {
      pwCheckError.classList.add('hide');
      pwCheckInput.style.border ='none';
      submitBtns.forEach(btn => btn.removeAttribute('disabled'));
    }  
  }
}

pwInput.addEventListener('blur', passwordValid);
if (pwCheckInput) {
  pwCheckInput.addEventListener('blur', passwordValid);
}


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

if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    const email = emailInput.value.trim();
    const pw = pwInput.value.trim();
    const user = USER_DATA.find(user => email === user.email && pw === user.password);
  
    if (user) {
      loginBtn.removeAttribute('disabled');
      modal('로그인 성공');
      window.location.href = 'items.html';
    } else {
      loginBtn.setAttribute('disabled', true);
      modal('비밀번호가 일치하지 않습니다.');
    }
  })
}

if (signupBtn) {
  signupBtn.addEventListener('click', function() {
    const email = emailInput.value.trim();
    const pw = pwInput.value.trim();
    const user = USER_DATA.find(user => email === user.email);
  
    if (user) {
      modal('사용 중인 이메일입니다.');
      signupBtn.setAttribute('disabled', true);
    } else {
      USER_DATA.push({ email, password: pw});
      modal('가입이 완료되었습니다!');
      window.location.href = 'login.html';
    }
  })
}