import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <a href="/">
        <img
          src="images/logo/panda-market-logo.png"
          alt="판다마켓 홈"
          width="153"
        />
      </a>
      <a className="freeboard" href="">
        자유게시판
      </a>
      <a className="secondmarket" href="">
        중고마켓
      </a>
      <a href="login.html" id="loginLinkButton" className="button">
        로그인
      </a>
    </header>
  );
};

export default Header;
