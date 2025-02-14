const passwordToggleBtn = document.querySelector(".auth__form-password-toggle");
if (passwordToggleBtn) {
  passwordToggleBtn.addEventListener("click", () => {
    const userInput = passwordToggleBtn.previousElementSibling;
    const toggleIcon = passwordToggleBtn.querySelector("img");
    if (userInput && userInput.classList.contains("auth__form-password-input")) {
      if (userInput.type === "password") {
        userInput.type = "text";
        toggleIcon.src = "assets/img/icons/eye-visible.svg";
        toggleIcon.alt = "비밀번호 숨기기 아이콘";
      } else {
        userInput.type = "password";
        toggleIcon.src = "assets/img/icons/eye-invisible.svg";
        toggleIcon.alt = "비밀번호 표시 아이콘";
      }
    }
  });
}

//check email validity 
function isValidEmail(email) {
  const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
// check password validity

function isValidPassword(password) {
  return password.length >= 8;
}