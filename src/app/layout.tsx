"use client";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import Providers from "./providers";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const hideLayoutPage = ["/login", "/signin"];
  const isHide = hideLayoutPage.includes(pathname);
  return (
    <html lang="en">
      <body className="flex flex-col items-center">
        <Providers>
          {!isHide && <Header />}
          <main className="flex-grow max-w-300 w-full">{children}</main>
          {!isHide && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
