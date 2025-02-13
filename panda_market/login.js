// 🔹 1. 요소 가져오기
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.querySelector(".loginButton");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
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



function validateEmail() {
    const email = emailInput.value.trim();
    emailError.textContent = "";
    emailInput.style.border = "1px solid #ccc"; // 기본 테두리

    if (email === "") { 
        emailError.textContent = "이메일을 입력해주세요.";
        emailError.style.color = "red";
        emailInput.style.border = "2px solid red"; 
        return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) { 
        emailError.textContent = "잘못된 이메일 형식입니다.";
        emailError.style.color = "red";
        emailInput.style.border = "2px solid red"; 
        return false;
    }
    return true;
}

// 🔹 3. 비밀번호 유효성 검사 (focusout 발생 시 실행)
function validatePassword() {
    const password = passwordInput.value.trim();
    passwordError.textContent = "";
    passwordInput.style.border = "1px solid #ccc";

    if (password === "") {
        passwordError.textContent = "비밀번호를 입력해주세요.";
        passwordError.style.color = "red";
        passwordInput.style.border = "2px solid red";
        return false;
    } else if (password.length < 8) {
        passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
        passwordError.style.color = "red";
        passwordInput.style.border = "2px solid red";
        return false;
    }
    return true;
}

// 🔹 4. 로그인 버튼 활성화/비활성화 (input 발생 시 실행)
function updateLoginButtonState() {
    if (validateEmail() && validatePassword()) {
        loginButton.disabled = false;
        loginButton.style.backgroundColor = "#3692FF"; // 활성화된 상태
    } else {
        loginButton.disabled = true;
        loginButton.style.backgroundColor = "#9CA3AF"; // 비활성화된 상태
    }
}

function login() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const user = USER_DATA.find((user) => user.email === email);

    if (!user) {
        showError("등록되지 않은 이메일입니다.");
        return;
    }

    if (user.password !== password) {
        showError("비밀번호가 일치하지 않습니다.");
        return;
    }

    alert("로그인 성공!");
    window.location.href = "items.html";
}

// 🔹 모달을 띄우는 함수
function showError(message) {
    errorMessage.textContent = message; // 에러 메시지 변경
    errorModal.style.display = "flex"; // 모달 보이게 설정
}

togglePasswordButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // 🔹 비밀번호 보이기
        eyeIcon.src = "img/btn_visibility_off_24px.png"; // 🔹 눈 감은 아이콘으로 변경
        eyeIcon.alt = "비밀번호 숨기기";
    } else {
        passwordInput.type = "password"; // 🔹 비밀번호 숨기기
        eyeIcon.src = "img/btn_visibility_on_24px.png"; // 🔹 눈 뜬 아이콘으로 변경
        eyeIcon.alt = "비밀번호 보기";
    }
});

// 🔹 6. 이벤트 리스너 추가 (각 이벤트 발생 시 실행)
emailInput.addEventListener("focusout", validateEmail); // 포커스를 벗어나면 이메일 검증
passwordInput.addEventListener("focusout", validatePassword); // 포커스를 벗어나면 비밀번호 검증
emailInput.addEventListener("input", updateLoginButtonState); // 입력 시 버튼 활성화/비활성화 업데이트
passwordInput.addEventListener("input", updateLoginButtonState);
loginButton.addEventListener("click", login); // 로그인 버튼 클릭 시 로그인 실행
closeModal.addEventListener("click", function () {
    errorModal.style.display = "none"; // 모달 숨기기
});
