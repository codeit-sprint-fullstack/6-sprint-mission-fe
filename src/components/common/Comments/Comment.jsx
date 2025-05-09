"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { commentService } from "@/service/commentService";
import DropDownToggle from "@/components/ui/DropDownToggle";
import ic_profile from "@/assets/images/common/ic_profile.svg";
import dayjs from "dayjs";
import clsx from "clsx";
import { useAuth } from "@/providers/AuthProvider";

export default function Comment({ comment }) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [body, setBody] = useState({ content: comment.content });

  const { articleId, productId } = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const id = articleId || productId;

  // 댓글 수정 API
  const { mutate: updateComment } = useMutation({
    mutationFn: ({ type, id, commentId, body }) =>
      commentService.updateComment(type, id, commentId, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", id] }),
  });

  // 댓글 삭제 API
  const { mutate: deleteComment } = useMutation({
    mutationFn: ({ type, id, commentId }) =>
      commentService.deleteComment(type, id, commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", id] }),
  });

  // 댓글 수정
  const handleUpdateComment = () => {
    updateComment({
      type: articleId ? "articles" : "products",
      id,
      commentId: comment.id,
      body: { content: body.content.trim() },
    });

    setIsEditMode(false);
    setBody({ content: body.content.trim() });
  };

  // 댓글 삭제
  const handleDeleteComment = () => {
    deleteComment({
      type: articleId ? "articles" : "products",
      id,
      commentId: comment.id,
    });
  };

  // body 변경
  const changeValue = (e) => {
    const content = e.target.value;

    setBody({ content });
  };

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  // 정렬 선택버튼 닫기
  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  // 게시글 댓글 수정모드
  const handleEdit = () => {
    setIsEditMode(true);
    setIsDropDownVisible(false);
  };

  // 게시글 댓글 수정모드 취소
  const handleCancelEditMode = () => {
    setIsEditMode(false);
    setBody({ content: comment.content });
  };

  // 수정 버튼 활성화
  useEffect(() => {
    const { content } = body;
    if (!content.trim()) return setIsActive(false);

    if (content) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [body]);

  return (
    <>
      <div className="flex flex-col gap-y-[8px] sm:gap-y-[12px]">
        <div className="flex flex-col gap-y-[24px]">
          <div className="relative flex justify-between items-center gap-[8px]">
            {isEditMode ? (
              <textarea
                onChange={changeValue}
                value={body.content}
                name="content"
                placeholder="댓글을 입력해주세요"
                className="flex items-start w-full h-[80px] bg-secondary-gray-100 border-transparent rounded-[12px] outline-none py-[16px] px-[24px] font-normal text-[14px]/[24px] placeholder-secondary-gray-300 resize-none"
              />
            ) : (
              <p className="flex font-normal text-[14px]/[24px] whitespace-pre-line">
                {comment.content}
              </p>
            )}
            {/* TODO: API로직 고민해서 백엔드 필드 추가 되면 작성자만 드롭다운 보이게 하기 */}
            {/* {user?.id === comment.writer.id && */}
            {isEditMode ? null : (
              <DropDownToggle
                handleEdit={handleEdit}
                handleDelete={handleDeleteComment}
                handleDropDownToggle={handleDropDownToggle}
                handleDropDownClose={handleDropDownClose}
                isDropDownVisible={isDropDownVisible}
              />
            )}
          </div>
          <div
            className={clsx(
              isEditMode && "mb-[16px]",
              "flex justify-between items-center font-normal text-[12px]/[18px]"
            )}
          >
            <div className="flex justify-center items-center gap-[8px]">
              <div className="relative w-[32px] h-[32px]">
                {/* TODO: 내가 만든 댓글 API로 변경 시, writer는 백엔드 어떻게 만들지 보고 수정 
                ex) {comment.writer.image ? comment.writer.image : ic_profile}*/}
                {/* TODO: 외부 이미지 관련해서 HTML 태그 사용하는 것 고려해보기. */}
                <Image
                  src={ic_profile}
                  alt="프로필"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-[4px] ">
                <p className="text-secondary-gray-500">
                  {/* TODO: 내가 만든 댓글 API로 변경 시, writer 백엔드 API 보고 수정 */}
                  {/* {comment.writer.nickname} */}
                </p>
                <p className="text-secondary-gray-300">
                  {dayjs(comment.createdAt).format("YYYY. MM. DD")}
                </p>
              </div>
            </div>
            {isEditMode && (
              <div className="flex justify-center items-center gap-[24px]">
                <button
                  type="button"
                  onClick={handleCancelEditMode}
                  className="flex justify-center items-center text-secondary-gray-400 border-none w-[28px] h-[26px] rounded-[8px] text-center font-semibold text-[16px] cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleUpdateComment}
                  disabled={!isActive}
                  className={clsx(
                    isActive
                      ? "bg-primary-100 cursor-pointer"
                      : "bg-secondary-gray-300 cursor-default",
                    "flex justify-center items-center text-secondary-gray-100 border-none w-[106px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px]"
                  )}
                >
                  수정 완료
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="border-t-[1.3px] border-secondary-gray-200"></div>
      </div>
    </>
  );
}
