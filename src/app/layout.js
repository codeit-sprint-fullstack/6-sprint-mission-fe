"use client";

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = ["/auth/login", "/auth/signup"].includes(pathname);

  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900">
        {!isAuthPage && <Header />}
        <main className="min-h-screen">{children}</main>
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
