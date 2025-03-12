import facebook from "/ic_facebook.png";
import instagram from "/ic_instagram.png";
import twitter from "/ic_twitter.png";
import youtube from "/ic_youtube.png";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
        <p className="footer-p1">©codeit - 2024</p>
        <div className="footer-info">
          <p className="footer-p2">Privacy Policy</p>
          <p className="footer-p2">FAQ</p>
        </div>
        <div className="footer-sns">
          <a href="https://www.facebook.com/">
            <img className="footer-sns-img" src={facebook} />
          </a>
          <a href="https://www.instagram.com/">
            <img className="footer-sns-img" src={instagram} />
          </a>
          <a href="https://twitter.com/">
            <img className="footer-sns-img" src={twitter} />
          </a>
          <a href="https://www.youtube.com/">
            <img className="footer-sns-img" src={youtube} />
          </a>
        </div>

    </footer>
  );
};
