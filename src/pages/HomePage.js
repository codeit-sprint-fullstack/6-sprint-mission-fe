import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../global.css";

const HomePage = () => {
  return (
    <div>
      {/* background-image를 process.env.PUBLIC_URL로 적용 */}
      <section
        id="hero"
        className="banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/home/hero-image.png)`,
        }}
      >
        <div className="wrapper">
          <h1>일상의 모든 물건을 거래해 보세요</h1>
          <Link to="/items" className="button pill-button">
            구경하러 가기
          </Link>
        </div>
      </section>

      <section id="features" className="wrapper">
        <div className="feature">
          <img
            src={`${process.env.PUBLIC_URL}/images/home/feature1-image.png`}
            alt="인기 상품"
          />
          <div className="feature-content">
            <h2>Hot item</h2>
            <h1>인기 상품을 확인해 보세요</h1>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을 판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            src={`${process.env.PUBLIC_URL}/images/home/feature2-image.png`}
            alt="검색 기능"
          />
          <div className="feature-content">
            <h2>Search</h2>
            <h1>구매를 원하는 상품을 검색하세요</h1>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            src={`${process.env.PUBLIC_URL}/images/home/feature3-image.png`}
            alt="판매 상품 등록"
          />
          <div className="feature-content">
            <h2>Register</h2>
            <h1>판매를 원하는 상품을 등록하세요</h1>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      {/* background-image를 process.env.PUBLIC_URL로 적용 */}
      <section
        id="bottomBanner"
        className="banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/home/bottom-banner-image.png)`,
        }}
      >
        <div className="wrapper">
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
