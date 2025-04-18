export default function ArticleContent({ content }) {
  return (
    <div className="mb-10 flex-grow min-h-[200px]">
      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
        {content || ""}
      </p>
    </div>
  );
}
