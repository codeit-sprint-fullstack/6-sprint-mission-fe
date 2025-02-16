const loginBtn = document.getElementById("singup-btn")
const emailInput = document.getElementById("member-email")
const nickNameInput = document.getElementById("member-nickname")
const passwordInput = document.getElementById("member-password")
const chkPasswordInput = document.getElementById("member-chkpassword")
const emailError = document.getElementById("email-error")
const passwordError = document.getElementById("password-error")
const chkPasswordError = document.getElementById("chkpassword-error")
const togglePassword = document.getElementById("togglePassword")
const toggletChkPassword = document.getElementById("toggleChkPassword")

const passwordContainer = document.getElementById("password-container")
const chkPasswordContainer = document.getElementById("chkpassword-container")

const alertModal = document.getElementById("alert-modal")
const alertMessage = document.getElementById("alert-message")
const closeAlertBtn = document.getElementById("close-alert-btn")

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]


function emailValidChk(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}


function updateButton() {
  if (emailInput.value.trim() === "" || passwordInput.value.trim() === "" ||
  nickNameInput.value.trim() === "" || chkPasswordInput.value.trim() === ""||
  emailError.textContent !== "" || passwordError.textContent !== "" ||
  chkPasswordError.textContent !=="") {
    loginBtn.disabled = true
  } else {
    loginBtn.disabled = false
  }
}

emailInput.addEventListener("focusout", () => {
  const emailValue = emailInput.value.trim()
  if (!emailValue) {
    emailError.textContent = "이메일을 입력해 주세요."
    emailInput.style.border = "1px solid red"
  } else if (!emailValidChk(emailValue)) {
    emailError.textContent = "잘못된 이메일 형식입니다."
    emailInput.style.border = "1px solid red"
  } else {
    emailError.textContent = ""
    emailInput.style.border = ""
  }
  updateButton()
})

nickNameInput.addEventListener("focusout", () => {
  updateButton()  
})

passwordInput.addEventListener("focusout", () => {
  const passwordValue = passwordInput.value.trim()

  if (!passwordValue) {
    passwordError.textContent = "비밀번호를 입력해 주세요."
    passwordContainer.style.border = "1px solid red"
  } else if (passwordValue.length < 8) {
    passwordError.textContent = "비밀번호 8자 이상 입력해주세요."
    passwordContainer.style.border = "1px solid red"
  } else {
    passwordError.textContent = ""
    passwordContainer.style.border = ""
  }
  updateButton()
})

togglePassword.addEventListener("click", function() {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
});


chkPasswordInput.addEventListener("focusout", () => {
  const chkpasswordValue = chkPasswordInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (!chkpasswordValue) {
    chkPasswordError.textContent = "비밀번호를 입력해 주세요."
    chkPasswordContainer.style.border = "1px solid red"
  } else if (chkpasswordValue !== passwordValue) {
    chkPasswordError.textContent = "비밀번호가 일치하지 않습니다."
    chkPasswordContainer.style.border = "1px solid red"
  } else {
    chkPasswordError.textContent = ""
    chkPasswordContainer.style.border = ""
  }
  updateButton()
})

toggleChkPassword.addEventListener("click", function() {
  const type = chkPasswordInput.type === "password" ? "text" : "password";
  chkPasswordInput.type = type;
});

function showAlert(message) {
  alertMessage.textContent = message 
  alertModal.style.display = "flex"  
}

function hideAlert() {
  alertModal.style.display = "none"
}

function checkLogin() {  
  const emailValue = emailInput.value.trim()  
  const user = USER_DATA.find(user => user.email === emailValue)

  if (user) {
    showAlert("사용중인 이메일입니다.")
  } else {
    window.location.href = "/login"
  }
}

loginBtn.addEventListener("click", checkLogin)
closeAlertBtn.addEventListener("click", hideAlert)