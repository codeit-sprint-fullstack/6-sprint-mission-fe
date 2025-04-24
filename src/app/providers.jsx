import { AuthProvider } from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGuard";
import React from "react";

function Providers({ children }) {
  return (
    <AuthProvider>
      <RouteGuard>{children}</RouteGuard>
    </AuthProvider>
  );
}

export default Providers;
