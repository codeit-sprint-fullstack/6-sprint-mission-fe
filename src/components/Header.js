import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo/sm-logo.svg";
import typoLogo from "../assets/images/logo/typo-logo.svg";
import "./Header.css";

const getLinkStyle = ({ isActive }) => {
  return {
    color: isActive ? "#3692FF" : undefined,
  };
};

function Header() {
  return (
    <header>
      <div>
        <picture>
          <source srcSet={typoLogo} media="(max-width: 743px)" />
          <Link to="/">
            <img src={logo} alt="판다마켓 로고" />
          </Link>
        </picture>
        <div className="headerMenu">
          <NavLink to="/board" style={getLinkStyle} className="link">
            <p>자유게시판</p>
          </NavLink>
          <NavLink to="/items" style={getLinkStyle} className="link">
            <p>중고마켓</p>
          </NavLink>
        </div>
      </div>
      <button className="profileBtn" type="button">
        로그인
      </button>
    </header>
  );
}

export default Header;
