"use client";

import { fetchArticle } from "@/api/articles/articles";
import Image from "next/image";
import defaultProfile from "../../../../assets/face.png";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ArticlesDetailPage() {
  const { id } = useParams();

  const {
    data: article,
    isPending,
    error,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
  });
  if (isPending) return <p>불러오는 중...</p>;
  if (error) return <p>오류 발생!</p>;
  console.log("상품 ID:", id);
  return (
    <div>
      <section>
        <div>
          <h1>{article.title}</h1>
          <button>...버튼</button>
        </div>
        <div>
          <Image src={defaultProfile} width={40} height={40} alt="프로필사진" />
          <p>{article.authorNickname}</p>
          <p>{article.updatedAt}</p>
        </div>
        <p>{article.content}</p>
      </section>

      <section>
        <h1>댓글달기</h1>
        <form>
          <input
            type="text"
            name="comment"
            // value={formData.comment}
            // onChange={handleChange}
            // onBlur={() =>
            //     setValidStates((prev) => ({
            //         ...prev,
            //         email: isValid("email", { email: formData.email })
            //     }))
            //    }
            placeholder="댓글글을 입력해 주세요"
            className="p-3 rounded-[1rem] bg-[#F3F4F6] w-full g-[7rem] focus:outline-none"
          />
          <button>등록</button>
        </form>
      </section>

      <section>댓글 목록들</section>
    </div>
  );
}
