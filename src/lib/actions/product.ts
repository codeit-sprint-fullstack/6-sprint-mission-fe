"use server";

import { BASE_URL } from "@/constant";
import { Product } from "@/types";
import { cookies } from "next/headers";

type ProductParams = Pick<Product, "name" | "description" | "price" | "tags" | "images">;

// 상품 상세 조회
export async function getProductAction(productId: number) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) return data;

    return data;
  } catch (e) {
    console.error("상품을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 상품 등록
export async function createProduct(params: ProductParams) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true, id: data.id };
  } catch (e) {
    console.error("상품 등록을 실패했습니다.", e);
    throw e;
  }
}

// 상품 수정
export async function updateProduct({
  productId,
  params,
}: {
  productId: number;
  params: ProductParams;
}) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true, id: data.id };
  } catch (e) {
    console.error("상품 수정을 실패했습니다.", e);
    throw e;
  }
}

// 상품 삭제
export async function deleteProduct({ productId }: { productId: number }) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true };
  } catch (e) {
    console.error("상품 삭제를 실패했습니다.", e);
    throw e;
  }
}

// 상품 좋아요
export async function createLike({ productId }: { productId: number }) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}/favorite`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true, ...data };
  } catch (e) {
    console.error("좋아요 요청을 실패했습니다.", e);
    throw e;
  }
}

// 상품 좋아요 취소
export async function deleteLike({ productId }: { productId: number }) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}/favorite`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true, ...data };
  } catch (e) {
    console.error("좋아요 취소 요청을 실패했습니다.", e);
    throw e;
  }
}

// 이미지 업로드
export async function uploadImage({ image }: { image: File }) {
  const token = (await cookies()).get("accessToken")?.value;

  const formData = new FormData();
  formData.append("image", image);

  try {
    const res = await fetch(`${BASE_URL}/images/upload`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true, url: data.url };
  } catch (e) {
    console.error("이미지 등록을 실패했습니다.", e);
    throw e;
  }
}
