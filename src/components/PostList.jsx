"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import SearchSortBar from "./SearchSortBar";
import { useRouter } from "next/navigation";
import { fetchArticles } from "@/api/article.api";

function PostList() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchArticles();
        setPosts(data);
      } catch (e) {
        console.error("게시글 불러오기 실패:", e);
      }
    };
    loadPosts();
  }, []);

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
          <PostCard
            key={post.id}
            post={{
              ...post,
              author: "총명한 단이",
              likes: Math.floor(Math.random() * 10000),
              date: new Date(post.createdAt).toLocaleDateString(),
              imageUrl: post.imageUrl || "/images/macbook.png",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default PostList;
