import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import RouteGuard from "@/providers/RouteGuard";
import React from "react";

function Providers({ children }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <RouteGuard>{children}</RouteGuard>
      </QueryProvider>
    </AuthProvider>
  );
}

export default Providers;
