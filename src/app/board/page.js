"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import DropdownMenu from "@/components/DropdownMenu";

const dummyNickname = "총명한판다";

export default function BoardPage() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);
  const [sort, setSort] = useState("recent"); // 초기값 "recent"
  const [searchKeyword, setSearchKeyword] = useState("");

  // 게시글 목록 불러오기 + 검색 + 정렬
  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => {
        let allPosts = data.data;

        // 정렬 기준 적용
        if (sort === "favorite") {
          allPosts = allPosts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        } else {
          allPosts = allPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        // 검색 필터링
        const filtered = allPosts.filter((post) =>
          post.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        setPosts(filtered);
      })
      .catch((err) => console.error("게시글 목록 조회 실패", err));
  }, [sort, searchKeyword]);

  // 베스트 게시글 (정렬과 관계없이 최신순 상위 3개)
  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => {
        const allPosts = data.data;
        const sorted = allPosts.sort((a, b) => b.id - a.id);
        setBestPosts(sorted.slice(0, 3));
      })
      .catch((err) => console.error("베스트 게시글 조회 실패", err));
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-xl font-semibold mb-4">베스트 게시글</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {bestPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => router.push(`/board/${post.id}`)}
            className="cursor-pointer border rounded-xl p-4 hover:shadow transition bg-white"
          >
            <img
              src="/icons/img_badge.svg"
              alt="Best 배지"
              className="w-[102px] h-[51px] mb-2"
            />
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-medium text-gray-800 line-clamp-2 flex-1">
                {post.title}
              </h3>
              <img
                src="/icons/img_macbook.svg"
                alt="썸네일"
                className="w-[72px] h-[72px] object-cover rounded shrink-0"
              />
            </div>
            <div className="text-xs text-gray-400 flex items-center justify-between w-full">
              {/* 왼쪽: 닉네임 + 하트 + 좋아요 수 */}
              <div className="flex items-center gap-2">
                <span>{dummyNickname}</span>
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/heart.svg"
                    alt="하트 아이콘"
                    className="w-4 h-4"
                  />
                  {post.likes >= 10000 ? "9999+" : post.likes ?? 0}
                </div>
              </div>

              {/* 오른쪽: 날짜 */}
              <span>{post.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">게시글 목록</h2>

      <div className="flex gap-2 mb-6 items-center">
        <SearchInput value={searchKeyword} onChange={setSearchKeyword} />
        <DropdownMenu onSortSelection={setSort} />
        <button
          onClick={() => router.push("/board/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
        >
          글쓰기
        </button>
      </div>

      <div className="divide-y bg-white rounded-xl overflow-hidden shadow-sm">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => router.push(`/board/${post.id}`)}
            className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-gray-50 transition"
          >
            <div>
              <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <img
                  src="/icons/ic_profile.svg"
                  alt="프로필"
                  className="w-6 h-6"
                />
                {dummyNickname} · {post.createdAt?.split("T")[0]}
              </p>
              <h4 className="font-medium text-gray-800">{post.title}</h4>
            </div>
            <div className="text-center">
              <img
                src="/icons/img_macbook.svg"
                alt="썸네일"
                className="w-[72px] h-[72px] object-cover rounded"
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                <img
                  src="/icons/heart.svg"
                  alt="하트 아이콘"
                  className="w-4 h-4"
                />
                {post.likes >= 10000 ? "9999+" : post.likes ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
