import "./index.css";
import favicon from "../../assets/favicon.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="navigationBar">
        <div className="leftNav">
          <Link className="goHomeButton" to="/">
            <img src={favicon} alt="Panda Market Logo" />
            <div>판다마켓</div>
          </Link>
          <div className="subNav">
            <Link className="freeBoard" to="/community">
              자유게시판
            </Link>
            <Link className="fleaMarket" to="/items">
              중고마켓
            </Link>
          </div>
        </div>
        <Link className="loginButton" to="/login">
          로그인
        </Link>
      </header>
      <div className="withHeader" />
    </>
  );
};

export default Header;
