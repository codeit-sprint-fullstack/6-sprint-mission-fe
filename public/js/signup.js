document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("email");
  const pwdInput = document.getElementById("password");
  const confirmPwdInput = document.getElementById("confirmPassword");
  const nicknameInput = document.getElementById("nickname")
  // const loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");

  const emailError = document.getElementById("email-error");
  const pwdError = document.getElementById("pwd-error");
  const confirmPwdError = document.getElementById("confirmPwd-error");

  const togglePwd = document.getElementById("togglePwd");
  const toggleConfirmPwd = document.getElementById("toggleConfirmPwd");

  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === ""){
      emailInput.classList.add("error-border");
      emailError.textContent = "이메일을 입력해주세요.";
      emailError.style.display = "block";
      updateRegisterBtnState();
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      emailInput.classList.add("error-border");
      emailError.textContent = "잘못된 이메일 형식입니다.";
      emailError.style.display = "block";
      updateRegisterBtnState();
      return false;
    }
    emailInput.classList.remove("error-border");
    emailError.textContent = "";
    emailError.style.display = "none";
    updateRegisterBtnState();
    return true;
  }

  function validatePwd() {
    const pwd = pwdInput.value.trim();
    if (pwd === ""){
      pwdInput.classList.add("error-border");
      pwdError.textContent = "비밀번호를 입력해주세요.";
      pwdError.style.display = "block";
      updateRegisterBtnState();
      return false;
    }
    if (pwd.length < 8){
      pwdInput.classList.add("error-border");
      pwdError.textContent = "비밀번호를 8자 이상 입력해주세요.";
      pwdError.style.display = "block";
      updateRegisterBtnState();
      return false;
    }
    pwdInput.classList.remove("error-border");
    pwdError.textContent = "";
    pwdError.style.display = "none";
    updateRegisterBtnState();
    return true; 
  }

  function validateConfirmPwd() {
    const pwd = pwdInput.value.trim();
    const confirmPwd = confirmPwdInput.value.trim();

    if (confirmPwd === ""){
      confirmPwdInput.classList.add("error-border");
      confirmPwdError.textContent = "비밀번호 확인을 입력해주세요.";
      confirmPwdError.style.display = "block";
      updateRegisterBtnState();
      return false;
    }
    if (confirmPwd.length < 8){
      confirmPwdInput.classList.add("error-border");
      confirmPwdError.textContent = "비밀번호를 8자 이상 입력해주세요.";
      confirmPwdError.style.display = "block";
      updateRegisterBtnState();
      return false;
    }
    if (confirmPwd !== pwd){
      confirmPwdInput.classList.add("error-border");
      confirmPwdError.textContent = "비밀번호가 일치하지 않습니다.";
      confirmPwdError.style.display = "block";
      updateRegisterBtnState();
      return false;
    }
    confirmPwdInput.classList.remove("error-border");
    confirmPwdError.textContent = "";
    confirmPwdError.style.display = "none";
    updateRegisterBtnState();
    return true;
  }

  function checkEmailExists(email) {
    return USER_DATA.some(function(user) {
      return user.email === email;
    })
  }
  
  function registerUser() {
    const email = emailInput.value.trim();
    const pwd = pwdInput.value.trim();
    const confirmPwd = confirmPwdInput.value.trim();
    const nickname = nicknameInput.value.trim();
 
    if (checkEmailExists(email)){
      alert("사용 중인 이메일입니다.");
      return;
    }         
    // // 새 사용자 추가 (실제 환경에서는 DB에 저장해야 함)
    // USER_DATA.push({ email, nickname, password: pwd });
    alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
    window.location.href = "/login";
  }

  function updateRegisterBtnState() {
    if(
      emailInput.value.trim() === "" ||
      pwdInput.value.trim() === "" ||
      confirmPwdInput.value.trim() === "" ||
      emailError.textContent !== "" ||
      pwdError.textContent !== "" ||
      confirmPwdError.textContent !== ""
    ) {
      registerBtn.disabled = true;
      registerBtn.classList.remove("enabled");
    } else {
      registerBtn.disabled = false;
      registerBtn.classList.add("enabled");
    }
  }

  emailInput.addEventListener("focusout", () => {
    validateEmail();
  });
  pwdInput.addEventListener("focusout", () => {
    validatePwd();
  });
  confirmPwdInput.addEventListener("focusout", () => {
    validateConfirmPwd();
  });


  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if(validateEmail() && validatePwd() && validateConfirmPwd()){
      registerUser(); //유효하면 /login 페이지로 이동
    }
  });

  updateRegisterBtnState();

  function togglePwdVisibility(inputField, img){
    if(inputField.type === "password"){
      inputField.type = "text";
      img.src = "/images/Property 1=Variant1.png";
    } else {
      inputField.type = "password";
      img.src = "/images/Property 1=Variant2.png";
    }
  }

  togglePwd.addEventListener("click", () => {
    togglePwdVisibility(pwdInput, togglePwd)
  });
  toggleConfirmPwd.addEventListener("click", () => {
    togglePwdVisibility(confirmPwdInput, toggleConfirmPwd)
  });


});

