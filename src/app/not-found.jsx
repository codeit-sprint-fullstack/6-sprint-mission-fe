"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6 h-32 w-32 opacity-80">
        <Image
          src="/img/panda_icon_big.png"
          alt="판다 아이콘"
          fill
          className="animate-pulse object-contain"
        />
      </div>

      <h1 className="mb-4 text-4xl font-bold text-gray-800">
        페이지를 찾을 수 없습니다
      </h1>

      <p className="mb-8 text-xl text-gray-600">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
        >
          홈으로 돌아가기
        </Link>
        <button
          onClick={() => window.history.back()}
          className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors duration-300 hover:bg-gray-300"
        >
          이전 페이지로 돌아가기
        </button>
      </div>

      <p className="animate-bounce text-gray-500">
        {countdown}초 후 자동으로 홈페이지로 이동합니다...
      </p>
    </div>
  );
}
