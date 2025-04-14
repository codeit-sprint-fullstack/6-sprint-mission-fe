import React from "react";
import styles from "./Footer.module.css";
import facebook from "../../assets/image/footer/Group.png";
import youtube from "../../assets/image/footer/ic_youtube.png";
import instagram from "../../assets/image/footer/ic_instagram.png";
import twitter from "../../assets/image/footer/ic_twitter.png";

function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.foot}>
          <div className={styles.shadowFoot}>
            <p className={styles.codeit1}>@codeit - 2024</p>
            <span className={styles.footerSpace}>
              <a to="/privacy"> Privacy Policy </a>
              <a to="/faq">FAQ </a>
            </span>
            <span className={styles.icon}>
              <a href="https://ko-kr.facebook.com/">
                <img src={facebook} />
              </a>
              <a href="https://x.com/?mx=2">
                <img src={twitter} />
              </a>
              <a href="https://www.youtube.com/">
                <img src={youtube} />
              </a>
              <a href="https://www.instagram.com/">
                <img src={instagram} />
              </a>
            </span>
          </div>

          <div className={styles.shadowFoot}>
            <p className={styles.codeit2}>@codeit - 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
