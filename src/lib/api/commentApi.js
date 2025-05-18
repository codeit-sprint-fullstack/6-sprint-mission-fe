const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 댓글 목록 조회
export async function getComments(productId) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const response = await fetch(
    `${baseURL}/products/${productId}/comments?limit=10`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("댓글 목록 조회에 실패했습니다");
  }

  return response.json();
}

// 댓글 추가
export async function addComment({ productId, content }) {
  try {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");

    const response = await fetch(`${baseURL}/products/${productId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(errorData.message || "댓글 작성에 실패했습니다");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 댓글 수정
export async function updateComment({ commentId, content }) {
  try {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    const response = await fetch(`${baseURL}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error("댓글 수정 실패");
    }

    const updatedComment = await response.json();
    return updatedComment;
  } catch (error) {
    console.error("Failed to update comment:", error);
    throw error;
  }
}

// 댓글 삭제
export async function deleteComment(commentId) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const response = await fetch(`${baseURL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("댓글 삭제에 실패했습니다");
  }

  return { success: true };
}
