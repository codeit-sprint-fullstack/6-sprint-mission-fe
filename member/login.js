import { USERDATA } from "../userData.js";
const email = document.getElementById("email");
const pw = document.getElementById("pw");
const pwEye = document.getElementById("pwEye");
const loginBtn = document.querySelector(".loginBtn");
const alert = document.querySelector(".alert");
const alertBtn = document.querySelector(".alertBtn");

export const chEamil = () => {
  const errMessage = document.querySelector(".emailErrMsg");
  const emailValue = email.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(emailValue)) {
    email.classList.remove("invalid");
    email.classList.add("valid");
    errMessage.style.display = "none";
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
    errMessage.style.display = "block";
  }
};

export const chPw = () => {
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

export const chPwEye = () => {
  if (pw.type === "password") {
    pw.type = "text";
    pwEye.src = "../imges/pweye.png";
  } else {
    pw.type = "password";
    pwEye.src = "../imges/Vector.png";
  }
};

const clLoginBtn = () => {
  USERDATA.forEach((user) => {
    if (user.email === email.value && user.password === pw.value) {
      location.href = "../items.html";
    } else {
      alert.style.display = "block";
    }
  });
};

const clAlertBtn = () => {
  alert.style.display = "none";
};

email.addEventListener("input", chEamil);
pw.addEventListener("input", chPw);
pwEye.addEventListener("click", chPwEye);
loginBtn.addEventListener("click", clLoginBtn);
alertBtn.addEventListener("click", clAlertBtn);
