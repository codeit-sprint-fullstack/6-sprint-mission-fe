import Image from "next/image";
import React, { useState } from "react";
import defaultPrifile from "../../../../../assets/face.png";
import formatTime from "./formatTime";
import modalopenbt from "../../../../../assets/modalopenbt.png";
import { userService } from "@/src/app/providers/AuthProvider";
import { deleteComments, updateComments } from "@/src/api/comment/comments";
import ButtonModal from "./ButtonModal";
import { useQueryClient } from "@tanstack/react-query";

function Coment({ data }) {
  const queryClient = useQueryClient();
  const { user } = userService();
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(data.content);

  const patchComent = async (e) => {
    e.preventDefault();
    await updateComments(data.id, { content: inputValue });
    setIsEditing(false);
    queryClient.invalidateQueries(["itemsComent", data.productId]);
  };
  const deleteComent = async (e) => {
    await deleteComments(data.id);
    queryClient.invalidateQueries(["itemsComent", data.productId]);
    setModal(false);
  };
  console.log("현재 로그인 유저:", user.user.id);
  console.log("댓글 작성자:", data.writer.id);
  return (
    <div className="flex flex-col w-full items-start justify-center border-b border-[#E5E7EB] pb-[0.75rem]">
      {/* 댓글 내용 or 수정 textarea */}
      {!isEditing ? (
        <div className="flex flex-row w-full justify-between">
          <p className="titletext">{data.content}</p>
          {user.user.id === +data.writer.id && (
            <div className="relative inline-block">
              <button onClick={() => setModal(true)}>
                <Image src={modalopenbt} width={24} height={24} alt="열기" />
              </button>
              {modal && (
                <ButtonModal
                  onDeleteClick={deleteComent}
                  onEditClick={() => {
                    setModal(false);
                    setIsEditing(true);
                  }}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <form className="w-full" onSubmit={patchComent}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-[6.5rem] px-[1.5rem] py-[1rem] outline-none text-base text-gray-900 resize-none bg-[#F3F4F6] rounded-xl"
          />
        </form>
      )}

      {/* 프로필 영역은 항상 보임 */}
      <div className="flex flex-row justify-between items-start w-full mt-[1.5rem]">
        <div className="flex flex-row items-start gap-[1rem]">
          <Image
            src={data.writer.image ?? defaultPrifile}
            width={40}
            height={40}
            alt="기본얼굴이미지"
          />
          <div className="flex flex-col justify-center items-start gap-0.5">
            <p>{data.writer.nickname}</p>
            <p className="text-[#9CA3AF]">{formatTime(data.updatedAt)}</p>
          </div>
        </div>

        {/* 수정 모드일 때만 보이는 버튼들 */}
        {isEditing && (
          <div className="flex flex-row gap-2">
            <button
              type="button"
              className="btn-primary w-[4.5rem]"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
            <button
              type="button"
              className="btn-primary w-[6.5rem]"
              onClick={patchComent}
            >
              수정 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Coment;
