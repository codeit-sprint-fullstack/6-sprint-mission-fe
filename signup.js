//로그인 버튼 색깔 변경
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const checkPasswordInput = document.getElementById('checkpassword');
const submitBtn = document.getElementById('submitBtn');

function updateSubmitButton() {
    if (emailInput.value && passwordInput.value) {
        submitBtn.style.backgroundColor = 'var(--panda-blue)';
    } else {
        submitBtn.style.backgroundColor = 'var(--panda-dark-gray)';
    }
}

emailInput.addEventListener('input', updateSubmitButton);
passwordInput.addEventListener('input', updateSubmitButton);

const emailErrorMsg = document.createElement('div');
emailErrorMsg.style.color = 'red';
emailErrorMsg.style.display = 'none';
emailErrorMsg.style.marginTop = '1rem';
emailErrorMsg.textContent = '이메일을 입력해주세요';
emailInput.parentNode.insertBefore(emailErrorMsg, emailInput.nextSibling);

emailInput.addEventListener('focusout', () => {
    if (!emailInput.value) {
        emailInput.style.border='0.0625rem solid var(--panda-border-red)';
        emailErrorMsg.style.display = 'block';
    } else {
        emailInput.style.borderColor = '';
        emailErrorMsg.style.display = 'none';
    }
});

//비밀번호 표시 토글
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleCheckPasswordBtn = document.getElementById('toggleCheckPassword');


function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
        input.type = 'text';
        button.src = 'btn_visibility_on.png';
    } else {
        input.type = 'password';
        button.src = 'btn_visibility_off.png';
    }
}

togglePasswordBtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, togglePasswordBtn));
toggleCheckPasswordBtn.addEventListener('click', () => togglePasswordVisibility(checkPasswordInput, toggleCheckPasswordBtn));
