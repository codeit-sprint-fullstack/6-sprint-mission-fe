"use client";

import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface IHeaderFooterLayoutProps {
  children: ReactNode;
}

export default function HeaderFooterLayout({
  children,
}: IHeaderFooterLayoutProps) {
  const path = usePathname();

  return (
    <>
      {path.startsWith("/auth") ? (
        children
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
