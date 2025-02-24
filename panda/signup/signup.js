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
const formBtnToggle = e => {
  if (emailRegex.test(email.value) 
      && nickname.value 
      && passwordRegex.test(password.value) 
      && (password.value === passwordSecond.value)) {
    formBtn.classList.add('form-btn-able');
    formBtn.disabled = false;
    formBtn.style.cursor = 'pointer';
  } else {
    formBtn.classList.remove('form-btn-able');
    formBtn.disabled = true;
    formBtn.style.cursor = 'default';
  }
}

email.addEventListener('keyup', formBtnToggle);
nickname.addEventListener('keyup', formBtnToggle);
password.addEventListener('keyup', formBtnToggle);
passwordSecond.addEventListener('keyup', formBtnToggle);

// focusin 이벤트 : 색상 효과
form.addEventListener('focusin', e => {
  if (e.target.tagName === 'INPUT') {
    e.target.classList.add('focus-in');
    e.target.classList.remove('focus-out');
  }
})

// focusout 이벤트 : 색상 효과
form.addEventListener('focusout', e => {
  if (e.target.tagName === 'INPUT') {
    if (e.target === nickname) {
      e.target.classList.remove('focus-in')
    } else if(e.target.nextElementSibling.textContent) {
      e.target.classList.add('focus-out')
      e.target.classList.remove('focus-in')
    } else {
      e.target.classList.remove('focus-in')
    }
  }
})

// 이메일, 비밀번호 유효성 검증
email.addEventListener('focusout', e => {
  if (email.value === '') {
    errorMsgs[0].textContent = errMsg.email.empty;
  } else if (!emailRegex.test(email.value)) {
    errorMsgs[0].textContent = errMsg.email.invalid;
  } else {
    errorMsgs[0].textContent = '';
  }
})

password.addEventListener('focusout', e => {
  if (password.value === '') {
    errorMsgs[1].textContent = errMsg.pw.empty;
  } else if (!passwordRegex.test(password.value)) {
    errorMsgs[1].textContent = errMsg.pw.invalid;
  } else {
    errorMsgs[1].textContent = '';
  }
})

passwordSecond.addEventListener('focusout', e => {
  if (passwordSecond.value === '') {
    errorMsgs[2].textContent = errMsg.pw.fail;
  } else if (!((password.value === passwordSecond.value) && passwordRegex.test(passwordSecond.value))) {
    errorMsgs[2].textContent = errMsg.pw.fail;
  } else {
    errorMsgs[2].textContent = '';
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

// popup 버튼 이벤트
modalBtn.addEventListener('click', e => modal.style.display = 'none');