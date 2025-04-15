import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer h-[160px]">
      <div className="footer-container h-[100%] flex justify-between">
        <span className="text-[var(--light-gray)]">@codeit - 2024</span>
        <div className="flex gap-10">
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </div>
        <div className="flex gap-2.5">
          <img
            src="/assets/ic_facebook.svg"
            alt="facebook logo"
            className="inline-block w-[18px] h-[18px]"
          />
          <img
            src="/assets/ic_twitter.svg"
            alt="twitter logo"
            className="inline-block w-[18px] h-[18px]"
          />
          <img
            src="/assets/ic_youtube.svg"
            alt="youtube logo"
            className="inline-block w-[18px] h-[18px]"
          />
          <img
            src="/assets/ic_instagram.svg"
            alt="instagram logo"
            className="inline-block w-[18px] h-[18px]"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
