// 비밀번호 표시(눈 아이콘)
eyeIcons[0].addEventListener('click', e => {
  eyeIcons[1].classList.toggle('off');
  password.type = 'password';
});

eyeIcons[1].addEventListener('click', e => {
  eyeIcons[1].classList.toggle('off');
  password.type = 'text';
});

// 로그인 버튼 활성화
const btnToggle = e => {
  if (emailRegex.test(email.value) && passwordRegex.test(password.value)) {
    btn.classList.add('btn-able');
    btn.disabled = false;
    btn.style.cursor = 'pointer';
  } else {
    btn.classList.remove('btn-able');
    btn.disabled = true;
    btn.style.cursor = 'default';
  }
}

email.addEventListener('keyup', btnToggle);
password.addEventListener('keyup', btnToggle);

// focusin 이벤트 : 색상 효과
const focusIn = e => {
  e.target.classList.add('focus-in');
  e.target.classList.remove('focus-out');
}

email.addEventListener('focusin', focusIn);
password.addEventListener('focusin', focusIn);

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

// input할 때 errMsgs 초기화
email.addEventListener('input', e => errorMsgs[0].textContent = '');
password.addEventListener('input', e => errorMsgs[1].textContent = '');

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
    location.href = '/panda/items/items.html';
  } else {
    modal.style.display = 'block';
  }
})

// popup 버튼 이벤트
modalBtn.addEventListener('click', e => modal.style.display = 'none');