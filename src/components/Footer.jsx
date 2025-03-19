import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterBox>
      <FooterFrame>
        <FooterLeft>@codeit - 2024</FooterLeft>
        <FooterMid>
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </FooterMid>
        <FooterRight>
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
            alt="insta"
          />
        </FooterRight>
      </FooterFrame>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  height: 160px;
  margin-top: 140px;
  background: #111827;
`;

const FooterFrame = styled.div`
  max-width: 1520px;
  margin: 0 auto;
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

const FooterLeft = styled.p`
  color: #9ca3af;
`;

const FooterMid = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: #e5e7eb;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export default Footer;
