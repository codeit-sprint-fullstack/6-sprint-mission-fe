import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageContainer from "./PageContainer";

export function HomeLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function UserLayout({ children }) {
  return (
    <>
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </>
  );
}
