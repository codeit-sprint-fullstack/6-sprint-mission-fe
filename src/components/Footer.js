import "./Footer.css";
import youtube from "../asset/image/ic_youtube.png";
import twitter from "../asset/image/ic_twitter.png";
import instagram from "../asset/image/ic_instagram.png";
import facebook from "../asset/image/ic_facebook.png";
export const Footer = () => {
  return (
    <div class="footer">
      <div class="footer-img">
        <div>
          <p id="info">@codeit - 2024</p>
        </div>
        <div class="text-link">
          <a class="link" href="privacy.html">
            Privacy Policy
          </a>
          <a class="link" href="faq.html">
            FAQ
          </a>
        </div>
        <div id="icon">
          <a href="https://www.facebook.com/" target="_blank">
            <img src={facebook} />
          </a>
          <a href="https://x.com/" target="_blank">
            <img src={twitter} />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <img src={youtube} />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img src={instagram} />
          </a>
        </div>
      </div>
    </div>
  );
};
