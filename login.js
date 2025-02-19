document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("email-error");

    const passwordInput = document.getElementById("password");
    const passwordErrorMessage = document.getElementById("password-error1");

    const loginButton = document.querySelector(".login");

    const USER_DATA = [
        { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" },
    ];

    // 이메일 정규표현식 (도메인 최소 3자리 이상 설정)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

    // 초기 로딩 시 버튼 비활성화
    loginButton.disabled = true;
    loginButton.style.backgroundColor = "#9ca3af";
    loginButton.style.border = "1px solid #9ca3af";

    // 이메일 & 비밀번호 입력 후 로그인버튼 색상 변경 or 유지 
    function validateForm() {
        const emailValid = emailInput.value.trim() !== "" && errorMessage.style.display === "none";
        const passwordValid = passwordInput.value.trim().length >= 8 && passwordErrorMessage.style.display === "none";

        if (emailValid && passwordValid) {
            loginButton.disabled = false;
            loginButton.style.backgroundColor = "#3692ff";
            loginButton.style.border = "1px solid #3692ff";
        } else {
            loginButton.disabled = true;
            loginButton.style.backgroundColor = "#9ca3af";
            loginButton.style.border = "1px solid #9ca3af";
        }
    }

    // 이메일 유효성 검사 - input
    emailInput.addEventListener("input", function () {
        const emailValue = emailInput.value.trim();

        emailInput.classList.remove("error");
        errorMessage.style.display = "none";

        if (emailValue === "") {
            errorMessage.textContent = "이메일을 입력해주세요.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        } else if (!emailPattern.test(emailValue)) {
            errorMessage.textContent = "잘못된 이메일 형식입니다.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        }

        // 입력 결과 업뎃
        validateForm();
    });

    // 이메일 유효성 검사 - focusout
    emailInput.addEventListener("focusout", function () {
        const emailValue = emailInput.value.trim();

        emailInput.classList.remove("error");
        errorMessage.style.display = "none";

        if (emailValue === "") {
            errorMessage.textContent = "이메일을 입력해주세요.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        } else if (!emailPattern.test(emailValue)) {
            errorMessage.textContent = "잘못된 이메일 형식입니다.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        }

        // 입력값 결과 바로 업뎃 
        validateForm();
    });

    // 비밀번호 유효성 검사 - input (실행안됨)
    passwordInput.addEventListener("input", function () {
        const passwordValue = passwordInput.value.trim();

        passwordInput.classList.remove("error1");
        passwordErrorMessage.style.display = "none";

        if (passwordValue === "") {
            passwordErrorMessage.textContent = "비밀번호를 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block";
        } else if (passwordValue.length < 8) {
            passwordErrorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block";
        }

        // 입력값 결과 바로 업뎃 
        validateForm();
    });

    // 비밀번호 유효성 검사 - focusout
    passwordInput.addEventListener("focusout", function () {
        const passwordValue = passwordInput.value.trim();

        passwordInput.classList.remove("error1");
        passwordErrorMessage.style.display = "none";

        if (passwordValue === "") {
            passwordErrorMessage.textContent = "비밀번호를 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block";
        } else if (passwordValue.length < 8) {
            passwordErrorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block";
        }

        // 입력값 결과 바로 업뎃 
        validateForm();
    });

    // 입력값 변경 시 실시간으로 버튼 활성화 체크
    emailInput.addEventListener("keyup", validateForm);
    passwordInput.addEventListener("keyup", validateForm);

    // 로그인 버튼 클릭 시 커스텀 alert 사용
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const user = USER_DATA.find(user => user.email === emailValue);

        if (!user || user.password !== passwordValue) {
            showAlert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 로그인 성공 시 페이지 이동
        window.location.href = "items.html";
    });

    // 커스텀 alert 열기 
    function showAlert(message) {
        document.getElementById("alert-message").textContent = message;
        document.getElementById("custom-alert").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    };

    // 커스텀 alert 닫기 (로그인 페이지 유지)
    function closeCustomAlert() {
        document.getElementById("custom-alert").style.display = "none";
        document.getElementById("overlay").style.display = "none";

        // 비밀번호 오류 시 빨간색 테두리 및 메시지 표시 
        passwordInput.classList.add("error1");
        passwordErrorMessage.textContent = "비밀번호가 일치하지 않습니다.";
        passwordErrorMessage.style.display = "block";

        // 비밀번호 입력값 초기화
        // passwordInput.value = "";
    };

    // 커스텀 alert '확인' 버튼에 이벤트 추가 
    document.getElementById("alert-confirm").addEventListener("click", closeCustomAlert);

    // 비밀번호 입력 시 에러 스타일 제거
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.trim().length > 0) {
            passwordInput.classList.remove("error1");
            passwordErrorMessage.style.display = "none";
        }
    });
});
