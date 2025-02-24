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
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const nicknameInput = document.getElementById("nickname");
const nicknameError = document.getElementById("nicknameError");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const signupBtn = document.getElementById("signupBtn");
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

toggleConfirmPassword.addEventListener("click", function () {
    toggleBtn(confirmPasswordInput, toggleConfirmPassword);
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
        if (USER_DATA.some(user => user.email === email)) {
            setError(emailInput, emailError, "사용 중인 이메일입니다.");
            return false;
        }
        setError(emailInput, emailError, ""); 
        return true;
    }

// 닉네임 검증
function validateNickname(nickname) {
    if (!nickname.trim()) {
        setError(nicknameInput, nicknameError, "닉네임을 입력해주세요.");
        return false;
    }
    setError(nicknameInput, nicknameError, "");
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

// 비밀번호 확인 검증
function validatePasswordConfirm(password, passwordConfirm) {
    if (password !== passwordConfirm) {
        setError(confirmPasswordInput, confirmPasswordError, "비밀번호가 일치하지 않습니다.");
        return false;
    }
    setError(confirmPasswordInput, confirmPasswordError, "");
    return true;
}

// 회원가입 이벤트
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailValid = validateEmail(emailInput.value);
    const nicknameValid = validateNickname(nicknameInput.value);
    const passwordValid = validatePassword(passwordInput.value);
    const confirmPasswordValid = validatePasswordConfirm(passwordInput.value, confirmPasswordInput.value);        

    if (!emailValid || !nicknameValid || !passwordValid || !confirmPasswordValid) return;
    
    if (USER_DATA.some(user => user.email === emailInput.value)) {
        toggleModal(true, "사용 중인 이메일입니다.");
        return;
    }
    
    toggleModal(true, "회원가입이 완료되었습니다.", true);
});

// 모달 띄우고 숨기기
function toggleModal(show, message = "", redirect = false) {
    modalMessage.textContent = message;
    modal.style.display = show ? "block" : "none";
    modalOverlay.style.display = show ? "block" : "none";
    if (redirect) {
        modalCloseBtn.onclick = () => {
            toggleModal(false);
            window.location.href = "../login/index.html";
        };
    }
}

// 모달 닫기
modalCloseBtn.addEventListener("click", () => toggleModal(false));
modalOverlay.addEventListener("click", () => toggleModal(false));







