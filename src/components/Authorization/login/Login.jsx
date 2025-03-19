import { Helmet } from "react-helmet";
import style from "./Login.module.scss";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import SimpleLogin from "../SimpleLogin";
import { USER_DATA, emailRegex, passwordRegex, errMsg } from "../share-data";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
    fail: {
      email: false,
      password: false,
    },
  });
  const [error, setError] = useState({ email: "", password: "" });
  const [formBtnOn, setFormBtnOn] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [modalOn, setModalOn] = useState(false);
  const navigate = useNavigate();

  // 비밀번호 표시 Toggle
  const togglePassword = () => {
    setIsVisible(!isVisible);
  };

  // focusIn 이벤트 : 색상 효과
  const focusEffect = (e) => {
    const { id } = e.target;

    setIsFocus({
      ...isFocus,
      [id]: true,
      fail: { ...isFocus.fail, [id]: false },
    });
  };

  // 이메일, 비밀번호 유효성 검증
  const checkRegex = (e) => {
    const { value, id } = e.target;

    if (value === "") {
      setError({ ...error, [id]: errMsg[id].empty });
      setIsFocus({
        ...isFocus,
        [id]: false,
        fail: { ...isFocus.fail, [id]: true },
      });
    } else if (
      id === "email" ? !emailRegex.test(value) : !passwordRegex.test(value)
    ) {
      setError({ ...error, [id]: errMsg[id].invalid });
      setIsFocus({
        ...isFocus,
        [id]: false,
        fail: { ...isFocus.fail, [id]: true },
      });
    } else {
      setError({ ...error, [id]: "" });
      setIsFocus({
        ...isFocus,
        [id]: false,
        fail: { ...isFocus.fail, [id]: false },
      });
    }
  };

  // errMsg 초기화, 버튼 활성화
  const deleteError = (e) => {
    const { id } = e.target;

    setError({ ...error, [id]: "" });

    if (emailRegex.test(email.value) && passwordRegex.test(password.value)) {
      setFormBtnOn(true);
      setDisabled(false);
    } else {
      setFormBtnOn(false);
      setDisabled(true);
    }
  };

  // 이메일, 비밀번호 여부 체크 & 로그인 경로 설정 & 모달
  const emailCheck = () => {
    const compare = USER_DATA.some((data) => data.email === email.value);
    return compare;
  };

  const passwordCheck = () => {
    const compare = USER_DATA.some((data) => data.password === password.value);
    return compare;
  };

  const checkUsers = (e) => {
    e.preventDefault();
    if (emailCheck() && passwordCheck()) {
      navigate("/");
    } else {
      setModalOn(true);
    }
  };

  // 모달 off
  const modalOff = () => setModalOn(false);

  return (
    <>
      <Helmet>
        <title>판다마켓 | 로그인</title>
      </Helmet>
      <header className={style.header}>
        <Link to="/" className={style.logoBtn}>
          <img src="/assets/image/login-signup/ic_big_panda_logo.svg" />
          <h1 className={style.logoTxt}>판다마켓</h1>
        </Link>
      </header>
      <form onSubmit={checkUsers} className={style.inputForm}>
        <label className={style.index} htmlFor="email">
          이메일
        </label>
        <input
          onFocus={focusEffect}
          onBlur={checkRegex}
          onChange={deleteError}
          className={`
            ${style.inputBox}
            ${isFocus.email ? style.focusIn : null} 
            ${isFocus.fail.email ? style.errorInput : null}
          `}
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        <p className={style.errorMsg}>{error.email}</p>
        <label className={style.index} htmlFor="password">
          비밀번호
        </label>
        <div>
          <input
            onFocus={focusEffect}
            onBlur={checkRegex}
            onChange={deleteError}
            className={`
            ${style.inputBox} 
            ${isFocus.password ? style.focusIn : null}
            ${isFocus.fail.password ? style.errorInput : null}
            `}
            id="password"
            name="password"
            type={isVisible ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
          />
          <p className={style.errorMsg}>{error.password}</p>
          <img
            onClick={togglePassword}
            className={style.eyeIcon}
            src="/assets/image/login-signup/ic_eye_on.svg"
          />
          <img
            onClick={togglePassword}
            className={`${style.eyeIcon} ${isVisible ? style.off : null}`}
            src="/assets/image/login-signup/ic_eye_off.svg"
          />
        </div>
        <button
          className={`${style.formBtn} ${formBtnOn ? style.on : null}`}
          disabled={disabled}
        >
          로그인
        </button>
      </form>
      <div className={`${style.modal} ${modalOn ? style.on : null}`}>
        <div className={style.modalPopup}>
          <p>비밀번호가 일치하지 않습니다.</p>
          <button onClick={modalOff} type="button">
            확인
          </button>
        </div>
      </div>
      <SimpleLogin />
      <footer className={style.footer}>
        <p className={style.footerTxt}>판다마켓이 처음이신가요?</p>
        <Link to="/signup" className={style.footerLink}>
          회원가입
        </Link>
      </footer>
    </>
  );
};

export default Login;
