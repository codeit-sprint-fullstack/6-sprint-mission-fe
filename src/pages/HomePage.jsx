import React from "react";
import heroImage from "../assets/home/hero-image.png";
import feature1Image from "../assets/home/feature1-image.png";
import feature2Image from "../assets/home/feature2-image.png";
import feature3Image from "../assets/home/feature3-image.png";
import bottomBanner from "../assets/home/bottom-banner-image.png";

const Homepage = () => {
  return (
    <main>
      <section className="homepage-tops">
        <div className="homepage-top-content">
          <div className="homepage-top-des">
            <h2>일상의 모든 물건을<br />거래해 보세요</h2>
            <a className="homepage-btn" href="/items">구경하러 가기</a>
          </div>
          <img className="homepage-top-img" src={heroImage} alt="홈페이지 배경 이미지" />
        </div>
      </section>

      <section className="homepage-section section-hot-item">
        <div className="section-container">
          <img className="section-img" src={feature1Image} alt="인기상품" />
          <div className="section-description">
            <h3>Hot item</h3>
            <h2>인기 상품을<br />확인해 보세요</h2>
            <p>가장 HOT한 중고거래 물품을<br />판다마켓에서 확인해 보세요</p>
          </div>
        </div>
      </section>

      <section className="homepage-section section-search">
        <div className="section-container">
          <div className="section-description">
            <h3>Search</h3>
            <h2>구매를 원하는<br />상품을 검색하세요</h2>
            <p>구매하고 싶은 물품을 검색해서<br />쉽게 찾아보세요</p>
          </div>
          <img className="section-img" src={feature2Image} alt="Search" />
        </div>
      </section>

      <section className="homepage-section section-register">
        <div className="section-container">
          <img className="section-img" src={feature3Image} alt="Register" />
          <div className="section-description">
            <h3>Register</h3>
            <h2>판매를 원하는<br />상품을 등록하세요</h2>
            <p>어떤 물품이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
          </div>
        </div>
      </section>

      <section className="homepage-bottom">
        <div className="homepage-bottom-content">
          <h2>믿을 수 있는<br />판다마켓 중고 거래</h2>
          <img className="homepage-bottom-img" src={bottomBanner} alt="판다마켓 배경 이미지" />
        </div>
      </section>
    </main>
  );
};

export default Homepage;
