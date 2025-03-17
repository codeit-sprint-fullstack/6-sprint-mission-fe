import { Link } from "react-router-dom";
import style from "./SignupPage.module.css";

function SignupPage() {
  return (
    <div>
      <main className={style.main}>
        <div className={style.signupHead}>
          <img className={style.signupIcon} src="/signup/판다 얼굴.png" />
          <span className={style.signupTitle}>
            <img src="/signup/판다마켓.png" />
          </span>
        </div>

        <div className={style.contents}>
          <div className={style.signupBody}>
            <div className={style.email}>
              <form>
                <label
                  id="email-input"
                  className={style.emailBox + " " + style.emailText}
                  htmlFor="input-email"
                >
                  {" "}
                  이메일
                </label>
                <input
                  id="input-email"
                  className={style.inputEmail}
                  placeholder="이메일을 입력해주세요"
                />
                <div className={style.errorBox} id="email-error-message">
                  {" "}
                </div>
              </form>
            </div>

            <div className={style.nickname}>
              <form>
                <label
                  id="nickname-input"
                  className={style.nicknameBox + " " + style.nicknameText}
                  htmlFor="input-nickname"
                >
                  {" "}
                  닉네임
                </label>
                <input
                  id="input-nickname"
                  className={style.inputNickname}
                  placeholder="닉네임을 입력해주세요"
                />
              </form>
            </div>

            <div className={style.password}>
              <form>
                <label
                  id="password-input"
                  className={style.passwordBox + " " + style.passwordText}
                  htmlFor="input-password"
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
                  id="eye-con2"
                  className={style.eyeCon2}
                  src="/signup/btn_visibility_off_24px.png"
                />
                <div
                  className={style.errorBox}
                  id="password-error-message"
                ></div>
              </form>
            </div>

            <div className={style.checkpassword}>
              <form>
                <label
                  id="checkpassword-text"
                  className={
                    style.checkpasswordBox + " " + style.checkpasswordText
                  }
                  htmlFor="input-checkpassword"
                >
                  {" "}
                  비밀번호 확인
                  {/* id="checkpassword-input" */}
                </label>
                <input
                  id="input-checkpassword"
                  className={style.inputCheckpassword}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  type="password"
                />
                <img
                  id="eye-con1"
                  className={style.eyeCon1}
                  src="/signup/btn_visibility_off_24px.png"
                />
                <div id="ckpassword-error-message"></div>
              </form>
            </div>

            <button id="signup-button" className={style.signupButton}>
              회원가입
            </button>

            <div className={style.loginbodylowerMain}>
              <div className={style.loginbodyLower}>
                <div className={style.loginbodylowerBox}>간편 로그인하기</div>
                <div className={style.loginbodylowerImg}>
                  <a href="https://www.google.com/">
                    {" "}
                    <img
                      width="42"
                      height="42"
                      src="/signup/Component 2@3x.png"
                    />{" "}
                  </a>
                  <a href="https://www.kakaocorp.com/page/">
                    {" "}
                    <img
                      width="42"
                      height="42"
                      src="/signup/Component 3@3x.png"
                    />{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className={style.loginbodyFoot}>
              <div className={style.loginbodyFoot1}>이미 회원이신가요?</div>
              <div className={style.loginbodyFoot2}>
                <Link to="/login"> 로그인 </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
