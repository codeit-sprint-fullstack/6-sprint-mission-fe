import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/app/providers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "판다마켓",
  description:
    "믿을 수 있는 중고거래를 위한 최적의 서비스, 중고거래 플랫폼 - 판다마켓",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <Header />
          <main className="flex-grow container">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
