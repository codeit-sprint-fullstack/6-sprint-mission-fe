import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className="style.mainBody">
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.image}>
            <img
              className={styles.faceImg}
              src="/main-page/작은 판다 얼굴.png"
            />
            <img className={styles.headerText} src="/main-page/판다마켓.png" />
          </div>

          <Link to="/login">
            <button className={styles.headerLogin}>로그인</button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Nav;
