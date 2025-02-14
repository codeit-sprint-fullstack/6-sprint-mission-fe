function togglePassword(image) {
    const passwordInput = image.previousElementSibling; 
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        image.src = "뜬눈.png";  
    } else {
        passwordInput.type = "password";
        image.src = "가려진눈.png";  
    }
}

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.getElementById('email');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const emailError = document.querySelector('.emailError');
const nicknameError = document.querySelector('.nicknameError');
const passwordError = document.querySelector('.passwordError');
const passwordConfirmError = document.querySelector('.passwordConfirmError');
const emailErrorbox = document.querySelector('.email글자박스');
const nicknameErrorbox = document.querySelector('.nickname글자박스');
const passwordErrorbox = document.querySelector('.password글자박스');
const passwordConfirmErrorbox = document.querySelector('.passwordConfirm글자박스');


emailInput.addEventListener('blur', validateEmail);

function validateEmail() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        emailErrorbox.classList.add('err');
        emailError.textContent = "이메일을 입력해주세요.";
    } else if (!emailRegex.test(email)) {
        emailErrorbox.classList.add('err');
        emailError.textContent = "잘못된 이메일 형식입니다.";
    } else {
        emailError.textContent = "";
        emailErrorbox.classList.remove('err');
    }
}


nicknameInput.addEventListener('blur', validateNickname);

function validateNickname() {
    const nickname = nicknameInput.value;

    if (!nickname) {
        nicknameErrorbox.classList.add('err');
        nicknameError.textContent = "닉네임을 입력해주세요.";
    } else {
        nicknameError.textContent = "";
        nicknameErrorbox.classList.remove('err');
    }
}


passwordInput.addEventListener('blur', validatePassword);

function validatePassword() {
    const password = passwordInput.value;

    if (!password) {
        passwordErrorbox.classList.add('err');
        passwordError.textContent = "비밀번호를 입력해주세요.";
    } else if (password.length < 8) {
        passwordErrorbox.classList.add('err');
        passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    } else {
        passwordError.textContent = "";
        passwordErrorbox.classList.remove('err');
    }
}


passwordConfirmInput.addEventListener('blur', validatePasswordConfirm);

function validatePasswordConfirm() {
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (!passwordConfirm) {
        passwordConfirmErrorbox.classList.add('err');
        passwordConfirmError.textContent = "비밀번호 확인을 입력해주세요.";
    } else if (password !== passwordConfirm) {
        passwordConfirmErrorbox.classList.add('err');
        passwordConfirmError.textContent = "비밀번호가 일치하지 않습니다.";
    } else {
        passwordConfirmError.textContent = "";
        passwordConfirmErrorbox.classList.remove('err');
    }
}

function toggleSignUpButton() {
    const emailValid = !emailError.textContent && emailInput.value;
    const nicknameValid = !nicknameError.textContent && nicknameInput.value;
    const passwordValid = !passwordError.textContent && passwordInput.value;
    const passwordConfirmValid = !passwordConfirmError.textContent && passwordConfirmInput.value;

    const signUpButton = document.getElementById('회원가입');
    signUpButton.disabled = !(emailValid && nicknameValid && passwordValid && passwordConfirmValid);

    if (emailValid && nicknameValid && passwordValid && passwordConfirmValid) {
        signUpButton.style.backgroundColor = '#3692ff';  // 조건 만족 시 색 변경
    } else {
        signUpButton.style.backgroundColor = '';  // 조건 불만족 시 기본 색으로 복귀
    }
}

emailInput.addEventListener('blur', toggleSignUpButton);
nicknameInput.addEventListener('blur', toggleSignUpButton);
passwordInput.addEventListener('blur', toggleSignUpButton);
passwordConfirmInput.addEventListener('blur', toggleSignUpButton);


document.getElementById('회원가입').addEventListener('click', function (event) {
    event.preventDefault(); 
    
    const email = emailInput.value;
    const nickname = nicknameInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    
    if (email === "" || nickname === "" || password === "" || passwordConfirm === "") {
        alert("모든 필드를 채워주세요.");
        return;
    }

    
    if (isEmailUsed(email)) {
        alert('사용 중인 이메일입니다.');
        return;
    }

  
    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    
    alert('회원가입이 성공적으로 완료되었습니다.');
    window.location.href = '/login';
});


function isEmailUsed(email) {
    
    let result = false;
    USER_DATA.forEach(function(user) {
        if (user.email === email) {
            result = true;
        }
    });

    return result;  
}
