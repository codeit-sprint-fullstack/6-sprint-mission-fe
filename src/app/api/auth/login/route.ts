import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 1) 백엔드 로그인
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return new NextResponse("로그인 실패", { status: res.status });
  }

  const { accessToken, refreshToken } = await res.json();

  // 2) 응답 객체 생성
  const response = NextResponse.json({ accessToken });

  // 3) **Response** 쿠키에 set
  response.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 로컬(http)에서는 false
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 15,
  });

  return response;
}
