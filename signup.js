const emailInput = document.querySelector(".inputmail");
const nameInput = document.querySelector(".inputname");
const passwordInput = document.querySelectorAll(".inputpass")[0];
const confirmPasswordInput = document.querySelectorAll(".inputpass")[1];
const signupButton = document.querySelector(".but");
const passbox1 = document.querySelectorAll(".password-container")[0];
const passbox2 = document.querySelectorAll(".password-container")[1];
const eyeIcons = document.querySelectorAll(".toggle-password"); // 모든 eye 아이콘 선택


const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 이메일 유효성 검사 함수
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 오류 메시지 표시 함수
function showErrorMessage(input, message) {
    let errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.tagName === "P") {
        errorMessage.innerText = message;
    } else {
        errorMessage = document.createElement("p");
        errorMessage.style.color = "#F74747";
        errorMessage.style.fontSize = "12px";
        errorMessage.innerText = message;
        input.after(errorMessage);
    }
}

// 오류 메시지 삭제 함수
function removeErrorMessage(input) {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.tagName === "P") {
        errorMessage.remove();
    }
}

// 버튼 상태 업데이트 (입력값에 따라 활성화/비활성화)
function updateButtonState() {
    const emailValid = validateEmail(emailInput.value.trim());
    const nameValid = nameInput.value.trim().length > 0;
    const passwordValid = passwordInput.value.length >= 8;
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;

    if (emailValid && nameValid && passwordValid && passwordsMatch) {
        signupButton.disabled = false;
        signupButton.style.backgroundColor = "#3692FF";
    } else {
        signupButton.disabled = true;
        signupButton.style.backgroundColor = "#9CA3AF";
    }
}

// 이메일 입력 필드 focusout 이벤트 리스너
emailInput.addEventListener("focusout", () => {
    const email = emailInput.value.trim();
    if (!email) {
        showErrorMessage(emailInput, "이메일을 입력해주세요.");
        emailInput.style.border = "1px solid #F74747";
    } else if (!validateEmail(email)) {
        showErrorMessage(emailInput, "잘못된 이메일 형식입니다.");
        emailInput.style.border = "1px solid #F74747";
    } else {
        removeErrorMessage(emailInput);
        emailInput.style.border = "none";
    }
    updateButtonState();
});

// 닉네임 입력 필드 focusout 이벤트 리스너
nameInput.addEventListener("focusout", () => {
    if (!nameInput.value.trim()) {
        showErrorMessage(nameInput, "닉네임을 입력해주세요.");
        nameInput.style.border = "1px solid #F74747";
    } else {
        removeErrorMessage(nameInput);
        nameInput.style.border = "none";
    }
    updateButtonState();
});

// 비밀번호 입력 필드 focusout 이벤트 리스너
passwordInput.addEventListener("focusout", () => {
    const password = passwordInput.value.trim();

    if (!password) {
        showErrorMessage(passbox1, "비밀번호를 입력해주세요.");
        passwordInput.style.border = "1px solid #F74747";
    } else if (password.length < 8) {
        showErrorMessage(passbox1, "비밀번호를 8자 이상 입력해주세요.");
        passwordInput.style.border = "1px solid #F74747";
    } else {
        removeErrorMessage(passbox1);
        passwordInput.style.border = "none";
    }
    updateButtonState();
});

// 비밀번호 확인 필드 focusout 이벤트 리스너
confirmPasswordInput.addEventListener("focusout", () => {
    if (confirmPasswordInput.value !== passwordInput.value || !confirmPasswordInput) {
        showErrorMessage(passbox2, "비밀번호가 일치하지 않습니다.");
        confirmPasswordInput.style.border = "1px solid #F74747";
    } else {
        removeErrorMessage(passbox2);
        confirmPasswordInput.style.border = "none";
    }
    updateButtonState();
});

// 모달 관련 요소
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModalBtn = document.getElementById("close-modal");

// 모달 표시 함수
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "flex";
}

// 모달 닫기 버튼 클릭 이벤트
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// 회원가입 기능
signupButton.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const password = passwordInput.value.trim();

    // 이메일 중복 검사
    const isEmailTaken = USER_DATA.some(user => user.email === email);
    if (isEmailTaken) {
        showModal("사용 중인 이메일입니다."); // 이메일 중복 시 모달창 띄우기
        return;
    }

    // 새로운 유저 등록
    USER_DATA.push({ email, password });
    window.location.href = "login.html"; // 회원가입 완료 후 로그인 페이지로 이동
});

// 비밀번호 숨기기/보이기 기능 (아이콘 클릭 시)
eyeIcons.forEach((eyeIcon, index) => {
    eyeIcon.addEventListener("click", () => {
        const targetInput = index === 0 ? passwordInput : confirmPasswordInput;

        if (targetInput.type === "password") {
            targetInput.type = "text";
            eyeIcon.src = "img/btn_visibility_on_24px.png";  // 열림 아이콘으로 변경
        } else {
            targetInput.type = "password";
            eyeIcon.src = "img/btn_visibility_off_24px.png";  // 닫힘 아이콘으로 변경
        }
    });
});
