import "./index.css";
import ic_facebook from "../../assets/ic_facebook.png";
import ic_twitter from "../../assets/ic_twitter.png";
import ic_youtube from "../../assets/ic_youtube.png";
import ic_instagram from "../../assets/ic_instagram.png";

const Footer = () => {
  return (
    <footer>
      <div className="codeitItem">ⓒcodeit - 2025</div>
      <div className="footerCenterItem">
        <div onClick={() => (window.location.href = "/privacy")}>
          Privacy Policy
        </div>
        <div onClick={() => (window.location.href = "/faq")}>FAQ</div>
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
  );
};

export default Footer;
