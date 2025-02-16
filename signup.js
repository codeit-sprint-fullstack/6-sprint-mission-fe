//로그인 버튼 색깔 변경
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const checkPasswordInput = document.getElementById('checkpassword');
const submitBtn = document.getElementById('submitBtn');

function updateSubmitButton() {
    if (emailInput.value && passwordInput.value && emailErrorMsg.style.display === 'none' && passwordErrorMsg.style.display === 'none') {
        submitBtn.style.backgroundColor = 'var(--panda-blue)';
        submitBtn.disabled = false;
    } else {
        submitBtn.style.backgroundColor = 'var(--panda-dark-gray)';
        submitBtn.disabled = true;
    }
}

emailInput.addEventListener('input', updateSubmitButton);
passwordInput.addEventListener('input', updateSubmitButton);

//이메일 오류 메세지 출력
const emailErrorMsg = document.createElement('div');
emailErrorMsg.style.color = 'red';
emailErrorMsg.style.display = 'none';
emailErrorMsg.style.marginTop = '1rem';
emailErrorMsg.textContent = '이메일을 입력해주세요';
emailInput.parentNode.insertBefore(emailErrorMsg, emailInput.nextSibling);

emailInput.addEventListener('focusout', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value) {
        emailInput.style.border = '0.0625rem solid var(--panda-border-red)';
        emailErrorMsg.textContent = '이메일을 입력해주세요';
        emailErrorMsg.style.display = 'block';
    } else if (!emailPattern.test(emailInput.value)) {
        emailInput.style.border = '0.0625rem solid var(--panda-border-red)';
        emailErrorMsg.textContent = '잘못된 이메일 형식입니다';
        emailErrorMsg.style.display = 'block';
    } else {
        emailInput.style.borderColor = '';
        emailErrorMsg.style.display = 'none';
    }
    updateSubmitButton();
});


//비밀번호 표시 토글
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleCheckPasswordBtn = document.getElementById('toggleCheckPassword');

function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
        input.type = 'text';
        button.src = 'img/btn_visibility_on.png';
    } else {
        input.type = 'password';
        button.src = 'img/btn_visibility_off.png';
    }
}

togglePasswordBtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, togglePasswordBtn));
// signup.html의 비밀번호 확인 input에 대한 토글 버튼이 존재하는 경우에만 이벤트 리스너를 추가 (예외처리)
if (toggleCheckPasswordBtn) {
    toggleCheckPasswordBtn.addEventListener('click', () => togglePasswordVisibility(checkPasswordInput, toggleCheckPasswordBtn));
}

// 비밀번호 오류 메세지 출력
const passwordErrorMsg = document.createElement('div');
passwordErrorMsg.style.color = 'red';
passwordErrorMsg.style.display = 'none';
passwordErrorMsg.style.marginTop = '1rem';
passwordErrorMsg.textContent = '비밀번호를 입력해주세요';
passwordInput.parentNode.insertBefore(passwordErrorMsg, passwordInput.nextSibling);

passwordInput.addEventListener('focusout', () => {
    if (!passwordInput.value) {
        passwordInput.style.border = '0.0625rem solid var(--panda-border-red)';
        passwordErrorMsg.textContent = '비밀번호를 입력해주세요';
        passwordErrorMsg.style.display = 'block';
    } else if (passwordInput.value.length < 8) {
        passwordInput.style.border = '0.0625rem solid var(--panda-border-red)';
        passwordErrorMsg.textContent = '비밀번호를 8자 이상 입력해주세요';
        passwordErrorMsg.style.display = 'block';
    } else {
        passwordInput.style.borderColor = '';
        passwordErrorMsg.style.display = 'none';
    }
    updateSubmitButton();
});
