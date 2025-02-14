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
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('로그인');
const passwordError = document.querySelector('.passwordError');
const emailError = document.querySelector('.emailError');
const emailErrorbox = document.querySelector('.email글자박스');
const passwordErrorbox = document.querySelector('.password글자박스');

emailInput.addEventListener('blur', validateEmail);

function validateEmail() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailErrorbox.classList.add('err');
        emailError.textContent = "이메일을 입력해주세요.";
        
        
    } else if (!emailRegex.test(email)) {
        emailErrorbox.classList.add('err');
        emailError.textContent = "잘못된 이메일 형식입니다";
        
    } else {
        emailError.textContent = "";
        emailErrorbox.classList.remove('err');
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

function toggleLoginButton() {
    const emailValid = !emailError.textContent && emailInput.value;
    const passwordValid = !passwordError.textContent && passwordInput.value;
    loginButton.disabled = !(emailValid && passwordValid);
    if (emailValid && passwordValid) {
        loginButton.style.backgroundColor = '#3692ff'; 
    } else {
        loginButton.style.backgroundColor = ''; 
    }
}

function login(event) {
    event.preventDefault();  
    const email = emailInput.value;
    const password = passwordInput.value;

    const user = USER_DATA.find(function(user) {
        return user.email === email;
    });
    
    if (!user) {
        alert('이메일이 존재하지 않습니다.');
        
    } else if (user.password !== password) {
        alert('비밀번호가 일치하지 않습니다.');
        
    } else {
        window.location.href = "/items";  
    }
}

emailInput.addEventListener('blur', function() {
    validateEmail();
    toggleLoginButton();
});

passwordInput.addEventListener('blur', function() {
    validatePassword();
    toggleLoginButton();
});

loginButton.addEventListener('click', login);
