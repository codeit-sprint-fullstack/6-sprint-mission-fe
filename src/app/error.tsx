"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <h1 className="text-xl font-semibold">Something went wrong!</h1>
      <div className="flex gap-2">
        <button className="btn-base rounded-4xl" onClick={() => reset()}>
          Try again
        </button>
        <button
          className="btn-base rounded-4xl bg-gray-400 hover:bg-gray-500"
          onClick={() => router.push("/")}
        >
          Go home
        </button>
      </div>
    </div>
  );
}
