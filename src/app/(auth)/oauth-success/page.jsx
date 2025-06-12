"use client";

import { useEffect } from "react";

function OAuthSuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return null;
}

export default OAuthSuccessPage;
