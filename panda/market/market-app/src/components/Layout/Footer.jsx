import React from "react";
import facebookIcon from "../../assets/ic_facebook.png";
import twitterIcon from "../../assets/ic_twitter.png";
import youtubeIcon from "../../assets/ic_youtube.png";
import instagramIcon from "../../assets/ic_instagram.png";
import "./Footer.css";

console.log("instagramIcon:", instagramIcon);

const Footer = () => (
  <footer className="footer">
    <p>@codeeit-2024</p>

    <div className="footer_link">
      <a href="/privacy">Privacy Policy</a>
      <a href="/faq">FAQ</a>
    </div>

    <div className="footer_icon">
      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <img src={facebookIcon} alt="페이스북 아이콘" className="footer-icon" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <img src={twitterIcon} alt="트위터 아이콘" className="footer-icon" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noreferrer">
        <img src={youtubeIcon} alt="유튜브 아이콘" className="footer-icon" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <img
          src={instagramIcon}
          alt="인스타그램 아이콘"
          className="footer-icon"
        />
      </a>
    </div>
  </footer>
);

export default Footer;
