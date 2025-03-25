import styles from "./Footer.module.css";
import facebook from "../../assets/images/social/facebook.svg";
import twitter from "../../assets/images/social/twitter.svg";
import youtube from "../../assets/images/social/youtube.svg";
import instagram from "../../assets/images/social/instagram.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className={styles.footerInfo}>©codeit - 2024</div>
      <div className={styles.footerLink}>
        <Link to="privacy" id="link">
          <p>Privacy Policy</p>
        </Link>
        <Link to="faq" id="link">
          <p>FAQ</p>
        </Link>
      </div>
      <div className={styles.footerSocial}>
        <a href="https://facebook.com" target="_blank">
          <img src={facebook} alt="페이스북" />
        </a>
        <a href="https://x.com" target="_blank">
          <img src={twitter} alt="트위터" />
        </a>
        <a href="https://youtube.com" target="_blank">
          <img src={youtube} alt="유튜브" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src={instagram} alt="인스타그램" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
