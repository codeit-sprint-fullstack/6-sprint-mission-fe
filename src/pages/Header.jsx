import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <NavLink to="/">
        {" "}
        {/* 랜딩 페이지로 이동 */}
        <img
          src="images/logo/panda-market-logo.png"
          alt="판다마켓 홈"
          width="153"
        />
      </NavLink>
      <a className="freeboard" href="">
        자유게시판
      </a>
      <NavLink
        to="/items"
        className={({ isActive }) =>
          isActive ? "secondmarket active" : "secondmarket"
        }
      >
        중고마켓
      </NavLink>
      <a href="login.html" className="button loginLinkButton">
        로그인
      </a>
    </header>
  );
};

export default Header;
