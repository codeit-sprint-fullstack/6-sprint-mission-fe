import AuthProvider from "../contexts/AuthContext";
import QueryProvider from "@/providers/QueryProvider";
import RouteGuard from "@/providers/RouteGuard";
import React, { ReactNode } from "react";

interface IProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: IProviderProps) {
  return (
    <AuthProvider>
      <QueryProvider>
        <RouteGuard>{children}</RouteGuard>
      </QueryProvider>
    </AuthProvider>
  );
}
