"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProductComments,
  deleteProductComment,
} from "@/api/item.api";
import { RiArrowGoBackLine } from "react-icons/ri";
import ProductInfo from "./_components/ProductInfo";
import CommentItem from "./_components/CommentItem";
import Image from "next/image";
import { postProductComment } from "@/api/item.api";

export default function ProductDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const isValid = comment.trim().length > 0;

  // 댓글 재요청 함수
  const fetchCommentsAgain = async () => {
    try {
      const fetched = await getProductComments(itemId);
      console.log("댓글 데이터:", fetched); // 데이터 구조 확인용

      // API 응답 구조에 따라 아래 둘 중 하나를 선택
      setComments(fetched.list || []);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await postProductComment(itemId, comment);
      setComment("");
      fetchCommentsAgain();
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const fetchedProduct = await getProductById(itemId);
        const fetchedComments = await getProductComments(itemId);
        
        setProduct(fetchedProduct);
        // API 응답 구조에 따라 아래 둘 중 하나를 선택 (위와 동일한 방식 사용)
        setComments(fetchedComments.list || []);
      } catch (err) {
        console.error("상품 또는 댓글 로딩 실패", err);
        if (err.response && err.response.status === 401) {
          alert("로그인 후 다시 시도해주세요.");
          router.push("/login"); // 로그인 페이지로 리디렉션
        }
      }
    };

    if (itemId) load();
  }, [itemId, router]);

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await deleteProductComment(itemId);
      router.push("/items");
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  if (!product) return <div className="p-10">로딩 중...</div>;

  return (
    <main className="w-full max-w-[1200px] mx-auto px-6">
      <ProductInfo
        product={product}
        onEdit={() => router.push(`/items/${itemId}/edit`)}
        onDelete={handleDelete}
      />
      {/* 댓글 입력창 */}
      <div className="mt-10 font-[600] text-[16px] text-gray-900">
        <div className="mb-2">문의하기</div>
        <textarea
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className="w-full bg-gray-100 rounded-[12px] px-6 py-3 h-[104px] resize-none outline-none text-[16px] font-[400] placeholder-secondary-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCommentSubmit}
            disabled={!isValid}
            className={`w-[74px] h-[42px] rounded-lg text-[16px] font-semibold ${
              isValid
                ? "bg-primary-100 text-white hover:bg-primary-200"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            등록
          </button>
        </div>
      </div>

      <div className="mt-6 mb-10 flex flex-col gap-4">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center text-base font-normal text-secondary-400">
            <div className="relative w-[196px] h-[196px] mb-4 p-5">
              <Image
                src="/images/reply_questionMark.png"
                alt="댓글 없음"
                fill
                className="object-cover"
              />
            </div>
            <p>아직 문의가 없어요</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={{
                ...comment,
                author: comment.writer.nickname, // ← 실제 작성자 닉네임 사용
                time: new Date(comment.createdAt).toLocaleDateString(), // ← 실제 생성일 포맷팅
              }}
              onCommentUpdated={fetchCommentsAgain}
            />
          ))
        )}
      </div>

      {/* '목록으로 돌아가기'*/}
      <div className="mb-10 flex justify-center">
        <button
          onClick={() => router.push("/items")}
          className="w-[240px] h-[48px] flex items-center justify-center gap-1 py-2 bg-primary-100 text-white rounded-[40px] hover:bg-primary-200 text-[18px] font-semibold"
        >
          목록으로 돌아가기
          <RiArrowGoBackLine />
        </button>
      </div>
    </main>
  );
}
