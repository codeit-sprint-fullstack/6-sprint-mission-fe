"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showPostDropdown, setShowPostDropdown] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 게시글 조회
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
      })
      .catch(() => alert("게시글 조회에 실패했습니다."));
  }, [id]);

  // 댓글 목록 조회
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/articles/${id}/comments`)
      .then((res) => res.json())
      .then((data) =>
        setComments(
          data.data.map((c) => ({
            ...c,
            nickname: "똑똑한판다",
            isEditing: false,
            editContent: "",
            showDropdown: false,
          }))
        )
      )
      .catch(() => alert("댓글 목록을 불러오지 못했습니다."));
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/articles/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      const saved = await res.json();
      setComments((prev) => [
        ...prev,
        {
          ...saved,
          nickname: "똑똑한판다",
          createdAt: saved.createdAt.split("T")[0],
          isEditing: false,
          editContent: "",
          showDropdown: false,
        },
      ]);
      setNewComment("");
    } catch {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleEditSubmit = async (commentId, editContent) => {
    try {
      await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, content: editContent, isEditing: false, editContent: "" }
            : c
        )
      );
    } catch {
      alert("댓글 수정 실패");
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm("댓글을 삭제할까요?")) return;
    try {
      await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
      });

      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      alert("댓글 삭제 실패");
    }
  };

  const handlePostUpdate = async () => {
    try {
      await fetch(`http://localhost:3000/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      setPost((prev) => ({
        ...prev,
        title: editTitle,
        content: editContent,
      }));
      setIsEditingPost(false);
      setShowPostDropdown(false);
    } catch {
      alert("게시글 수정 실패");
    }
  };

  const handlePostDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await fetch(`http://localhost:3000/articles/${id}`, {
        method: "DELETE",
      });
      router.push("/board");
    } catch {
      alert("게시글 삭제 실패");
    }
  };

  if (!post) return <div className="p-10">로딩 중...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* 제목 + 수정 옵션 */}
      <div className="flex justify-between items-start mb-2 relative">
        {isEditingPost ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border p-2 rounded mr-2"
          />
        ) : (
          <h1 className="text-xl font-semibold">{post.title}</h1>
        )}
        <img
          src="/icons/ic_kebab.svg"
          alt="게시글 옵션"
          className="w-5 h-5 cursor-pointer"
          onClick={() => setShowPostDropdown((prev) => !prev)}
        />
        {showPostDropdown && (
          <div className="absolute right-0 top-6 w-24 bg-white border rounded shadow text-sm z-10">
            {isEditingPost ? (
              <>
                <button
                  className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
                  onClick={handlePostUpdate}
                >
                  저장
                </button>
                <button
                  className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
                  onClick={() => setIsEditingPost(false)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
                  onClick={() => setIsEditingPost(true)}
                >
                  수정하기
                </button>
                <button
                  className="block w-full px-3 py-2 hover:bg-gray-100 text-left text-red-500"
                  onClick={handlePostDelete}
                >
                  삭제하기
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* 작성자 정보 */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <img src="/icons/ic_profile.svg" className="w-6 h-6 mr-2" />
        총명한판다 · {post.createdAt?.split("T")[0]}
        <div className="ml-4 flex items-center gap-1">
          <img src="/icons/heart.svg" className="w-4 h-4" />
          <span>{post.likes ?? 0}</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="text-gray-800 text-base mb-10">
        {isEditingPost ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full border p-2 rounded resize-none"
            rows={6}
          />
        ) : (
          post.content
        )}
      </div>

      {/* 댓글 작성 */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">댓글달기</h3>
        <textarea
          placeholder="댓글을 입력해주세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-gray-100 p-4 rounded-lg h-24 resize-none"
        />
        <div className="text-right mt-2">
          <button
            onClick={handleCommentSubmit}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            등록
          </button>
        </div>
      </div>

      {/* 댓글 목록 or 빈 상태 */}
      {comments.length === 0 ? (
        <div className="flex justify-center my-10">
          <img src="/icons/no_comment.svg" alt="댓글 없음" className="w-40" />
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex justify-between bg-white px-4 py-3 rounded shadow-sm items-start relative"
            >
              <div className="w-full">
                {c.isEditing ? (
                  <textarea
                    value={c.editContent}
                    onChange={(e) =>
                      setComments((prev) =>
                        prev.map((item) =>
                          item.id === c.id
                            ? { ...item, editContent: e.target.value }
                            : item
                        )
                      )
                    }
                    className="w-full bg-gray-100 p-2 rounded resize-none mb-1"
                  />
                ) : (
                  <p className="text-sm text-gray-800 mb-1">{c.content}</p>
                )}
                <div className="flex items-center text-xs text-gray-400 gap-2">
                  <img src="/icons/ic_profile.svg" className="w-8 h-8" />
                  <div className="text-xs text-gray-400 flex flex-col">
                    <span>{c.nickname}</span>
                    <span>{dayjs(c.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
              <div className="relative ml-2">
                <img
                  src="/icons/ic_kebab.svg"
                  alt="댓글 옵션"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() =>
                    setComments((prev) =>
                      prev.map((item) =>
                        item.id === c.id
                          ? { ...item, showDropdown: !item.showDropdown }
                          : { ...item, showDropdown: false }
                      )
                    )
                  }
                />
                {c.showDropdown && (
                  <div className="absolute right-0 mt-2 w-20 bg-white border rounded shadow text-sm z-10">
                    {c.isEditing ? (
                      <>
                        <button
                          className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
                          onClick={() => handleEditSubmit(c.id, c.editContent)}
                        >
                          저장
                        </button>
                        <button
                          className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
                          onClick={() =>
                            setComments((prev) =>
                              prev.map((item) =>
                                item.id === c.id
                                  ? {
                                      ...item,
                                      isEditing: false,
                                      editContent: "",
                                      showDropdown: false,
                                    }
                                  : item
                              )
                            )
                          }
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="block w-full px-3 py-2 hover:bg-gray-100 text-left"
                          onClick={() =>
                            setComments((prev) =>
                              prev.map((item) =>
                                item.id === c.id
                                  ? {
                                      ...item,
                                      isEditing: true,
                                      editContent: item.content,
                                      showDropdown: false,
                                    }
                                  : item
                              )
                            )
                          }
                        >
                          수정하기
                        </button>
                        <button
                          className="block w-full px-3 py-2 hover:bg-gray-100 text-left text-red-500"
                          onClick={() => handleDelete(c.id)}
                        >
                          삭제하기
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 돌아가기 버튼 */}
      <div className="text-center mt-10">
        <button
          onClick={() => router.push("/board")}
          className="inline-flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm min-w-[180px] whitespace-nowrap"
        >
          목록으로 돌아가기{" "}
          <img src="/icons/ic_back.svg" alt="뒤로가기" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
