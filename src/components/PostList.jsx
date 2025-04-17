"use client";

import React from "react";
import PostCard from "./PostCard";
import SearchSortBar from "./SearchSortBar";
import { useRouter } from "next/navigation";

function PostList() {
  const router = useRouter();
  const posts = [
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
    <section className="w-full max-w-[1200px] mx-auto mt-10">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl text-secondary-900 mb-6">게시글</h2>
        <button
          onClick={() => router.push("/board/new")}
          className="w-[88px] h-[42px] bg-primary-100 hover:bg-primary-200 text-white text-[16px] font-[600] rounded-[8px]"
        >
          글쓰기
        </button>
      </div>
      {/* 검색/정렬/글쓰기 */}
      <SearchSortBar />
      <div className="flex flex-col gap-6 flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default PostList;
