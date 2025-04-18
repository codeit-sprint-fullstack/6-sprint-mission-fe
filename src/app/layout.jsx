import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Panda Market",
  description: "Welcome to Panda Market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
