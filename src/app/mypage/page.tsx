"use client";

import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();

  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Link
        href="/"
        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
        onClick={logout}
      >
        <span>로그아웃</span>
      </Link>

      <button
        className="w-full cursor-pointer rounded-lg bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
        onClick={() => {
          router.push("/mypage/edit");
        }}
      >
        회원정보 수정
      </button>
    </div>
  );
}
