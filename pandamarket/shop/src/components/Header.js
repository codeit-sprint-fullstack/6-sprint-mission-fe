import logo from "../asset/image/ic_logo.png";
import "./Header.css";
export const Header = () => {
  return (
    <div className="header">
      <div className="header-img">
        <a className="logo-img" href="index.html">
          <img id="logo" src={logo} />
          <p className="title">판다마켓</p>
        </a>
        <a className="header-text" href="">
          자유게시판
        </a>
        <a className="header-text" href="">
          중고마켓
        </a>
        <a id="login" href="login.html">
          로그인
        </a>
      </div>
    </div>
  );
};
