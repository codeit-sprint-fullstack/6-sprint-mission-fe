document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("email");
  const pwdInput = document.getElementById("password");
  const confirmPwdInput = document.getElementById("confirmPassword");
  const loginBtn = document.querySelector(".login-btn");
  // const registerBtn = document.querySelector(".register-btn");

  const emailError = document.getElementById("email-error");
  const pwdError = document.getElementById("pwd-error");
  // const confirmPwdError = document.getElementById("confrimPwd-error");

  const togglePwd = document.getElementById("togglePwd");

  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
  ];

  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === ""){
      emailInput.classList.add("error-border");
      emailError.textContent = "이메일을 입력해주세요.";
      emailError.style.display = "block";
      updateLoginBtnState();
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      emailInput.classList.add("error-border");
      emailError.textContent = "잘못된 이메일 형식입니다.";
      emailError.style.display = "block";
      updateLoginBtnState();
      return false;
    }
    emailInput.classList.remove("error-border");
    emailError.textContent = "";
    emailError.style.display = "none";
    updateLoginBtnState();
    return true;
  }

  function validatePwd() {
    const pwd = pwdInput.value.trim();
    if (pwd === ""){
      pwdInput.classList.add("error-border");
      pwdError.textContent = "비밀번호를 입력해주세요.";
      pwdError.style.display = "block";
      updateLoginBtnState();
      return false;
    }
    if (pwd.length < 8){
      pwdInput.classList.add("error-border");
      pwdError.textContent = "비밀번호를 8자 이상 입력해주세요.";
      pwdError.style.display = "block";
      updateLoginBtnState();
      return false;
    }
    pwdInput.classList.remove("error-border");
    pwdError.textContent = "";
    pwdError.style.display = "none";
    updateLoginBtnState();
    return true;
  }

  function validateConfirmPwd(pwd) { //미완성
    const confirmPwd = confirmPwdInput.value.trim();
    //꼭필요한가? - 이 한줄줄
    if (!confirmPwdInput) return {valid: true, message: ""};

    if (confirmPwd === ""){
      return { valid: false, message: "비밀번호를 다시 입력해주세요."};
    }
    if (confirmPwd !== pwd){
      return { valid: false, message: "비밀번호가 일치하지 않습니다."};
    }
    return { valid: true, message: ""};
  }
  
  function validateLogin() {
    const email = emailInput.value.trim();
    const pwd = pwdInput.value.trim();

    const user = USER_DATA.find(user => user.email === email);
    // const user = USER_DATA.find(function(user) {
    //   return user.email === email;
    // });

    if(!user || user.password !== pwd){
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;

  }

  function updateLoginBtnState() {
    if(
      emailInput.value.trim() === "" ||
      pwdInput.value.trim() === "" ||
      emailError.textContent !== "" ||
      pwdError.textContent !== ""
    ) {
      loginBtn.disabled = true;
      loginBtn.classList.remove("enabled");
    } else {
      loginBtn.disabled = false;
      loginBtn.classList.add("enabled");
    }
  }

  emailInput.addEventListener("focusout", () => {
    validateEmail();
  });
  pwdInput.addEventListener("focusout", () => {
    validatePwd();
  });
  // emailInput.addEventListener("focusout", validateEmail);
  // pwdInput.addEventListener("focusout", validatePwd);

  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if(validateEmail() && validatePwd() && validateLogin()){
      window.location.href = "/items"; //유효하면 /items 페이지로 이동
    }
  });

  updateLoginBtnState();

  function togglePwdVisibility(inputField, img){
    if(inputField.type === "password") {
      inputField.type = "text";
      img.src = "../images/Property 1=Variant1.png"
    } else {
      inputField.type = "password";
      img.src = "../images/Property 1=Variant2.png"
    }
  }

  togglePwd.addEventListener("click", () => {
    togglePwdVisibility(pwdInput, togglePwd)
  });


});

