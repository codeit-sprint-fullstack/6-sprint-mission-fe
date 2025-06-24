import { NextResponse } from "next/server";

export async function POST() {
  // 1) 백엔드 로그아웃
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // 2) 응답 객체 생성
  const response = NextResponse.json({ message: "로그아웃 성공" });

  // 3) **Response** 쿠키에 만료시키기
  response.cookies.set({
    name: "refreshToken",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 로컬(http)에서는 false
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
