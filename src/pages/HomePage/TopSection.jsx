import React from "react";
import { Link } from "react-router-dom";

const TopSection = () => {
  return (
    <section className="homepage-tops">
      <div className="homepage-top-content">
        <div className="homepage-top-des">
          <h2>
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h2>
          <Link className="homepage-btn" to="/items">
            구경하러 가기
          </Link>
        </div>
        <img
          className="homepage-top-img"
          src="/images/home/hero-image.png"
          alt="홈페이지 배경 이미지"
        />
      </div>
    </section>
  );
};

export default TopSection;