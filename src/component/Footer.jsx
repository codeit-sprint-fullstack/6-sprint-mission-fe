import styles from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.foot}>
          <div className={styles.shadowFoot}>
            <p className={styles.codeit1}>@codeit - 2024</p>
            <span className={styles.footerSpace}>
              <a href="/privacy"> Privacy Policy </a>
              <a href="/faq">FAQ </a>
            </span>
            <span className={styles.icon}>
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

          <div className={styles.shadowFoot}>
            <p className={styles.codeit2}>@codeit - 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
