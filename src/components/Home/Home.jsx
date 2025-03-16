import { Link } from "react-router";
import style from "./Home.module.scss";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>판다마켓</title>
      </Helmet>
      <section className={style.start}>
        <div className={style.startImg}>
          <div>
            <h1 className={style.bannerText}>
              일상의 모든 물건을<span> 거래해 보세요</span>
            </h1>
            <Link to="items" className={style.itemsBtn}>
              구경하러 가기
            </Link>
          </div>
          <div className={style.imgTopBox}>
            <img
              src="/assets/image/home/img_home_top.png"
              className={style.imgTop}
            />
          </div>
        </div>
      </section>
      <article className={style.container}>
        <div className={style.boxes}>
          <div className={style.box}>
            <div className={style.imgFirstBox}>
              <img
                src="/assets/image/home/img_home_01.png"
                className={style.imgFirst}
              />
            </div>
            <div className={style.txtFirstBox}>
              <p className={style.mainText1}>Hot item</p>
              <h1 className={style.mainText2}>
                인기 상품을<span> 확인해 보세요</span>
              </h1>
              <p className={style.mainText3}>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
          <div className={style.middleBox}>
            <div className={style.imgSecondBox}>
              <img
                src="/assets/image/home/img_home_02.png"
                className={style.imgSecond}
              />
            </div>
            <div className={style.txtSecondBox}>
              <p className={style.mainText1}>Search</p>
              <h1 className={style.mainText2}>
                구매를 원하는<span> 상품을 검색하세요</span>
              </h1>
              <p className={style.mainText3}>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgThirdBox}>
              <img
                src="/assets/image/home/img_home_03.png"
                className={style.imgThird}
              />
            </div>
            <div className={style.txtThirdBox}>
              <p className={style.mainText1}>Register</p>
              <h1 className={style.mainText2}>
                판매를 원하는<span> 상품을 등록하세요</span>
              </h1>
              <p className={style.mainText3}>
                어떤 물건이든 판매하고 싶은
                <br />
                상품을 쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </article>
      <section className={style.end}>
        <div className={style.endImg}>
          <div>
            <h1 className={style.bannerText}>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
          </div>
          <div className={style.imgBottomBox}>
            <img
              src="/assets/image/home/img_home_bottom.png"
              className={style.imgBottom}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
