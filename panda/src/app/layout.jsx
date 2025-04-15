import React from "react";
import "./globals.css";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

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
