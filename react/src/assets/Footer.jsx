import facebook from "../img/icFacebook.png";
import twitter from "../img/icTwitter.png";
import youtube from "../img/icYoutube.png";
import instagram from "../img/icInstagram.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footerAll">
          <a className="taxt">@codeit - 2024</a>
          <div className="textAll">
            <a className="text" href="/">
              Privacy Policy
            </a>
            <a className="text" href="/">
              FAQ
            </a>
          </div>
          <div>
            <a href="/">
              <img src={facebook} alt="Facebook Icon"></img>
            </a>
            <a href="/">
              <img src={twitter} alt="Twitter Icon"></img>
            </a>
            <a href="/">
              <img src={youtube} alt="Youtube Icon"></img>
            </a>
            <a href="/">
              <img src={instagram} alt="Instagram Icon" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
