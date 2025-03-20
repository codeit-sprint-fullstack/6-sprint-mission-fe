import styles from "./HomePage.module.css";
import home_01 from "../asset/image/home_01.png";
import home_02 from "../asset/image/home_02.png";
import home_03 from "../asset/image/home_03.png";
import home_bottom from "../asset/image/home_bottom.png";
import home_top from "../asset/image/home_top.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className={styles.homepage}>
      <div className={styles.main}>
        <div className={styles["main-image"]}>
          <div className={styles["text-button"]}>
            <p className={styles["main-text"]}>
              일상의 모든 물건을 거래해 보세요
            </p>
            <Link className={styles.button} to="/items">
              구경하러 가기
            </Link>
          </div>
          <img src={home_top} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.sub}>
          <img src={home_01} />
          <div className={styles["sub-text"]}>
            <p className={styles["sub-title"]}>Hot item</p>
            <p className={styles["sub-txt"]}>인기 상품을 확인해 보세요</p>
            <p className={styles["sub-ex"]}>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className={`${styles.sub} ${styles.middle}`}>
          <div
            className={`${styles["sub-text"]} ${styles["middle-text"]}`}
            style={{ textAlign: "right" }}
          >
            <p className={styles["sub-title"]}>Search</p>
            <p className={styles["sub-txt"]}>구매를 원하는 상품을 검색하세요</p>
            <p className={styles["sub-ex"]}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>

          <img src={home_02} />
        </div>
        <div className={styles.sub}>
          <img src={home_03} />
          <div className={styles["sub-text"]}>
            <p className={styles["sub-title"]}>Register</p>
            <p className={styles["sub-txt"]}>판매를 원하는 상품을 등록하세요</p>
            <p className={styles["sub-ex"]}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles["main-image"]}>
            <p className={styles["bottom-text"]}>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </p>
            <img className={styles["bottom"]} src={home_bottom} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
