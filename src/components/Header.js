import { Link, useLocation } from "react-router-dom";
import logo from "../asset/image/ic_logo.png";
import styles from "./Header.module.css";

export const Header = () => {
  const location = useLocation();
  const isItemPage = location.pathname === "/items";

  return (
    <div className={styles.header}>
      <div className={styles["header-img"]}>
        <Link className={styles["logo-img"]} to="/">
          <img className={styles.logo} src={logo} />
          <p className={styles.title}>판다마켓</p>
        </Link>
        <a className={styles["header-text"]} href="">
          자유게시판
        </a>
        <Link
          className={`${styles["header-text"]} ${
            isItemPage ? styles.active : ""
          }`}
          to="/items"
        >
          중고마켓
        </Link>
        <Link className={styles.login} to="/login">
          로그인
        </Link>
      </div>
    </div>
  );
};
