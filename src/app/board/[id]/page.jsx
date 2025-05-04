"use client";

import PostContent from "@/app/board/[id]/_components/PostContent";
import CommentItem from "@/app/board/[id]/_components/CommentItem";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "@/api/board.api";
import Image from "next/image";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  // 댓글 목록 새로고침 함수 (등록/수정/삭제 시 사용)
  const fetchCommentsAgain = async () => {
    const newComments = await fetchCommentsByArticleId(id);
    setComments(newComments);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const fetchedPost = await fetchArticleById(id);
        const fetchedComments = await fetchCommentsByArticleId(id);

        setPost(fetchedPost);
        setComments(fetchedComments);
      } catch (e) {
        console.error("게시글/댓글 로딩 실패", e);
      }
    };

    if (id) load();
  }, [id]);

  if (!post) return <div className="p-10">로딩 중...</div>;

  return (
    <main>
      <PostContent
        post={{
          ...post,
          author: "총명한 단이",
          likes: Math.floor(Math.random() * 10000),
          date: new Date(post.createdAt).toLocaleDateString(),
        }}
        onCommentPosted={fetchCommentsAgain}
      />

      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-4">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center text-base font-normal text-secondary-400">
            <div className="relative w-[100px] h-[99px] mb-4 p-5">
              <Image
                src="/images/reply_empty.png"
                alt="댓글 없음"
                fill
                className="object-cover"
              />
            </div>
            <p className="mb-12">
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </p>

            <button
              onClick={() => router.push("/board")}
              className="w-[240px] h-[48px] flex items-center justify-center gap-1 py-2 bg-primary-100 text-white rounded-[40px] hover:bg-primary-200 text-[18px] font-semibold"
            >
              목록으로 돌아가기
              <RiArrowGoBackLine />
            </button>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={{
                ...comment,
                author: "귀여운 단이", // 고정된 작성자명
                time: "방금 전", // 임시 표시
              }}
              onCommentUpdated={fetchCommentsAgain}
            />
          ))
        )}
      </div>
    </main>
  );
}
