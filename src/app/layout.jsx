"use client";

import { usePathname } from "next/navigation";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

// ✅ Noto Sans KR 폰트 설정
const notoSans = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin", "korean"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} flex min-h-screen flex-col antialiased`}
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
