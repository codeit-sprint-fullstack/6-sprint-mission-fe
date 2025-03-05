import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <footer id="footer">
      <span className="footer-info">@codeit - 2024</span>
      <span className="footer-info-link">
        <a className="privacy-policy" href="pages/privacy.html" target="_blank">
          Privacy Policy
        </a>
        <a className="faq" href="pages/faq.html" target="_blank">
          FAQ
        </a>
      </span>
      <span className="footer-info-images">
        <a href="https://www.facebook.com/" target="_blank">
          <img src="/images/ic_facebook.png" />
        </a>
        <a href="https://x.com/" target="_blank">
          <img src="/images/ic_twitter.png" />
        </a>
        <a href="https://www.youtube.com/" target="_blank">
          <img src="/images/ic_youtube.png" />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <img src="/images/ic_instagram.png" />
        </a>
      </span>
    </footer>
  );
};
