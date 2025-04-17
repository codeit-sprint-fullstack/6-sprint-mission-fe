import React from "react";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

const pretendard = localFont({
  src: "../assets/fonts/Pretendard.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
});

const rokafSans = localFont({
  src: "../assets/fonts/Rokaf-Sans.ttf",
  weight: "700",
  variable: "--font-rokafSans",
});

export const metadata = {
  title: "판다마켓",
  description: "일상에서 모든 물건을 거래해보세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${rokafSans.variable} min-h-screen flex flex-col`}
      >
        <Header className="font-pretendard" />
        <main className="flex-1 font-pretendard">{children}</main>
        <Footer className="font-pretendard" />
      </body>
    </html>
  );
}
