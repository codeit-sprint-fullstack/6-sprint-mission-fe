// import { chEamil, chPwEye, chPw } from "./login.js";
import { USERDATA } from "../userData.js";
const email = document.getElementById("email");
const pw = document.getElementById("pw");
const pwEye = document.getElementById("pwEye");
const checkPw = document.getElementById("checkPw");
const pwEye2 = document.getElementById("pwEye2");
const registerBtn = document.querySelector(".loginBtn");
const alert = document.querySelector(".alert");
const alertBtn = document.querySelector(".alertBtn");

const isValidEmail = (emailValue) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(emailValue);
};

const chEamil = () => {
  const errMessage = document.querySelector(".emailErrMsg");
  const emailValue = email.value;

  if (isValidEmail(emailValue)) {
    email.classList.remove("invalid");
    email.classList.add("valid");
    errMessage.style.display = "none";
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
    errMessage.style.display = "block";
  }
};

const chPw = () => {
  const pwErrMsg = document.querySelector(".pwErrMasg");
  const pwValue = pw.value.length;
  if (pwValue < 8) {
    pwErrMsg.style.display = "block";
    pw.classList.remove("valid");
    pw.classList.add("invalid");
  } else {
    pwErrMsg.style.display = "none";
    pw.classList.remove("invalid");
    pw.classList.add("valid");
  }
};

const chPwEye = () => {
  if (pw.type === "password") {
    pw.type = "text";
    pwEye.src = "../imges/pweye.png";
  } else {
    pw.type = "password";
    pwEye.src = "../imges/Vector.png";
  }
};

const chCheckPw = () => {
  const checkPwErrMasg = document.querySelector(".checkPwErrMasg");
  console.log(checkPwErrMasg);
  if (pw.value !== checkPw.value) {
    checkPwErrMasg.style.display = "block";
    checkPw.classList.remove("valid");
    checkPw.classList.add("invalid");
  } else {
    checkPwErrMasg.style.display = "none";
    checkPw.classList.remove("invalid");
    checkPw.classList.add("valid");
  }
};

const chPwEye2 = () => {
  const checkPw = document.getElementById("checkPw");
  if (checkPw.type === "password") {
    checkPw.type = "text";
    pwEye2.src = "../imges/pweye.png";
  } else {
    checkPw.type = "password";
    pwEye2.src = "../imges/Vector.png";
  }
};

const clRegister = () => {
  const nickname = document.getElementById("nickname");
  let userExists = false;
  const emailValue = email.value;

  USERDATA.forEach((user) => {
    if (
      user.email === email.value ||
      !isValidEmail(emailValue) ||
      pw.value.length < 8 ||
      pw.value !== checkPw.value ||
      !nickname.value
    ) {
      userExists = true;
      alert.style.display = "block";
    }
  });

  if (!userExists) {
    location.href = "/member/login.html";
  }
};

const clAlertBtn = () => {
  alert.style.display = "none";
};

email.addEventListener("input", chEamil);
pw.addEventListener("input", chPw);
pwEye.addEventListener("click", chPwEye);
checkPw.addEventListener("input", chCheckPw);
pwEye2.addEventListener("click", chPwEye2);
registerBtn.addEventListener("click", clRegister);
alertBtn.addEventListener("click", clAlertBtn);
