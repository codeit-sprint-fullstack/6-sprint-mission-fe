"use client";
import { ReactNode } from "react";
import QueryProvider from "./Providers/QueryProvider";
import AuthProvider from "./Providers/AuthProvider";
import ModalProvider from "./Providers/ModalProvider";
import ClientLayoutWrapper from "./Providers/ClientLayoutWrapper";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ModalProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ModalProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
