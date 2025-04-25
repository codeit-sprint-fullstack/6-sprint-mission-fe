//상품 목록 가져오기
export async function getProducts() {
  const res = await fetch(`https://panda-market-api.vercel.app/products`);

  if (!res.ok) {
    throw new Error("상품 목록을 가져올 수 없습니다.");
  }

  return res.json();
}

//상품 상세정보 가져오기
export async function getProduct(productId) {
  const res = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("해당 상품을 가져올 수 없습니다.");
  }

  return res.json();
}
