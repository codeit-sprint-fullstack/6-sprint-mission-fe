import facebook from "../../sprint/img/ic_facebook.png";
import twitter from "../../sprint/img/ic_twitter.png";
import youtube from "../../sprint/img/ic_youtube.png";
import instagram from "../../sprint/img/ic_instagram.png";
import "./style/page.css";

export const PageFooter = () => {
  return (
    <div>
      <footer className="foot">
        <div className="foot_letter">@codeit - 2024</div>
        <div className="foot_letter privacy_faq">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className="foot_letter icon">
          <a href="https://facebook.com/" target="_blank">
            <img src={facebook} />
          </a>
          <a href="https://X.com/" target="_blank">
            <img src={twitter} />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <img src={youtube} />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img src={instagram} />
          </a>
        </div>
      </footer>
    </div>
  );
};
