// 사용자 데이터
const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// DOM 요소 가져오기
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const modalOverlay = document.getElementById("modal_overlay");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal_message");
const modalCloseBtn = document.querySelector("#modal button");

// 비밀번호 보이기/숨기기
function toggleBtn(inputField, toggleIcon) {
    const isPassword = inputField.type === "password";
    
    if (isPassword) {
        inputField.type = "text";
        toggleIcon.src = "./img/eye_on.png";
    } else {
        inputField.type = "password";
        toggleIcon.src = "./img/eye_off.png";
    }
}

togglePassword.addEventListener("click", function () {
    toggleBtn(passwordInput, togglePassword);
});



// 에러 메시지를 설정하는 공통 함수
function setError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.toggle("error", !!message);
}
// 이메일 검증
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
    
    if (!email.trim()) {
        setError(emailInput, emailError, "이메일을 입력해주세요.");
        return false;
    }
    if (!EMAIL_REGEX.test(email)) {
        setError(emailInput, emailError, "잘못된 이메일 형식입니다.");
        return false;
    }
    setError(emailInput, emailError, ""); 
    return true;
}

// 비밀번호 검증
function validatePassword(password) {
    if (!password.trim()) {
        setError(passwordInput, passwordError, "비밀번호를 입력해주세요.");
        return false;
    }
    if (password.length < 8) {
        setError(passwordInput, passwordError, "비밀번호를 8자 이상 입력해주세요.");
        return false;
    }
    setError(passwordInput, passwordError, ""); 
    return true;
}



// 로그인 이벤트
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
        return;
    }

    const user = USER_DATA.find(user => user.email === email);

    if (!user) {
        toggleModal(true, "이메일이 존재하지 않습니다.");
        return;
    }

    if (user.password !== password) {
        toggleModal(true, "비밀번호가 일치하지 않습니다.");
        return;
    }
    
    window.location.href = "/items";
});

//모달 띄우고 숨기기
function toggleModal(show, message = "") {
    modalMessage.textContent = message;
    modal.style.display = show ? "block" : "none";
    modalOverlay.style.display = show ? "block" : "none";
}

// 모달 닫기
modalCloseBtn.addEventListener("click", () => toggleModal(false));
modalOverlay.addEventListener("click", () => toggleModal(false));




