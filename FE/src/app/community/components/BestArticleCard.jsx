"use client";

import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/images/logo/defaultImage.png";
import medalImage from "@/assets/images/icons/ic_medal.png";

export default function BestArticleCard({ article }) {
  return (
    <div className="w-[343px] h-[198px] bg-gray-50 px-6">
      <div className="bg-primary-100 text-FF rounded-b-2xl w-[102px] h-[30px] flex justify-center items-center gap-1 mb-5">
        <Image src={medalImage} alt="medalImage" className="w-4 h-4 " />
        <span>Best</span>
      </div>
      <div>
        <div className="flex justify-between">
          <p>{article.title}</p>
          <Image
            src={defaultImage}
            alt="articleImage"
            className="w-18 h-auto object-cover "
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <p>{article.user.username}</p>
            <p>♡{article._count.likes}</p>
          </div>
          <p>
            {new Date(article.createdAt)
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, ". ")}
          </p>
        </div>
      </div>
    </div>
  );
}
