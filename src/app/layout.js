import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import Providers from "./providers";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata = {
  title: "판다마켓",
  description: "일상에서 모든 물건을 거래해보세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>
          <Header />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
