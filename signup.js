document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("email-error");

    const nameInput = document.getElementById("name");
    const nameErrorMessage = document.getElementById("name-err");

    const passwordInput = document.getElementById("password");
    const passwordErrorMessage = document.getElementById("password-error1");

    const checkPasswordInput = document.getElementById("check");
    const checkPasswordError = document.getElementById("check-error2");

    const signupButton = document.querySelector(".signup");

    const USER_DATA = [
        { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" },
    ];

    // 이메일 입력제한식(도메인 최소 3자리 이상)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

    // 초기 화면 버튼 비활성화
    signupButton.disabled = true;
    signupButton.style.backgroundColor = "#9ca3af";
    signupButton .style.border = "1px solid #9ca3af";

    // 모든 input 입력 후 회원가입버튼 색상 변경 or 유지
    function validateForm() {
        const emailValid = emailInput.value.trim() !== "" && errorMessage.style.display === "none";
        const nameValid = nameInput.value.trim() !== "" && nameErrorMessage.style.display === "none";
        const passwordValid = passwordInput.value.trim().length >= 8 && passwordErrorMessage.style.display === "none";
        const checkValid = checkPasswordInput.value === passwordInput.value && checkPasswordError.style.display === "none";

        if (emailValid && passwordValid && checkValid && nameValid) {
            signupButton.disabled = false;
            signupButton.style.backgroundColor = "#3692ff";
            signupButton.style.border = "1px solid #3692ff";
        } else {
            signupButton.disabled = true;
            signupButton.style.backgroundColor = "#9ca3af";
            signupButton.style.border = "1px solid #9ca3af";
        }
    }

    // 이메일 유효성 검사 - focusout
    emailInput.addEventListener("focusout", function() {
        const emailValue = emailInput.value.trim();

        if (emailValue === "") {
            errorMessage.textContent = "이메일을 입력해주세요.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        } else if (!emailPattern.test(emailValue)) {
            errorMessage.textContent = "잘못된 이메일 형식입니다.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        } else {
            emailInput.classList.remove("error");
            errorMessage.style.display = "none";
        }

        // 입력값 결과 업뎃 
        validateForm();
    });

    // 이메일 유효성 검사 - input
    emailInput.addEventListener("input", function() {
        const emailValue = emailInput.value.trim();

        if (emailValue === "") {
            errorMessage.textContent = "이메일을 입력해주세요.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        } else if (!emailPattern.test(emailValue)) {
            errorMessage.textContent = "잘못된 이메일 형식입니다.";
            emailInput.classList.add("error");
            errorMessage.style.display = "block";
        } else {
            emailInput.classList.remove("error");
            errorMessage.style.display = "none";
        }

        // 입력값 결과 업뎃 
        validateForm();
    });

    // 닉네임 유효성 검사 - focusout 
    nameInput.addEventListener("focusout", function () {
        const nameValue = nameInput.value.trim();

        if (nameValue === "") {
            nameErrorMessage.textContent = "닉네임을 입력해주세요.";
            nameInput.classList.add("err");
            nameErrorMessage.style.display = "block";
        } else {
            nameInput.classList.remove("err");
            nameErrorMessage.style.display = "none";
        }

        validateForm();
    })

    // 닉네임 유효성 검사 - input
    nameInput.addEventListener("input", function () {
        const nameValue = nameInput.value.trim();

        if (nameValue === "") {
            nameErrorMessage.textContent = "닉네임을 입력해주세요.";
            nameInput.classList.add("err");
            nameErrorMessage.style.display = "block";
        } else {
            nameInput.classList.remove("err");
            nameErrorMessage.style.display = "none";
        }

        validateForm();
    })

    // 비밀번호 유효성 검사 - focusout
    passwordInput.addEventListener("focusout", function () {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue === "") {
            passwordErrorMessage.textContent = "비밀번호를 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block";
        } else if (passwordValue.length < 8) {
            passwordErrorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block"; 
        } else {
            passwordInput.classList.remove("error1");
            passwordErrorMessage.style.display = "none";
        }

        // 비밀번호를 다시 바꾸면 불일치 메세지 뜨도록 
        if (checkPasswordInput.value !== "") {
            checkPasswordInput.dispatchEvent(new Event("input"));
        }

        // 입력값 결과 바로 업뎃 
        validateForm();
    });

    // 비밀번호 유효성 검사 - input
    passwordInput.addEventListener("input", function () {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue === "") {
            passwordErrorMessage.textContent = "비밀번호를 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block";
        } else if (passwordValue.length < 8) {
            passwordErrorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
            passwordInput.classList.add("error1");
            passwordErrorMessage.style.display = "block"; 
        } else {
            passwordInput.classList.remove("error1");
            passwordErrorMessage.style.display = "none";
        }

        // 비밀번호를 다시 바꾸면 불일치 메세지 뜨도록 
        if (checkPasswordInput.value !== "") {
            checkPasswordInput.dispatchEvent(new Event("input"));
        }

        // 입력값 결과 바로 업뎃 
        validateForm();
    });

    // 비밀번호 확인 일치 검사 - focusout
    checkPasswordInput.addEventListener("focusout", function () {
        const checkValue = checkPasswordInput.value.trim();

        if (checkValue === "") {
            checkPasswordError.textContent = "비밀번호를 입력해주세요.";
            checkPasswordInput.classList.add("error2");
            checkPasswordError.style.display = "block";
        } else if (checkPasswordInput.value === passwordInput.value) {
            checkPasswordInput.classList.remove("error2"); 
            checkPasswordError.style.display = "none"; 
        } else {
            checkPasswordInput.classList.add("error2"); 
            checkPasswordError.textContent = "비밀번호가 일치하지 않습니다.";
            checkPasswordError.style.display = "block";
        }

        // 입력값 결과 바로 업뎃 
        validateForm();
    });

    // 비밀번호 확인 일치 검사 - input
    checkPasswordInput.addEventListener("input", function () {
        const checkValue = checkPasswordInput.value.trim();

        if (checkValue === "") {
            checkPasswordError.textContent = "비밀번호를 입력해주세요.";
            checkPasswordInput.classList.add("error2");
            checkPasswordError.style.display = "block";
        } else if (checkPasswordInput.value === passwordInput.value) {
            checkPasswordInput.classList.remove("error2"); 
            checkPasswordError.style.display = "none"; 
        } else {
            checkPasswordInput.classList.add("error2"); 
            checkPasswordError.textContent = "비밀번호가 일치하지 않습니다.";
            checkPasswordError.style.display = "block";
        }

        // 입력값 결과 바로 업뎃 
        validateForm();
    });

    // 입력값 변경 시 즉시 회원가입 버튼 활성화 
    emailInput.addEventListener("keyup", validateForm);
    passwordInput.addEventListener("keyup", validateForm);
    checkPasswordInput.addEventListener("keyup", validateForm);
    nameInput.addEventListener("keyup", validateForm);

    // 회원가입 버튼 클릭 이벤트
    signupButton.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 동작 방지

        const emailValue = emailInput.value.trim();

        if (USER_DATA.some(user => user.email === emailValue)) {
            showAlert("사용 중인 이메일입니다.");
            return;
        }

        // 회원가입 성공시 페이지 이동 
        window.location.href = "login.html";
    });

    // alert 창 열기 
    function showAlert(message) {
        document.getElementById("alert-message").textContent = message;
        document.getElementById("custom-alert").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }

    // 커스텀 창 닫기 (회원가입 페이지 유지)
    function closeCustomAlert() {
        document.getElementById("custom-alert").style.display = "none";
        document.getElementById("overlay").style.display = "none";

        // 사용 중인 이메일 에러 표시
        emailInput.classList.add("error");
        errorMessage.textContent = "사용 중인 이메일입니다.";
        errorMessage.style.display = "block";
    }

    // alert '확인' 버튼에 이벤트 추가
    document.getElementById("alert-confirm").addEventListener("click", closeCustomAlert);

    // 이메일 재입력 시 에러 스타일 제거
    emailInput.addEventListener("input", function () {
        if (emailInput.value.trim().length > 0) {
            emailInput.class
        }
    })

    
});