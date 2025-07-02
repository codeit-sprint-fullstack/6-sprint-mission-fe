import React, { ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import HeaderFooterLayout from "@/components/common/HeaderFooterLayout";
import GeneralLayout from "@/components/common/GeneralLayout";
import Providers from "./Providers";

interface IProviderProps {
  children: ReactNode;
}

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

export default function RootLayout({ children }: IProviderProps) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${rokafSans.variable} min-h-screen flex flex-col`}
      >
        <Providers>
          <HeaderFooterLayout>
            <main className="relative flex-1 font-pretendard">
              <GeneralLayout>{children}</GeneralLayout>
            </main>
          </HeaderFooterLayout>
        </Providers>
      </body>
    </html>
  );
}
