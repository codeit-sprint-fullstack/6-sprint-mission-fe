"use client"; // ✅ 클라이언트 컴포넌트로 전환

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // 로그인/회원가입 경로에서는 헤더, 푸터 제거
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            {!isAuthPage && <Header />}
            <main className="flex-grow">{children}</main>
            {!isAuthPage && <Footer />}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
