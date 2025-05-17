"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getTitle } from "@/app/lib/api/product";
import Link from "next/link";
import { addComment, getComments } from "@/app/lib/api/comments";

export default function Detail() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [nickName, setNickName] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [detail, setDetail] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");
  const [owner, setOwner] = useState("");
  const [like, setLike] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const commentData = await getComments(id);
    setComments(commentData.list);
    console.log(commentData.list);
  };
  const handleAddComment = async () => {
    const result = await addComment({ productId: id, content: comment });
    if (result.success) {
      setComment("");
      fetchComments();
    } else {
      alert(result.error);
    }
  };
  const fetchTitle = async () => {
    const data = await getTitle(id);
    setTitle(data.name);
    setPrice(data.price);
    setDetail(data.description);
    setTags(data.tags);
    setDate(data.createdAt.slice(0, 10));
    setOwner(data.ownerNickname);
    setLike(data.favoriteCount);
    setImageUrl(data.images?.[0] || ""); // 없으면 빈 문자열
  };

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickName");
    if (storedNickname) {
      setNickName(storedNickname);
    }
    fetchComments();
    fetchTitle();
  }, [id]);

  return (
    <div>
      <div className="border-b border-[#DFDFDF] flex items-center justify-between pl-[200px] pr-[200px]">
        <div className="flex">
          <div className="mt-[10px] mr-[32px] flex w-[153px] h-[51px] ">
            <div className="mt-[5.02px] mb-[5.85px] gap-[8.59px] flex">
              <Image
                src="/pandaImg.png"
                width={40}
                height={40.14}
                alt="판다이미지"
              />
              <p className="cursor-pointer mt-[9.3px] mb-[0.39px] font-bold text-[25.63px] leading-[100%] tracking-[0%] align-middle text-[#3692FF] font-rokaf">
                판다마켓
              </p>
            </div>
          </div>

          <div className="flex  pt-[21px] pr-[15px] pb-[21px] pl-[15px]">
            <p className="hover:text-blue-500 cursor-pointer mr-[15px] font-pretendard font-bold text-[18px] leading-[26px] tracking-normal text-center align-middle text-gray-600">
              자유게시판
            </p>
            <Link href={`/products`}>
              <p className="hover:text-blue-500 cursor-pointer mr-[15px] font-pretendard font-bold text-[18px] leading-[26px] tracking-normal text-center align-middle text-gray-600">
                중고마켓
              </p>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-[6px]">
          {nickName ? (
            <>
              <Image
                src="/userImg.png"
                width={40}
                height={40}
                alt="유저이미지"
              />
              <p>{nickName}</p>
            </>
          ) : (
            <Link href={`/auth/signUp`}>
              <button className="bg-blue-500 w-[74px] h-[42px] rounded-[8px] flex items-center justify-center ml-auto mt-[16px] mb-[24px]">
                <p className="cursor-pointer font-pretendard font-semibold text-[16px] leading-[26px] text-[#F3F4F6]">
                  로그인
                </p>
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-[24px]">
        <div className="flex flex-col items-center">
          <div className="mb-[80px]">
            <div className="gap-[24px] flex w-[1200px] h-[496px]">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="상품 이미지"
                  width={486}
                  height={486}
                  className="object-cover rounded"
                />
              )}

              <div>
                <div className="flex flex-col mb-[62px] w-[690px] h-[496px] gap-[24px]">
                  <div className="flex flex-col gap-[16px]">
                    <p className="h-[32px] font-pretendard font-semibold text-[24px] leading-[32px] tracking-normal text-gray-800">
                      {title}
                    </p>
                    <p className="h-[48px] font-pretendard font-semibold text-[40px] leading-[100%] tracking-normal text-gray-800">
                      {price}원
                    </p>
                  </div>
                  <div>
                    <p className="font-pretendard font-semibold text-[16px] leading-[26px] tracking-normal text-gray-600">
                      상품 소개
                    </p>
                    <p className="font-pretendard font-normal text-[16px] leading-[26px] tracking-normal text-gray-600">
                      {detail}
                    </p>
                  </div>
                  <div>
                    <p className="mb-[16px] font-pretendard font-semibold text-[16px] leading-[26px] tracking-normal text-gray-600">
                      상품 태그
                    </p>
                    <div className="flex gap-[8px]">
                      <div className="h-[36px] gap-[10px] rounded-[26px] pt-[6px] pr-[16px] pb-[6px] pl-[16px] bg-[#F3F4F6]">
                        <p className="font-pretendard font-normal text-[16px] leading-[26px] tracking-[0%] text-[#1F2937]">
                          {`#${tags}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-between w-[690px] h-[50px]">
                    <div className="flex w-[134px] h-[50px]">
                      <Image
                        src="/userImg.png"
                        className="mt-[5px] mb-[5px] mr-[16px]"
                        width={40}
                        height={40}
                        alt="유저이미지"
                      />
                      <div className="w-[78px] h-[50px]">
                        <p className="font-pretendard font-medium text-[14px] leading-[24px] tracking-[0%] text-gray-600">
                          {owner}
                        </p>
                        <p className="font-pretendard font-normal text-[14px] leading-[24px] text-gray-400">
                          {date}
                        </p>
                      </div>
                    </div>

                    <div className="border-l border-[#E5E7EB] w-[111px] h-[40px] pl-[24px]">
                      <div className="w-[87px] h-[40px] rounded-[35px] border-[1px] border-[#E5E7EB] pt-[4px] pr-[12px] pb-[4px] pl-[12px]">
                        <div className="w-[63px] h-[32px] flex">
                          <Image
                            src="/heart.png"
                            width={26.8}
                            height={23.3}
                            className="cursor-pointer mt-[4px] mb-[4.7px] mr-[2.5px] ml-[2.6px]"
                            alt="하트이미지"
                          />
                          <p className="mt-[3px] mb-[3px] ml-[4px] font-pretendard font-medium text-[16px] leading-[26px] text-gray-500">
                            {like}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  flex-col items-center justify-center px-4">
            <div className="w-full max-w-[1200px]">
              <p className="mb-[9px] font-pretendard font-semibold text-[16px] leading-[26px] tracking-[0%] text-[#111827]">
                문의하기
              </p>
              <div className="w-full h-[104px] gap-[10px] rounded-[12px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] bg-[#F3F4F6]">
                <textarea
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="resize-none w-full h-full bg-[#F3F4F6] placeholder:font-pretendard placeholder:font-normal placeholder:text-[16px] placeholder:leading-[26px] placeholder:tracking-[0%] placeholder:text-[#9CA3AF] border-none outline-none"
                  placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                />
              </div>
              <button
                onClick={handleAddComment}
                className="hover:bg-blue-500 mb-[24px] w-[74px] h-[42px] mt-[16px] ml-[1126px] rounded-[8px] bg-[#9CA3AF] flex items-center justify-center"
              >
                <p className="cursor-pointer font-pretendard font-semibold text-[16px] leading-[26px] text-[#F3F4F6]">
                  등록
                </p>
              </button>
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[24px]">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-[#E5E7EB] flex pb-[12px] pr-[4px] w-[1200px] h-[100px]"
                  >
                    <div className="mb-[24px]">
                      <p>{comment.content}</p>
                      <div className="flex mt-[24px]">
                        <div className="w-[32px] h-[32px] mb-[8px] mr-[8px] relative">
                          <Image
                            src="/userImg.png"
                            alt="유저 이미지"
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <p className="mb-[4px] font-pretendard font-normal text-[12px] leading-[18px] tracking-[0%] text-[#4B5563]">
                            {comment.writer.nickname}
                          </p>
                          <p className="mb-[4px] font-pretendard font-normal text-[12px] leading-[18px] tracking-[0%] text-[#9CA3AF]">
                            1시간 전
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center justify-end">
                      <Image
                        src="/revise.png"
                        className="cursor-pointer mb-[60px]"
                        width={3} // Set desired width
                        height={13} // Set desired height
                        alt="수정버튼"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button>
            <Image
              src="/back.png"
              width={240}
              height={48}
              className="cursor-pointer mt-[64px]"
              alt="뒤로가기"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
