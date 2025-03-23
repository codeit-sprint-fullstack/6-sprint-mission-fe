import { Link } from "react-router-dom";
import "./index.css";
import si1 from "../../assets/images/section_image 1.png";
import si2 from "../../assets/images/section_image 2.png";
import si3 from "../../assets/images/section_image 3.png";
import bl from "../../assets/images/bottom_logo.png";

export const LandingPage = () => {
  return (
    <>
      <main>
        <div className="descriptionItems">
          <div className="itemsLogoItems">
            <div className="itemsLogoText">
              <div>일상의 모든 물건을</div>
              <div>거래해 보세요</div>
            </div>
            <Link className="fleaMarket" to="/items">
              구경하러가기
            </Link>
          </div>
          <img src="./imgs/top_logo.png" />
        </div>
        <section>
          <img src={si1} />
          <img src={si2} />
          <img src={si3} />
        </section>
        <div className="descriptionPandaMarket">
          <div className="descriptionPandaMarketItems">
            <div className="descriptionPandaMarketText">
              <p>믿을 수 있는</p>
              <p>판다마켓 중고 거래</p>
            </div>
          </div>
          <img src={bl} />
        </div>
      </main>
    </>
  );
};
