"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

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
