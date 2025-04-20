import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs"; // 옵션 아이콘

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      onSubmit(comment);
      setComment(""); // 댓글 입력 후 초기화
    }
  };

  return (
    <div className="mt-6">
      {/* 댓글 달기 텍스트 */}
      <div className="text-xl font-semibold text-gray-800 mb-2">댓글달기</div>

      {/* 댓글 입력란 (테두리 제거) */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력해주세요"
        rows="4"
        className="w-full px-6 py-4 resize-none bg-gray-100 focus:outline-none placeholder-secondary-400 rounded-2xl"
      />
      {/* 등록 버튼 오른쪽 정렬 */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          등록
        </button>
      </div>
    </div>
  );
};

const Comment = ({ author, time, content }) => {
  return (
    <div className="flex flex-col border-b border-gray-300 py-4">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center space-x-3">
          {/* 작성자 아이콘 */}
          <div className="relative w-8 h-8">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>{" "}
            {/* Placeholder for icon */}
          </div>
          <div>
            <div className="font-semibold">{author}</div>
            <div>{time}</div>
          </div>
        </div>
        {/* 드롭다운 메뉴 */}
        <BsThreeDotsVertical className="h-5 w-5 text-gray-500 cursor-pointer" />
      </div>
      <div className="mt-2 text-gray-700">{content}</div>
    </div>
  );
};

export { CommentForm, Comment };
