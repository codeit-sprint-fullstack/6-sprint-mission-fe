import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import RouteGuard from "@/providers/RouteGuard";
import ThemeProvider from "@/providers/ThemeProvider";

export default function Providers({ children }) {
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
