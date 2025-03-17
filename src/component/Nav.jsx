import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import miniPandaFace from "../assets/img/main-page/작은 판다 얼굴.png";
import pandamarket from "../assets/img/main-page/판다마켓.png";

function Nav() {
  return (
    <div className="style.mainBody">
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.image}>
            <img className={styles.faceImg} src={miniPandaFace} />
            <img className={styles.headerText} src={pandamarket} />
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
