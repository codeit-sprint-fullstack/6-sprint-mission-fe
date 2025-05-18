"use client";

import React, { useEffect, useState } from "react";
import "../css/input.scss";
import Button from "../Button";
import { getCommentsById } from "@/api/items";
import CommentBox from "../CommentBox";

function ProductComments({ itemId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!itemId) return;

    const fetchComments = async () => {
      try {
        const data = await getCommentsById(itemId);
        setComments(data.list);
      } catch (e) {
        console.error(e);
      }
    };

    fetchComments();
  }, [itemId]);

  return (
    <>
      {/* 문의하기 + 등록 */}
      <section>
        <p className="text-gray-900 font-[600] mb-[10px]">문의하기</p>
        <textarea
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포 시 모니터링 후 글이 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className="input h-[104px] mb-2 relative"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <Button
          // onClick={handlePostComment}
          size="sm"
          disabled
          className="ml-auto"
        >
          등록
        </Button>
      </section>

      {/* 댓글 목록 */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentBox key={comment.id} comment={comment} />
        ))
      ) : (
        // 댓글x
        <div className="mt-[60px] flex flex-col justify-center items-center">
          <img
            src="/assets/question.png"
            alt="빈 댓글 이미지"
            className="w-[140px] h-[140px] mb-[20px]"
          />
          <div className="text-center text-gray-400">
            <p>아직 문의가 없어요.</p>
          </div>
        </div>
      )}
      <section></section>
    </>
  );
}

export default ProductComments;
