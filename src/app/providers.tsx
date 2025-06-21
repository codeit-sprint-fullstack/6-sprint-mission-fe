"use client";

import AuthProvider from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGaurd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouteGuard>{children}</RouteGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default Providers;
