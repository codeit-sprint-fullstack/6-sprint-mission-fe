import Image from "next/image";
import Link from "next/link";

export default function Card({ article }) {
  const title = article?.title || "placeholder title";
  const createdAt = article?.createdAt
    ? new Date(article.createdAt)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, ".")
    : "2024.11.15";
  return (
    <Link href={`/community/${article.id}`}>
      <div className="bg-secondary-25 w-full h-full pb-6 rounded-[8px] border-b-1 border-gray-200 flex item-center justify-center relative">
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex items-start justify-between gap-10">
            <h1 className="font-semibold text-lg text-secondary-800">{title}</h1>
            <div className="flex items-center justify-center bg-white border-[0.75px] border-secondary-200 w-[72px] h-[72px] flex-shrink-0">
              <Image
                src="/assets/img_placeholder.svg"
                alt="게시글 이미지"
                width={48}
                height={44}
              ></Image>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2 text-secondary-600">
              <Image
                src="/icons/ic_profile.svg"
                alt="프로파일 아이콘"
                width={24}
                height={24}
              ></Image>
              <p className="text-sm">작성자이름</p>
              <p className="text-sm text-secondary-400">{createdAt}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Image src="/icons/ic_heart.svg" alt="하트 아이콘" width={24} height={24}></Image>
              <p className="text-secondary-400">9999+</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
