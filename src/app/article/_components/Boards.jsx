"use client";

import { getArticle } from "@/api/articleApi";
import { useArticle } from "@/app/context/article.context";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const boards = async () => {
      try {
        const data = await getArticle(search);
        setBoards(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    boards();
  }, [search]);

  if (isLoading) {
    return <div className="text-center text-[30px] h-[30vh]">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-[24px] bg-[#FCFCFC]">
      {boards.map((board) => (
        <Link href={`/article/${board.id}`} key={board.id}>
          <div className="w-full h-[136px] border-b border-b-[#E5E7EB] cursor-pointer">
            <div className="flex items-center justify-between gap-[8px] mb-[16px]">
              <p className="text-[18px] font-[600] w-[263px] xs:text-[20px] xs:w-full ">
                {board.title}
              </p>
              <figure className="relative w-[72px] h-[72px] shrink-0">
                <Image
                  className="object-cover"
                  src="/laptop.png"
                  alt="laptop"
                  fill
                />
              </figure>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/profile.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[14px] text-[#4B5563]">총명한 판다</p>
                <p className="text-[14px] text-[#9CA3AF]">
                  {board.createAt.split("T")[0]}
                </p>
              </div>
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/heart.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[#6B7280]">9999+</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
