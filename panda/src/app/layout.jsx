import React from "react";
import "./globals.css";
import Header from "./../components/layout/Header";
import Footer from "../components/layout/Footer";

function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
