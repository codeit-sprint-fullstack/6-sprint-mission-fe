import Logo from "../img/Logo.png";
import "./Nav.css";

const NavPage = () => {
  return (
    <nav>
      <div className="navAll">
        <div className="nav-left">
          <a className="imgLogo" href="/">
            <img src={Logo} alt="로고" />
          </a>
          <a className="navText" href="/">
            자유게시판
          </a>
          <a className="navText" href="/">
            중고마켓
          </a>
        </div>
        <a className="login" href="/">
          로그인
        </a>
      </div>
    </nav>
  );
};

export default NavPage;
