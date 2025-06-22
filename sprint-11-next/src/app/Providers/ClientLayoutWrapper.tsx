"use client"; // 👈 클라이언트 컴포넌트로 명시

import { usePathname } from "next/navigation";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { ReactNode } from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const noLayoutPages = ["/pages/login", "/pages/login/register"]; // 원하는 경로 목록
  const hideLayout = noLayoutPages.includes(pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
