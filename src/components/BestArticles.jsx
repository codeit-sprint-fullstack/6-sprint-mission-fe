import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

export default function BestArticles() {
  const article = [
    {
      id: 1,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      imgUrl: "/images/products/macbook.png",
      author: "총명한판다",
      heartCount: "9999+",
      date: "2024. 04. 16",
    },
    {
      id: 2,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      imgUrl: "/images/products/macbook.png",
      author: "총명한판다",
      heartCount: "9999+",
      date: "2024. 04. 16",
    },
    {
      id: 3,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      imgUrl: "/images/products/macbook.png",
      author: "총명한판다",
      heartCount: "9999+",
      date: "2024. 04. 16",
    },
  ];

  return (
    <div className="space-y-4 px-90">
      <h2 className="text-xl font-semibold mb-6">베스트 게시글</h2>
      <div className="flex gap-4 overflow-x-auto">
        {article.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-gray-100 px-4 rounded-lg  w-[384px] h-[169px] hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="flex items-center bg-blue-500 text-white gap-1.5 px-6 py-0.5 text-base font-semibold rounded-b-2xl">
                <img src="/images/icons/besticon.png" alt="besticon" />
                Best
              </span>
            </div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-900  w-[70%]">
                {post.title}
              </h3>
              <div className="flex justify-center items-center w-18 h-18 bg-white rounded-[6px] border border-solid border-gray-200 ">
                <div className="relative w-12 h-11">
                  <Image
                    src={post.imgUrl}
                    alt="Post Image"
                    fill
                    className=" object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex  items-center mt-2 text-gray-500 text-sm ">
              <span className="mr-2">{post.author}</span>
              <FaHeart className=" mr-1 " />
              <span className="mr-2"> {post.heartCount}</span>
              <div className="flex items-center ml-auto">
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
