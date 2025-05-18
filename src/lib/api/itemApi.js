"use client";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 상품 목록 조회
export async function getProducts({ orderBy, page, pageSize, keyword } = {}) {
  const params = new URLSearchParams();

  if (orderBy) params.append("orderBy", orderBy);
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (page) params.append("page", page.toString());
  if (keyword) params.append("keyword", keyword);

  const query = params.toString();

  try {
    const response = await fetch(`${baseURL}/products?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

// 상품 상세 조회
export async function fetchProductDetail(productId) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const res = await fetch(`${baseURL}/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "상품 정보를 불러올 수 없습니다.");
  }

  const data = await res.json();

  return {
    ...data,
    isLiked: data.isFavorite,
  };
}

// 상품 등록
export async function createProduct(data) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const res = await fetch(`${baseURL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "상품 등록 실패");
  }

  return res.json();
}

// 상품 수정
export async function updateProduct(productId, data) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const res = await fetch(`${baseURL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "상품 수정 실패");
  }

  return res.json();
}

// 상품 삭제
export async function deleteProduct(productId) {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${baseURL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    // ⚠️ res.status가 204인 경우 res.json() 하면 에러남
    const errorText = await res.text(); // text로 받아서 디버깅용 메시지 확보
    throw new Error(
      `삭제 실패 (status: ${res.status}) - ${errorText || "No content"}`
    );
  }

  // ✅ 204 No Content이면 파싱 없이 return
  if (res.status === 204) return;

  return res.json(); // 혹시라도 응답 본문이 있는 경우
}

// 좋아요 추가
export async function likeProduct(productId) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const res = await fetch(`${baseURL}/products/${productId}/favorite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "좋아요 실패");
  }

  return res.json();
}

// 좋아요 취소
export async function unlikeProduct(productId) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const res = await fetch(`${baseURL}/products/${productId}/favorite`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "좋아요 취소 실패");
  }

  return res.json();
}

// 이미지 업로드
export async function uploadImage(formData) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const res = await fetch(`${baseURL}/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "이미지 업로드 실패");
  }

  const data = await res.json();
  return data;
}
