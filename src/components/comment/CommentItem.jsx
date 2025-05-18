"use client";

import { useRouter } from "next/navigation";
import { deleteComment, updateComment } from "@/lib/api/commentApi";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Profile from "../../../public/images/icons/ic_profile.svg";
import KebabIcon from "../../../public/images/icons/ic_kebab.svg";
import { useAuth } from "@/providers/AuthProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function CommentItem({ comment, onDeleted, onUpdated }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const dropdownRef = useRef(null);
  const { user, isLoading } = useAuth();
  const userId = user?.id;

  if (isLoading) return null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteComment(comment.id);
      onDeleted();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await updateComment({ commentId: comment.id, content: editContent });
      setIsEditing(false);
      if (onUpdated) {
        await onUpdated();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const isAuthor = String(comment?.writer?.id) === String(userId);

  const createdAt = comment.createdAt ? dayjs(comment.createdAt).fromNow() : "";

  return (
    <li className="w-full bg-[#FCFCFC] border-b border-gray-200 relative py-4 px-2">
      <div className="flex justify-between">
        {isEditing ? (
          <div className="flex flex-col w-full">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-24 p-2 border rounded-md text-sm"
            />
            <div className="flex justify-end mt-2 gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-1 text-sm text-gray-500 border rounded-lg"
              >
                취소
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-1 text-sm bg-blue-500 text-white rounded-lg"
              >
                저장
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-800 text-sm font-normal leading-6">
              {comment.content}
            </p>

            {isAuthor && (
              <div className="relative">
                <button onClick={() => setShowDropdown((prev) => !prev)}>
                  <Image
                    src={KebabIcon}
                    alt="댓글 메뉴"
                    width={24}
                    height={24}
                  />
                </button>

                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-6 bg-white border border-gray-300 rounded-lg z-10 w-[139px]"
                  >
                    <button
                      className="w-full text-center pt-3 pb-2 text-gray-500 hover:bg-gray-100"
                      onClick={() => {
                        setIsEditing(true);
                        setShowDropdown(false);
                      }}
                    >
                      수정하기
                    </button>
                    <button
                      className="w-full text-center pt-2 pb-3 text-gray-500 hover:bg-gray-100"
                      onClick={handleDelete}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2 items-start mt-4">
          <Image src={Profile} width={32} height={32} alt="프로필" />
          <div className="flex flex-col gap-1 font-normal text-xs">
            <span className="text-gray-600">{comment.writer.nickname}</span>
            <span className="text-gray-400">{createdAt}</span>
          </div>
        </div>
      )}
    </li>
  );
}
