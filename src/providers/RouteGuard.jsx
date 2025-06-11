"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const onlyUserRoute = ["/products", "/community"];

const publicRoute = ["/auth"];

export default function RouteGuard({ children }) {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const isOnlyUserRoute = onlyUserRoute.some((route) =>
      path.startsWith(route)
    );

    const isPublicRoute = publicRoute.some((route) => path.startsWith(route));

    if (isOnlyUserRoute && !accessToken) {
      router.push("/auth/login");
    } else if (isPublicRoute && accessToken) {
      router.push("/products");
    }
  }, [path]);

  return children;
}
