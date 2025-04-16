import Image from "next/image";
import React from "react";

function CommentItem() {
  return (
    <div className="border-b-1 border-gray-200 mb-4">
      <div className="flex justify-between mb-6">
        <p className="text-sm">혹시 사용기간이 어떻게 되실까요?</p>
        <Image
          src="/assets/icon/ic_kebab.svg"
          alt="편집 아이콘"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
      <div className="flex items-start gap-2 h-10 mb-2">
        <Image
          src="/assets/icon/ic_profile.svg"
          alt="기본 프로필 아이콘"
          width={32}
          height={32}
        />
        <div>
          <div className="text-xs text-gray-600 mb-1">총명한 판다</div>
          <div className="text-xs text-gray-400">1시간 전</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
