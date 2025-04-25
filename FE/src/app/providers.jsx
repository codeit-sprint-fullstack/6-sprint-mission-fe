"use client";

import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
