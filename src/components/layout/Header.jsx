import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/logo_sm.svg";
import typoLogo from "../../assets/images/logo/logo_typo.svg";
import styles from "./Header.module.css";

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
        <div className={styles.headerMenu}>
          <NavLink to="/board" id="link" style={getLinkStyle}>
            <p>자유게시판</p>
          </NavLink>
          <NavLink to="/items" id="link" style={getLinkStyle}>
            <p>중고마켓</p>
          </NavLink>
        </div>
      </div>
      <Link to="/login">
        <button className={styles.profileBtn} type="button">
          로그인
        </button>
      </Link>
    </header>
  );
}

export default Header;
