const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const nicknameInput = document.getElementById("nickname-input");
const passwordCheckInput = document.getElementById("password-check-input");
const signupButton = document.querySelector(".signupButton");
const emailError = document.getElementById("email-error");
const nicknameError = document.getElementById("nickname-error");
const passwordError = document.getElementById("password-error");
const passwordCheckError = document.getElementById("passwordCheck-error");
const togglePasswordButton = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeModal = document.getElementById("closeModal");

const USER_DATA = [
    { email: "codeit1@codeit.com", password: "codeit101!" },
    { email: "codeit2@codeit.com", password: "codeit202!" },
    { email: "codeit3@codeit.com", password: "codeit303!" },
    { email: "codeit4@codeit.com", password: "codeit404!" },
    { email: "codeit5@codeit.com", password: "codeit505!" },
    { email: "codeit6@codeit.com", password: "codeit606!" },
];

// ✅ 이메일 유효성 검사
function validEmail() {
    const email = emailInput.value.trim();
    emailError.textContent = "";
    emailInput.style.border = "1px solid #ccc";

    if (email === "") {
        emailError.textContent = "이메일을 입력해주세요.";
        emailInput.style.border = "2px solid red";
        return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.textContent = "잘못된 이메일 형식입니다.";
        emailInput.style.border = "2px solid red";
        return false;
    }
    return true;
}

// ✅ 닉네임 유효성 검사
function validNickname() {
    const nickname = nicknameInput.value.trim();
    nicknameError.textContent = "";
    nicknameInput.style.border = "1px solid #ccc";

    if (nickname === "") {
        nicknameError.textContent = "닉네임을 입력해주세요.";
        nicknameInput.style.border = "2px solid red";
        return false;
    }
    return true;
}

// ✅ 비밀번호 유효성 검사
function validPassword() {
    const password = passwordInput.value.trim();
    passwordError.textContent = "";
    passwordInput.style.border = "1px solid #ccc";

    if (password === "") {
        passwordError.textContent = "비밀번호를 입력해주세요.";
        passwordInput.style.border = "2px solid red";
        return false;
    } else if (password.length < 8) {
        passwordError.textContent = "비밀번호를 8자 이상으로 입력해주세요.";
        passwordInput.style.border = "2px solid red";
        return false;
    }
    return true;
}

// ✅ 비밀번호 확인 유효성 검사
function validPasswordCheck() {
    const passwordCheck = passwordCheckInput.value.trim();
    const password = passwordInput.value.trim();
    passwordCheckError.textContent = "";
    passwordCheckInput.style.border = "1px solid #ccc";

    if (passwordCheck !== password) {
        passwordCheckError.textContent = "비밀번호가 일치하지 않습니다.";
        passwordCheckInput.style.border = "2px solid red";
        return false;
    }
    return true;
}

// ✅ 회원가입 버튼 활성화
function signupButtonState() {
    if (validEmail() && validPassword() && validNickname() && validPasswordCheck()) {
        signupButton.disabled = false;
        signupButton.style.backgroundColor = "#3692FF";
    } else {
        signupButton.disabled = true;
        signupButton.style.backgroundColor = "#9CA3AF";
    }
}

// ✅ 회원가입 로직 (버튼 클릭 시 실행)
function signup() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();

    // ✅ 이메일 중복 체크
    const user = USER_DATA.find((user) => user.email === email);
    if (user) {
        showError("사용 중인 이메일입니다.");
        return;
    }

    // ✅ 모든 유효성 검사 통과 시 회원가입 성공
    if (validEmail() && validPassword() && validNickname() && validPasswordCheck()) {
        alert("회원가입 성공!");
        window.location.href = "login.html";
    }
}

// ✅ 모달 띄우기 함수
function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = "flex";
}

// ✅ 모달 닫기 버튼 이벤트
closeModal.addEventListener("click", function () {
    errorModal.style.display = "none";
});

function togglePasswordVisibility(inputField, icon) {
    if (inputField.type === "password") {
        inputField.type = "text";
        icon.src = "img/btn_visibility_off_24px.png";
        icon.alt = "비밀번호 숨기기";
    } else {
        inputField.type = "password";
        icon.src = "img/btn_visibility_on_24px.png";
        icon.alt = "비밀번호 보기";
    }
}

togglePasswordButton.addEventListener("click", function () {
    togglePasswordVisibility(passwordInput, eyeIcon);
});

const togglePasswordCheckButton = document.getElementById("togglePasswordCheck");
const eyeIconCheck = document.getElementById("eyeIconCheck");

togglePasswordCheckButton.addEventListener("click", function () {
    togglePasswordVisibility(passwordCheckInput, eyeIconCheck);
});

// ✅ 이벤트 리스너 추가
emailInput.addEventListener("focusout", validEmail);
passwordInput.addEventListener("focusout", validPassword);
nicknameInput.addEventListener("focusout", validNickname);
passwordCheckInput.addEventListener("focusout", validPasswordCheck);

emailInput.addEventListener("input", signupButtonState);
passwordInput.addEventListener("input", signupButtonState);
passwordCheckInput.addEventListener("input", signupButtonState);
nicknameInput.addEventListener("input", signupButtonState);

signupButton.addEventListener("click", signup);
