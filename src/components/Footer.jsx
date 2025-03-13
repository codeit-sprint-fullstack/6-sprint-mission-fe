import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footerBox">
      <div className="footerFrame">
        <p className="footerLeft">@codeit - 2024</p>
        <div className="footerMid">
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>
        <div className="footerRight">
          <img
            src="https://67a1772da019bb307bce76e3--relaxed-puppy-88a9cf.netlify.app/imges/ic_facebook.png"
            alt="facebook"
          />
          <img
            src="https://67a1772da019bb307bce76e3--relaxed-puppy-88a9cf.netlify.app/imges/ic_twitter.png"
            alt="twitter"
          />
          <img
            src="https://67a1772da019bb307bce76e3--relaxed-puppy-88a9cf.netlify.app/imges/ic_youtube.png"
            alt="youtube"
          />
          <img
            src="https://67a1772da019bb307bce76e3--relaxed-puppy-88a9cf.netlify.app/imges/ic_instagram.png"
            alt="instagrame"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
