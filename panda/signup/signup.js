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
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#password');
const passwordSecond = document.querySelector('#password-2nd');
const eyeIcons = document.querySelectorAll('.eye-icon');
const errorMsgs = document.querySelectorAll('.error-msg');
const form = document.querySelector('#input-form');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal-popup button');

// 이메일, 비밀번호 정규 표현식
const emailRegex = /^[0-9a-zA-Z]*@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i;
const passwordRegex = /^[a-zA-Z0-9#?!@$%^&*-]{8,20}$/;

// 비밀번호 표시(눈 아이콘)
const eyeOn = e => {
  eyeIcons[1].classList.toggle('off');
  eyeIcons[3].classList.toggle('off');
  password.type = 'password';
  passwordSecond.type = 'password';
}

const eyeOff = e => {
  eyeIcons[1].classList.toggle('off');
  eyeIcons[3].classList.toggle('off');
  password.type = 'text';
  passwordSecond.type = 'text';
} 

eyeIcons[0].addEventListener('click', eyeOn);
eyeIcons[1].addEventListener('click', eyeOff);
eyeIcons[2].addEventListener('click', eyeOn);
eyeIcons[3].addEventListener('click', eyeOff);

// 로그인 버튼 활성화
const btnToggle = e => {
  if (emailRegex.test(email.value) 
      && nickname.value 
      && passwordRegex.test(password.value) 
      && (password.value === passwordSecond.value)) {
    btn.classList.add('btnAble');
    btn.disabled = false;
    btn.style.cursor = 'pointer';
  } else {
    btn.classList.remove('btnAble');
    btn.disabled = true;
    btn.style.cursor = 'default';
  }
}

email.addEventListener('keyup', btnToggle);
nickname.addEventListener('keyup', btnToggle);
password.addEventListener('keyup', btnToggle);
passwordSecond.addEventListener('keyup', btnToggle);

// 이메일, 비밀번호 에러 메세지
const errMsg = {
  email: { 
    empty: '이메일을 입력해주세요.',
    invalid: '잘못된 이메일 형식입니다.',
    success: '사용 가능한 이메일입니다.',
    fail: '사용 중인 이메일입니다.'
  },
  pw: {
    empty: '비밀번호를 입력해주세요.',
    invalid: '비밀번호를 8자 이상 입력해주세요.',
    success: '비밀번호가 일치합니다.',
    fail: '비밀번호가 일치하지 않습니다.'
  },
}

// focusin 이벤트 : 색상 효과
const focusIn = e => {
  e.target.classList.add('focus-in');
  e.target.classList.remove('focus-out');
}

email.addEventListener('focusin', focusIn);
nickname.addEventListener('focusin', focusIn);
password.addEventListener('focusin', focusIn);
passwordSecond.addEventListener('focusin', focusIn);

// focusout 이벤트 : 유효성 검증
email.addEventListener('focusout', e => {
  if (email.value === '') {
    errorMsgs[0].textContent = errMsg.email.empty;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else if (!emailRegex.test(email.value)) {
    errorMsgs[0].textContent = errMsg.email.invalid;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else {
    errorMsgs[0].textContent = '';
    e.target.classList.remove('focus-in')
  }
})

nickname.addEventListener('focusout', e => {
  e.target.classList.remove('focus-in')
})

password.addEventListener('focusout', e => {
  if (password.value === '') {
    errorMsgs[1].textContent = errMsg.pw.empty;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else if (!passwordRegex.test(password.value)) {
    errorMsgs[1].textContent = errMsg.pw.invalid;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else {
    errorMsgs[1].textContent = '';
    e.target.classList.remove('focus-in')
  }
})

passwordSecond.addEventListener('focusout', e => {
  if (passwordSecond.value === '') {
    errorMsgs[2].textContent = errMsg.pw.fail;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else if (!((password.value === passwordSecond.value) && passwordRegex.test(passwordSecond.value))) {
    errorMsgs[2].textContent = errMsg.pw.fail;
    e.target.classList.add('focus-out')
    e.target.classList.remove('focus-in')
  } else {
    errorMsgs[2].textContent = '';
    e.target.classList.remove('focus-in')
  }
})

// input할 때 errMsgs 초기화
email.addEventListener('input', e => errorMsgs[0].textContent = '');
password.addEventListener('input', e => errorMsgs[1].textContent = '');
passwordSecond.addEventListener('input', e => errorMsgs[2].textContent = '');

// 이메일, 비밀번호 체크 & 로그인 경로 설정 & 모달
const emailCheck = () => {
  const compare = USER_DATA.some( data => data.email === email.value);
  return compare;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!emailCheck()) {
    location.href = '/panda/login/login.html';
  } else {
    modal.style.display = 'block';
  }
})

modalBtn.addEventListener('click', e => modal.style.display = 'none');