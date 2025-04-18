export default function CommentForm({
  newComment,
  setNewComment,
  handleCommentSubmit,
  isCommentLoading,
}) {
  return (
    <div className="mb-10">
      <h3 className="text-sm font-semibold mb-2 text-[#1F2937]">댓글달기</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력해주세요"
          required
          disabled={isCommentLoading}
          className="w-full h-[104px] rounded-xl bg-[#F3F4F6] py-4 px-6 border-0 resize-none focus:ring-2 focus:ring-blue-500 outline-none mb-2 text-[#1F2937]"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim() || isCommentLoading}
            className="px-4 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold leading-[26px] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isCommentLoading ? "등록 중..." : "등록"}
          </button>
        </div>
      </form>
    </div>
  );
}
