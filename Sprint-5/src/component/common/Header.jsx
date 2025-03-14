import "./Header.css";
import logo from "/ic_logo.png";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <a href="#">
          <img id="logo-img" src={logo} />
        </a>
        
        <div className="header-menu">
          <a className="header-link" href="#">
            <p className="header-p">자유게시판</p>
          </a>
          <a className="header-link" href="#">
            <p className="header-p">중고마켓</p>
          </a>
        </div>
      </div>
      <button type="click" id="login-btn">
        로그인
      </button>
    </header>
  );
};
