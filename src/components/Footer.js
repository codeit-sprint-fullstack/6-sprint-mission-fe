import "./Footer.css";
import facebookLogo from "../assets/images/social/facebook-logo.svg";
import twitterLogo from "../assets/images/social/twitter-logo.svg";
import youtubeLogo from "../assets/images/social/youtube-logo.svg";
import instagramLogo from "../assets/images/social/instagram-logo.svg";

function Footer() {
  return (
    <footer>
      <div className="footerInfo">©codeit - 2024</div>
      <div className="footerLink">
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className="footerSocial">
        <a href="https://facebook.com" target="_blank">
          <img src={facebookLogo} alt="페이스북" />
        </a>
        <a href="https://x.com" target="_blank">
          <img src={twitterLogo} alt="트위터" />
        </a>
        <a href="https://youtube.com" target="_blank">
          <img src={youtubeLogo} alt="유튜브" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src={instagramLogo} alt="인스타그램" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
