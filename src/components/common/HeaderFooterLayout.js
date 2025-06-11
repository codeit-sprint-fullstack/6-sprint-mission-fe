"use client";

import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderFooterLayout({ children }) {
  const path = usePathname();

  return (
    <>
      {path.startsWith("/auth") ? (
        children
      ) : (
        <>
          <Header className="font-pretendard" />
          {children}
          <Footer className="font-pretendard" />
        </>
      )}
    </>
  );
}
