import { Link } from "react-router-dom";
import home01 from "../assets/images/home/home-01.png";
import home02 from "../assets/images/home/home-02.png";
import home03 from "../assets/images/home/home-03.png";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main>
      <section className={`${styles.banner} ${styles.top}`}>
        <div className={styles.wrapper}>
          <h1 className={styles.h1}>
            일상의 모든 물건을 <br />
            거래해 보세요
          </h1>
          <Link to="/items" id="link">
            <button className={styles.button}>구경하러 가기</button>
          </Link>
        </div>
      </section>

      <section className={styles.wrapper}>
        <div className={styles.feature}>
          <div>
            <img src={home01} alt="인기 상품" />
          </div>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTag}>Hot item</h2>
            <h1 className={styles.h1}>
              인기 상품을 <br />
              확인해 보세요
            </h1>
            <p className={styles.featureBody}>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className={styles.feature}>
          <div>
            <img src={home02} alt="상품 검색" />
          </div>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTag}>Search</h2>
            <h1 className={styles.h1}>
              구매를 원하는 <br />
              상품을 검색하세요
            </h1>
            <p className={styles.featureBody}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>

        <div className={styles.feature}>
          <div>
            <img src={home03} alt="상품 등록" />
          </div>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTag}>Register</h2>
            <h1 className={styles.h1}>
              판매를 원하는 <br />
              상품을 등록하세요
            </h1>
            <p className={styles.featureBody}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.banner} ${styles.bottom}`}>
        <div className={styles.wrapper}>
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h1>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
