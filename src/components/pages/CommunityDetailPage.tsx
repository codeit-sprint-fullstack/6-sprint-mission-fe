"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InputBox from "@/components/ui/InputBox";
import TitleSection from "@/components/ui/TitleSection";
import { articleService, Article, ArticleComment, ArticleCommentListResponse } from "@/lib/services/api/articleService";
import ConfirmModal from "@/components/ui/ConfirmModal";
import CommentLists from "@/app/(main)/(item)/community/[id]/_components/CommentLists";
import Dropdown from "@/app/(main)/(item)/_components/Dropdown";

import backImage from "@/assets/images/icons/ic_back.png";
import kebabImage from "@/assets/images/icons/ic_kebab.png";
import emptyHeartImage from "@/assets/images/icons/ic_emptyHeart.png";
import noCommentImage from "@/assets/images/logo/noCommentImage.png";
import ProfileImage from "../ui/ProfileImage";

export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [commentInputValue, setCommentInputValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isActive = commentInputValue !== "";

  const handleDelete = async (id: string) => {
    const data = await articleService.deleteArticle(id);
    // TODO: data 가지고 확인 처리.
    setIsModalOpen(false);
  };

  const hadleModalClose = () => {
    setIsModalOpen(false);
  };

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => {
        router.push(`/community/${id}/edit`);
        setIsModalOpen(false);
        return;
      },
    },
    { label: "삭제하기", onClick: () => setIsModalOpen(true) },
  ];

  const hadleDropdownOpen = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOnClickCommentRegist = async () => {
    // 댓글 등록 API 호출 예시 (실제 구현에 맞게 수정 필요)
    // const data = await articleService.createArticleComment(id, { content: commentInputValue });
    // setComments((prev) => [...prev, data]);
    // setCommentInputValue("");
    // TODO: 성공시 코멘트 리스트 다시 받아오는 로직 필요.
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const articleData = await articleService.getArticle(id);
      setArticle(articleData);
      const commentsData: ArticleCommentListResponse = await articleService.getArticleComments(id);
      setComments(commentsData.list);
    };

    fetchData();
  }, [id]);

  if (!article) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="py-4">
      <section className="px-4">
        <div className="flex justify-between text-xl-bold py-1">
          <p>{article.title}</p>
          <div className="relative">
            <Image
              src={kebabImage}
              alt="kebabImage"
              onClick={hadleDropdownOpen}
            />
            {isDropdownOpen && (
              <Dropdown
                items={dropdownItems}
                containerClassName="right-0 top-full"
                className="w-33 bg-FF text-gray-500 text-md-regular border-gray-300 border-2 rounded-lg"
              />
            )}
          </div>
        </div>
        <div className="flex py-4 gap-4 border-b border-gray-200">
          <div className="flex items-center pr-3 gap-2 border-r-1 border-gray-200">
            <div className="flex gap-1 text-gray-600">
              <ProfileImage className={"w-6 h-auto object-cover"} />
              <p className="text-gray-600">{article.writer?.nickname}</p>
            </div>
            <p className="text-gray-400">
              {new Date(article.createdAt)
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, ". ")}
            </p>
          </div>
          <div className="flex justify-center items-center w-[87px] h-10 border-gray-200 border-2 rounded-4xl text-gray-500 gap-2">
            <Image
              src={emptyHeartImage}
              alt="emptyHeartImage"
              className="w-6 h-auto object-cover "
            />
            <p>{article.likeCount}</p>
          </div>
        </div>
        <div className="py-4 text-gray-800">
          <p>{article.content}</p>
        </div>
      </section>

      <section className="p-4">
        <TitleSection titleText={"댓글달기"} />
        <div>
          <InputBox
            placeHolderText={"댓글을 입력해주세요."}
            inputValueState={commentInputValue}
            onChangeInput={(e) => setCommentInputValue(e.target.value)}
            inputType={"textarea"}
          />
        </div>
        <div className="flex p-4 justify-end">
          <button
            className={`btn-sm-42 ${
              isActive
                ? "bg-primary-100 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleOnClickCommentRegist}
          >
            등록
          </button>
        </div>
      </section>

      <section>
        {comments.length === 0 ? (
          <div className="flex flex-col items-center text-md-regular text-gray-400">
            <Image
              src={noCommentImage}
              alt="noCommentImage"
              className="w-35 h-35"
            />
            <p>아직 댓글이 없어요,</p>
            <p>지금 댓글을 달아보세요!</p>
          </div>
        ) : (
          <CommentLists comments={comments} />
        )}
      </section>

      <div className="w-full flex justify-center p-10">
        <Link
          href="/community"
          className="btn-lg bg-primary-100 text-FF flex items-center justify-center gap-1 cursor-pointer"
        >
          목록으로 돌아가기 <Image src={backImage} alt="backButton" />
        </Link>
      </div>
      {isModalOpen && (
        <ConfirmModal
          modalTheme={"red"}
          confirmType={"confirm"}
          confirmText={"정말로 게시글을 삭제하시겠어요?"}
          handleOnClick={() => handleDelete(id as string)}
          handleOnCloseModal={hadleModalClose}
        />
      )}
    </div>
  );
}
