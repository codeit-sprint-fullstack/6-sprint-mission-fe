import Image from "next/image";
import React from "react";

interface ArticleProps {
  title: string;
}

function Article({ title }: ArticleProps) {
  const heart = 10000;
  return (
    <div className="w-full pb-6 bg-[#FCFCFC] border-b border-gray-200">
      <div className="flex justify-between">
        <p className="font-semibold w-[263px] text-lg">{title}</p>
        <div className="w-18 h-18 flex justify-center items-center bg-white rounded-xl border border-gray-100">
          <Image
            alt="default"
            className="w-12 h-11"
            src="/assets/img/img_default.png"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <Image
            alt="profile"
            className="w-6 h-6"
            src="/assets/ic/ic_profile.png"
          />
          <p>총명한 판다</p>
          <div className="text-gray-400">2024.04.16</div>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            alt="heart"
            className="w-5 h-4.5"
            src="/assets/ic/ic_heart.png"
          />
          <div className="text-gray-500">{heart > 9999 ? "9999+" : heart}</div>
        </div>
      </div>
    </div>
  );
}

export default Article;
