import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ChildrenProps } from "@/types";

import React from "react";

function Providers({ children }: ChildrenProps) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}

export default Providers;
