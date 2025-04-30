//해당 상품의 댓글 등록하기
export async function postProductComment(productId, accessToken, postData) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}/comments`,
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
export async function getProductComment(productId, limit) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}/comments?limit=${limit}`
    // {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: Bearer`${accessToken}`,
    //   },
    //   body: JSON.stringify(postData),
    // }
  );

  if (!res.ok) throw new Error("댓글 조회 실패");

  return res.json();
}

//해당 상품의 댓글 수정하기기
export async function patchProductComment(commentId, accessToken, patchData) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content: patchData }),
    }
  );

  if (!res.ok) throw new Error("댓글 수정 실패");
  return res.json();
}

//해당 상품의 댓글 삭제하기
export async function deleteProductComment(commentId, accessToken) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) throw new Error("댓글 삭제 실패");
}
