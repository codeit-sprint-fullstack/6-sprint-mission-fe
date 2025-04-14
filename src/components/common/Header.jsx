import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import miniPandaFace from "../../assets/image/header/작은 판다 얼굴.png";
import pandamarket from "../../assets/image/header/판다마켓.png";

function Header() {
  return (
    <div>
      {/* 위에서 사용 안하는 듯 className="style.mainBody" */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.image}>
            <img className={styles.faceImg} src={miniPandaFace} />
            <img className={styles.headerText} src={pandamarket} />
          </div>

          <Link>
            {/* 경로는 아직 미정 to="/login" */}
            <button className={styles.headerLogin}>로그인</button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
