function togglePassword(inputId, icon) {
    let inputField = document.getElementById(inputId);

    if (inputField.type === "password") {
        inputField.type = "text";
        icon.src = "img/icon/btn_visibility_on_24px.png"; // 눈 뜬 아이콘
    } else {
        inputField.type = "password";
        icon.src = "img/icon/btn_visibility_off_24px.png"; // 눈 감은 아이콘
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.querySelector(".login-btn");
 
    // ✅ Custom Alert Elements
    const alertContainer = document.getElementById("alert-container");
    const alertClose = document.getElementById("alert-close");

    const USER_DATA = [
        { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" },
    ];


    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailWrapper = emailInput.closest(".input-wrapper");
        let errorMessage = emailWrapper.querySelector(".error-message");
    
        if (!errorMessage) {
            errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message");
            emailWrapper.appendChild(errorMessage);
        }
    
        // ✅ 더 엄격한 이메일 정규식 (실제 사용되는 TLD 필터링 추가)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co\.kr|ac\.kr|edu|gov|mil|info|biz|io|ai|gg|tv|me|us|uk|jp|kr)$/;
    
        if (emailValue === "") {
            emailWrapper.classList.add("error"); // 테두리 빨간색으로 변경
            errorMessage.textContent = "이메일을 입력해주세요.";
            return false;
        } else if (!emailRegex.test(emailValue)) {
            emailWrapper.classList.add("error"); 
            errorMessage.textContent = "잘못된 이메일 형식입니다.";
            return false;
        } else {
            emailWrapper.classList.remove("error");
            errorMessage.remove();
            return true;
        }
    }
    

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        const passwordWrapper = passwordInput.closest(".password-wrapper");
        let errorMessage = passwordWrapper.nextElementSibling;
    
        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message");
            passwordWrapper.parentNode.insertBefore(errorMessage, passwordWrapper.nextSibling);
        }
    
        if (passwordValue === "") {
            passwordWrapper.classList.add("error"); // 빨간 테두리 추가
            errorMessage.textContent = "비밀번호를 입력해주세요.";
            return false;
        } else if (passwordValue.length < 8) {
            passwordWrapper.classList.add("error"); // 빨간 테두리 유지
            errorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
            return false;
        } else {
            passwordWrapper.classList.remove("error"); // 빨간 테두리 제거
            if (errorMessage) errorMessage.remove(); // 에러 메시지 제거
            return true;
        }
    }


    function checkFormValidity() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            loginBtn.disabled = false;
            loginBtn.classList.add("active");
        } else {
            loginBtn.disabled = true;
            loginBtn.classList.remove("active");
        }
    }

    // 팝업
    function showAlert() {
        alertContainer.style.display = "flex";
    }

    function authenticateUser(email, password) {
        const user = USER_DATA.find(user => user.email === email);

        if (!user || user.password !== password) {
            showAlert();  // 실패 시 이미지 기반 alert 표시
            return false;
        } else {
            setTimeout(() => {
                window.location.href = "/items"; // 로그인 성공 시 이동
            }, 2000);
            return true;
        }
    }



    loginBtn.addEventListener("click", function (event) {
        event.preventDefault(); // 폼 제출 방지

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (authenticateUser(email, password)) {
            window.location.href = "/items"; // 로그인 성공 시 이동
        } 
    });

    emailInput.addEventListener("focusout", validateEmail);
    passwordInput.addEventListener("focusout", validatePassword);
    emailInput.addEventListener("input", checkFormValidity);
    passwordInput.addEventListener("input", checkFormValidity);

    // 초기 상태에서 버튼 비활성화
    loginBtn.disabled = true;
    
    
    // 확인 버튼을 누르면 alert 창 닫기
    alertClose.addEventListener("click", function () {
        alertContainer.style.display = "none";
    });
});