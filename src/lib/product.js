//상품 등록하기
export async function postProduct(postData, accessToken) {
  const res = await fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: postData,
  });
  return res.json();
}

//상품 목록 가져오기
export async function getProducts({ page, pageSize, orderBy, keyword }) {
  const res = await fetch(
    `http://localhost:3000/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
  );

  if (!res.ok) {
    throw new Error("상품 목록을 가져올 수 없습니다.");
  }

  return res.json();
}

//베스트 상품 목록 가져오기
export async function getBestProducts({ page, pageSize, orderBy }) {
  const res = await fetch(
    `http://localhost:3000/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
  );
  if (!res.ok) {
    throw new Error("상품 목록을 가져올 수 없습니다.");
  }

  return res.json();
}

//상품 상세정보 가져오기
export async function getProduct(productId) {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("해당 상품을 가져올 수 없습니다.");
  }

  return res.json();
}

//상품 삭제하기
export async function deleteProduct(productId, accessToken) {
  const res = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("해당 상품을 삭제할 수 없습니다.");
  }
}

//상품 상세정보 수정하기
export async function fetchProduct(productId, accessToken, patchData) {
  const res = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(patchData),
  });

  if (!res.ok) {
    throw new Error("해당 상품을 가져올 수 없습니다.");
  }

  return res.json();
}

//상품 좋아요 누르기
export async function likeProduct(productId, accessToken) {
  const res = await fetch(
    `http://localhost:3000/favorites/product/${productId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("상품을 좋아할 수 없습니다.");
  }
}

//상품 좋아요 취소
export async function cancelLikeProduct(productId, accessToken) {
  const res = await fetch(
    `http://localhost:3000/favorites/product/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("상품 좋아요를 취소할 수 없습니다.");
  }
}
