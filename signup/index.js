const emailInput = document.getElementById('input-email');
const passwordInput = document.getElementById('input-password');
const ckpasswordInput = document.getElementById('checkpassword-text')
const emailError = document.getElementById('email-error-message');
const passwordError = document.getElementById('password-error-message');
const ckpasswordError = document.getElementById('ckpassword-error-message')
const signupButton = document.getElementById('signup-button');
const eyecon1 = document.getElementById('eye-con1')
const eyecon2 = document.getElementById('eye-con2')


// 이메일 유효성 검증 함수.
function isValidEmail (email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}
//비밀번호 유효성 검증 함수.
//최소 8자 이상, 대소문자, 숫자, 특수문자 포함 체크
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
}



// 이메일 focus in/out
function emailFocusIn () { 
    if (!emailInput.value.trim()) { 
    emailError.textContent = '이메일을 입력해주세요.';
    emailError.classList.add('error-box');
    emailInput.classList.add('error-input')
} else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = '잘못된 이메일 형식입니다.';
    emailError.classList.add('error-box');
    emailInput.classList.add('error-input')
} else {
    emailError.classList.remove('error-box')
    emailInput.classList.remove('error-input')
    emailError.textContent = '';
}}

// 비밀번호 focus in/out
function passwordFocusIn () {
    if (!passwordInput.value.trim()) {
    passwordError.textContent = '비밀번호를 입력해주세요.';
    passwordError.classList.add('error-box');
    passwordInput.classList.add('error-input')
} else if (passwordInput.value.trim().length < 8) {
    passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
    passwordError.classList.add('error-box');
    passwordInput.classList.add('error-input')
} else {
    passwordError.classList.remove('error-box')
    passwordInput.classList.remove('error-input')
    emailError.textContent = '';
}}

emailInput.addEventListener('focusout', emailFocusIn);
passwordInput.addEventListener('focusout', passwordFocusIn);

/*
// 닉네임 focus in/out
//비밀번호확인 focus in/out
function ckpwFocusIn () {
    if (ckpasswordInput.value.trim() !== passwordInput.value.trim()) {
        ckpasswordError.textContent = '비밀번호가 일치하지 않습니다.'
        ckpasswordError.classList.add('error-box');
        ckpasswordError.classList.add('error-input')
        signupButton.disabled = true;
    } else {
        passwordError.classList.remove('error-box')
        passwordInput.classList.remove('error-input')
        signupButton.disabled = false;
    }
}
ckpasswordInput.addEventListener('focusout',ckpwFocusIn)
*/




//스프린트 미션에 있는 USER_DATA
const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];
//USER_DATA와 이메일 대조
function findUserByEmail(email) {
    return USER_DATA.some(user => user.email === email); 
}
/*
//USER_DATA와 비밀번호 대조
function findUserByPasswords(password) {
    return USER_DATA.some(user => user.password === password);
}
*/



//회원가입 성공여부 
function successSignup (event) {
    const email = emailInput.value.trim()
    if (!findUserByEmail(email)) {
        window.location.href = '/item';
    } else {
        alert ('사용중인 이메일입니다.')
        signupButton.disabled = true;
    }
}
signupButton.addEventListener('click', successSignup)

//input 재입력 이벤트
function reInput (event) {
    signupButton.disabled = false;
}
emailInput.addEventListener('change',reInput)
passwordInput.addEventListener('change', reInput)




//(눈모양아이콘) 비밀번호 보이기
function show () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text' 
    } else {
        passwordInput.type = 'password'
    }}
eyecon1.addEventListener('click', show)
eyecon2.addEventListener('click', show)