import AuthProvider from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGuard";
import ThemeProvider from "@/providers/ThemeProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouteGuard>{children}</RouteGuard>
      </ThemeProvider>
    </AuthProvider>
  );
}
