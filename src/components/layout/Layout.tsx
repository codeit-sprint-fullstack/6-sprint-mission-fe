import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageContainer from "./PageContainer";
import { ChildrenProps } from "@/types";

export function HomeLayout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function UserLayout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </>
  );
}
