import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Providers from "./providers";
import RouteGuard from "@/providers/RouteGuard";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <RouteGuard>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </RouteGuard>
        </Providers>
      </body>
    </html>
  );
}
