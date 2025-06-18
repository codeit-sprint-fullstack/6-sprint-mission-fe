"use client";

import { getProductComment } from "@/lib/commentProduct";
import ProductComment from "./productComment";
import { useEffect, useState } from "react";

interface Comment {
  id: number;
  content: string;
  authorId: number | string;
}

interface ProductCommentsProps {
  productId: number;
  accessToken: string;
  refreshTrigger?: any;
  limit: number;
}

export default function ProductComments({
  productId,
  accessToken,
  refreshTrigger,
  limit,
}: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchComments = async () => {
    const res = await getProductComment(productId, limit);

    setComments(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [productId, refreshTrigger]);

  if (loading) return <div> 댓글 로딩중... </div>;

  if (comments.length === 0)
    return (
      <div className="flex flex-row justify-center">
        <img src="/image/ui/noAsk.png" alt="no comment" />
      </div>
    );

  return (
    <div>
      {comments.map((comment, index) => (
        <ProductComment
          key={index}
          productId={productId}
          commentId={comment.id}
          content={comment.content}
          accessToken={accessToken}
          // patchData={}
          refreshComments={fetchComments}
          authorId={comment.authorId}
        />
      ))}
    </div>
  );
}
