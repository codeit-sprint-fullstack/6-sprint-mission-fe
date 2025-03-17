import miniPandeFace from "../assets/img/main-page/작은 판다 얼굴.png";
import PandeMarket from "../assets/img/main-page/판다마켓.png";
import profile from "../assets/img/Frame 2609463.png";

function Nav2() {
  return (
    <div>
      <header className="header">
        <div className="header-container">
          <div className="header-bundle">
            <a className="image" href="/">
              <img className="face-img" src={miniPandeFace} />
              <img className="header-text" src={PandeMarket} />
            </a>
            <div className="in-header-bundle1"> 자유게시판 </div>
            <div className="in-header-bundle2"> 중고마켓 </div>
          </div>

          <a>
            <button className="header-login">로그인</button>
          </a>
          <img className="profile" src={profile} />
        </div>
      </header>
    </div>
  );
}

export default Nav2;
