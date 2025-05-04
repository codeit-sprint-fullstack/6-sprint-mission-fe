"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noHeaderFooterPaths = ["/login", "/signup"];

  const isNoHeaderFooter = noHeaderFooterPaths.includes(pathname);

  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          {!isNoHeaderFooter && <Header />}
          <div className="flex-1 w-full">{children}</div>
          {!isNoHeaderFooter && <Footer />}
        </div>
      </body>
    </html>
  );
}
