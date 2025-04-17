import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fontsource/pretendard/css/pretendard.min.css"
        />
      </Head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow ">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
