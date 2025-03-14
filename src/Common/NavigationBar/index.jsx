import "./index.css";
import favicon from "../../assets/favicon.png";

const NavigationBar = () => {
  return (
    <header className="navigationBar">
      <div className="leftNav">
        <a className="goHomeButton" href="/">
          <img src={favicon} alt="Panda Market Logo" />
          <div>판다마켓</div>
        </a>
        <div className="subNav">
          <p className="freeBoard">자유게시판</p>
          <p className="fleaMarket">중고마켓</p>
        </div>
      </div>
      <button
        className="loginButton"
        onClick={() => (window.location.href = "/login")}
      >
        로그인
      </button>
    </header>
  );
};

export default NavigationBar;
