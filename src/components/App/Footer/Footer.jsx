import { Link } from "react-router";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerBar}>
        <div className={style.codeit}>©codeit - 2025</div>
        <div className={style.footerLink}>
          <Link to="privacy">Privacy Policy</Link>
          <Link to="faq">FAQ</Link>
        </div>
        <div className={style.footerIcon}>
          <a target="_black" href="https://www.facebook.com">
            <img src="/assets/image/app/footer/ic_facebook.svg" />
          </a>
          <a target="_black" href="https://www.x.com">
            <img src="/assets/image/app/footer/ic_twitter.svg" />
          </a>
          <a target="_black" href="https://www.youtube.com">
            <img src="/assets/image/app/footer/ic_youtube.svg" />
          </a>
          <a target="_black" href="https://www.instagram.com">
            <img src="/assets/image/app/footer/ic_instagram.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
