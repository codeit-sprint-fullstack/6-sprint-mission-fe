const nicknameInput = document.querySelector('#nickname');
const nicknameEmptyError = document.querySelector('#nicknameEmptyError');
const pwInput = document.querySelector('#password');
const pwEmptyError = document.querySelector('#pwEmptyError');
const pwInvalidError = document.querySelector('#pwInvalidError');
const pwCheckInput = document.querySelector('#pwCheck');
const pwCheckError = document.querySelector('#pwCheckError');

// 닉네임 유효성 검사
nicknameInput.addEventListener('blur', function () {
  const nickname = nicknameInput.value.trim();
  isNicknameValid = false;
  hideError(nicknameInput, nicknameEmptyError);

  if(!nickname) {
    showError(nicknameInput, nicknameEmptyError, '닉네임을 입력해주세요.');
  } else {
    isNicknameValid = true;
    hideError(nicknameInput, nicknameEmptyError);
  }
  updateSubmitButtonState();
})

// 비밀번호 유효성 검사
pwInput.addEventListener('blur', function () {
  const pw = pwInput.value.trim();
  isPasswordValid = false;
  hideError(pwInput, pwEmptyError);
  hideError(pwInput, pwInvalidError);

  if (!pw) {
    showError(pwInput, pwEmptyError, '비밀번호를 입력해주세요.');
  } else if (pw.length < 8) {
    showError(pwInput, pwInvalidError, '비밀번호를 8자 이상 입력해주세요.');
  } else {
    isPasswordValid = true;
    hideError(pwInput, pwEmptyError);
    hideError(pwInput, pwInvalidError);
  }
  updateSubmitButtonState();
})

// 비밀번호 확인 유효성 검사
pwCheckInput.addEventListener('blur', function () {
  const pw = pwInput.value.trim();
  const pwCheck= pwCheckInput.value.trim();
  isPwCheckValid = false;
  hideError(pwCheckInput, pwCheckError);

  if (!pwCheck || pw !== pwCheck) {
    showError(pwCheckInput, pwCheckError, '비밀번호가 일치하지 않습니다.');
  } else {
    isPwCheckValid = true;
    hideError(pwCheckInput, pwCheckError);
  }  
  updateSubmitButtonState();
})

// 회원가입 오류 메세지 모달
signupBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const pw = pwInput.value.trim();
  const user = USER_DATA.find(user => email === user.email);

  if (!email) {
    modal('이메일을 입력해주세요.');
  } else if (user) {
    modal('사용 중인 이메일 입니다.')
  }
  else {
    USER_DATA.push({ email, password: pw});
    window.location.href = 'login.html';
  }
})