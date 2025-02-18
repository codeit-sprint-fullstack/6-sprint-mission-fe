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
    const confirmPasswordInput = document.getElementById("confirm-password");
    const signupBtn = document.querySelector(".signup-btn");
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

    function isEmailExists(email) {
        return USER_DATA.some(user => user.email === email);
    }

    function showCustomAlert(imageSrc) {
        const alertImage = document.getElementById("alert-image");
        alertImage.src = imageSrc;  
        alertContainer.style.display = "flex";  
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailWrapper = emailInput.closest(".input-wrapper");
        let errorMessage = emailWrapper.querySelector(".error-message");

        if (!errorMessage) {
            errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message");
            emailWrapper.appendChild(errorMessage);
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co\.kr|ac\.kr|edu|gov|mil|info|biz|io|ai|gg|tv|me|us|uk|jp|kr)$/;

        if (emailValue === "") {
            emailWrapper.classList.add("error");
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

    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPasswordInput.value.trim(); 
        const confirmPasswordWrapper = confirmPasswordInput.closest(".password-wrapper"); // 올바르게 가져오기
        let errorMessage = confirmPasswordWrapper.nextElementSibling; // 기존 에러 메시지 가져오기
    
        // 에러 메시지가 없으면 새로 생성하여 password-wrapper 아래에 추가
        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message");
            confirmPasswordWrapper.parentNode.insertBefore(errorMessage, confirmPasswordWrapper.nextSibling);
        }
    
        if (confirmPasswordValue === "") {
            confirmPasswordWrapper.classList.add("error"); // 빨간 테두리 추가
            errorMessage.textContent = "비밀번호를 다시 입력해주세요."; 
            return false;
        } else if (confirmPasswordValue !== passwordInput.value.trim()) {
            confirmPasswordWrapper.classList.add("error"); // 빨간 테두리 유지
            errorMessage.textContent = "비밀번호가 일치하지 않습니다."; 
            return false;
        } else {
            confirmPasswordWrapper.classList.remove("error"); // 빨간 테두리 제거
            errorMessage.remove(); // 에러 메시지 제거
            return true;
        }
    }
    

    function checkFormValidity() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            signupBtn.disabled = false;
            signupBtn.classList.add("active");
        } else {
            signupBtn.disabled = true;
            signupBtn.classList.remove("active");
        }
    }

    signupBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (isEmailExists(email)) {
            showCustomAlert("img/alert/alert_e.png"); 
            return;
        }

        if (password !== confirmPassword) {
            showCustomAlert("img/alert/alert_pw.png"); 
            return;
        }

        USER_DATA.push({ email: email, password: password });


        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 2000);
    });

    emailInput.addEventListener("focusout", validateEmail);
    passwordInput.addEventListener("focusout", validatePassword);
    confirmPasswordInput.addEventListener("focusout", validateConfirmPassword);

    emailInput.addEventListener("input", checkFormValidity);
    passwordInput.addEventListener("input", checkFormValidity);
    confirmPasswordInput.addEventListener("input", checkFormValidity);

    signupBtn.disabled = true;

    alertClose.addEventListener("click", function () {
        alertContainer.style.display = "none";
    });
});
