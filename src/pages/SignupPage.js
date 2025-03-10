import React, { useState } from "react";
import { Link } from "react-router-dom";
import Meta from "./Meta";
import errors from "../errors";
import "../styles/auth.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      setErrorMessage(errors.emailEmpty);
      return;
    }

    if (!formData.nickname) {
      setErrorMessage(errors.nicknameEmpty);
      return;
    }

    if (!formData.password) {
      setErrorMessage(errors.passwordEmpty);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage(errors.passwordInvalid);
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setErrorMessage(errors.passwordMismatch);
      return;
    }

    console.log("회원가입 요청:", formData);
  };

  return (
    <>
      <Meta title="판다마켓 - 회원가입" path="/signup" />

      <main className="auth-container">
        <Link to="/" className="logo-home-link">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo/logo.svg`}
            alt="판다마켓 로고"
          />
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-item">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-item">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label="비밀번호 보기"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  className="password-toggle-icon"
                  src={
                    showPassword
                      ? `${process.env.PUBLIC_URL}/images/icons/eye-visible.svg`
                      : `${process.env.PUBLIC_URL}/images/icons/eye-invisible.svg`
                  }
                  alt={showPassword ? "비밀번호 표시" : "비밀번호 숨김"}
                />
              </button>
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>
            <div className="input-wrapper">
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label="비밀번호 보기"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                <img
                  className="password-toggle-icon"
                  src={
                    showPasswordConfirm
                      ? `${process.env.PUBLIC_URL}/images/icons/eye-visible.svg`
                      : `${process.env.PUBLIC_URL}/images/icons/eye-invisible.svg`
                  }
                  alt={showPasswordConfirm ? "비밀번호 표시" : "비밀번호 숨김"}
                />
              </button>
            </div>
          </div>

          <button type="submit" className="button pill-button full-width">
            회원가입
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="구글 로그인"
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/social/google-logo.png`}
                alt="구글 로그인"
                width="42"
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡 로그인"
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/social/kakao-logo.png`}
                alt="카카오톡 로그인"
                width="42"
              />
            </a>
          </div>
        </div>

        <p className="auth-switch">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </main>
    </>
  );
};

export default SignupPage;
