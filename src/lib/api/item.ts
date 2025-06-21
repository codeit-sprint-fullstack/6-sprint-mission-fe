import { TItem } from "@/types";

export const getItem = async (itemId: TItem["id"], accessToken: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("상품 정보를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

export const getAllItems = async (
  search: string = "",
  order: "recent" | "favorite" = "recent"
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items?keyword=${search}&orderBy=${order}`
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("상품 목록을 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

export const postItem = async (itemData: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: itemData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("상품 등록에 실패했습니다:", error);
    throw error;
  }
};

export const patchItem = async (itemId: TItem["id"], itemData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(itemData),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("상품 수정에 실패했습니다:", error);
    throw error;
  }
};

export const deleteItem = async (itemId: TItem["id"]) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete item");
    }
    return res;
  } catch (error) {
    console.error("상품 삭제에 실패했습니다:", error);
    throw error;
  }
};

export const postItemFavorite = async (itemId: TItem["id"]) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/favorite`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to add favorite");
    }
    return data;
  } catch (error) {
    console.error("상품 찜 등록에 실패했습니다:", error);
    throw error;
  }
};

export const deleteItemFavorite = async (itemId: TItem["id"]) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/favorite`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to remove favorite");
    }
    return data;
  } catch (error) {
    console.error("상품 찜 해제에 실패했습니다:", error);
    throw error;
  }
};
