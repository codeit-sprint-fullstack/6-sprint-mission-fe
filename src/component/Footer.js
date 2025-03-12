import logo from "../assets/grayLogo.svg";
import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";
import styles from "./Footer.module.css";
import Container from "./Container";

function Footer() {
  return (
    <div>
      <footer class="footer">
        <div class="foot" style="color: #9ca3af">
          <div class="shadow-foot">
            <p class="codeit1">@codeit - 2024</p>
            <span class="footer-space">
              <a target href="/privacy">
                {" "}
                Privacy Policy{" "}
              </a>
              <a target href="/faq">
                FAQ{" "}
              </a>
            </span>
            <span class="icon">
              <a href="https://ko-kr.facebook.com/">
                <img src="/main-page/Group.png" />
              </a>
              <a href="https://x.com/?mx=2">
                <img src="/main-page/ic_twitter.png" />
              </a>
              <a href="https://www.youtube.com/">
                <img src="/main-page/ic_youtube.png" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="/main-page/ic_instagram.png" />
              </a>
            </span>
          </div>

          <div class="shadow-foot">
            <p class="codeit2">@codeit - 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
