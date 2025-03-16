import { Helmet } from "react-helmet";
import style from "./Signup.module.scss";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import SimpleLogin from "../SimpleLogin";

// USER_DATA
const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

// 이메일, 비밀번호 정규 표현식
const emailRegex =
  /^[0-9a-zA-Z]*@[0-9a-zA-Z][0-9a-zA-Z]*[.]?[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i;
const passwordRegex = /^[a-zA-Z0-9#?!@$%^&*-]{8,}$/;

// 이메일, 비밀번호 에러 메세지
const errMsg = {
  email: {
    empty: "이메일을 입력해주세요.",
    invalid: "잘못된 이메일 형식입니다.",
    success: "사용 가능한 이메일입니다.",
    fail: "사용 중인 이메일입니다.",
  },
  password: {
    empty: "비밀번호를 입력해주세요.",
    invalid: "비밀번호를 8자 이상 입력해주세요.",
    success: "비밀번호가 일치합니다.",
  },
  password2: {
    fail: "비밀번호가 일치하지 않습니다.",
  },
};

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
    password2: false,
    nickname: false,
    fail: {
      email: false,
      password: false,
      password2: false,
    },
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    password2: "",
  });
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
    const errorEffect = setIsFocus({
      ...isFocus,
      [id]: false,
      fail: { ...isFocus.fail, [id]: true },
    });

    if (id === "nickname") return errorEffect;

    if (value === "") {
      setError({ ...error, [id]: errMsg[id].empty });
      errorEffect;
    } else if (
      id === "email" ? !emailRegex.test(value) : !passwordRegex.test(value)
    ) {
      setError({ ...error, [id]: errMsg[id].invalid });
      errorEffect;
    } else {
      setError({ ...error, [id]: "" });
      setIsFocus({
        ...isFocus,
        [id]: false,
        fail: { ...isFocus.fail, [id]: false },
      });
    }
  };

  const checkPw2Regex = (e) => {
    const { value, id } = e.target;
    const errorEffect = setIsFocus({
      ...isFocus,
      [id]: false,
      fail: { ...isFocus.fail, [id]: true },
    });

    if (value === "") {
      setError({ ...error, [id]: errMsg[id].fail });
      errorEffect;
    } else if (!(value === password.value && passwordRegex.test(value))) {
      setError({ ...error, [id]: errMsg[id].fail });
      errorEffect;
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

    if (
      emailRegex.test(email.value) &&
      nickname.value &&
      passwordRegex.test(password.value) &&
      password.value === password2.value
    ) {
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

  const checkUsers = (e) => {
    e.preventDefault();
    if (!emailCheck()) {
      navigate("/login");
    } else {
      setModalOn(true);
    }
  };

  // 모달 off
  const modalOff = () => setModalOn(false);

  return (
    <>
      <Helmet>
        <title>판다마켓 | 회원가입</title>
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
        <label className={style.index} htmlFor="nickname">
          닉네임
        </label>
        <input
          onFocus={focusEffect}
          onBlur={checkRegex}
          onChange={deleteError}
          className={`
            ${style.inputBox}
            ${style.nickname}
            ${isFocus.nickname ? style.focusIn : null}
          `}
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
        />
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
        <label className={style.index} htmlFor="password2">
          비밀번호 확인
        </label>
        <div>
          <input
            onFocus={focusEffect}
            onBlur={checkPw2Regex}
            onChange={deleteError}
            className={`
            ${style.inputBox} 
            ${isFocus.password2 ? style.focusIn : null}
            ${isFocus.fail.password2 ? style.errorInput : null}
            `}
            id="password2"
            name="password2"
            type={isVisible ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
          <p className={style.errorMsg}>{error.password2}</p>
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
          회원가입
        </button>
      </form>
      <div className={`${style.modal} ${modalOn ? style.on : null}`}>
        <div className={style.modalPopup}>
          <p>사용 중인 이메일입니다.</p>
          <button onClick={modalOff} type="button">
            확인
          </button>
        </div>
      </div>
      <SimpleLogin />
      <footer className={style.footer}>
        <p className={style.footerTxt}>이미 회원이신가요?</p>
        <Link to="/login" className={style.footerLink}>
          로그인
        </Link>
      </footer>
    </>
  );
};

export default Signup;
