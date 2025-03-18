import React from "react";
import { Link } from "react-router-dom"; // Link 추가
import Logo from "../../assets/images/logo/logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="globalHeader">
      <div className="headerLeft">
        {/* Link를 사용하여 클릭 시 홈으로 이동 */}
        <Link to="/">
          <img
            src={Logo}
            alt="판다마켓 로고"
            width="153"
            className="headerLogo"
          />
        </Link>

        <nav>
          <ul>
            <li>자유게시판</li>
            <li>
              <Link to="/market">중고마켓</Link>{" "}
              {/* '중고마켓' 페이지로 이동 */}
            </li>
          </ul>
        </nav>
      </div>
      {/* 로그인 버튼을 Link로 변경하여 클릭 시 LoginPage로 이동 */}
      <Link to="/login" className="loginLink button">
        로그인
      </Link>
    </header>
  );
}

export default Header;
