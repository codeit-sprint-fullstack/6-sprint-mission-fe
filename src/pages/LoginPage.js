import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import logo from "../asset/image/ic_logo.png";
import google from "../asset/image/ic_google.png";
import kakao from "../asset/image/ic_kakao.png";
import { useRef, useState } from "react";

// import {
//   checkAgainPassword,
//   checkNickname,
//   checkPassword,
//   checkEmail,
// } from "../components/CheckData";

function LoginPage() {
  //   const emailRef = useRef(null);
  //   const passwordRef = useRef("");
  //   const [showPassword, setShowPassword] = useState();
  //   const [login, setLogin] = useState();
  //   const icon = document.querySelector(".toggle-password");
  //   icon.classList.add("fa-eye"); // 초기 상태 설정
  //   const togglePassword = () => setShowPassword(!showPassword);
  //   let emailCheck = false;
  //   let passwordCheck = false;
  //   function checkInputs() {
  //     if (emailCheck && passwordCheck) {
  //       loginButton.classList.add("active");
  //     } else {
  //       loginButton.classList.remove("active");
  //     }
  //   }
  //   emailInput.addEventListener("focusout", checkEmail);
  //   passwordInput.addEventListener("focusout", checkPassword);
  //   function showAlert() {
  //     let user = USER_DATA.find((user) => user.email === emailInput.value);
  //     if (!user) {
  //       document.getElementById("confirm-error").textContent =
  //         "이메일이 존재하지 않습니다.";
  //       document.getElementById("custom-alert").style.display = "block";
  //       document.getElementById("overlay").style.display = "block";
  //     } else {
  //       if (passwordInput.value !== user.password) {
  //         document.getElementById("confirm-error").textContent =
  //           "비밀번호가 일치하지 않습니다.";
  //         document.getElementById("custom-alert").style.display = "block";
  //         document.getElementById("overlay").style.display = "block";
  //       } else {
  //         window.location.href = "items.html";
  //       }
  //     }
  //   }
  //   function closeAlert() {
  //     document.getElementById("custom-alert").style.display = "none";
  //     document.getElementById("overlay").style.display = "none";
  //   }
  //   loginButton.addEventListener("click", showAlert);
  //   function checkEmail() {
  //     const emailError = document.getElementById("email-error");
  //     const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  //     if (emailInput.value === "") {
  //       emailError.textContent = "이메일을 입력해주세요.";
  //       emailInput.classList.add("error-line");
  //       emailCheck = false;
  //     } else if (!emailPattern.test(emailInput.value)) {
  //       emailError.textContent = "잘못된 이메일 형식입니다.";
  //       emailInput.classList.add("error-line");
  //       emailCheck = false;
  //     } else {
  //       emailError.textContent = "";
  //       emailInput.classList.remove("error-line");
  //       emailCheck = true;
  //     }
  //     checkInputs();
  //   }
  //   function checkPassword() {
  //     const passwordError = document.getElementById("password-error");
  //     const passwordPattern = /^[a-zA-Z0-9!@]{8,}$/;
  //     if (passwordInput.value === "") {
  //       passwordError.textContent = "비밀번호를 입력해주세요.";
  //       passwordInput.classList.add("error-line");
  //       passwordCheck = false;
  //     } else if (!passwordPattern.test(passwordInput.value)) {
  //       passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
  //       passwordInput.classList.add("error-line");
  //       passwordCheck = false;
  //     } else {
  //       passwordError.textContent = "";
  //       passwordInput.classList.remove("error-line");
  //       passwordCheck = true;
  //     }
  //     checkInputs();
  //   }
  //   return (
  //     <div>
  //       <div className="display-login">
  //         <div className="main-login">
  //           <a className="login-logo" href="index.html">
  //             <img id="login-logo" src={logo} />
  //             <p id="login-title">판다마켓</p>
  //           </a>
  //           <label htmlFor="email-input">이메일</label>
  //           <div className="input-container">
  //             <input
  //               id="email-input"
  //               ref={email}
  //               placeholder="이메일을 입력해주세요"
  //               required
  //             />
  //             <p className="error-message" id="email-error"></p>
  //           </div>
  //           <label htmlFor="password-input">비밀번호</label>
  //           <div className="input-container">
  //             <input
  //               id="password-input"
  //               ref={password}
  //               placeholder="비밀번호를 입력해주세요"
  //               required
  //               type={showPassword ? "text" : "password"}
  //             />
  //             <i
  //               className={`fas ${
  //                 showPassword ? "fa-eye-slash" : "fa-eye"
  //               } toggle-password`}
  //               onClick="togglePassword('password-input', this)"
  //             ></i>
  //             <p className="error-message" id="password-error"></p>
  //           </div>
  //           <button id="login-button">로그인</button>
  //           <div className="simple-login">
  //             <p>간편로그인 하기</p>
  //             <div className="simple-login-img">
  //               <a className="simple-img" href="https://www.google.com/">
  //                 <img id="google" src={google} />
  //               </a>
  //               <a className="simple-img" href="https://www.kakaocorp.com/page/">
  //                 <img id="kakao" src={kakao} />
  //               </a>
  //             </div>
  //           </div>
  //           <p>
  //             판다마켓이 처음이신가요?{" "}
  //             <Link id="signin-link" to="/signin">
  //               회원가입
  //             </Link>
  //           </p>
  //         </div>
  //       </div>
  //       <div className="overlay" id="overlay"></div>
  //       <div className="custom-alert" id="custom-alert">
  //         <p id="confirm-error"></p>
  //         <button onClick={closeAlert}>확인</button>
  //       </div>
  //     </div>
  //   );
}

export default LoginPage;
