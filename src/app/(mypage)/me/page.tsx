"use client";

import { useAuth } from "@/providers/AuthProvider";
import React from "react";

function MyPage() {
  const { logout } = useAuth();

  return (
    <button type="button" className="btn-base" onClick={logout}>
      로그아웃
    </button>
  );
}

export default MyPage;
