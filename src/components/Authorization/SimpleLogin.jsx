import style from "./SimpleLogin.module.scss";

const SimpleLogin = () => {
  return (
    <>
      <nav className={style.bottomContainer}>
        <div className={style.bottomBox}>
          <p className={style.bottomTxt}>간편 로그인하기</p>
          <div className={style.icon}>
            <a href="https://www.google.com/">
              <div className={style.googleBtn}>
                <img src="/assets/image/login-signup/ic_google.svg" />
              </div>
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <div className={style.kakaoBtn}>
                <img src="/assets/image/login-signup/ic_kakao.svg" />
              </div>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SimpleLogin;
