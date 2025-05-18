"use client";

import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/lib/api/commentApi";
import CommentItem from "./CommentItem";
import Image from "next/image";
import EmptyComments from "../../../public/images/ui/empty-comments.svg";
import BackIcon from "../../../public/images/icons/ic_back.svg";
import Link from "next/link";

export default function CommentList({ productId }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => getComments(productId),
    enabled: !!productId,
  });

  const comments = data?.list || [];

  if (isLoading) return <div className="text-center">댓글 불러오는 중...</div>;
  if (isError)
    return <div className="text-center text-red-500">댓글 로딩 실패</div>;

  return (
    <div className="mt-8">
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          <Image src={EmptyComments} alt="댓글 없음" width={140} height={140} />
          <p className="mt-4 text-base font-normal text-gray-400">
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
          <Link
            href="/items"
            className="mt-12 px-[39.5px] py-3 bg-[#3692FF] text-white text-lg font-semibold rounded-full hover:bg-[#267de8] flex items-center justify-center gap-2"
          >
            목록으로 돌아가기
            <Image src={BackIcon} alt="뒤로가기" width={24} height={24} />
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDeleted={refetch}
                onUpdated={refetch}
              />
            ))}
          </ul>

          <div className="flex justify-center mt-12">
            <Link
              href="/items"
              className="mt-12 px-16 py-3 bg-[#3692FF] text-white text-lg font-semibold rounded-full hover:bg-[#267de8] flex items-center justify-center gap-2"
            >
              목록으로 돌아가기
              <Image src={BackIcon} alt="뒤로가기" width={24} height={24} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
