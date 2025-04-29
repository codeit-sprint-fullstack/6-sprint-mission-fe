"use client";

import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/images/logo/defaultImage.png";
import defaultProfileImage from "@/assets/images/logo/defaultProfileImage.png";

export default function ArticleCard({ article }) {
  return (
    <div className="py-4 border-b-2 border-gray-200">
      <div className="flex justify-between text-lg-semibold text-gray-800">
        <p>{article.title}</p>
        <Image
          src={defaultImage}
          alt="articleImage"
          className="w-18 h-auto object-cover "
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <div className="flex gap-1">
            <Image
              src={defaultProfileImage}
              alt="userProfileImage"
              className="w-6 h-auto object-cover gap-2"
            />
            <p className="text-gray-600">{article.user.username}</p>
          </div>
          <p className="text-gray-400">
            {new Date(article.createdAt)
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, ". ")}
          </p>
        </div>
        <p className="text-gray-500">♡{article._count.likes}</p>
      </div>
    </div>
  );
}
