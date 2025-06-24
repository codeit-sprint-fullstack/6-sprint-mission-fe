import { ReactNode } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import RouteGuard from "@/providers/RouteGuard";
import ThemeProvider from "@/providers/ThemeProvider";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <RouteGuard>{children}</RouteGuard>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
