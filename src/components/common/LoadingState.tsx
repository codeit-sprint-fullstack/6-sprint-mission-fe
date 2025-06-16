"use client";

export default function LoadingState({
  loading,
  error,
  isEmpty,
  emptyMessage = "등록된 게시글이 없습니다.",
  loadingMessage = "게시글을 불러오는 중...",
  errorMessage = "게시글을 불러오는 데 실패했습니다.",
}: {
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
}) {
  // 로딩 상태 표시
  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-gray-500">{loadingMessage}</p>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  // 데이터 없음 상태 표시
  if (isEmpty) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  // 다른 상태에서는 아무것도 렌더링하지 않음
  return null;
}
