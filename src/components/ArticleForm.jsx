"use client";

export default function ArticleForm({
  onFormSubmit,
  isLoading,
  title,
  content,
  onTitleChange,
  onContentChange,
  formId,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit();
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label
          htmlFor="title"
          className="font-bold text-lg leading-[26px] text-[#1F2937]"
        >
          *제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full h-[56px] rounded-xl bg-[#F3F4F6] py-4 px-6 border-0 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="제목을 입력해주세요"
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-3">
        <label
          htmlFor="content"
          className="font-bold text-lg leading-[26px] text-[#1F2937]"
        >
          *내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-[282px] rounded-xl bg-[#F3F4F6] py-4 px-6 border-0 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="내용을 입력해주세요"
          rows="10"
          required
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
