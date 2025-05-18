import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ModalProvider } from "@/components/ui/AlertModal";
import { ConfirmModalProvider } from "@/components/ui/ConfirmModal";
import ClientOnly from "@/components/ClientOnly";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <ClientOnly>
          <AuthProvider>
            <ConfirmModalProvider>
              <ModalProvider>
                <QueryProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </QueryProvider>
              </ModalProvider>
            </ConfirmModalProvider>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
