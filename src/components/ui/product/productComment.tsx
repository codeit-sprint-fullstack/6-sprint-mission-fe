"use client";

import { useState } from "react";
import MoreToggle from "../common-UI/MoreToggle";
import CreateComment from "../CreateComment";
import {
  deleteProductComment,
  getProductComment,
  patchProductComment,
} from "@/lib/commentProduct";

interface ProductCommentProps {
  productId: number;
  commentId: number;
  content: string;
  refreshComments: () => void;
  accessToken: string;
  authorId: number | string;
}

function ProductComment({
  productId,
  commentId,
  content: patchData,
  refreshComments,
  accessToken,
  authorId,
}: ProductCommentProps) {
  const [isEditing, setIsEditing] = useState(false);

  const currentUserId = Number(localStorage.getItem("userId"));
  const isAuthor = currentUserId === Number(authorId);

  const onPatch = async (): Promise<void> => {
    try {
      setIsEditing(true);
      await patchProductComment(commentId, accessToken, patchData);
    } catch (e: any) {
      console.error("댓글 수정 실패", e);
      if (e.message) alert(e.message);
    }
  };

  const onDelete = async (): Promise<void> => {
    try {
      await deleteProductComment(commentId, accessToken);
      await getProductComment(productId, 4);
      refreshComments();
    } catch (e: any) {
      console.error("댓글 삭제 중 오류 발생", e);
      if (e.message) alert(e.message);
    }
  };

  const handleEditSubmit = async (patchData: string): Promise<void> => {
    try {
      await patchProductComment(commentId, accessToken, patchData);
      setIsEditing(false);
      refreshComments();
    } catch (e) {
      console.log("댓글을 수정할 수 없습니다.", e);
    }
  };

  return (
    <>
      {isEditing ? (
        <CreateComment
          text={"댓글 수정"}
          prevComment={patchData}
          onSubmit={handleEditSubmit}
        />
      ) : (
        <div className="h-[104px] mt-[24px] pb-[16px] border-b border-seven">
          <div className="flex flex-row w-[1200px] justify-between">
            <div className="text-[20px]">{patchData} </div>
            {isAuthor && <MoreToggle onPatch={onPatch} onDelete={onDelete} />}
          </div>

          <div className="flex flex-row  items-center gap-[8px] ">
            <img src="/image/ui/profile.png" className="w-[24px] h-[24px]" />
            <div>
              <div> 총명한 판다 </div>
              {/* 시간 계산 필요 */}
              <div>1시간 전</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductComment;
