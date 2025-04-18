export default function ArticleContent({ content }) {
  return (
    <div className="mb-8 text-base text-[16px] whitespace-pre-wrap">
      {content || "게시글 조회에 실패하였습니다."}
    </div>
  );
}
