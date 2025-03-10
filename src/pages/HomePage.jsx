import style from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={style.mainBody}>
      <div>
        <main className={style.main}>
          <div className={style.title}>
            <div className={style.titleText}>
              <p>일상의 모든 물건을</p>
              <p>거래해 보세요</p>
            </div>

            <button className={style.titleButton}>
              <a href="/item">구경하러 가기</a>
            </button>
          </div>
        </main>

        <article>
          <div className={style.articleMain}>
            <div className={style.mainContent1}>
              <p>
                <img
                  className={style.imageContainer1}
                  src="/main-page/Img_home_01.png"
                />
              </p>

              <span className={style.textContainer1}>
                <p className={style.subtitle1}>Hot item</p>
                <p className={style.mainText1}>인기 상품을 확인해보세요</p>
                <p className={style.description1}>
                  가장 HOT한 중고거래 물품을 <br />
                  판다 마켓에서 확인해보세요
                </p>
              </span>
            </div>

            <div className={style.mainContent2}>
              <span className={style.textContainer2}>
                <p className={style.subtitle2}>Search</p>
                <p className={style.mainText2}>
                  구매를 원하는 상품을 검색하세요
                </p>
                <p className={style.description2}>
                  구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
                </p>
              </span>

              <span>
                <img
                  className={style.imageContainer2}
                  src="/main-page/Img_home_02.png"
                />
              </span>
            </div>

            <div className={style.mainContent3}>
              <p>
                <img
                  className={style.imageContainer3}
                  src="/main-page/Img_home_03.png"
                />
              </p>

              <span className={style.textContainer3}>
                <p className={style.subtitle3}>register</p>
                <p className={style.mainText3}>
                  판매를 원하는 상품을 등록하세요
                </p>
                <p className={style.description3}>
                  어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
                </p>
              </span>
            </div>
          </div>
        </article>

        <main className={style.main}>
          <div className={style.endTitle}>
            <div className={style.titleText2}>
              <p>믿을 수 있는</p>
              <p>판다마켓 중고거래</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
