import React from "react";
import Image from "next/image";

export default function BestArticle() {
  return (
    <div className="flex items-center justify-center tablet:gap-[16px] web:gap-[24px]">
      <div className="w-[343px] bg-[#F9FAFB] rounded-[8px] pl-[24px] web:w-[384px]">
        <div className="w-[102px] h-[30px] bg-[var(--color-main-blue)] flex items-center justify-center gap-[4px] rounded-b-[16px]">
          <figure className="w-[16px] h-[16px] relative">
            <Image src="/medal.png" alt="medal" fill className="object-cover" />
          </figure>
          <p className="text-white tex">Best</p>
        </div>
        <div className="flex gap-[37px] mt-[16px] mb-[40px] web:gap-[8px]">
          <p className="text-[18px] w-[183px] web:w-[256px]">text</p>
          <figure className="relative w-[72px] h-[72px]">
            <Image
              className="object-cover"
              src="/laptop.png"
              alt="laptop"
              fill
            />
          </figure>
        </div>
        <div className="flex items-center justify-between w-[292px] pb-[16px] pc:w-[336px]">
          <div className="flex items-center gap-[8px]">
            <p className="text-[#4B5563] text-[14px]">총명한판다</p>
            <figure className="relative w-[16px] h-[16px]">
              <Image
                className="object-cover"
                src="/heart.png"
                alt="heart"
                fill
              />
            </figure>
            <p className="text-[#6B7280] text-[14px]">99999+</p>
          </div>
          <p className="text-[#9CA3AF] text-[14px]">2024.04.16</p>
        </div>
      </div>
      <div className="w-[343px bg-[#F9FAFB] rounded-[8px] pl-[24px] hidden web:block web:w-[384px]">
        <div className="w-[102px] h-[30px] bg-[var(--color-main-blue)] flex items-center justify-center gap-[4px] rounded-b-[16px]">
          <figure className="w-[16px] h-[16px] relative">
            <Image src="/medal.png" alt="medal" fill className="object-cover" />
          </figure>
          <p className="text-white tex">Best</p>
        </div>
        <div className="flex gap-[37px] mt-[16px] mb-[40px] web:gap-[8px]">
          <p className="text-[18px] w-[183px] web:w-[256px]">text</p>
          <figure className="relative w-[72px] h-[72px]">
            <Image
              className="object-cover"
              src="/laptop.png"
              alt="laptop"
              fill
            />
          </figure>
        </div>
        <div className="flex items-center justify-between w-[292px] pb-[16px] pc:w-[336px]">
          <div className="flex items-center gap-[8px]">
            <p className="text-[#4B5563] text-[14px]">총명한판다</p>
            <figure className="relative w-[16px] h-[16px]">
              <Image
                className="object-cover"
                src="/heart.png"
                alt="heart"
                fill
              />
            </figure>
            <p className="text-[#6B7280] text-[14px]">99999+</p>
          </div>
          <p className="text-[#9CA3AF] text-[14px]">2024.04.16</p>
        </div>
      </div>
      <div className="w-[343px bg-[#F9FAFB] rounded-[8px] pl-[24px] hidden pc:block web:w-[384px]">
        <div className="w-[102px] h-[30px] bg-[var(--color-main-blue)] flex items-center justify-center gap-[4px] rounded-b-[16px]">
          <figure className="w-[16px] h-[16px] relative">
            <Image src="/medal.png" alt="medal" fill className="object-cover" />
          </figure>
          <p className="text-white tex">Best</p>
        </div>
        <div className="flex gap-[37px] mt-[16px] mb-[40px] web:gap-[8px]">
          <p className="text-[18px] w-[183px] web:w-[256px]">text</p>
          <figure className="relative w-[72px] h-[72px]">
            <Image
              className="object-cover"
              src="/laptop.png"
              alt="laptop"
              fill
            />
          </figure>
        </div>
        <div className="flex items-center justify-between w-[292px] pb-[16px] pc:w-[336px]">
          <div className="flex items-center gap-[8px]">
            <p className="text-[#4B5563] text-[14px]">총명한판다</p>
            <figure className="relative w-[16px] h-[16px]">
              <Image
                className="object-cover"
                src="/heart.png"
                alt="heart"
                fill
              />
            </figure>
            <p className="text-[#6B7280] text-[14px]">99999+</p>
          </div>
          <p className="text-[#9CA3AF] text-[14px]">2024.04.16</p>
        </div>
      </div>
    </div>
  );
}
