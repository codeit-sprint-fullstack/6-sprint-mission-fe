import React from "react";
import BestArticle from "./_components/BestArticle";
import PostForm from "./_components/PostForm";
import Boards from "./_components/Boards";

export default async function Articles() {
  return (
    <section className="m-[16px] m:m-[24px ]">
      <div className="max-w-[343px] m-auto web:max-w-[696px] pc:max-w-[1200px]">
        <article className=" mb-[24px]">
          <p className="text-[18px] font-[700] mb-[16px]">베스트 게시글</p>
          <BestArticle />
        </article>
      </div>
      <article className="max-w-[375px] m-auto mb-[90px] xs:max-w-[744px] xs:mb-[20px] m:max-w-[1200px] m:mb-[290px]">
        <PostForm />
        <Boards />
      </article>
    </section>
  );
}
