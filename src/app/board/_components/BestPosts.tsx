"use client";

import React, { useEffect, useState } from "react";
import BestPostCard from "./BestPostCard";
import { fetchArticles } from "@/api/board.api";
import { Article } from "@/types/article";

interface BestPost extends Article {
  author: string;
  likes: number;
  date: string;
  imageUrl: string;
}

function BestPosts() {
  const [posts, setPosts] = useState<BestPost[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data: Article[] = await fetchArticles(); //최신순 정렬 후 상위 3개 추출
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const top3 = sorted.slice(0, 3).map((post) => ({
          ...post,
          author: "총명한 단이",
          likes: Math.floor(Math.random() * 10000),
          date: new Date(post.createdAt).toLocaleDateString(),
          imageUrl: "/images/macbook.png",
        }));
        setPosts(top3);
      } catch (e) {
        console.error("베스트 게시글 불러오기 실패", e);
      }
    };
    load();
  }, []);

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-6">
      <h2 className="font-bold text-xl text-secondary-900 mb-6">
        베스트 게시글
      </h2>
      <div className="flex gap-6 flex-wrap">
        {posts.map((post) => (
          <BestPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default BestPosts;
