"use client";

import React, { useEffect, useState } from "react";
import { getComments } from "@/lib/commentApi";
import dayjs from "dayjs";
import Image from "next/image";

interface CommentsProps {
  articleId: number;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(articleId);
      setComments(data);
      setLoading(false);
    } catch (error) {
      console.error("댓글을 불러오는데 실패했습니다:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">댓글을 불러오는 중...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">댓글 ({comments.length})</h3>
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Image
            src="/Img_reply_empty.svg"
            alt="댓글이 없습니다"
            width={120}
            height={120}
            className="mx-auto mb-4"
          />
          <p>아직 댓글이 없습니다.</p>
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-200 rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src="/ic_profile.svg"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium text-gray-800">
                  {comment.author.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {dayjs(comment.createdAt).format("YYYY.MM.DD HH:mm")}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
