"use client";

import AuthProvider from "./providers/AuthProvider";
import ClientLayoutWrapper from "./providers/ClientLayoutWrapper";
import ModalProvider from "./providers/ModalProvider";
import QueryProvider from "./providers/QueryProvider";

export default function Providers({ children }) {
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
