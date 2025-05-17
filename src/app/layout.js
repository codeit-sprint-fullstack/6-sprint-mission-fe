import "./globals.css";
import Header from "@/components/layout/Header";
import { pretendard, rokaf } from "./fonts";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "판다마켓",
  description: "This website is created with Next.js",
  icons: {
    icon: "/logo/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} ${rokaf.variable}`}>
        <Header />
        <main className="flex justify-center mx-auto font-pretendard">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
