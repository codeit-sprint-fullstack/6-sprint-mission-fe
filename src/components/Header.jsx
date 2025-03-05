import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <div className="headerBox">
        <div className="leftBox">
          <div className="logoBox">
            <a href="/">
              <img
                src="https://67a1772da019bb307bce76e3--relaxed-puppy-88a9cf.netlify.app/imges/Property%201=md.png"
                alt="Logo"
              />
            </a>
          </div>
          <a href="" className="menus">
            자유게시판
          </a>
          <a href="" className="menus">
            중고마켓
          </a>
        </div>
        <div className="rightBox">
          <a href="/member/login.html">로그인</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
