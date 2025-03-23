import React, {useState} from "react";
import "../../styles/global.css";
import "../../styles/auth.css";
import {validateEmail, validateLogin, validatePwd} from "../../utils/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [loginError, setLoginError] = useState("");

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    emailError === "" &&
    pwdError === "";

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleBlurEmail = () => {
    const result = validateEmail(email);
    setEmailError(result.message);
  };

  const handleBlurPassword = () => {
    const result = validatePwd(password);
    setPwdError(result.message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailCheck = validateEmail(email);
    const pwdCheck = validatePwd(password);
    const loginCheck = validateLogin(email, password);

    setEmailError(emailCheck.message);
    setPwdError(pwdCheck.message);
    setLoginError(loginCheck.valid ? "" : loginCheck.message);

    if (emailCheck.valid && pwdCheck.valid && loginCheck.valid) {
      alert("로그인 성공!");
      window.location.href = "/items";
    }
  };

  return (
    <div className="auth-container">
      <a href="/">
        <img className="logo" src="/images/logo/logo.svg" alt="판다마켓 로고" />
      </a>

      <div className="bottom-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="id_pwd_input">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlurEmail}
              className={`form-input ${emailError ? "error-border" : ""}`}
              required
            />
            <div id="email-error" className="error-message">
              {emailError}
            </div>

            <div class="input-item">
              <label htmlFor="password">비밀번호</label>
              <div className="password-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handleBlurPassword}
                  className={`form-input ${pwdError ? "error-border" : ""}`}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  aria-label="비밀번호 표시/숨기기"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={`/images/icons/${
                      showPassword ? "eye-visible.svg" : "eye-invisible.svg"
                    }`}
                    alt="비밀번호 표시 토글"
                  />
                </button>
              </div>
            </div>
            <div id="pwd-error" className="error-message">
              {pwdError}
            </div>
          </div>

          <button
            type="submit"
            className={`auth-btn ${isFormValid ? "enabled" : ""}`}
            disabled={!isFormValid}
          >
            로그인
          </button>
        </form>

        <div className="social-login">
          <p>간편 로그인하기</p>
          <div className="social-icons">
            <a href="https://www.google.com/">
              <img src="/images/social/Component2.png" alt="Google 로그인" />
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <img src="/images/social/Component3.png" alt="카카오 로그인" />
            </a>
          </div>
        </div>

        <div className="signup-link">
          <span>판다마켓이 처음이신가요?</span>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
