"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

function EmptyLayout({ children }) {
  const pathname = usePathname();
  const hideLayoutPage = ["/sign-up", "/login"];

  const shouldHide = hideLayoutPage.includes(pathname);

  return (
    <>
      {!shouldHide && <Header />}
      <main>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}

export default EmptyLayout;
