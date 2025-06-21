"use client";

import React from "react";
import useOutsideClick from "@/hook/useOutsideClick";
import Dropdown from "@/components/Dropdown";
import { TArticle } from "@/types";
import Image from "next/image";

interface ArticleDetailProps {
  title: TArticle["title"];
  content: TArticle["content"];
  articleId: TArticle["id"];
}

function ArticleDetail({ title, content, articleId }: ArticleDetailProps) {
  const { isOpen, setIsOpen, dropDownRef } = useOutsideClick();

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold w-78">{title}</p>
        <div className="relative h-4">
          <div className="w-3 h-4 flex justify-center" onClick={handleClick}>
            <Image
              alt="setting"
              className="w-1 h-4"
              src="/assets/ic/ic_setting.png"
            />
          </div>
          {isOpen && (
            <div
              ref={dropDownRef}
              className="absolute right-0 top-full mt-2 z-50"
            >
              <Dropdown type={"article"} id={articleId} />
            </div>
          )}
        </div>
      </div>

      <div className="flex mt-4 pb-4">
        <div className="flex items-center gap-4">
          <Image
            alt="profile"
            className="w-10 h-10"
            src="/assets/ic/ic_profile.png"
          />
          <div className="flex">
            <p className="text-gray-600">총명한 판다</p>
            <p className="text-gray-400">2024.01.02</p>
          </div>
        </div>
        <div className="ml-4 pl-4 border-l border-gray-200">
          <div className="border rounded-2xl border-gray-200 flex h-10 py-1 px-3 items-center gap-0.5">
            <Image
              alt="heart"
              src="/assets/ic/ic_heart.png"
              className="w-6.5 h-6"
            />
            <p className="text-gray-500">123</p>
          </div>
        </div>
      </div>
      <div className="mt-4">{content}</div>
    </div>
  );
}

export default ArticleDetail;
