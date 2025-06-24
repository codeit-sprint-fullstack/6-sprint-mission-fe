import { ReactNode } from "react";
import RootLayout from "@/components/common/Layout";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <RootLayout>{children}</RootLayout>;
}
