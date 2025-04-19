"use client";
import Image from "next/image";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function Article({ id, title, createdAt }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/free-board/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#FCFCFC] border-b border-b-[#E5E7EB] cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="mb-[24px]">
        <div className="flex justify-between mb-[16px]">
          <p className="text-[20px] text-primary-800 font-semibold">{title}</p>
          <Image
            src="/Frame 2609885.svg"
            alt="articleImage"
            width={72}
            height={72}
          />
        </div>
        <div className="flex justify-between items-center mb-[24px]">
          <div className="flex items-center gap-[8px]">
            <Image src="/ic_profile.svg" alt="profile" width={24} height={24} />
            <div className="flex items-center gap-[8px]">
              <p className="text-[14px] text-primary-600">총명한판다</p>
              <p className="text-[14px] text-primary-400">
                {dayjs(createdAt).format("YYYY. MM. DD")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <Image src="/ic_heart.svg" alt="heart" width={24} height={24} />
            <p className="text-[16px] text-primary-500">9999+</p>
          </div>
        </div>
      </div>
    </div>
  );
}
