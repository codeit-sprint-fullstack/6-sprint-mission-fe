import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.svg";

const Header = () => {
  return (
    <header>
      <div className="nav">
        <Link to="/" className="homepage-logo-link">
          <img className="homepage-logo" src={logo} alt="판다마켓 로고" />
        </Link>
        <Link className="homepage-login" to="/login">로그인</Link>
      </div>
    </header>
  );
};

export default Header;