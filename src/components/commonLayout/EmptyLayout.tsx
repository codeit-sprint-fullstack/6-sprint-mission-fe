"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface EmptyLayoutProps {
  children: React.ReactNode;
}

function EmptyLayout({ children }: EmptyLayoutProps) {
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
