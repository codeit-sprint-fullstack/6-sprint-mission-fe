"use client";

import { useState } from "react";
import MoreToggle from "../common-UI/MoreToggle";
import CreateComment from "../CreateComment";
import {
  deleteProductComment,
  getProductComment,
  patchProductComment,
} from "@/lib/commentProduct";

function ProductComment({
  productId,
  commentId,
  content: patchData,
  refreshComments,
  accessToken,
}) {
  const [isEditing, setIsEditing] = useState(false);
  // const [deleteConfirmModal, setDelete]

  const onPatch = async () => {
    //디버깅
    console.log("click patch");
    try {
      setIsEditing(true);
      await patchProductComment(commentId, accessToken, patchData);
    } catch (e) {
      console.error("댓글 수정 실패", e);
    }
  };

  const onDelete = async () => {
    try {
      await deleteProductComment(commentId, accessToken);
      await getProductComment(productId, 4);
      refreshComments();

      console.log("댓글이 정상적으로 삭제되었습니다.");
    } catch (e) {
      console.error("댓글 삭제 중 오류 발생", e);
    }
  };

  // 디버깅
  console.log("commentId", commentId);
  console.log("accessToken", accessToken);

  const handleEditSubmit = async (patchData) => {
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
            <MoreToggle onPatch={onPatch} onDelete={onDelete} />
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
