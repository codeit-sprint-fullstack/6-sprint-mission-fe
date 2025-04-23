"use client";

export default function LoadMoreButton({ onClick, isLoading, hasNext }) {
  if (!hasNext) return null;

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`px-6 py-2 rounded-xl shadow-sm font-semibold cursor-pointer text-white bg-primary transition hover:bg-primary-200
          ${isLoading ? "bg-primary-200 cursor-not-allowed text-white" : ""}`}
      >
        {isLoading ? "불러오는 중..." : "더보기"}
      </button>
    </div>
  );
}
