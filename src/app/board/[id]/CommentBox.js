"use client";

import { useEffect, useState } from "react";

export default function CommentBox({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const loadComments = async () => {
    const res = await fetch(`/api/posts/${postId}/comments`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });
    setNewComment("");
    loadComments();
  };

  const handleUpdate = async (commentId) => {
    await fetch(`/api/posts/${postId}/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editingContent }),
    });
    setEditingId(null);
    setEditingContent("");
    loadComments();
  };

  const handleDelete = async (commentId) => {
    await fetch(`/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    });
    loadComments();
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>💬 댓글</h3>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <input
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={handleAdd}>등록</button>
      </div>

      <ul style={{ marginTop: "1rem", padding: 0 }}>
        {comments.map((comment) => (
          <li
            key={comment.id}
            style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}
          >
            {editingId === comment.id ? (
              <>
                <input
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={() => handleUpdate(comment.id)}>완료</button>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <small>{comment.createdAt?.split("T")[0]}</small>
                <div style={{ marginTop: "0.3rem" }}>
                  <button
                    onClick={() => {
                      setEditingId(comment.id);
                      setEditingContent(comment.content);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
