// handling password visibility 
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

const emailField= document.querySelector("#email");
const emailError = emailField.nextElementSibling;
const passwordField = document.querySelector("#password");
const passwordError = passwordField.parentElement.nextElementSibling; // need to check
console.log(passwordError);
emailField.addEventListener("focusout", () => {
  if (!emailField.value) {
    //  make the error message tag to have new class (that will change display: block from hidden)
    //  add class to the tag that will have red outline - go to auth css to add some - auth__form-input--error
  }
  console.log(`${emailField.value}`);
});
//  이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
//  비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다
//  비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자« 이상 입력해주세요.” 에러 메세지를 보입니다.