import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface ArticleProps {
  id: number;
  title: string;
  createdAt: string;
  name: string;
  like: number;
}

export default function Article({
  id,
  title,
  createdAt,
  name,
  like,
}: ArticleProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/free-board/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-[8px] cursor-pointer px-[24px] pb-[16px] pt-0 max-w-[1200px] border border-primary-200"
    >
      <div>
        <div className="flex gap-[8px] mt-[16px] mb-[18px]">
          <p className="text-[20px] font-semibold text-primary-800 w-[800px]">
            {title}
          </p>
          <Image
            src="/Frame 2609885.svg"
            alt="articleImage"
            width={72}
            height={72}
          />
        </div>
        <div className="flex items-center gap-[8px]">
          <p className="text-[16px] text-primary-600">{name}</p>
          <div className="flex items-center gap-[4px]">
            <Image src="/ic_heart.svg" alt="heart" width={16} height={16} />
            <p className="text-[14px] text-primary-500">{like}</p>
          </div>
          <p className="ml-[auto] text-[14px] text-primary-400">
            {dayjs(createdAt).format("YYYY. MM. DD")}
          </p>
        </div>
      </div>
    </div>
  );
}
