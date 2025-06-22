import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/app/provider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AuthHeader } from "@/components/common/Header";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "판다마켓",
  description:
    "믿을 수 있는 중고거래를 위한 최적의 서비스, 중고거래 플랫폼 - 판다마켓",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased flex justify-center items-center `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export function AuthLayout({ children }: LayoutProps) {
  return (
    <div className={`flex flex-col justify-center items-center h-screen`}>
      <main className="w-85">
        <div className="flex justify-center">
          <AuthHeader />
        </div>
        {children}
      </main>
    </div>
  );
}

export async function MainLayout({ children }: LayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen w-94`}>
      <Header />
      <main className="flex-grow container">{children}</main>
      <Footer />
    </div>
  );
}
