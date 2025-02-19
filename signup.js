//로그인,회원가입 버튼 업데이트
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const checkPasswordInput = document.getElementById('checkpassword');
const submitBtn = document.getElementById('submitBtn');

const nicknameInput = document.getElementById('nickname');

function updateLoginButton() {
    if (emailInput.value && passwordInput.value && emailErrorMsg.style.display === 'none' && passwordErrorMsg.style.display === 'none') {
        submitBtn.style.backgroundColor = 'var(--panda-blue)';
        submitBtn.disabled = false;
    } else {
        submitBtn.style.backgroundColor = 'var(--panda-dark-gray)';
        submitBtn.disabled = true;
    }
}

function updateSignupButton() {
    if (emailInput.value && passwordInput.value && checkPasswordInput.value && nicknameInput.value && emailErrorMsg.style.display === 'none' && passwordErrorMsg.style.display === 'none' && passwordInput.value === checkPasswordInput.value) {
        submitBtn.style.backgroundColor = 'var(--panda-blue)';
        submitBtn.disabled = false;
    } else {
        submitBtn.style.backgroundColor = 'var(--panda-dark-gray)';
        submitBtn.disabled = true;
    }
}

emailInput.addEventListener('input', updateLoginButton);
passwordInput.addEventListener('input', updateLoginButton);
// 닉네임 input에 대한 이벤트 리스너가 존재하는 경우에만 추가 (예외처리)
if (nicknameInput) {
    nicknameInput.addEventListener('input', updateSignupButton);
}

// 비밀번호 확인 input에 대한 이벤트 리스너가 존재하는 경우에만 추가 (예외처리)
if (checkPasswordInput) {
    checkPasswordInput.addEventListener('input', updateSignupButton);
}

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
    updateLoginButton();
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
    updateLoginButton();
});

// 비밀번호 확인 오류 메세지 출력
if (checkPasswordInput) { // 비밀번호 확인 input이 존재하는 경우에만 실행 (예외처리)
    const checkPasswordErrorMsg = document.createElement('div');
    checkPasswordErrorMsg.style.color = 'red';
    checkPasswordErrorMsg.style.display = 'none';
    checkPasswordErrorMsg.style.marginTop = '1rem';
    checkPasswordErrorMsg.textContent = '비밀번호가 일치하지 않습니다.';
    checkPasswordInput.parentNode.insertBefore(checkPasswordErrorMsg, checkPasswordInput.nextSibling);

    checkPasswordInput.addEventListener('input', () => {
        if (passwordInput.value !== checkPasswordInput.value) {
            checkPasswordInput.style.border = '0.0625rem solid var(--panda-border-red)';
            checkPasswordErrorMsg.style.display = 'block';
        } else {
            checkPasswordInput.style.borderColor = '';
            checkPasswordErrorMsg.style.display = 'none';
        }
        updateSignupButton();
    });
}

// 닉네임 오류 메세지 출력
if (nicknameInput) { // 닉네임 input이 존재하는 경우에만 실행 (예외처리)
    const nicknameErrorMsg = document.createElement('div');
    nicknameErrorMsg.style.color = 'red';
    nicknameErrorMsg.style.display = 'none';
    nicknameErrorMsg.style.marginTop = '1rem';
    nicknameErrorMsg.textContent = '닉네임을 입력해주세요';
    nicknameInput.parentNode.insertBefore(nicknameErrorMsg, nicknameInput.nextSibling);

    nicknameInput.addEventListener('focusout', () => {
        if (!nicknameInput.value) {
            nicknameInput.style.border = '0.0625rem solid var(--panda-border-red)';
            nicknameErrorMsg.style.display = 'block';
        } else {
            nicknameInput.style.borderColor = '';
            nicknameErrorMsg.style.display = 'none';
        }
        updateSignupButton();
    });
}

//회원 가입 여부, 비밀번호 대조 후 페이지 이동
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (submitBtn.textContent === '로그인') {
        const user = USER_DATA.find(user => user.email === email);

        if (user) {
            if (user.password === password) {
                window.location.href = '/items';
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } else {
            alert('잘못된 이메일입니다.');
        }
    }
    else if (submitBtn.textContent === '회원가입') {
        const nickname = nicknameInput.value;
        const checkPassword = checkPasswordInput.value;

        const userExists = USER_DATA.some(user => user.email === email);

        if (userExists) {
            alert('사용 중인 이메일입니다.');
        } else if (password === checkPassword) {
            USER_DATA.push({ email, password });
            alert('회원가입이 완료되었습니다.');
            window.location.href = '/login';
        }
    }
});

//임시 데이터 베이스
const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

