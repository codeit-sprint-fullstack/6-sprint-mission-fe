import React from "react";

export default function CommunityEditPage() {
  return (
    <form className="p-[16px] sm:p-[24px]">
      <div className="flex justify-center items-center">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
          <h1 className="h-[32px] font-bold text-[20px]">게시글 수정</h1>
          <button
            type="submit"
            // disabled="{disabled}"
            className="bg-secondary-gray-300 text-secondary-gray-100 flex justify-center items-center border-none w-[74px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px] cursor-default"
            // on일 때 bg-primary-100 cursor-pointer
          >
            등록
          </button>
        </div>
      </div>
      <main className="flex justify-center items-center">
        <div className="flex justify-center flex-col w-full max-w-[1200px] gap-[16px]">
          <section className="flex flex-col mt-[24px] gap-[12px]">
            <p className="font-bold text-[14px] sm:text-[18px]">*제목</p>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="제목을 입력해주세요"
              className="h-[56px] bg-secondary-gray-100 border-[1.5px] border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300"
            />
          </section>
          <section className="flex flex-col gap-[12px]">
            <p className="font-bold text-[14px] sm:text-[18px]">*내용</p>
            <textarea
              name="description"
              id="description"
              placeholder="내용을 입력해주세요"
              className="h-[200px] bg-secondary-gray-100 border-[1.5px] border-transparent rounded-[12px] outline-none py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300 resize-none sm:h-[282px]"
            />
          </section>
        </div>
      </main>
    </form>
  );
}
