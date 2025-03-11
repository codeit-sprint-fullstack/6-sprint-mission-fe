import { NavLink } from "react-router-dom";
import style from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div>
      <main className={style.main}>
        <div className={style.loginHead}>
          <div>
            {" "}
            <img className={style.loginIcon} src="/login/판다 얼굴.png" />{" "}
          </div>
          <span className={style.loginTitle}>
            <div>
              {" "}
              <img src="/login/판다마켓.png" />{" "}
            </div>
          </span>
        </div>

        <div className={style.contents}>
          <div className={style.loginBody}>
            <div className={style.email}>
              <form>
                <label
                  className={(style.emailBox, style.emailText)}
                  htmlFor="input-email"
                  id="email-input"
                >
                  이메일
                </label>
                <input
                  id="input-email"
                  className={style.inputEmail}
                  type="text"
                  placeholder="이메일을 입력해주세요"
                />
                <div
                  id="email-error-message"
                  className={style.emailErrorMessage}
                ></div>
              </form>
            </div>

            <div className={style.password}>
              <form>
                <label
                  className={(style.passwordBox, style.passwordText)}
                  htmlFor="inputPassword"
                  id="password-input"
                >
                  {" "}
                  비밀번호
                </label>
                <input
                  id="input-password"
                  className={style.inputPassword}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                />
                <img
                  id="eye-con"
                  className={style.eyeCon}
                  src="/login/btn_visibility_off_24px.png"
                />
                <div
                  id="password-error-message"
                  className={style.psswordErrorMessage}
                ></div>
              </form>
            </div>

            <button className={style.loginButton}>로그인</button>

            <div className={style.loginbodylowerMain}>
              <div className={style.loginbodyLower}>
                <div className={style.loginbodylowerBox}>간편 로그인하기</div>
                <div className={style.loginbodylowerImg}>
                  <a href="https://www.google.com/">
                    <img
                      width="42"
                      height="42"
                      src="/login/Component 2@3x.png"
                      alt="google"
                    />{" "}
                  </a>
                  <a href="https://www.kakaocorp.com/page/">
                    <img
                      width="42"
                      height="42"
                      src="/login/Component 3@3x.png"
                    />{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className={style.loginbodyFoot}>
              판다마켓이 처음이신가요?
              <NavLink style={{ color: "#3692FF" }} to="/signup">
                회원가입
              </NavLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
