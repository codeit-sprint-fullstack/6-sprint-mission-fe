"use client";

import { getProductComment } from "@/lib/commentProduct";
import ProductComment from "./productComment";
import { useEffect, useState } from "react";

export default function ProductComments({ productId, refreshTrigger, limit }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getProductComment(productId, limit);

      //디버깅깅
      console.log("res", res.list);

      setComments(res.list);
      setLoading(false);
    };

    fetchComments();
  }, [productId, refreshTrigger]);

  if (loading) return <div> 댓글 로딩중... </div>;

  if (comments.length === 0)
    return (
      <div className="flex flex-row justify-center">
        <img src="/image/ui/noComment.png" />
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
          // patchData={}
          // refreshComments={}
        />
      ))}
    </div>
  );
}
