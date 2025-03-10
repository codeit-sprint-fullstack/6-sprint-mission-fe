import "../main-page/mainPage-style.css";

import miniPandeFace from "../main-page/작은 판다 얼굴.png";
import PandeMarket from "../main-page/판다마켓.png";
import ImgHome01 from "../main-page/Img_home_01.png";
import ImgHome02 from "../main-page/Img_home_02.png";
import ImgHome03 from "../main-page/Img_home_03.png";
import Group from "../main-page/Group.png";
import twitter from "../main-page/ic_twitter.png";
import youtube from "../main-page/ic_youtube.png";
import instagram from "../main-page/ic_instagram.png";

function App() {
  return (
    <div>
      <div className="main-body">
        <header className="header">
          <div className="header-container">
            <a className="image" href="/">
              <img className="face-img" src={miniPandeFace} />
              <img className="header-text" src={PandeMarket} />
            </a>

            <a href="/login/loginindex.html">
              <button className="header-login">로그인</button>
            </a>
          </div>
        </header>

        <main className="main">
          <div className="title">
            <div className="title-text">
              <p>일상의 모든 물건을</p> <p> 거래해 보세요</p>
            </div>

            <button className="title-button">
              <a>구경하러 가기</a>
            </button>
          </div>
        </main>

        <article>
          <div className="article-main">
            <div className="main-content1">
              <p>
                <img className="image-container1" src={ImgHome01} />
              </p>

              <span className="text-container1">
                <p className="subtitle1">Hot item</p>
                <p className="main-text1">인기 상품을 확인해보세요</p>
                <p className="description1">
                  가장 HOT한 중고거래 물품을 <br /> 판다 마켓에서 확인해보세요
                </p>
              </span>
            </div>

            <div className="main-content2">
              <span className="text-container2">
                <p className="subtitle2">Search</p>
                <p className="main-text2">구매를 원하는 상품을 검색하세요</p>
                <p className="description2">
                  구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
                </p>
              </span>

              <span>
                <img className="image-container2" src={ImgHome02} />
              </span>
            </div>

            <div className="main-content3">
              <p>
                <img className="image-container3" src={ImgHome03} />
              </p>

              <span className="text-container3">
                <p className="subtitle3">register</p>
                <p className="main-text3">판매를 원하는 상품을 등록하세요</p>
                <p className="description3">
                  어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
                </p>
              </span>
            </div>
          </div>
        </article>

        <main className="main">
          <div className="end-title">
            <div className="title-text2">
              <p> 믿을 수 있는 </p> <p>판다마켓 중고거래</p>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="foot">
            <div className="shadow-foot">
              <p className="codeit1">@codeit - 2024</p>
              <span className="footer-space">
                <a>Privacy Policy</a>
                <a>FAQ</a>
              </span>
              <span className="icon">
                <a href="https://ko-kr.facebook.com/">
                  <img src={Group} />
                </a>
                <a href="https://x.com/?mx=2">
                  <img src={twitter} />
                </a>
                <a href="https://www.youtube.com/">
                  <img src={youtube} />
                </a>
                <a href="https://www.instagram.com/">
                  <img src={instagram} />
                </a>
              </span>
            </div>

            <div className="shadow-foot">
              <p className="codeit2">@codeit - 2024</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
