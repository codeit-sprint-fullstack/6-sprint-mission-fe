import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export default function ArticleCard({ article, variant = "best" }) {
  if (!article || typeof article !== "object") {
    console.warn("ArticleCard received invalid article prop:", article);
    return null;
  }
  if (!article.id) {
    console.warn("ArticleCard received article without id:", article);
    return null;
  }

  const formattedDate = article.createdAt
    ? new Date(article.createdAt)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, ".")
        .slice(0, -1)
    : "No date";

  const cardStyles = clsx(
    "flex rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200 p-[24px] relative",
    {
      "flex-col gap-[10px] w-[384px] h-[169px] bg-[#F9FAFB]":
        variant === "best",
      "flex-col gap-[10px] w-full min-h-[138px] bg-[#FCFCFC]":
        variant === "list",
    }
  );

  const imageStyles = clsx("object-cover rounded-md border flex-shrink-0", {
    "w-[72px] h-[72px]": variant === "best",
    "w-[72px] h-[72px]": variant === "list",
  });

  if (variant === "best") {
    return (
      <Link href={`/board/${article.id}`} className={cardStyles}>
        <div className="absolute top-0 left-[24px] w-[102px] h-[30px] flex items-center justify-center rounded-br-[16px] rounded-bl-[16px] overflow-hidden">
          <Image
            alt="배지"
            src="/images/board/img_badge.png"
            width={102}
            height={30}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex gap-[10px] pt-5">
          <h3 className="flex-grow text-xl font-semibold text-[#1F2937] leading-8">
            {article.title || "Untitled"}
          </h3>
          <div className="flex-shrink-0 w-[72px]">
            <Image
              src={article.imageUrl || "/images/board/default-thumbnail.png"}
              alt={
                article.title
                  ? `Thumbnail for ${article.title}`
                  : "Article thumbnail"
              }
              width={72}
              height={72}
              className={imageStyles}
              priority={false}
              unoptimized={!article.imageUrl}
            />
          </div>
        </div>

        <div className="mt-auto flex justify-between items-center text-sm font-normal leading-6">
          <div className="flex items-center gap-2">
            <span className="text-[#9CA3AF]">
              {article.author?.nickname || "익명"}
            </span>
            <span className="text-[#6B7280] flex items-center gap-1">
              <span>❤️</span>
              <span>{article.likes ?? 0}</span>
            </span>
          </div>
          <p className="text-[#9CA3AF]">{formattedDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/board/${article.id}`} className={cardStyles}>
      <div className="flex gap-[10px] items-start">
        <h3 className="flex-grow text-lg leading-7 font-semibold text-[#1F2937] line-clamp-2">
          {article.title || "Untitled"}
        </h3>
        <Image
          src={article.imageUrl || "/images/board/default-thumbnail.png"}
          alt={
            article.title
              ? `Thumbnail for ${article.title}`
              : "Article thumbnail"
          }
          width={72}
          height={72}
          className={imageStyles}
          priority={false}
          unoptimized={!article.imageUrl}
        />
      </div>

      <div className="mt-auto flex justify-between items-center text-sm font-normal leading-6">
        <div className="flex items-center gap-2">
          <span className="text-[#9CA3AF]">
            {article.author?.nickname || "익명"}
          </span>
          <span className="text-[#9CA3AF]">{formattedDate}</span>
        </div>
        <span className="text-[#6B7280] flex items-center gap-1 mr-5">
          <span>❤️</span>
          <span>{article.likes ?? 0}</span>
        </span>
      </div>
    </Link>
  );
}
