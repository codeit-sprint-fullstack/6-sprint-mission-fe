import AuthProvider from "@/providers/AuthProvider";

export default function Providers({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}
