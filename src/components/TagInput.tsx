"use client";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagInput({ tags, setTags }: TagInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter" && target.value.trim()) {
      e.preventDefault();
      const newTag = target.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        target.value = "";
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        태그
      </label>
      <input
        type="text"
        placeholder="태그를 입력해주세요"
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 bg-gray-100 text-sm text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
} 