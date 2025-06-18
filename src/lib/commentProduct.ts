interface CommentType {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
  // 필요 시 다른 필드 추가
}

//해당 상품의 댓글 등록하기
export async function postProductComment(
  productId: number,
  accessToken: string,
  postData: string
): Promise<void> {
  const res = await fetch(
    `http://localhost:3000/products/${productId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content: postData }),
    }
  );

  if (!res.ok) throw new Error("댓글 등록 실패");
}

//해당 상품의 댓글들 조회하기
export async function getProductComment(productId: number, limit: number) {
  const res = await fetch(
    `http://localhost:3000/products/${productId}/comments?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("댓글 조회 실패");

  return res.json();
}

//해당 상품의 댓글 수정하기기
export async function patchProductComment(
  commentId: number,
  accessToken: string,
  patchData: string
) {
  const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content: patchData }),
  });

  if (!res.ok) throw new Error("댓글 수정 실패");
  return res.json();
}

//해당 상품의 댓글 삭제하기
export async function deleteProductComment(
  commentId: number,
  accessToken: string
) {
  const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("댓글 삭제 실패");
}
