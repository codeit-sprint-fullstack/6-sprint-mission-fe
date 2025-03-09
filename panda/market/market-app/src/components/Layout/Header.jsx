import React from "react";
import Logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="logo-container">
      <img src={Logo} alt="판다마켓 로고" className="logo" />
    </div>
    <nav>
      <div className="navList">
        <a href="/">자유게시판</a>
        <a href="/">중고마켓</a>
      </div>
    </nav>
  </header>
);

export default Header;
