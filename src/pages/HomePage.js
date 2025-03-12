function HomePage() {
  return (
    <div>
      <main class="main">
        <div class="title">
          <div class="title-text">
            <p>일상의 모든 물건을</p>
            <p>거래해 보세요</p>
          </div>

          <button class="title-button">
            <a target href="/item" style="color: white">
              {" "}
              구경하러 가기{" "}
            </a>
          </button>
        </div>
      </main>

      <article>
        <div class="article-main">
          <div class="main-content1">
            <p>
              <img class="image-container1" src="/main-page/Img_home_01.png" />
            </p>

            <span class="text-container1">
              <p class="subtitle1">Hot item</p>
              <p class="main-text1">인기 상품을 확인해보세요</p>
              <p class="description1">
                가장 HOT한 중고거래 물품을 <br />
                판다 마켓에서 확인해보세요
              </p>
            </span>
          </div>

          <div class="main-content2">
            <span class="text-container2">
              <p class="subtitle2">Search</p>
              <p class="main-text2">구매를 원하는 상품을 검색하세요</p>
              <p class="description2">
                구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
              </p>
            </span>

            <span>
              <img class="image-container2" src="/main-page/Img_home_02.png" />
            </span>
          </div>

          <div class="main-content3">
            <p>
              <img class="image-container3" src="/main-page/Img_home_03.png" />
            </p>

            <span class="text-container3">
              <p class="subtitle3">register</p>
              <p class="main-text3">판매를 원하는 상품을 등록하세요</p>
              <p class="description3">
                어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
              </p>
            </span>
          </div>
        </div>
      </article>

      <main class="main">
        <div class="end-title">
          <div class="title-text2">
            <p>믿을 수 있는</p>
            <p>판다마켓 중고거래</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
