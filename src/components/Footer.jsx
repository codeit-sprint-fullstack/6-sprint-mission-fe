import React from "react";
import { Link } from "react-router-dom";
import '../styles/global.css'
import './Footer.css'

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
          <img src="/images/social/facebook-logo.svg" alt="Facebook" />
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/social/twitter-logo.svg" alt="Twitter" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/social/youtube-logo.svg" alt="YouTube" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/social/instagram-logo.svg" alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
