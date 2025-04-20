"use client";

import React, { useState, useEffect } from "react";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // 버튼 활성화를 위한 상태

  // 제목이나 내용이 변경될 때마다 버튼 활성화 상태 확인
  useEffect(() => {
    if (title && content) {
      setIsFormValid(true); // 제목과 내용이 모두 있으면 버튼 활성화
    } else {
      setIsFormValid(false); // 하나라도 비어 있으면 버튼 비활성화
    }
  }, [title, content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      console.log("제목:", title);
      console.log("내용:", content);
      // 이후 서버에 데이터를 전송하는 로직 추가 가능
    } else {
      alert("제목과 내용을 모두 입력해주세요.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-white">
      <div className="flex flex-row justify-between pb-[37px]">
        <h2 className="text-2xl font-semibold mb-4">게시글 쓰기</h2>
        {/* 등록 버튼 */}
        <button
          type="submit"
          onClick={handleSubmit}
          className={`py-2 px-[23px] rounded-lg focus:outline-none ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`} // 조건부 클래스
          disabled={!isFormValid} // 버튼 활성화 여부
        >
          등록
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 pb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            * 제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="w-full p-3 px-6 bg-gray-100 rounded-xl border-none focus:outline-none placeholder-secondary-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            * 내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            rows="5"
            className="w-full p-3 px-6 bg-gray-100 border-none rounded-xl resize-none focus:outline-none placeholder-secondary-400"
          />
        </div>
      </form>
    </div>
  );
}
