import Image from "next/image";
import ic_full_heart from "@/assets/images/common/ic_full_heart.svg";
import ic_empty_heart from "@/assets/images/common/ic_empty_heart.svg";
import img_badge from "@/assets/images/community/img_badge.svg";
import img_notebook from "@/assets/images/community/img_notebook.svg";
import Link from "next/link";
import dayjs from "dayjs";

export default function BestArticlesLoad({ bestArticle }) {
  return (
    <Link
      href={`/community/${bestArticle.id}`}
      className="rounded-[8px] bg-secondary-gray-50"
    >
      <div className="relative w-[102px] h-[30px] ml-[24px]">
        <Image src={img_badge} alt="뱃지" fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-[40px] py-[16px] px-[24px] md:gap-[18px] md:pb-[9px]">
        <div className="flex justify-between gap-[40px] md:gap-[8px]">
          <p className="font-semibold text-[18px]/[26px] w-full h-[48px] md:text-[20px]/[32px]">
            {bestArticle.title}
          </p>
          <div className="flex justify-center items-center min-w-[72px] h-[72px] bg-white border-[1px] rounded-[8px] border-secondary-gray-200">
            <div className="relative w-[48px] h-[44.57px]">
              <Image
                src={img_notebook}
                alt="게시글 이미지"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center font-normal text-[14px]/[24px]">
          <div className="flex gap-[8px]">
            <p className="text-secondary-gray-500">총명한 판다</p>
            <div className="flex justify-center items-center gap-[4px]">
              <div className="relative w-[16px] h-[16px]">
                <Image
                  src={ic_empty_heart}
                  alt="하트"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-secondary-gray-400">9999+</p>
            </div>
          </div>
          <p className="text-secondary-gray-300">
            {dayjs(bestArticle.createdAt).format("YYYY. MM. DD")}
          </p>
        </div>
      </div>
    </Link>
  );
}
