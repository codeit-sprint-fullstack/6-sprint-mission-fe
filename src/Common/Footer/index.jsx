import "./index.css";
import ic_facebook from "../../assets/images/icons/ic_facebook.png";
import ic_twitter from "../../assets/images/icons/ic_twitter.png";
import ic_youtube from "../../assets/images/icons/ic_youtube.png";
import ic_instagram from "../../assets/images/icons/ic_instagram.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="wrapper">
      <footer>
        <div className="codeitItem">ⓒcodeit - 2025</div>
        <div className="footerCenterItem">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="footerSnsItem">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ic_facebook} alt="Facebook" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ic_twitter} alt="Twitter" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ic_youtube} alt="YouTube" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ic_instagram} alt="Instagram" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
