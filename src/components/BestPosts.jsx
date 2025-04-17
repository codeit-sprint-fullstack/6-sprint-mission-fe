import React from "react";
import BestPostCard from "./BestPostCard";

function BestPosts() {
  const bestPosts = [
    {
      id: 1,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      author: "홍길동",
      likes: 9999,
      date: "2024.04.16",
      imageUrl: "/images/macbook.png",
    },
    {
      id: 2,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      author: "김코딩",
      likes: 9999,
      date: "2024.04.16",
      imageUrl: "/images/macbook.png",
    },
    {
      id: 3,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      author: "이자바",
      likes: 9999,
      date: "2024.04.16",
      imageUrl: "/images/macbook.png",
    },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-6">
      <h2 className="font-bold text-xl text-secondary-900 mb-6">베스트 게시글</h2>
      <div className="flex gap-6 flex-wrap">
        {bestPosts.map((post) => (
          <BestPostCard key={post.id} post={post} />
        ))}
      </div> 
    </section>
  );
}

export default BestPosts;
