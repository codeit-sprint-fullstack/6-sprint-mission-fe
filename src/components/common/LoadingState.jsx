"use client";

/**
 * 로딩, 에러, 빈 상태를 표시하는 재사용 가능한 컴포넌트
 * @param {boolean} loading - 로딩 중 여부
 * @param {object} error - 에러 객체 (존재하면 에러 상태)
 * @param {boolean} isEmpty - 데이터가 비어있는지 여부
 * @param {string} emptyMessage - 데이터가 없을 때 표시할 메시지
 * @param {string} loadingMessage - 로딩 중일 때 표시할 메시지
 * @param {string} errorMessage - 에러 발생 시 표시할 메시지
 */
export default function LoadingState({
  loading,
  error,
  isEmpty,
  emptyMessage = "등록된 게시글이 없습니다.",
  loadingMessage = "게시글을 불러오는 중...",
  errorMessage = "게시글을 불러오는 데 실패했습니다.",
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
