import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Main } from "./components/Main.jsx";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Main />
    <Footer />
  </React.StrictMode>
);
