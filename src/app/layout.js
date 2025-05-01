import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { Suspense } from "react";
import Loading from "./loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

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
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <Providers>{children}</Providers>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
