export default function LoadingState({
  loading,
  error,
  isEmpty,
  loadingMessage = "게시글을 불러오는 중...",
  errorMessage = "게시글을 불러오는데 실패했습니다.",
  emptyMessage = "게시글이 존재하지 않습니다.",
  className = "min-h-screen",
}) {
  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-lg">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-lg text-red-500">{errorMessage}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return null;
}
