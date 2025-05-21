"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useRedirectIfAuthenticated(redirectPath = "/items") {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace(redirectPath);
    }
  }, [router, redirectPath]);
}
