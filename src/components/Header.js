import logo from "../assets/images/logo/sm-logo.svg";
import typoLogo from "../assets/images/logo/type-logo.svg";
import "./Header.css";

function Header() {
  return (
    <header>
      <div>
        <picture>
          <source srcSet={typoLogo} media="(max-width: 743px)" />
          <a href="index.html">
            <img src={logo} alt="판다마켓 로고" />
          </a>
        </picture>
        <div className="headerMenu">
          <p>자유게시판</p>
          <p>중고마켓</p>
        </div>
      </div>
      <button className="profileBtn" type="button">
        로그인
      </button>
    </header>
  );
}

export default Header;
