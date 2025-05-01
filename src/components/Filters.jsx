"use client";

/** 상품 정렬 드롭다운
 *  ─ 최신순(recent) / 좋아요순(favorite) */
export default function Filters({ orderBy, setOrderBy }) {
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
