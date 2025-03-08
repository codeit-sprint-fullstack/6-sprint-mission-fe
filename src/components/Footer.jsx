import React from "react";
import { Link } from "react-router-dom";
import facebookLogo from "../assets/social/facebook-logo.svg";
import twitterLogo from "../assets/social/twitter-logo.svg";
import youtubeLogo from "../assets/social/youtube-logo.svg";
import instagramLogo from "../assets/social/instagram-logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-left">@codeit - 2025</div>
      <div className="footer-center">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div className="footer-right">
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src={facebookLogo} alt="Facebook" />
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src={twitterLogo} alt="Twitter" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src={youtubeLogo} alt="YouTube" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src={instagramLogo} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;