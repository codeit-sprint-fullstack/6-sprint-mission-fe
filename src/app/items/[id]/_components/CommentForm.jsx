import React from "react";

const CommentForm = () => {
  return (
    <article className="mb-[40px]">
      <p className="font-[600] text-[#111827] mb-[8px]">문의하기</p>
      <textarea
        className="w-full h-[129px] bg-[#F3F4F6] px-[24px] pt-[16px] rounded-[12px] mb-[16px] resize-none outline-none"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      <div className="w-full flex justify-end">
        <button className="bg-[var(--color-main-blue)] w-[74px] h-[42px] text-white font-[600] rounded-[8px] cursor-pointer">
          등록
        </button>
      </div>
    </article>
  );
};

export default CommentForm;
