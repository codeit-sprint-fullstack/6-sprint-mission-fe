import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../global.css";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Link to="/" aria-label="홈으로 이동">
          <img src="/images/logo/logo.svg" alt="판다마켓 로고" width="153" />
        </Link>
        <Link to="/login" className="link-button">
          로그인
        </Link>{" "}
        {/* 수정된 부분 */}
      </header>

      <main className="with-header">{children}</main>

      <footer>
        <div id="copyright">©codeit - 2024</div>
        <div id="footerMenu">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div id="socialMedia">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 페이스북"
          >
            <img
              src="/images/social/facebook-logo.svg"
              alt="페이스북"
              width="20"
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 트위터"
          >
            <img
              src="/images/social/twitter-logo.svg"
              alt="트위터"
              width="20"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 유튜브"
          >
            <img
              src="/images/social/youtube-logo.svg"
              alt="유튜브"
              width="20"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 인스타그램"
          >
            <img
              src="/images/social/instagram-logo.svg"
              alt="인스타그램"
              width="20"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
