const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.querySelector(".inputmail");
const passwordInput = document.querySelector(".inputpass");
const loginButton = document.querySelector(".but");
const passbox = document.querySelector(".password-container");
const eye = document.querySelector(".toggle-password");

// 이메일 유효성 검사 함수
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 오류 메시지 표시 함수
function showErrorMessage(input, message) {
  let errorMessage = input.nextElementSibling;

  if (errorMessage && errorMessage.tagName === "P") {
    errorMessage.innerText = message;
  } else {
    errorMessage = document.createElement("p");
    errorMessage.style.color = "#F74747";
    errorMessage.style.fontSize = "12px";
    errorMessage.innerText = message;
    input.after(errorMessage);
  }
}

//  오류 메시지 삭제 함수
function removeErrorMessage(input) {
  const errorMessage = input.nextElementSibling;
  if (errorMessage && errorMessage.tagName === "P") {
    errorMessage.remove();
  }
}

//  이메일 입력 필드 focusout 이벤트 리스너
emailInput.addEventListener("focusout", () => {
  const email = emailInput.value.trim();

  if (!email) {
    showErrorMessage(emailInput, "이메일을 입력해주세요.");
    emailInput.style.border = "1px solid #F74747"; 
  } else if (!validateEmail(email)) {
    showErrorMessage(emailInput, "잘못된 이메일 형식입니다.");
    emailInput.style.border = "1px solid #F74747"; 
  } else {
    removeErrorMessage(emailInput);
    emailInput.style.border = "none"; 
  }
  updateButtonState();
});

// 비밀번호 입력 필드 focusout 이벤트 리스너
passwordInput.addEventListener("focusout", () => {
  const password = passwordInput.value.trim();

  if (!password) {
    showErrorMessage(passbox, "비밀번호를 입력해주세요.");
    passwordInput.style.border = "1px solid #F74747"; 
  } else if (password.length < 8) {
    showErrorMessage(passbox, "비밀번호를 8자 이상 입력해주세요.");
    passwordInput.style.border = "1px solid #F74747"; 
  } else {
    removeErrorMessage(passbox);
    passwordInput.style.border = "none"; 
  }
  updateButtonState();
});

// 버튼 상태 업데이트 (입력값에 따라 활성화/비활성화)
function updateButtonState() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const emailValid = validateEmail(email);
  const passwordValid = password.length >= 8;

  if (emailValid && passwordValid) {
    loginButton.disabled = false;
    loginButton.style.backgroundColor = "#3692FF";
  } else {
    loginButton.disabled = true;
    loginButton.style.backgroundColor = "#9CA3AF";
  }
}

// 모달 관련 요소
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModalBtn = document.getElementById("close-modal");

// 모달 표시 함수
function showModal(message, isSuccess) {
  modalMessage.textContent = message; 
  modal.style.display = "flex";  
  modal.dataset.success = isSuccess;  
}

// 모달 닫기 이벤트 (성공 여부에 따라 다르게 동작)
closeModalBtn.addEventListener("click", () => {
     modal.style.display = "none";  
  
});

// 로그인 버튼 클릭 시 실행되는 이벤트리스너
loginButton.addEventListener("click", (event) => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const user = USER_DATA.find(user => user.email === email);

  if (!user || user.password !== password) {
    showModal("비밀번호가 일치하지 않습니다.", false);  
  } else {
    window.location.href = "items.html"; 
  }
});

eye.addEventListener("click", () => {
  if(passwordInput.type == "password") {
    passwordInput.type = "text";
    eye.src = "img/btn_visibility_on_24px.png";
  }  else {
    passwordInput.type ="password";
    eye.src = "img/btn_visibility_off_24px.png";
  }
})