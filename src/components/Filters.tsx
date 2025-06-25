"use client";

interface FiltersProps {
  orderBy: string;
  setOrderBy: (value: string) => void;
}

export default function Filters({ orderBy, setOrderBy }: FiltersProps) {
  return (
    <select
      value={orderBy}
      onChange={(e) => setOrderBy(e.target.value)}
      className="h-10 px-2 border rounded"
    >
      <option value="recent">최신순</option>
      <option value="favorite">좋아요순</option>
    </select>
  );
} 