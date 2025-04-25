"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function MyPage() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="w-full cursor-pointer rounded-lg bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
        onClick={logout}
      >
        로그아웃
      </button>
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
