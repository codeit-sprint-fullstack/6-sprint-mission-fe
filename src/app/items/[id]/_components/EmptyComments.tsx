export default function EmptyComments() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* 빈 원형 아이콘 */}
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-8 w-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>

      {/* 안내 메시지 */}
      <p className="mb-1 text-center text-gray-500">아직 댓글이 없어요.</p>
      <p className="text-center text-gray-500">가장 먼저 댓글을 남겨보세요!</p>
    </div>
  );
}
