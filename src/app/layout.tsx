import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import AuthProvider from "../provider/AuthProvider";
import { ReactNode } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Panda Market",
  description: "판다마켓에 어서오세요",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children } : RootLayoutProps ) {
  return (
    <html lang="ko">
      <body
        className=
        {`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <AuthProvider>
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
