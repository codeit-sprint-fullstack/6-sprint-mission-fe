// 유저 데이터
export const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

// 모달 열기 함수
export const showModal = (message) => {
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("modal").style.display = "flex";
};

// 모달 닫기 함수
const modalButton = document.getElementById("modalButton");
modalButton.addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

// 비밀번호 보기 기능.
const togglePassword = () => {
  let passwordInput = document.getElementById("password");
  let togglePasswordIcon = document.getElementById("togglePasswordIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordIcon.src = "./imgs/ic_open_eye.png";
  } else {
    passwordInput.type = "password";
    togglePasswordIcon.src = "./imgs/ic_close_eye.png";
  }
};

window.togglePassword = togglePassword;
