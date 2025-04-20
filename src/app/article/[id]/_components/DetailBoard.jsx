"use client";

import Images from "@/components/ui/Images";
import React, { useEffect, useState } from "react";
import ToggleMenu from "./ToggleMenu";
import { useParams } from "next/navigation";
import { getDetailArticle } from "@/api/articleApi";
import { useArticle } from "@/app/context/article.context";

const DetailBoard = () => {
  const [isGnbActive, setIsGnbActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const articleContext = useArticle();
  const { id: articleId } = useParams();

  useEffect(() => {
    const board = async () => {
      try {
        const data = await getDetailArticle(articleId);
        articleContext.setBoard(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    board();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <article className="flex flex-col gap-[16px] mb-[16px] pb-[16px] border-b border-[#E5E7EB]">
        <div className="relative flex justify-between">
          <p className="w-[312px] text-[20px] font-[700] text-[#1F2937] xs:w-[664px] m:text-[18px]">
            {articleContext.board?.title}
          </p>
          <span
            className="cursor-pointer"
            onClick={() => setIsGnbActive((prev) => !prev)}
          >
            <Images
              src={"/kebab.png"}
              w={"w-[24px]"}
              h={"h-[24px]"}
              alt={"kebab"}
            />
          </span>
          <ToggleMenu isGnbActive={isGnbActive} />
        </div>
        <div className="flex items-center gap-[16px]">
          <Images
            src={"/profile.png"}
            w={"w-[40px]"}
            h={"h-[40px]"}
            alt={"profile"}
          />
          <div className="flex items-center gap-[2px]">
            <p className="text-[14px] font-[500] text-[#4B5563]">총명한 판다</p>
            <p className="text-[14px] font-[400] text-[#9CA3AF]">
              {articleContext.board?.createAt.split("T")[0]}
            </p>
          </div>
          <div className="flex gap-[4px] border-l border-[#E5E7EB] pl-[32px]">
            <span className="flex items-center  py-[4px] px-[12px] border border-[#E5E7EB] rounded-[35px]">
              <Images
                src={"/heart.png"}
                w={"w-[32px]"}
                h={"h-[32px]"}
                alt={"heart"}
              />
              <p className="text-[14px] font-[500] text-[#6B7280]">1234</p>
            </span>
          </div>
        </div>
      </article>
      <p className="text-[#1F2937] mb-[32px]">
        {articleContext.board?.content}
      </p>
    </>
  );
};

export default DetailBoard;
