import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/app/providers";
import AuthHeader from "./_components/AuthHeader";

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

export default function AuthLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased flex flex-col justify-center items-center h-screen`}
      >
        <Providers>
          <main className="w-85">
            <div className="flex justify-center">
              <AuthHeader />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
