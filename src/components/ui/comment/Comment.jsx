"use client";

import MoreToggle from "../MoreToggle";
import { deleteComment, getComments } from "@/lib/api/comment";

function Comment({ articleId, commentId, content, refreshComments }) {
  const onPatch = () => {
    console.lopg("click patch");
  };

  const onDelete = async () => {
    try {
      await deleteComment(commentId);
      await getComments(articleId);
      refreshComments();

      console.log("댓글이 정상적으로 삭제되었습니다.");
    } catch (e) {
      console.error("댓글 삭제 중 오류 발생", e);
    }
  };

  return (
    <>
      <div className="h-[104px] mt-[24px] pb-[16px] border-b border-seven">
        <div className="flex flex-row w-[1200px] justify-between">
          <div className="text-[20px]">{content} </div>
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
    </>
  );
}

export default Comment;
