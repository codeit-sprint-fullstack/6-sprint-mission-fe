import React from "react";
import "./../globals.css";
import Header from "./../../components/layout/Header";
import Footer from "../../components/layout/Footer";

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default PublicLayout;
