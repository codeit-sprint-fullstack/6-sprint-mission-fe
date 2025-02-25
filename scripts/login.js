const pwInput = document.querySelector('#password');
const pwEmptyError = document.querySelector('#pwEmptyError');
const pwInvalidError = document.querySelector('#pwInvalidError');

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

// 로그인 오류 메세지 모달
loginBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const pw = pwInput.value.trim();
  const user = USER_DATA.find(user => email === user.email);

  if (!email) {
    modal('이메일을 입력해주세요.');
  } else if (!user) {
    modal('등록되지 않은 이메일입니다.')
  } else if (pw !== user.password) {
    modal('비밀번호가 일치하지 않습니다.')
  } else {
    window.location.href = 'items.html';
  }
})