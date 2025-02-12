// USER_DATA
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 선택자
const btn = document.querySelector('.btn');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const eyeIcon = document.querySelectorAll('.eye-icon');
const errorMsg = document.querySelectorAll('.error-msg');
const form = document.querySelector('#input-form');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal-popup button');

// 이메일, 비밀번호 정규 표현식
const emailRegex = /^[0-9a-zA-Z]*@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i;
const passwordRegex = /^[a-zA-Z0-9#?!@$%^&*-]{8,20}$/;

// 비밀번호 표시(눈 아이콘)
eyeIcon[0].addEventListener('click', e => {
  eyeIcon[1].classList.toggle('off');
  password.type = 'password';
});

eyeIcon[1].addEventListener('click', e => {
  eyeIcon[1].classList.toggle('off');
  password.type = 'text';
});

// input-box focusin, focusout 이벤트
const focusIn = e => {
  e.target.classList.add('focus-in');
  e.target.classList.remove('focus-out');
}

email.addEventListener('focusin', focusIn);
password.addEventListener('focusin', focusIn);

// 로그인 버튼 활성화
const btnToggle = e => {
  if (emailRegex.test(email.value) && passwordRegex.test(password.value)) {
    btn.classList.add('btnAble');
    btn.disabled = false;
    
  } else {
    btn.classList.remove('btnAble');
    btn.disabled = true;
  }
}

email.addEventListener('keyup', btnToggle);
password.addEventListener('keyup', btnToggle);

// 이메일, 비밀번호 유효성 검사
const errMsg = {
  email: { 
    empty: '이메일을 입력해주세요.',
    invalid: '잘못된 이메일 형식입니다.',
    success: '사용 가능한 아이디입니다',
    already: '사용 중인 이메일입니다.'
  },
  pw: {
    empty: '비밀번호를 입력해주세요.',
    invalid: '비밀번호를 8자 이상 입력해주세요.',
    success: '비밀번호가 일치합니다',
    fail: '비밀번호가 일치하지 않습니다.'
  },
}

email.addEventListener('focusout', e => {
  if (email.value === '') {
    errorMsg[0].textContent = errMsg.email.empty;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else if (!emailRegex.test(email.value)) {
    errorMsg[0].textContent = errMsg.email.invalid;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else {
    errorMsg[0].textContent = '';
    e.target.classList.remove('focus-in')
  }
})

password.addEventListener('focusout', e => {
  if (password.value === '') {
    errorMsg[1].textContent = errMsg.pw.empty;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else if (!passwordRegex.test(password.value)) {
    errorMsg[1].textContent = errMsg.pw.invalid;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else {
    errorMsg[1].textContent = '';
    e.target.classList.remove('focus-in')
  }
})

email.addEventListener('input', e => errorMsg[0].textContent = '');
password.addEventListener('input', e => errorMsg[1].textContent = '');

// 이메일, 비밀번호 체크 & 로그인 경로 설정 & 모달
const emailCheck = () => {
  const compare = USER_DATA.some( data => data.email === email.value);
  return compare;
}

const passwordCheck = () => {
  const compare = USER_DATA.some( data => data.password === password.value);
  return compare;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (emailCheck() && passwordCheck()) {
    location.href = 'items.html';
  } else {
    modal.style.display = 'block';
  }
})

modalBtn.addEventListener('click', e => modal.style.display = 'none');