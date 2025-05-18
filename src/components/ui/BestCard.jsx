import Image from "next/image";
import bestIcon from "@/app/assets/icons/ic-best.svg";
import heartIcon from "@/app/assets/icons/ic-heart.svg";
import articleImg from "@/app/assets/images/img-article-placeholder.svg";

export default function Card({ article }) {
  const title = article?.title || "placeholder best title";
  const createdAt = article?.createdAt
    ? new Date(article.createdAt)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, ".")
    : "1989.03.17";
  return (
    <div className="bg-secondary-50 w-[340px] h-[200px] rounded-[8px] pl-6 pr-6 pt-[46px] pb-4 flex item-center justify-center relative xl:w-[384px] xl:h-[169px]">
      <div className="bg-primary w-[102px] h-[30px] py-[2px] px-[24px] rounded-b-[16px] flex items-center gap-[10px] absolute top-0 left-6">
        <Image
          src={bestIcon}
          alt="베스트 아이콘"
          width={12}
          height={14}
        ></Image>
        <p className="text-white font-semibold">Best</p>
      </div>
      <div className="flex flex-col w-full h-full gap-10 xl:gap-[18px]">
        <div className="flex items-start justify-between gap-10">
          <h1 className="font-semibold text-lg text-secondary-800">{title}</h1>
          <div className="flex items-center justify-center bg-white border-[0.75px] border-secondary-200 w-[72px] h-[72px] flex-shrink-0">
            <Image
              src={articleImg}
              alt="게시글 이미지"
              width={48}
              height={44}
            ></Image>
          </div>
        </div>
        <div className="flex item-center justify-between">
          <div className="flex item-center justify-center gap-2 text-secondary-600">
            <p>작성자이름</p>
            <div className="flex item-center justify-center gap-1">
              <Image
                src={heartIcon}
                alt="하트 아이콘"
                width={16}
                height={16}
              ></Image>
              <p>9999+</p>
            </div>
          </div>
          <p className="text-secondary-400">{createdAt}</p>
        </div>
      </div>
    </div>
  );
}
