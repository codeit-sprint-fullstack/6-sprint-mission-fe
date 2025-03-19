import { Link, NavLink } from "react-router";
import style from "./Header.module.scss";

const activeLink = ({ isActive }) => {
  return {
    color: isActive ? "var(--blue-color-3692ff)" : undefined,
  };
};

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.headerBar}>
        <div className={style.headerLeft}>
          <Link to="/" className={style.logoBtn}>
            <img src="/assets/image/app/header/ic_small_panda_logo.svg" />
            <h1>판다마켓</h1>
          </Link>
          <NavLink
            to="/community"
            style={activeLink}
            className={style.headerTxt}
          >
            자유게시판
          </NavLink>
          <NavLink to="/items" style={activeLink} className={style.headerTxt}>
            중고마켓
          </NavLink>
        </div>
        <div>
          <Link to="login" className={style.loginBtn}>
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
