import Header from "@/components/common/Header";
import "./globals.css";
import Footer from "@/components/common/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
