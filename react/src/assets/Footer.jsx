import facebook from "../img/icFacebook.png";
import twitter from "../img/icTwitter.png";
import youtube from "../img/icYoutube.png";
import instagram from "../img/icInstagram.png";
import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <footer>
        <a className="taxt">@codeit - 2024</a>
        <a className="taxt" href="/">
          Privacy Policy
        </a>
        <a className="taxt" href="/">
          FAQ
        </a>
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
      </footer>
    </>
  );
};
