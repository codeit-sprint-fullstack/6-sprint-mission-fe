const loginBtn = document.getElementById("loginBtn")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const loginContainer = document.getElementById("login-container")
const emailError = document.getElementById("email-error")
const passwordError = document.getElementById("password-error")
const togglePassword = document.getElementById("toggle-Password")

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


// 이메일 유효성 검사
function emailValidChk(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email)
}

//버튼 조건문 
function updateButton() {
  if (emailInput.value.trim() === "" || passwordInput.value.trim() === "" || 
      emailError.textContent !== "" || passwordError.textContent !== "") {
    loginBtn.disabled = true
  } else {
    loginBtn.disabled = false
  }
}

// 이메일 유효성 검사 값이 없거나 유효성이 안되는 경우
emailInput.addEventListener("focusout", () => {
  const emailValue = emailInput.value.trim()

  if (!emailValue) {
    emailError.textContent = "이메일을 입력해 주세요."
    emailInput.style.border = "1px solid red"
  } else if (!emailValidChk(emailValue)) {
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailInput.style.border = "1px solid red"
  } else {
    emailError.textContent = ""
    emailInput.style.border = ""
  }
  updateButton()
})

// 비밀번호 유효성 검사 값이 없거나 비밀번호 길이가 8자 이하일 때 에러
passwordInput.addEventListener("focusout", () => {
  const passwordValue = passwordInput.value.trim()

  if (!passwordValue) {
    passwordError.textContent = "비밀번호를 입력해 주세요."
    loginContainer.style.border = "1px solid red"
  } else if (passwordValue.length < 8) {
    passwordError.textContent = "비밀번호 8자 이상 입력해주세요."
    loginContainer.style.border = "1px solid red"
  } else {
    passwordError.textContent = ""
    loginContainer.style.border = ""
  }
  updateButton() 
})

togglePassword.addEventListener("click", function() {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
});


function showAlert(message) {
  alertMessage.textContent = message 
  alertModal.style.display = "flex"  
}

function hideAlert() {
  alertModal.style.display = "none"
}


//로그인 버튼 누르시 user data와 일치하는지 확인
function checkLogin() {  
  const emailValue = emailInput.value.trim()  
  const passwordValue = passwordInput.value.trim()
  
  const user = USER_DATA.find(user => user.email === emailValue)

  if (!user) {
    showAlert("등록되지 않은 이메일입니다.")
  } else if (user.password !== passwordValue) {
    showAlert("비밀번호가 일치하지 않습니다.")
  } else {
    window.location.href = "/items"
  }
}

loginBtn.addEventListener("click", checkLogin)
closeAlertBtn.addEventListener("click", hideAlert)