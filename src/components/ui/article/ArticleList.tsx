"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ic_profile from '@/app/images/ic_profile.png';
import img_notebook from '@/app/images/img_notebook.png';
import FormatedDate from '../../common/FormattedDate'
import icon_like_off from '@/app/images/Icon_like_off.png'
import Writer from "./detail/Writer";
import { Article } from "@/app/types";
 
interface ArticleProps{ 
  articles? : Article[];
}
export default function ArticleList({ articles = []} : ArticleProps) {
  const router = useRouter();

  const handleDetail = (id : number) => {
      router.push(`/article/${id}`);
    };
  return (
      <div>
        {articles.map((article : Article) => (
          <div key={article.id} onClick={() => handleDetail(article.id)} className="cursor-pointer border-b-1 border-[#E5E7EB]">
            <div className="flex justify-between h-18">
              <h2 className="sm:text-lg font-[600]">{article.title}</h2>
              <div className="h-18 w-18 border-1 border-[#F3F4F6] rounded-lg flex justify-center items-center">
                <Image src={img_notebook} alt="상품이미지" />
              </div>
            </div>
            <div className="mt-4 mb-6 flex justify-between items-center gap-2">
              <div>
                <Image src={ic_profile} alt="프로필이미지" className="h-6 w-6" />
              </div>
              <Writer>총명한 판다</Writer>
              <span className="flex-1">
                <FormatedDate createdAt={article.createdAt} />
              </span>
              <div className="flex justify-between items-center gap-2">
                <Image src={icon_like_off} alt="좋아요" className="h-4 w-5" />
                <span className="sm:text-sm font-[#6B7280] font-[400]">9999+</span>
              </div>
           </div>
          </div>
          ))}
      </div>
  );
}
