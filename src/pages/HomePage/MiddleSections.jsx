import React from "react";

const MiddleSections = () => {
  return (
    <main>
      <section className="homepage-section section-hot-item">
        <div className="section-container">
          <img className="section-img" src="/images/home/feature1-image.png" alt="인기상품" />
          <div className="section-description">
            <h3>Hot item</h3>
            <h2>
              인기 상품을
              <br />
              확인해 보세요
            </h2>
            <p>
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section className="homepage-section section-search">
        <div className="section-container">
          <div className="section-description">
            <h3>Search</h3>
            <h2>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h2>
            <p>
              구매하고 싶은 물품을 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img className="section-img" src="/images/home/feature2-image.png" alt="Search" />
        </div>
      </section>

      <section className="homepage-section section-register">
        <div className="section-container">
          <img className="section-img" src="/images/home/feature3-image.png" alt="Register" />
          <div className="section-description">
            <h3>Register</h3>
            <h2>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h2>
            <p>
              어떤 물품이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MiddleSections;
