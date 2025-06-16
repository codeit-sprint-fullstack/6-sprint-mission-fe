// app/api/auth/login/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return new NextResponse("Refresh token not found", { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${refreshToken}`,
      },
    }
  );

  if (!res.ok) {
    return new NextResponse("토큰 재발급 실패", { status: res.status });
  }

  const { accessToken } = await res.json();

  // 2) 응답 객체 생성
  const response = NextResponse.json({ accessToken });

  // 3) refreshToken 쿠키 저장
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 로컬(http)에서는 false
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 10,
  });

  return response;
}
