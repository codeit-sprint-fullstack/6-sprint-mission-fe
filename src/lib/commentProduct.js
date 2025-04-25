//해당 상품의 댓글 등록하기
export async function postProductComment(productId, accessToken, postData) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: Bearer`${accessToken}`,
      },
      body: JSON.stringify(postData),
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
