import React from "react";
import "./header.css";

const LOGO = "../images/logo2.png";
const SMALL_LOGO = "../images/Typo.png";
const LOGIN_ICON = "../images/login.png";

export const Header = () => {
  return (
    <header id="header">
      <nav id="nav">
        {/* 로고 */}
        <div className="nav-container">
          <a href="index.html" target="_blank">
            <picture>
              <source srcSet={LOGO} media="(min-width: 744px)" />
              <source srcSet={SMALL_LOGO} media="(min-width: 375px)" />
              <img src={LOGO} alt="로고" />
            </picture>
          </a>
          {/* 메뉴 */}
          <ul className="nav-menu">
            <li>
              <a className="nav-text" href="pages/community.html">
                자유게시판
              </a>
            </li>
            <li>
              <a className="nav-text" href="index.html">
                중고마켓
              </a>
            </li>
          </ul>
        </div>
        {/* 로그인 버튼 */}
        <a className="desktop-login" href="../../../pages/login.html">
          로그인
        </a>
        <a className="mobile-login" href="../../../pages/login.html">
          <img src={LOGIN_ICON} alt="로그인" />
        </a>
      </nav>
    </header>
  );
};
