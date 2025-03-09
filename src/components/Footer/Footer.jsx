import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bar">
        <div className="codeit">©codeit - 2025</div>
        <div className="footer-link">
          <a href="/panda/privacy/privacy.html">Privacy Policy</a>
          <a href="/panda/faq/faq.html">FAQ</a>
        </div>
        <div className="footer-icon">
          <a target="_black" href="https://www.facebook.com">
            <img src="/src/assets/image/ic_facebook.svg" />
          </a>
          <a target="_black" href="https://www.x.com">
            <img src="/src/assets/image/ic_twitter.svg" />
          </a>
          <a target="_black" href="https://www.youtube.com">
            <img src="/src/assets/image/ic_youtube.svg" />
          </a>
          <a target="_black" href="https://www.instagram.com">
            <img src="/src/assets/image/ic_instagram.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
};
