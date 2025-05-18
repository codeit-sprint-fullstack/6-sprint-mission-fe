import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          {!isAuthPage && <Header />}
          <main className={`flex-grow ${!isAuthPage && "withHeader"}`}>
            {children}
          </main>
          {!isAuthPage && <Footer />}
        </div>
      </body>
    </html>
  );
}
