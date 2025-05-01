"use client";

import { useState } from "react";

/**
 * 댓글 입력 영역 + “문의하기” 타이틀
 * --------------------------------
 *  • 회색 배경 textarea (placeholder 안내 문구)
 *  • 오른쪽 하단 “등록” 버튼
 *    └ 내용이 있으면 파란색, 없으면 회색
 */
export default function CommentForm({
  onSubmit,
  placeholder = "개인정보를 공유 및 요청하거나, 협의 취소, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.",
}) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setValue("");
  };

  /* 입력이 있으면 활성 상태 */
  const enabled = value.trim().length > 0;

  return (
    <div className="w-full mb-10">
      {/* ─ 제목 ─ */}
      <h2 className="font-semibold text-base mb-2">문의하기</h2>

      {/* ─ 입력 박스 ─ */}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none bg-secondary-100 rounded-lg p-4 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* ─ 등록 버튼 ─ */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSubmit}
          disabled={!enabled}
          className={`w-24 h-10 text-sm font-medium rounded transition-colors
            ${
              enabled
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }
          `}
        >
          등록
        </button>
      </div>
    </div>
  );
}
