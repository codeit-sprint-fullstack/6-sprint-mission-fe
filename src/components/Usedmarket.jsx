import React from "react";
import ProductList from "./ProductList";
import BestProductList from "./BestProductList";
import "../styles/item.css";
import logo from "../img/Group 19.png";
import facebook from "../img/ic_facebook.png";
import twitter from "../img/ic_twitter.png";
import youtube from "../img/Group.png";
import instagram from "../img/Vector.png";

const Usedmarket = () => {
  return (
    <div>
      <header>
        <div className="Header-main">
          <a className="logo" href="/">
            <img className="logoimg" src={logo} alt="logo" />
          </a>
          <div className="Header-links">
            <a href="/">
              <p>자유게시판</p>
            </a>
            <a href="/">
              <p>중고마켓</p>
            </a>
          </div>
        </div>
        <a href="Login.html">
          <button id="login">로그인</button>
        </a>
      </header>

      <main>
        <BestProductList />

        <ProductList />
      </main>

      <footer>
        <div className="Footer">
          <div className="Footer-content">
            <q className="Gray">@codeit - 2024</q>
            <div className="Footer-main">
              <a className="White" href="privacy.html">
                Privacy Policy
              </a>
              <a className="White" href="faq.html">
                FAQ
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
                <img src={facebook} />
              </a>
              <a href="https://x.com/?lang=ko" target="_blank">
                <img src={twitter} />
              </a>
              <a href="https://www.youtube.com/" target="_blank">
                <img src={youtube} />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <img src={instagram} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Usedmarket;
