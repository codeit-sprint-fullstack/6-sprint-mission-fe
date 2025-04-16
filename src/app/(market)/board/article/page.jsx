import React from "react";

function page() {
  return (
    <form className="p-4 mb-[965px]">
      <nav className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">게시글 등록하기</h2>
        <button className="btn-base" type="subtmit">
          등록
        </button>
      </nav>
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-bold mb-3">*제목</h3>
          <input
            className="w-full px-6 py-4 rounded-xl bg-gray-100 font-normal"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3">*내용</h3>
          <textarea
            className="w-full h-[200px] px-6 py-4 rounded-xl bg-gray-100 font-normal resize-none"
            placeholder="내용을 입력해주세요"
          />
        </div>
      </section>
    </form>
  );
}

export default page;
