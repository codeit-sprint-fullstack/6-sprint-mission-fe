document.addEventListener("DOMContentLoaded", function () {
    const emInput = document.querySelector(".emailinput");
    const emError = document.querySelector(".emailerror");

    const pwInput = document.querySelector(".passwordinput");
    const passwordError = document.querySelector(".passworderror");

    const signupButton = document.querySelector(".signup");

    function validateForm() {
        const emailValue = emInput.value.trim();
        const passwordValue = pwInput.value.trim();
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        const passwordValid = passwordValue.length >= 8;

        const emailErrorVisible = emError.style.visibility === "visible";
        const passwordErrorVisible = passwordError.style.visibility === "visible";

        const isValid = emailValue && passwordValue && emailValid && passwordValid && !emailErrorVisible && !passwordErrorVisible;

        if (isValid) {
            signupButton.classList.add("active");
            signupButton.style.pointerEvents = "auto";
        } else {
            signupButton.classList.remove("active");
            signupButton.style.pointerEvents = "none";
        }
    }

    function signupEmChanger() {
        const emInputData = emInput.value.trim();
        const emPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emInputData === "") {
            emError.textContent = "이메일을 입력해주세요.";
            emError.style.visibility = "visible";
            emInput.style.borderColor = "red";
        } else if (!emPattern.test(emInputData)) {
            emError.textContent = "잘못된 이메일 형식입니다.";
            emError.style.visibility = "visible";
            emInput.style.borderColor = "red";
        } else {
            emError.style.visibility = "hidden";
            emInput.style.borderColor = "transparent";
        }

        validateForm();
    }

    function passwordchange() {
        const pwLength = pwInput.value.length;

        if (pwLength === 0) {
            passwordError.textContent = "비밀번호를 입력해주세요.";
            passwordError.style.visibility = "visible";
            pwInput.style.borderColor = "red";
        } else if (pwLength < 8) {
            passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
            passwordError.style.visibility = "visible";
            pwInput.style.borderColor = "red";
        } else {
            passwordError.style.visibility = "hidden";
            pwInput.style.borderColor = "transparent";
        }

        validateForm();
    }

    emInput.addEventListener("input", signupEmChanger);
    pwInput.addEventListener("input", passwordchange);

    signupButton.style.pointerEvents = "none";
});
